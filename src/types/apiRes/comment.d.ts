export interface Create {
  id: number;
  creator: string;
  content: string;
  createdAt: string;
}
export type GetAll = Create[];
