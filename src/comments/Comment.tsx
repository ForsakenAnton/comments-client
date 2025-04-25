import { useState } from 'react'
import CommentGetDto from '../interfaces/commentGet';
import Avatar from 'boring-avatars';
import { BiChevronRight } from 'react-icons/bi';
import { rootImageFilesPath, rootTextFilesPath } from '../config/apiPaths';
import { FaRegFileAlt, FaWheelchair } from 'react-icons/fa';
import CommentThread from './CommentThread';
import { useCommentsContext } from './commentsContext';
import CommentForm from './CommentForm';
import Button from '../components/Button';

import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

import './css/Comment.css';
import { IoCloseSharp } from 'react-icons/io5';

interface CommentProps {
  comment: CommentGetDto
}

function Comment({ comment }: Readonly<CommentProps>) {
  const { loadChildrenComments } = useCommentsContext();

  const [isOpenChildrenSection, setIsOpenChildrenSection] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState(false);

  const [showForm, setShowForm] = useState(false);

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [textFileContent, setTextFileContent] = useState<string | null>(null);
  const [isTextModalOpen, setIsTextModalOpen] = useState(false);

  const disableTogglingCommentsClassName = comment.childrenCommentsCount === 0
    ? "disabled"
    : "";

  const handleImageClick = () => {
    setLightboxOpen(true);
  };

  const openTextFileModal = async () => {
    try {
      const response = await fetch(`${rootTextFilesPath}/${comment.textFileName}`, {
        method: "GET",
        credentials: "include",
      });
      const text = await response.text();
      setTextFileContent(text);
      setIsTextModalOpen(true);
    } catch (err) {
      console.error("Failed to load text file:", err);
    }
  };


  const handleLoadChildren = async () => {
    if (isOpenChildrenSection) {
      setIsOpenChildrenSection(false);
      return;
    }

    setIsOpenChildrenSection(true);
    setLoading(true);
    setFetchError(false);

    const replies = await loadChildrenComments(comment.id);
    if (!replies) {
      setFetchError(true);
    }

    setLoading(false);
  };

  return (
    <div className="comment-container">

      {lightboxOpen && (
        <Lightbox
          open={lightboxOpen}
          close={() => setLightboxOpen(false)}
          slides={[
            {
              src: `${rootImageFilesPath}/${comment.imageFileName}`,
              alt: 'image-file',
            },
          ]}
        />
      )}

      {isTextModalOpen && (
        <button className="text-modal-overlay" onClick={() => setIsTextModalOpen(false)}>
          <button className="text-modal" onClick={(e) => e.stopPropagation()}>
            <div className="text">
              <h3>File content</h3>
              <pre className="text-modal-content">{textFileContent}</pre>
              <button className="close-btn" onClick={() => setIsTextModalOpen(false)}>
                <IoCloseSharp />
              </button>
            </div>
          </button>
        </button>
      )}


      <div className="comment-meta">
        <div className="avatar-and-user">
          <Avatar
            size={40}
            name={comment.user?.email}
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
          onClick={handleLoadChildren}
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
        <p
          dangerouslySetInnerHTML={{ __html: comment.text }} // (!!!)
          className='text'></p>

        {(comment.imageFileName || comment.textFileName) && (
          <div className="file-previews">
            {comment.imageFileName && (
              <button className="image-block" onClick={handleImageClick}>
                <img
                  src={`${rootImageFilesPath}/${comment.imageFileName}`}
                  alt="image-file"
                  className="image-preview"
                />
              </button>
            )}

            {comment.textFileName && (
              <div className="text-file-link">
                <button onClick={openTextFileModal}>
                  <FaRegFileAlt />
                </button>
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

      {showForm &&
        <CommentForm
          parentCommentId={comment.id}
          setShowForm={setShowForm}
          setIsOpenChildrenSection={setIsOpenChildrenSection}
        />
      }

      {loading && <div className="spinner" aria-label="Loading spinner"></div>}
      {
        fetchError && (
          <p className="error-message">
            <FaWheelchair /> Error loading replies. Please try again later.
          </p>
        )
      }

      {
        isOpenChildrenSection &&
        Array.isArray(comment.replies) &&
        comment.replies.length > 0 && (
          <CommentThread comments={comment.replies} />
        )
      }

    </div >
  );
}

export default Comment;
