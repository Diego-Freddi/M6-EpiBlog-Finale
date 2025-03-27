import {useState} from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Form, Container, Row, Col, Alert } from "react-bootstrap";
import Select from 'react-select';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import api from "../utils/api";
import '../styles/CreatePost.css';

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

const CreatePost = () => {
    const [formData, setFormData] = useState({
        title: "",
        category: "",
        cover: "",
        content: "",
        readTime: {
            value: "",
            unit: "minuti"
        }
    });

    const [coverImage, setCoverImage] = useState(null);
    const [previewUrl, setPreviewUrl] = useState("");
    const [error, setError] = useState("");
    const { user } = useAuth();
    const navigate = useNavigate();

    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                heading: {
                    levels: [1, 2]
                }
            }),
            Image.configure({
                inline: true,
                allowBase64: true,
            }),
            Link.configure({
                openOnClick: false,
                HTMLAttributes: {
                    rel: 'noopener noreferrer',
                    class: 'text-blue-500 underline',
                },
            }),
        ],
        content: '',
        onUpdate: ({ editor }) => {
            const html = editor.getHTML();
            setFormData(prev => ({
                ...prev,
                content: html
            }));
        },
    });

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
            if (!user || !user._id) {
                setError('Devi essere autenticato per creare un post');
                return;
            }
    
            if (!coverImage) {
                setError('L\'immagine di copertina è obbligatoria');
                return;
            }
    
            const formDataToSend = new FormData();
            formDataToSend.append('title', formData.title);
            formDataToSend.append('category', formData.category);
            formDataToSend.append('content', formData.content);
            formDataToSend.append('readTime', JSON.stringify({
                value: parseInt(formData.readTime.value),
                unit: formData.readTime.unit
            }));
            formDataToSend.append('author', user._id);
            formDataToSend.append('cover', coverImage);
    
            const response = await api.post(
                "/posts", 
                formDataToSend,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );
    
            if (response.data) {
                navigate("/");
            }
        } catch (err) {
            console.error('Errore:', err);
            setError(err.response?.data?.message || 'Errore durante la creazione del post');
        }
    };

    const unitOptions = [
        { value: 'minuti', label: 'Minuti' },
        { value: 'ore', label: 'Ore' }
    ];

    return (
        <Container>
            <div className="create-post-container">
                <h1 className="create-post-title">Crea un nuovo post</h1>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={handleSubmit} className="create-post-form" encType="multipart/form-data">
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
                                Scegli un'immagine
                            </label>
                            <Form.Control
                                id="cover-image"
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                required
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
                                onChange={(e) => setFormData({ ...formData, readTime: { ...formData.readTime, value: e.target.value } })}
                                placeholder="Tempo di lettura"
                                required
                            />
                            <Select
                                value={unitOptions.find(option => option.value === formData.readTime.unit)}
                                onChange={(option) => setFormData({ 
                                    ...formData, 
                                    readTime: { ...formData.readTime, unit: option.value } 
                                })}
                                options={unitOptions}
                                className="react-select-container"
                                classNamePrefix="react-select"
                                isRequired
                            />
                        </div>
                    </Form.Group>
                    <button
                        type="submit"
                        className="create-post-button primary-action"
                    >
                        Pubblica Post
                    </button>
                </Form>
            </div>
        </Container>
    );
};

export default CreatePost;