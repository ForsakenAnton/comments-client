import CommentList from "./CommentList";
import Pagination from "./Pagination";
import Sorting from "./Sorting";

function CommentsSection() {
  return (
    <>
      <Sorting />
      <CommentList />
      <Pagination />
    </>
  );
}

export default CommentsSection;