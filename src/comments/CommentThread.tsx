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




















// import { Fragment } from "react";
// import CommentGetDto from "../interfaces/commentGet";

// interface CommentThreadProps {
//   comments: Array<CommentGetDto>
//   leftShift: number
// }

// function CommentThread({ comments, leftShift = 0 }: Readonly<CommentThreadProps>) {
//   return (
//     <>
//       {comments.map((comment) => (
//         <Fragment key={comment.id}>
//           <div style={{ marginLeft: `${leftShift}rem` }}>
//             <p>{comment.text}</p>
//           </div>
//           <CommentThread comments={comment.replies} leftShift={leftShift + 2} />
//         </Fragment>
//       ))}
//     </>
//   );
// }

// export default CommentThread;
