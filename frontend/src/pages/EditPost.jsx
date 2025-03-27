import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Container, Alert } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import api from '../utils/api';
import '../styles/EditPost.css';

const MenuBar = ({ editor }) => {
    if (!editor) {
        return null;
    }

    return (
        <div className="menu-bar">
            <button
                onClick={() => editor.chain().focus().toggleBold().run()}
                className={editor.isActive('bold') ? 'is-active' : ''}
                title="Grassetto"
                type="button"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"></path>
                    <path d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"></path>
                </svg>
            </button>
            <button
                onClick={() => editor.chain().focus().toggleItalic().run()}
                className={editor.isActive('italic') ? 'is-active' : ''}
                title="Corsivo"
                type="button"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="19" y1="4" x2="10" y2="4"></line>
                    <line x1="14" y1="20" x2="5" y2="20"></line>
                    <line x1="15" y1="4" x2="9" y2="20"></line>
                </svg>
            </button>
            <button
                onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
                title="Titolo 1"
                type="button"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 12h16"></path>
                    <path d="M4 6h16"></path>
                    <path d="M4 18h12"></path>
                </svg>
            </button>
            <button
                onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
                title="Titolo 2"
                type="button"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 12h16"></path>
                    <path d="M4 18h12"></path>
                </svg>
            </button>
            <button
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={editor.isActive('bulletList') ? 'is-active' : ''}
                title="Lista puntata"
                type="button"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="8" y1="6" x2="21" y2="6"></line>
                    <line x1="8" y1="12" x2="21" y2="12"></line>
                    <line x1="8" y1="18" x2="21" y2="18"></line>
                    <line x1="3" y1="6" x2="3.01" y2="6"></line>
                    <line x1="3" y1="12" x2="3.01" y2="12"></line>
                    <line x1="3" y1="18" x2="3.01" y2="18"></line>
                </svg>
            </button>
            <button
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                className={editor.isActive('orderedList') ? 'is-active' : ''}
                title="Lista numerata"
                type="button"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="10" y1="6" x2="21" y2="6"></line>
                    <line x1="10" y1="12" x2="21" y2="12"></line>
                    <line x1="10" y1="18" x2="21" y2="18"></line>
                    <path d="M4 6h1v4"></path>
                    <path d="M4 10h2"></path>
                    <path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1"></path>
                </svg>
            </button>
        </div>
    );
};

const EditPost = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [coverImage, setCoverImage] = useState(null);
    const [previewUrl, setPreviewUrl] = useState("");
    const [formData, setFormData] = useState({
        title: '',
        category: '',
        cover: '',
        content: '',
        readTime: {
            value: '',
            unit: 'minuti'
        }
    });

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
        content: '',
        onUpdate: ({ editor }) => {
            setFormData(prev => ({
                ...prev,
                content: editor.getHTML()
            }));
        }
    });

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await api.get(`/posts/${id}`);
                const post = response.data;
                
                if (post.author._id !== user._id) {
                    navigate('/');
                    return;
                }

                setFormData({
                    title: post.title,
                    category: post.category,
                    cover: post.cover,
                    content: post.content,
                    readTime: post.readTime
                });

                if (editor && post.content) {
                    editor.commands.setContent(post.content);
                }

                setPreviewUrl(post.cover);
            } catch (err) {
                setError('Errore nel caricamento del post');
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [id, user._id, navigate, editor]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setCoverImage(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formDataToSend = new FormData();
            formDataToSend.append('title', formData.title);
            formDataToSend.append('category', formData.category);
            formDataToSend.append('content', formData.content);
            formDataToSend.append('readTime', JSON.stringify({
                value: parseInt(formData.readTime.value),
                unit: formData.readTime.unit
            }));

            // Aggiungi l'immagine solo se è stata modificata
            if (coverImage) {
                formDataToSend.append('cover', coverImage);
            }

            const response = await api.put(
                `/posts/${id}`, 
                formDataToSend,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );

            if (response.data) {
                navigate(`/posts/${id}`);
            }
        } catch (err) {
            console.error('Errore:', err);
            setError(err.response?.data?.message || 'Errore durante l\'aggiornamento del post');
        }
    };

    if (loading) return (
        <Container>
            <div className="edit-post-container">
                <div className="loading-container">Caricamento...</div>
            </div>
        </Container>
    );

    return (
        <Container>
            <div className="edit-post-container">
                <h1 className="edit-post-title">Modifica Post</h1>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={handleSubmit} className="edit-post-form">
                    <Form.Group className="form-group">
                        <Form.Label className="form-label">Titolo</Form.Label>
                        <Form.Control
                            type="text"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            placeholder="Inserisci il titolo del post..."
                            required
                        />
                    </Form.Group>

                    <Form.Group className="form-group">
                        <Form.Label className="form-label">Categoria</Form.Label>
                        <Form.Control
                            type="text"
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            placeholder="Inserisci la categoria..."
                            required
                        />
                    </Form.Group>

                    <Form.Group className="form-group">
                        <Form.Label className="form-label">Immagine di copertina</Form.Label>
                        <div className="file-input-wrapper">
                            <label className="file-input-button" htmlFor="cover-image">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                                    <polyline points="17 8 12 3 7 8"/>
                                    <line x1="12" y1="3" x2="12" y2="15"/>
                                </svg>
                                Cambia immagine
                            </label>
                            <Form.Control
                                id="cover-image"
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                            />
                        </div>
                        {previewUrl && (
                            <div className="image-preview">
                                <img 
                                    src={previewUrl} 
                                    alt="Preview" 
                                />
                            </div>
                        )}
                    </Form.Group>

                    <Form.Group className="form-group">
                        <Form.Label className="form-label">Contenuto</Form.Label>
                        <div className="editor-wrapper">
                            <MenuBar editor={editor} />
                            <EditorContent editor={editor} className="editor-content" />
                        </div>
                    </Form.Group>

                    <Form.Group className="form-group">
                        <Form.Label className="form-label">Tempo di lettura</Form.Label>
                        <div className="read-time-group">
                            <Form.Control
                                type="number"
                                value={formData.readTime.value}
                                onChange={(e) => setFormData({
                                    ...formData,
                                    readTime: { ...formData.readTime, value: parseInt(e.target.value) }
                                })}
                                placeholder="Tempo di lettura"
                                required
                            />
                            <Form.Select
                                value={formData.readTime.unit}
                                onChange={(e) => setFormData({
                                    ...formData,
                                    readTime: { ...formData.readTime, unit: e.target.value }
                                })}
                                required
                            >
                                <option value="minuti">Minuti</option>
                                <option value="ore">Ore</option>
                            </Form.Select>
                        </div>
                    </Form.Group>

                    <button
                        type="submit"
                        className="edit-post-button primary-action"
                    >
                        Salva Modifiche
                    </button>
                </Form>
            </div>
        </Container>
    );
};

export default EditPost;