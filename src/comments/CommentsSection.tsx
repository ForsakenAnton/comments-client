import { ToastContainer } from "react-toastify";
import CommentList from "./CommentList";
import Pagination from "./Pagination";
import Sorting from "./Sorting";
import { useState } from "react";
import Button from "../components/Button";
import CommentForm from "./CommentForm";

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

      {showForm && <CommentForm parentCommentId={null} setShowForm={setShowForm} />}

      <Sorting />
      <CommentList />
      <Pagination />

      <ToastContainer position="top-center" />
    </>
  );
}

export default CommentsSection;