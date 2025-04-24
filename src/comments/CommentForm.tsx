import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import DOMPurify from 'dompurify';
import { apiPaths } from '../config/apiPaths';
import { useCommentsContext } from './commentsContext';

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
  parentCommentId?: number;
}

export default function CommentForm({ parentCommentId }: Readonly<CommentFormProps>) {
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

  const loadCaptcha = async () => {
    try {
      const response = await fetch(apiPaths.getCaptcha, {
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
  };


  useEffect(() => {
    loadCaptcha();
  }, []);

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
        alert(`Error: ${error.statusCode} - ${error.message}`);
        loadCaptcha();
      } else {
        alert('Comment successfully sent!');
        loadCaptcha();

        const newComment = await res.json();
        addComment(newComment);
      }
    } catch (e) {
      console.error(e);
      alert('There was an error when sending a comment.');
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
    const textarea = document.getElementById('text') as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = textarea.value.substring(start, end);
    const openTag = `<${tag}>`;
    const closeTag = `</${tag}>`;

    const newText = textarea.value.substring(0, start) + openTag + selectedText + closeTag + textarea.value.substring(end);
    textarea.value = newText;

    textarea.setSelectionRange(start + openTag.length, start + openTag.length + selectedText.length);

    const inputEvent = new Event('input', { bubbles: true });
    textarea.dispatchEvent(inputEvent);
  };


  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="hidden" value={parentCommentId} name="parentId" id="parentId" />

      <div>
        <label htmlFor='userName'>User Name</label>
        <input id='userName' {...register('userName', {
          required: true,
          pattern: /^[a-zA-Z0-9\s]+$/,
        })} />
        {errors.userName && <p> Only Latin letters, numbers and spaces are allowed.</p>}
      </div>

      <div>
        <label htmlFor='email'>Email</label>
        <input id='email' type="email" {...register('email', { required: true })} />
        {errors.email && <p>Email address is invalid.</p>}
      </div>

      <div>
        <label htmlFor='homePage'>Home Page</label>
        <input id='homePage' type="url" {...register('homePage')} />
      </div>

      <div>
        <label htmlFor='captcha'>CAPTCHA</label>
        <div>
          {captchaUrl === "" ? (
            <div className='spinner'></div>
          ) : (
            <>
              <img src={captchaUrl} alt="captcha" style={{ cursor: 'pointer' }} />
              <button type='button' className='btn btn-indigo' onClick={loadCaptcha}>
                {captchaUrl ? 'Reload captcha' : 'Load captcha'}
              </button>
            </>
          )}
        </div>
        <input {...register('captcha', { required: true })} />
        {errors.captcha && <p>Enter captcha.</p>}
      </div>

      <div>
        <label htmlFor='text'>Text</label>
        <textarea id='text' {...register('text', { required: true })}></textarea>
        <div>
          <button className='btn btn-indigo btn-sm' type="button" onClick={() => insertTag('strong')}>Bold</button>
          <button className='btn btn-indigo btn-sm' type="button" onClick={() => insertTag('i')}>Italic</button>
          <button className='btn btn-indigo btn-sm' type="button" onClick={() => insertTag('code')}>Code</button>
          <button className='btn btn-indigo btn-sm' type="button" onClick={() => insertTag('a')}>Link</button>
          <button className='btn btn-indigo btn-sm' type="button" onClick={handlePreview}>Preview</button>
        </div>
        {errors.text && <p>The field is required.</p>}
      </div>


      <div>
        <label htmlFor='imageFile'>Image File (jpg/png/gif)</label>
        <input id='imageFile' type="file" accept="image/*" {...register('imageFile', {
          validate: validateImage,
        })} />
        {errors.imageFile && <p>JPG, PNG or GIF only.</p>}
      </div>

      <div>
        <label htmlFor='textFile'>Text File (txt, до 100KB)</label>
        <input id='textFile' type="file" accept=".txt" {...register('textFile', {
          validate: validateTxt,
        })} />
        {errors.textFile && <p>Only.txt files up to 100KB.</p>}
      </div>

      <button type="submit">Send</button>

      <div>
        <h3>Preview:</h3>
        <div dangerouslySetInnerHTML={{ __html: previewText }}></div>
      </div>
    </form >
  );
}