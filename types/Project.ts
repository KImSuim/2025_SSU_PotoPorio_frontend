export type Project = {
  id: number;
  title: string;
  info: string;
  type: string;
  tags: string[];
  imageUrl?: string;
  images: { src: string }[];
  siteUrl?: string;
  githubUrl: string;
};
