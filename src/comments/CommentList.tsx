import { useCommentsContext } from "./commentsContext";
import CommentThread from "./CommentThread";

function CommentList() {
  const { comments } = useCommentsContext();

  return (
    // TODO sorting root comments
    <CommentThread comments={comments} />
  );
}

export default CommentList;