import CommentGetDto from "../interfaces/commentGet";
import Avatar from "boring-avatars";
import "../index.css";
import { rootImageFilesPath, rootTextFilesPath } from "../config/apiPaths";
import { FaRegFileAlt } from "react-icons/fa";

interface CommentThreadProps {
  comments: Array<CommentGetDto>;
}

function CommentThread({ comments }: Readonly<CommentThreadProps>) {
  return (
    <>
      {comments.map((comment) => (
        <div key={comment.id} className="comment-box">
          <div className="comment-meta">
            <div className="avatar-and-user">
              <Avatar
                size={40}
                name={comment.user?.userName || "Anonymous"}
                variant="beam"
                colors={[
                  "#92A1C6",
                  "#146A7C",
                  "#F0AB3D",
                  "#C271B4",
                  "#C20D90"
                ]}
              />
              <div className="user-info">
                <div className="name-and-email">
                  <strong>{comment.user?.userName}</strong>
                  <span className="email">{comment.user?.email}</span>
                </div>
                <div className="date-info">
                  <span>{new Date(comment.creationDate).toLocaleDateString()}</span>
                  <span className="time">{new Date(comment.creationDate).toLocaleTimeString()}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="comment-content">
            <p>{comment.text}</p>

            {(comment.imageFileName || comment.textFileName) && (
              <div className="file-preview">
                {comment.imageFileName && (
                  <div className="image-block">
                    <img
                      src={`${rootImageFilesPath}/${comment.imageFileName}`}
                      alt="image-file"
                      className="image-preview"
                    />
                  </div>
                )}
                {comment.textFileName && (
                  <div className="text-file-link">
                    <a href={`${rootTextFilesPath}/${comment.textFileName}`} target="_blank">
                      <FaRegFileAlt /> Open the text file
                    </a>
                  </div>
                )}
              </div>
            )}
          </div>

          {comment.replies.length > 0 && (
            <CommentThread comments={comment.replies} />
          )}
        </div>
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
