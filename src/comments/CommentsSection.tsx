import { ToastContainer } from "react-toastify";
import CommentList from "./CommentList";
import Pagination from "./Pagination";
import Sorting from "./Sorting";
import { useState } from "react";
import Button from "../components/Button";
import CommentForm from "./CommentForm";
import MotionWrapper from "../motion/MotionWrapper";

function CommentsSection() {
  const [showForm, setShowForm] = useState(false);


  return (
    <>
      <Button
        className="btn btn-sky btn-sm m-bottom-lg"
        onClick={() => setShowForm(!showForm)}
      >
        {showForm ? "Cancel" : "Add a comment"}
      </Button>

      <MotionWrapper>
        {showForm && (
          <CommentForm parentCommentId={null} setShowForm={setShowForm} />
        )}
      </MotionWrapper>

      <Sorting />
      <CommentList />
      <Pagination />

      <ToastContainer position="top-center" />
    </>
  );
}

export default CommentsSection;