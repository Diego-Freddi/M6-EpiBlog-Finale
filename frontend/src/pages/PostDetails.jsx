import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import api from '../utils/api';
import Comments from '../components/Comments';
import LikeButton from '../components/LikeButton';
import '../styles/PostDetails.css';
import '../styles/LikeButton.css';

const PostDetails = () => {
    const [post, setPost] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();

    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                heading: {
                    levels: [1, 2]
                },
                bulletList: {
                    HTMLAttributes: {
                        class: 'bullet-list'
                    },
                    keepMarks: true,
                    keepAttributes: false,
                },
                orderedList: {
                    HTMLAttributes: {
                        class: 'ordered-list'
                    },
                    keepMarks: true,
                    keepAttributes: false,
                },
                paragraph: {
                    HTMLAttributes: {
                        class: 'paragraph'
                    }
                }
            }),
            Image.configure({
                inline: true,
                allowBase64: true,
                HTMLAttributes: {
                    class: 'post-image'
                }
            }),
            Link.configure({
                openOnClick: true,
                HTMLAttributes: {
                    rel: 'noopener noreferrer',
                    class: 'post-link'
                },
            }),
        ],
        content: '',
        editable: false,
        editorProps: {
            attributes: {
                class: 'post-editor-content'
            }
        }
    });

    useEffect(() => {
        const fetchPost = async () => {
            try {
                setLoading(true);
                const response = await api.get(`/posts/${id}`);
                setPost(response.data);
                if (editor && response.data.content) {
                    editor.commands.setContent(response.data.content);
                }
                setError(null);
            } catch (error) {
                console.error('Error fetching post:', error);
                setError('Errore nel caricamento del post');
            } finally {
                setLoading(false);
            }
        };
        fetchPost();
    }, [id, editor]);

    const handleDelete = async () => {
        if (window.confirm('Sei sicuro di voler eliminare questo post?')) {
            try {
                await api.delete(`/posts/${id}`);
                navigate('/my-posts');
            } catch (err) {
                setError('Errore durante l\'eliminazione del post');
            }
        }
    };

    // Verifica se l'utente è l'autore del post
    const isAuthor = user && post.author && user._id === post.author._id;

    if (loading) {
        return (
            <Container className="mt-5">
                <div className="post-details-loading">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Caricamento...</span>
                    </div>
                </div>
            </Container>
        );
    }

    if (error) {
        return (
            <Container className="mt-5">
                <div className="post-details-error">
                    {error}
                </div>
            </Container>
        );
    }

    return (
        <Container className="mt-5">
            {post && post._id && (
                <article className="post-details">
                    <div className="post-details-header">
                        <div className="d-flex justify-content-between align-items-start">
                            <h1 className="post-details-title">{post.title}</h1>
                            {isAuthor && (
                                <div className="post-details-actions">
                                    <Button 
                                        className="post-details-button edit primary-action"
                                        onClick={() => navigate(`/posts/edit/${post._id}`)}
                                    >
                                        Modifica
                                    </Button>
                                    <Button 
                                        className="post-details-button delete danger-action"
                                        onClick={handleDelete}
                                    >
                                        Elimina
                                    </Button>
                                </div>
                            )}
                        </div>
                        <div className="post-details-meta">
                            <span className="post-details-category">{post.category}</span>
                            <span className="post-details-read-time">
                                <i className="bi bi-clock"></i>
                                {post.readTime?.value} {post.readTime?.unit}
                            </span>
                        </div>
                    </div>

                    <div className="post-details-cover">
                        <img 
                            src={post.cover} 
                            alt={post.title}
                        />
                    </div>

                    <div className="post-details-content-wrapper">
                        <div className="post-details-author">
                            <img 
                                src={post.author?.profileImage || 
                                    `https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=${post.author?.firstName}+${post.author?.lastName}`}
                                alt={`${post.author?.firstName} ${post.author?.lastName}`}
                                className="post-details-author-image"
                            />
                            <div className="post-details-author-info">
                                <div className="post-details-author-name">
                                    {post.author?.firstName} {post.author?.lastName}
                                </div>
                            </div>
                        </div>
                        <div className="post-details-content">
                            <EditorContent editor={editor} />
                        </div>
                        <div className="post-details-footer">
                            <LikeButton postId={id} />
                        </div>
                    </div>

                    <Comments postId={id} />
                </article>
            )}
        </Container>
    );
};

export default PostDetails;