import { useNavigate } from 'react-router-dom';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import LikeButton from './LikeButton';
import ShareButton from './ShareButton';
import '../styles/PostCard.css';
import '../styles/LikeButton.css';

const PostCard = ({ post }) => {
  const navigate = useNavigate();
  const authorName = post.author ? `${post.author.firstName} ${post.author.lastName}` : 'Autore sconosciuto';
  const authorImage = post.author?.profileImage || 
    `https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=${post.author?.firstName}+${post.author?.lastName}`;

  const handleClick = (e) => {
    // Se il click è sul LikeButton o ShareButton, non navigare
    if (e.target.closest('.like-button') || e.target.closest('.share-button')) {
      e.stopPropagation();
      return;
    }
    navigate(`/posts/${post._id}`);
  };

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2]
        },
        bulletList: {
          HTMLAttributes: {
            class: 'bullet-list'
          }
        },
        orderedList: {
          HTMLAttributes: {
            class: 'ordered-list'
          }
        }
      }),
      Image.configure({
        inline: true,
        HTMLAttributes: {
          class: 'post-image'
        }
      }),
      Link.configure({
        openOnClick: true,
        HTMLAttributes: {
          class: 'post-link'
        }
      })
    ],
    content: post.content,
    editable: false,
    editorProps: {
      attributes: {
        class: 'post-card-editor-content'
      }
    }
  });

  if (!editor) {
    return null;
  }

  return (
    <div className="post-card" onClick={handleClick}>
      <img 
        src={post.cover} 
        alt={post.title}
        className="post-card-image"
      />
      <div className="post-card-body">
        <div className="post-card-header">
          <span className="post-card-category">{post.category}</span>
          <span className="post-card-read-time">{post.readTime.value} {post.readTime.unit}</span>
        </div>
        <h3 className="post-card-title">{post.title}</h3>
        <div className="post-card-content">
          <EditorContent editor={editor} />
        </div>
        <div className="post-card-footer">
          <div className="post-card-author-info">
            <div className="post-card-author">
              <img 
                src={authorImage} 
                alt={authorName}
                className="post-card-author-image"
              />
              <span className="post-card-author-name">{authorName}</span>
            </div>
            <div className="post-card-date">
              {new Date(post.createdAt).toLocaleDateString('it-IT', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </div>
          </div>
          <div className="post-card-actions">
            <ShareButton postId={post._id} title={post.title} />
            <LikeButton postId={post._id} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostCard;