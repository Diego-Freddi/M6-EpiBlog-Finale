import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Container, Alert } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import api from '../utils/api';
import '../styles/EditPost.css';

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
                setPreviewUrl(post.cover);
            } catch (err) {
                setError('Errore nel caricamento del post');
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [id, user._id, navigate]);

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
                        <Form.Control
                            as="textarea"
                            className="textarea-content"
                            value={formData.content}
                            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                            placeholder="Scrivi il contenuto del tuo post..."
                            required
                        />
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

                    <button type="submit" className="edit-post-button">
                        Aggiorna Post
                    </button>
                </Form>
            </div>
        </Container>
    );
};

export default EditPost;