import { useNavigate } from 'react-router-dom';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import '../styles/PostCard.css';

const PostCard = ({ post }) => {
  const navigate = useNavigate();
  const authorName = post.author ? `${post.author.firstName} ${post.author.lastName}` : 'Autore sconosciuto';
  const authorImage = post.author?.profileImage || 
    `https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=${post.author?.firstName}+${post.author?.lastName}`;

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

  // Funzione per troncare il contenuto HTML
  const truncateHTML = (html, maxLength = 150) => {
    const div = document.createElement('div');
    div.innerHTML = html;
    let text = div.textContent || div.innerText || '';
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  return (
    <div className="post-card" onClick={() => navigate(`/posts/${post._id}`)}>
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
          {truncateHTML(post.content)}
        </div>
        <div className="post-card-footer">
          <div className="post-card-author">
            <img 
              src={authorImage} 
              alt={authorName}
              className="post-card-author-image"
            />
            <span className="post-card-author-name">{authorName}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostCard;