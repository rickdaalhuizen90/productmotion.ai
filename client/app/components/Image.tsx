import { Image, ImageFallback, ImageRoot } from "@repo/tailwindcss/ui/image";

const CustomImage = () => {
  return (
    <ImageRoot>
      <Image src="https://github.com/hngngn.png" alt="Example Image" />
      <ImageFallback>Loading...</ImageFallback>
    </ImageRoot>
  );
};

export default CustomImage;

