import UserGetDto from "./userGet";

export default interface CommentGetDto {
  id: number;
  text: string;
  creationDate: string;
  imageFileName?: string | null;
  textFileName?: string | null;
  childrenCommentsCount: number;
  parentId?: number | null;
  userId: number;
  user?: UserGetDto | null;
  replies: CommentGetDto[];
}