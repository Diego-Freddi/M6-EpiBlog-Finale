import React, { useState, useEffect } from 'react';
import { Form, Button, Alert, ListGroup, Image } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import api from '../utils/api';

const Comments = ({ postId }) => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [error, setError] = useState('');
    const { user } = useAuth();
    

    const fetchComments = async () => {
        try {
            const response = await api.get(`/comments/post/${postId}`);
            setComments(response.data);
        } catch (error) {
            setError('Errore nel caricamento dei commenti');
        }
    };

    useEffect(() => {
        fetchComments();
    }, [postId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/comments', {
                content: newComment,
                author: user._id,
                post: postId
            });
            setComments([response.data, ...comments]);
            setNewComment('');
            setError('');
        } catch (error) {
            setError('Errore nella pubblicazione del commento');
        }
    };

    const handleDelete = async (commentId) => {
        try {
            await api.delete(`/comments/${commentId}`);
            setComments(comments.filter(comment => comment._id !== commentId));
        } catch (error) {
            setError('Errore nell\'eliminazione del commento');
        }
    };

    return (
        <div className="mt-5">
            <h4 className="comments-title">Commenti</h4>
            {error && <Alert variant="danger">{error}</Alert>}
            {user && (
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Control
                            as="textarea"
                            rows={3}
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="Scrivi un commento..."
                            required
                            className="comment-input"
                        />
                    </Form.Group>
                    <Button 
                        type="submit" 
                        className="comment-button primary-action"
                    >
                        Pubblica commento
                    </Button>
                </Form>
            )}
            <ListGroup className="mt-4 comments-list">
                {comments.map(comment => (
                    <ListGroup.Item key={comment._id} className="comment-item">
                        <div className="comment-content">
                            <div className="comment-header">
                                <Image
                                    src={comment.author.profileImage || `https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=${comment.author.firstName}+${comment.author.lastName}`}
                                    roundedCircle
                                    width={40}
                                    height={40} 
                                    className="comment-author-image"
                                />
                                <div className="comment-author-info">
                                    <div className="comment-author-name">
                                        {comment.author.firstName} {comment.author.lastName}
                                    </div>
                                    <div className="comment-date">
                                        {new Date(comment.createdAt).toLocaleString()}
                                    </div>
                                </div>
                            </div>
                            <div className="comment-text">
                                {comment.content}
                            </div>
                        </div>
                        {user && user._id === comment.author._id && (
                            <Button
                                variant="outline-danger"
                                size="sm"
                                className="danger-action"
                                onClick={() => handleDelete(comment._id)}>
                                Cancella
                            </Button>
                        )}
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </div>
    );
};

export default Comments;