import { FaWheelchair } from "react-icons/fa";
import { useCommentsContext } from "./commentsContext";
import CommentThread from "./CommentThread";

function CommentList() {
  const { comments, loading, fetchError } = useCommentsContext();

  return (
    <>
      {loading && <div className="spinner" aria-label="Loading spinner"></div>}
      {fetchError && (
        <p className="error-message">
          <FaWheelchair /> Error loading comments. Please try again later.
          <button onClick={() => window.location.reload()}>Reload the page</button>
        </p>
      )}
      {!loading && !fetchError && <CommentThread comments={comments} />}
    </>
  );
}

export default CommentList;
