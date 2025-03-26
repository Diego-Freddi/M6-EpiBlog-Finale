import {useState} from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Form, Container, Row, Col, Alert } from "react-bootstrap";
import api from "../utils/api";
import '../styles/CreatePost.css';

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
                                onChange={(e) => setFormData({ ...formData, readTime: { ...formData.readTime, value: e.target.value } })}
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
                    <button type="submit" className="create-post-button">
                        Crea Post
                    </button>
                </Form>
            </div>
        </Container>
    );
};

export default CreatePost;