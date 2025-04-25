import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import DOMPurify from 'dompurify';
import { apiPaths } from '../config/apiPaths';
import { useCommentsContext } from './commentsContext';
import { toast } from 'react-toastify';

import './css/CommentForm.css';
import MotionWrapper from '../motion/MotionWrapper';

const allowedTags = ['a', 'code', 'i', 'strong'];
const allowedAttrs = ['href', 'title'];

function sanitizeHTML(input: string) {
  return DOMPurify.sanitize(input, {
    ALLOWED_TAGS: allowedTags,
    ALLOWED_ATTR: allowedAttrs,
    RETURN_DOM: false,
  });
}

interface CommentFormData {
  userName: string;
  email: string;
  homePage?: string;
  captcha: string;
  text: string;
  imageFile?: FileList;
  textFile?: FileList;
}

interface CommentFormProps {
  parentCommentId?: number | null;
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
  setIsOpenChildrenSection?: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function CommentForm({
  parentCommentId,
  setShowForm,
  setIsOpenChildrenSection }: Readonly<CommentFormProps>) {
  const {
    register,
    handleSubmit,
    watch,
    // setValue,
    // control,
    formState: { errors },
  } = useForm<CommentFormData>();

  const { addComment } = useCommentsContext();

  const [captchaUrl, setCaptchaUrl] = useState<string>('');
  const [previewText, setPreviewText] = useState<string>('');

  const loadCaptcha = useCallback(async () => {
    try {
      const captchaUrl = parentCommentId
        ? `${apiPaths.getCaptcha}/${parentCommentId}`
        : `${apiPaths.getCaptcha}`;

      const response = await fetch(captchaUrl, {
        method: 'GET',
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to fetch CAPTCHA');
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setCaptchaUrl(url);
    } catch (error) {
      console.error('Error loading captcha:', error);
    }
  }, [parentCommentId]);


  useEffect(() => {
    loadCaptcha();
  }, [loadCaptcha]);

  useEffect(() => {
    return () => {
      if (captchaUrl.startsWith('blob:')) {
        URL.revokeObjectURL(captchaUrl);
      }
    };
  }, [captchaUrl]);


  const onSubmit = async (data: CommentFormData) => {
    const formData = new FormData();
    formData.append('User.UserName', data.userName);
    formData.append('User.Email', data.email);
    formData.append('User.HomePage', data.homePage ?? '');

    formData.append('Captcha', data.captcha);
    formData.append('Text', sanitizeHTML(data.text));

    if (parentCommentId) {
      formData.append('ParentId', parentCommentId.toString());
    }

    if (data.imageFile && data.imageFile.length > 0) {
      formData.append('ImageFile', data.imageFile[0]);
    }
    if (data.textFile && data.textFile.length > 0) {
      formData.append('TextFile', data.textFile[0]);
    }

    try {
      const res = await fetch(apiPaths.postComment, {
        method: 'POST',
        body: formData,
        credentials: 'include'
      });

      if (!res.ok) {
        const error = await res.json();
        toast.error(`Error: ${error.statusCode} - ${error.message}`);
        loadCaptcha();
      } else {
        toast.success('Comment successfully sent!');
        loadCaptcha();

        const newComment = await res.json();
        addComment(newComment);

        setShowForm(false);
        if (setIsOpenChildrenSection) {
          setIsOpenChildrenSection(true);
        }
      }
    } catch (e) {
      console.error(e);
      toast.error('There was an error when sending a comment.');
    }
  };

  const handlePreview = () => {
    const rawText = watch('text') || '';
    setPreviewText(sanitizeHTML(rawText));
  };

  const validateImage = (fileList?: FileList) => {
    if (!fileList || fileList.length === 0) return true;
    const file = fileList[0];
    return ['image/png', 'image/jpeg', 'image/gif'].includes(file.type);
  };

  const validateTxt = (fileList?: FileList) => {
    if (!fileList || fileList.length === 0) return true;
    const file = fileList[0];
    return file.type === 'text/plain' && file.size <= 102400;
  };

  const insertTag = (tag: string) => {
    const textarea = document.getElementById(`textArea${parentCommentId}`) as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = textarea.value.substring(start, end);
    const openTag = `<${tag}>`;
    const closeTag = `</${tag}>`;

    const newText = textarea.value.substring(0, start) +
      openTag +
      selectedText +
      closeTag +
      textarea.value.substring(end);

    textarea.value = newText;

    textarea.setSelectionRange(
      start + openTag.length,
      start + openTag.length + selectedText.length);

    const inputEvent = new Event('input', { bubbles: true });
    textarea.dispatchEvent(inputEvent);
  };


  return (
    <form className="comment-form" onSubmit={handleSubmit(onSubmit)}>
      <input
        type="hidden"
        value={parentCommentId ?? ''}
        name="parentId"
        id="parentId"
        className="comment-form__hidden"
      />

      <div className="comment-form__field">
        <input
          id="userName"
          type="text"
          className="comment-form__input"
          placeholder="Username"
          {...register('userName', {
            required: true,
            pattern: /^[a-zA-Z0-9\s]+$/,
          })}
        />
        <MotionWrapper animationType='slide'>
          {errors.userName && (
            <p className="comment-form__error">
              Only Latin letters, numbers and spaces are allowed.
            </p>
          )}
        </MotionWrapper>
      </div>

      <div className="comment-form__field">
        <input
          id="email"
          type="email"
          className="comment-form__input"
          placeholder="Email address"
          {...register('email', { required: true })}
        />
        <MotionWrapper animationType='slide'>
          {errors.email && (
            <p className="comment-form__error">Email address is invalid.</p>
          )}
        </MotionWrapper>
      </div>

      <div className="comment-form__field">
        <input
          id="homePage"
          type="url"
          className="comment-form__input"
          placeholder="Home Page"
          {...register('homePage')}
        />
      </div>

      <div className="comment-form__field">
        <MotionWrapper animationType='zoom'>
          {captchaUrl === '' ? (
            <div className="comment-form__spinner"></div>
          ) : (
            <div className="comment-form__captcha">
              <img
                src={captchaUrl}
                alt="captcha"
                className="comment-form__image"
              />
              <button
                type="button"
                className="comment-form__button"
                onClick={loadCaptcha}
              >
                {captchaUrl ? 'Reload captcha' : 'Load captcha'}
              </button>
            </div>
          )}
        </MotionWrapper>
        <input
          className="comment-form__input"
          placeholder="Captcha"
          type="text"
          {...register('captcha', { required: true })}
        />
        <MotionWrapper animationType='slide'>
          {errors.captcha && (
            <p className="comment-form__error">Enter captcha.</p>
          )}
        </MotionWrapper>
      </div>

      <div className="comment-form__toolbar">
        <button
          className="comment-form__toolbar-button"
          type="button"
          onClick={() => insertTag('strong')}
        >
          Bold
        </button>
        <button
          className="comment-form__toolbar-button"
          type="button"
          onClick={() => insertTag('i')}
        >
          Italic
        </button>
        <button
          className="comment-form__toolbar-button"
          type="button"
          onClick={() => insertTag('code')}
        >
          Code
        </button>
        <button
          className="comment-form__toolbar-button"
          type="button"
          onClick={() => insertTag('a')}
        >
          Link
        </button>
        <button
          className="comment-form__toolbar-button"
          type="button"
          onClick={handlePreview}
        >
          Preview
        </button>
      </div>

      <div className="comment-form__field">
        <textarea
          id={`textArea${parentCommentId}`}
          className="comment-form__textarea"
          placeholder="Comment text"
          {...register('text', { required: true })}
        ></textarea>
        <MotionWrapper animationType='slide'>
          {errors.text && (
            <p className="comment-form__error">The field is required.</p>
          )}
        </MotionWrapper>
      </div>

      <div className="comment-form__preview">
        <h3 className="comment-form__label">Preview:</h3>
        <div dangerouslySetInnerHTML={{ __html: previewText }}></div>
      </div>

      <div className="comment-form__field">
        <input
          id="imageFile"
          type="file"
          className="comment-form__file"
          accept="image/*"
          {...register('imageFile', { validate: validateImage })}
        />
        <MotionWrapper animationType='slide'>
          {errors.imageFile && (
            <p className="comment-form__error">JPG, PNG or GIF only.</p>
          )}
        </MotionWrapper>
      </div>

      <div className="comment-form__field">
        <input
          id="textFile"
          type="file"
          className="comment-form__file"
          accept=".txt"
          {...register('textFile', { validate: validateTxt })}
        />
        <MotionWrapper animationType='slide'>
          {errors.textFile && (
            <p className="comment-form__error">Only .txt files up to 100KB.</p>
          )}
        </MotionWrapper>
      </div>

      <button
        type="submit"
        className="comment-form__button"
      >
        Send
      </button>
    </form>
  );
}