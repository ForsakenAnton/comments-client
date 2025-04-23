import { FaWheelchair } from "react-icons/fa";
import { useCommentsContext } from "./commentsContext";
import CommentThread from "./CommentThread";

function CommentList() {
  const { comments, loading, fetchError } = useCommentsContext();

  return (
    <>
      {loading && <div className="spinner" aria-label="Loading spinner"></div>}
      {fetchError && (
        <div className="error-message">
          <div className="error-text">
            <FaWheelchair />
            {" "}
            <span>Error loading comments. Please try again later.</span>
          </div>
          <button className="btn btn-success" onClick={() => window.location.reload()}>Reload the page</button>
        </div>
      )}
      {!loading && !fetchError && <CommentThread comments={comments} />}
    </>
  );
}

export default CommentList;
