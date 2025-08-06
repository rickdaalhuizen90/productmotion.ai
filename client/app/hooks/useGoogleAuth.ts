import { useState, useEffect, useCallback } from "react";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import type { TokenResponse, CodeResponse } from "@react-oauth/google";

interface GoogleUser {
  access_token: string;
  expires_in: number;
  scope: string;
  token_type: string;
  id_token?: string;
}

interface GoogleProfile {
  email: string;
  name: string;
  picture: string;
  given_name?: string;
  family_name?: string;
  locale?: string;
  id?: string;
  verified_email?: boolean;
}

// Helper function to check if we're in a browser environment
const isBrowser = typeof window !== 'undefined';

// Helper function to safely parse JSON from localStorage
const safelyParseJson = <T>(key: string): T | null => {
  if (!isBrowser) return null;
  
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.error(`Error parsing JSON from localStorage key "${key}":`, error);
    localStorage.removeItem(key); // Clear invalid data
    return null;
  }
};

// Helper function to safely set localStorage
const safelySetItem = (key: string, value: any): void => {
  if (!isBrowser) return;
  
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error setting localStorage key "${key}":`, error);
  }
};

// Helper function to safely remove from localStorage
const safelyRemoveItem = (key: string): void => {
  if (!isBrowser) return;
  
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing localStorage key "${key}":`, error);
  }
};

export function useGoogleAuth() {
  const [user, setUser] = useState<GoogleUser | null>(() => 
    safelyParseJson<GoogleUser>("googleUser")
  );
  
  const [profile, setProfile] = useState<GoogleProfile | null>(() => 
    safelyParseJson<GoogleProfile>("googleProfile")
  );

  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = useCallback(() => {
    googleLogout();
    setUser(null);
    setProfile(null);
    safelyRemoveItem("googleUser");
    safelyRemoveItem("googleProfile");
  }, []);

  const login = useGoogleLogin({
    onSuccess: (response: Omit<TokenResponse, "error" | "error_description" | "error_uri">) => {
      const googleUser: GoogleUser = {
        access_token: response.access_token,
        expires_in: response.expires_in,
        scope: response.scope,
        token_type: response.token_type,
        id_token: response.id_token,
      };
      safelySetItem("googleUser", googleUser);
      setUser(googleUser);
    },
    onError: (error) => {
      console.error("Login error:", error);
      setIsLoading(false);
    },
  });

  useEffect(() => {
    if (user?.access_token && !profile) {
      setIsLoading(true);
      
      const fetchProfile = async () => {
        try {
          const response = await fetch(
            "https://www.googleapis.com/oauth2/v1/userinfo",
            {
              headers: {
                Authorization: `Bearer ${user.access_token}`,
                Accept: "application/json",
              },
            }
          );

          if (!response.ok) {
            if (response.status === 401) {
              handleLogout();
              return;
            }
            throw new Error(`Status: ${response.status}`);
          }

          const data = await response.json();
          safelySetItem("googleProfile", data);
          setProfile(data);
        } catch (error) {
          console.error("Profile fetch error:", error);
        } finally {
          setIsLoading(false);
        }
      };

      fetchProfile();
    } else if (!user?.access_token && profile) {
      setProfile(null);
      safelyRemoveItem("googleProfile");
    }
  }, [user, profile, handleLogout]);

  return { user, profile, login, handleLogout, isLoading };
}

