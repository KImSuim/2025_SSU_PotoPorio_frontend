export type Comment = {
  id: number;
  nickname: string;
  password: string;
  content: string;
  createdAt: string;
  // replies: Comment[];
  likes: number;
  // icon?: string;
};
