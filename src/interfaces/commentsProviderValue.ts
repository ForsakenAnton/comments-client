import CommentGetDto from "./commentGet";
import PaginationMetadata from "./PaginationMetadata";

export default interface CommentsProviderValue {
  comments: CommentGetDto[];
  setComments: React.Dispatch<React.SetStateAction<CommentGetDto[]>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  fetchError: boolean;
  setFetchError: React.Dispatch<React.SetStateAction<boolean>>;
  paginationMetadata: PaginationMetadata;
  setPaginationMetadata: React.Dispatch<React.SetStateAction<PaginationMetadata>>;
}