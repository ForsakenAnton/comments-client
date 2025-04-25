import { FaWheelchair } from "react-icons/fa";
import { useCommentsContext } from "./commentsContext";
import CommentThread from "./CommentThread";
import MotionWrapper from "../motion/MotionWrapper";

function CommentList() {
  const { comments, loading, fetchError } = useCommentsContext();

  return (
    <>
      {loading &&
        <MotionWrapper>
          <div className="spinner" aria-label="Loading spinner"></div>
        </MotionWrapper>
      }
      {fetchError && (
        <MotionWrapper>
          <div className="error-message">
            <div className="error-text">
              <FaWheelchair />
              {" "}
              <span>Error loading comments. Please try again later.</span>
            </div>
            <button className="btn btn-success" onClick={() => window.location.reload()}>Reload the page</button>
          </div>
        </MotionWrapper >
      )
      }
      {
        !loading && !fetchError &&
        <MotionWrapper>
          <CommentThread comments={comments} />
        </MotionWrapper>
      }
    </>
  );
}

export default CommentList;
