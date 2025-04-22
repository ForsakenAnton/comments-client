
interface CommentFormProps {
  parentId: number
}

function CommentForm({ parentId }: Readonly<CommentFormProps>) {
  return (
    <div>
      <h2>Leave a reply for the comment with id: {parentId}</h2>
      <form>
        <label htmlFor="text">Text</label>
        <input type="text" id="text" />
      </form>
    </div>
  );
}

export default CommentForm;
