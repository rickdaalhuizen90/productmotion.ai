import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { Card } from "~/components/ui/card";
import ImageUploader from "~/components/ImageUploader";
import { memo } from "react";

export const StepOne = memo(() => {
  return (
    <Card className="p-6 border hover:shadow-sm transition-shadow">
      <h3 className="text-xl font-semibold flex items-center mb-0 mt-3">
        <span className="flex items-center justify-center w-8 h-8 bg-zinc-100 text-zinc-500 rounded-full font-medium mr-3">1</span>
        Choose your image
      </h3>

      <Tabs defaultValue="upload" className="w-full">
        <TabsList className="mb-4 w-full">
          <TabsTrigger value="upload" className="data-[state=active]:bg-white flex-1">Upload</TabsTrigger>
          <TabsTrigger value="url" className="data-[state=active]:bg-white flex-1">URL</TabsTrigger>
        </TabsList>
        <TabsContent value="upload" className="mt-0">
          <ImageUploader />
        </TabsContent>
        <TabsContent value="url" className="mt-0">
          <div className="px-4 rounded-md">
            <input
              type="text"
              placeholder="Enter image URL"
              className="w-full p-2 border rounded focus:ring-2 transition-all outline-none"
            />
          </div>
        </TabsContent>
      </Tabs>

      <p className="text-sm dark:text-zinc-500 mt-3">
        By continuing you agree to our <a href="#" className="underline hover:underline">terms</a> and <a href="#" className="underline hover:underline">privacy policy</a>.
      </p>
    </Card>
  );
});
