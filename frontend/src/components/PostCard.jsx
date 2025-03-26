import { useNavigate } from 'react-router-dom';
import '../styles/PostCard.css';

const PostCard = ({ post }) => {
  const navigate = useNavigate();
  const authorName = post.author ? `${post.author.firstName} ${post.author.lastName}` : 'Autore sconosciuto';
  const authorImage = post.author?.profileImage || 
    `https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=${post.author?.firstName}+${post.author?.lastName}`;

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
        <p className="post-card-content">{post.content}</p>
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