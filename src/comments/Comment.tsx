import { useState } from 'react'
import CommentGetDto from '../interfaces/commentGet';
import Avatar from 'boring-avatars';
import { BiChevronRight } from 'react-icons/bi';
import { apiPaths, rootImageFilesPath, rootTextFilesPath } from '../config/apiPaths';
import { FaRegFileAlt, FaWheelchair } from 'react-icons/fa';
import CommentThread from './CommentThread';
import { useCommentsContext } from './commentsContext';
import CommentForm from './CommentForm';
import Button from '../components/Button';

import './css/Comment.css';

interface CommentProps {
  comment: CommentGetDto
}

function Comment({ comment }: Readonly<CommentProps>) {
  const { setComments } = useCommentsContext();

  const [isOpenChildrenSection, setIsOpenChildrenSection] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState(false);

  const [showForm, setShowForm] = useState(false);

  const disableTogglingCommentsClassName = comment.childrenCommentsCount === 0
    ? "disabled"
    : "";

  const loadChildrenComments = async () => {
    if (isOpenChildrenSection) {
      setIsOpenChildrenSection(false);
      return;
    }
    console.log("loading children comments");

    setIsOpenChildrenSection(!isOpenChildrenSection);
    setLoading(true);
    setFetchError(false);

    try {
      const response = await fetch(`${apiPaths.getChildrenComments}/${comment.id}`);
      if (response.ok) {
        const data = await response.json();

        setComments((draft) => {
          const findAndUpdate = (comments: CommentGetDto[]) => {
            for (const c of comments) {
              if (c.id === comment.id) {
                c.replies = data;
                return true;
              }

              if (c.replies && c.replies.length > 0) {
                const found = findAndUpdate(c.replies);
                if (found) {
                  return true;
                }
              }
            }

            return false;
          };

          findAndUpdate(draft);

          return draft;
        });
      } else {
        console.log(response.status);
        setFetchError(true);
      }
    } catch (error) {
      console.log(error);
      setFetchError(true);
    }

    setLoading(false);
  }

  return (
    <div className="comment-container">
      <div className="comment-meta">
        <div className="avatar-and-user">
          <Avatar
            size={40}
            name={comment.user?.userName}
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
            <div className="name-and-email-info">
              <strong>{comment.user?.userName}</strong>
              <span className="email">{comment.user?.email}</span>
            </div>
            <div className="date-info">
              <span>{new Date(comment.creationDate).toLocaleDateString()}</span>
              <span className="time">{new Date(comment.creationDate).toLocaleTimeString()}</span>
            </div>
          </div>
        </div>
        <Button
          onClick={loadChildrenComments}
          className={`unstyled-button chevron-container ${disableTogglingCommentsClassName}`}
          disabled={disableTogglingCommentsClassName === "disabled"}
        >
          <span className='replies-count'>{comment.childrenCommentsCount}</span>
          <span className={`chevron-icon ${isOpenChildrenSection ? 'rotate' : ''}`}>
            <BiChevronRight />
          </span>
        </Button>
      </div>

      <div className="comment-content">
        <p className='text'>{comment.text}</p>

        {(comment.imageFileName || comment.textFileName) && (
          <div className="file-previews">
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
                  <span><FaRegFileAlt /></span>
                </a>
              </div>
            )}
          </div>
        )}
      </div>

      <button
        className='btn btn-indigo btn-sm'
        onClick={() => setShowForm(!showForm)}
      >
        {showForm ? "Cancel" : "Reply"}
      </button>

      {showForm && <CommentForm parentId={comment.id} />}

      {loading && <div className="spinner" aria-label="Loading spinner"></div>}
      {fetchError && (
        <p className="error-message">
          <FaWheelchair /> Error loading replies. Please try again later.
        </p>
      )}

      {isOpenChildrenSection &&
        Array.isArray(comment.replies) &&
        comment.replies.length > 0 && (
          <CommentThread comments={comment.replies} />
        )
      }

    </div>
  );
}

export default Comment;
