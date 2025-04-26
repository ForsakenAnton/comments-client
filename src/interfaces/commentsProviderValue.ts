import OrderBy from "../types/orderBy";
import CommentGetDto from "./commentGet";
import PaginationMetadata from "./paginationMetadata";

export default interface CommentsProviderValue {
  comments: CommentGetDto[];
  fetchComments: () => Promise<void>;
  addComment: (newComment: CommentGetDto) => void,
  loadChildrenComments: (parentId: number) => Promise<CommentGetDto[] | null>
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  fetchError: boolean;
  setFetchError: React.Dispatch<React.SetStateAction<boolean>>;
  paginationMetadata: PaginationMetadata;
  setPaginationMetadata: React.Dispatch<React.SetStateAction<PaginationMetadata>>;
  orderBy: OrderBy;
  setOrderBy: React.Dispatch<React.SetStateAction<OrderBy>>;
}