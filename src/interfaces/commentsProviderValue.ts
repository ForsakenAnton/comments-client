import CommentGetDto from "./commentGet";

export default interface CommentsProviderValue {
  comments: CommentGetDto[];
  setComments: React.Dispatch<React.SetStateAction<CommentGetDto[]>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  fetchError: boolean;
  setFetchError: React.Dispatch<React.SetStateAction<boolean>>;
}