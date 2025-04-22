import CommentGetDto from "../interfaces/commentGet";
import Comment from "./Comment";

import "../index.css";

interface CommentThreadProps {
  comments: Array<CommentGetDto>;
}

function CommentThread({ comments }: Readonly<CommentThreadProps>) {

  return (
    <>
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </>
  );
}

export default CommentThread;