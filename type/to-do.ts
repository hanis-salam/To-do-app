export interface ToDo {
  id: number;
  title: string;
  description: string;
  isCheck: boolean;
  completedAt?: string | undefined;
}
