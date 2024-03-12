export type Model = {
  uid: string;
  name: string;
  description: string;
  thumbnails: { images: { size: number; url: string; width: number }[] };
};
