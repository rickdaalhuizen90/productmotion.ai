import { images } from '../assets/images';
import { videos } from '../assets/videos';

export interface DataItem {
  id: string;
  title: string;
  price: number;
  image: string;
  video?: string;
  href?: string;
}

export const GALLERY_DATA: DataItem[] = [
  {
    id: "item-1",
    title: "Dionysus Bloom Tote",
    price: 2790,
    image: images.bag,
    video: videos.bag,
  },
  {
    id: "item-2",
    title: "Ophidia Tailored Trousers",
    price: 1200,
    image: images.blackjeans,
    video: videos.blackjeans,
  },
  {
    id: "item-3",
    title: "Princetown Leather Loafers",
    price: 850,
    image: images.bluesuit,
    video: videos.bluesuit,
  },
  {
    id: "item-4",
    title: "GG Marmont Sunglasses",
    price: 495,
    image: images.dress,
    video: videos.dress,
  },
  {
    id: "item-5",
    title: "Bamboo Handle Backpack",
    price: 2450,
    image: images.bag,
    video: videos.bag,
  },
  {
    id: "item-6",
    title: "Web Stripe Denim Jeans",
    price: 980,
    image: images.blackjeans,
    video: videos.blackjeans,
  },
  {
    id: "item-7",
    title: "Horsebit Leather Boots",
    price: 1350,
    image: images.bluesuit,
    video: videos.bluesuit,
  },
  {
    id: "item-8",
    title: "Aviator Acetate Frames",
    price: 525,
    image: images.dress,
    video: videos.dress,
  },
];
