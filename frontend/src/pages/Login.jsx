import { useState, useEffect } from "react";
import { Form, Button, Container, Row, Col, Alert, Card } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import api from "../utils/api";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/auth/login', { email, password });
            const { user, token } = response.data;
            login(user, token);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Errore durante il login');
        }
    };

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');
        const error = urlParams.get('error');
        
        if (error) {
            setError('Errore durante l\'autenticazione con Google');
            return;
        }
        
        if (token) {
            try {
                api.get('/auth/me', {
                    headers: { Authorization: `Bearer ${token}` }
                }).then(response => {
                    login(response.data.user, token);
                    navigate('/');
                }).catch(error => {
                    setError('Errore di autenticazione con Google');
                });
            } catch (error) {
                setError('Errore di autenticazione con Google');
            }
        }
    }, [login, navigate]);

    const handleGoogleLogin = () => {
        window.location.href = 'http://localhost:5020/api/auth/google';
    };

    return (
        <Container>
            <Row className="justify-content-md-center mt-5">
                <Col xs={12} md={6}>
                    <Card className="shadow-sm">
                        <Card.Body className="p-4">
                            <h2 className="text-center mb-4">Accedi</h2>
                            {error && <Alert variant="danger">{error}</Alert>}
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3" controlId="email">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control 
                                        type="email" 
                                        placeholder="Inserisci email" 
                                        value={email} 
                                        onChange={(e) => setEmail(e.target.value)} 
                                        className="py-2"
                                    />
                                </Form.Group>
                                <Form.Group className="mb-4" controlId="password">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control 
                                        type="password" 
                                        placeholder="Password" 
                                        value={password} 
                                        onChange={(e) => setPassword(e.target.value)} 
                                        className="py-2"
                                    />
                                </Form.Group>
                                <div className="d-grid gap-2 mb-3">
                                    <Button variant="primary" type="submit" size="lg" className="py-2">
                                        Accedi
                                    </Button>
                                </div>
                                <div className="text-center mb-3">
                                    <span className="text-muted">oppure</span>
                                </div>
                                <div className="d-grid gap-2">
                                    <Button 
                                        variant="outline-secondary" 
                                        onClick={handleGoogleLogin} 
                                        className="d-flex align-items-center justify-content-center py-2"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-google me-2" viewBox="0 0 16 16">
                                            <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z"/>
                                        </svg>
                                        Accedi con Google
                                    </Button>
                                </div>
                                <div className="text-center mt-4">
                                    <p className="mb-0">Non hai un account? <Link to="/register">Registrati</Link></p>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Login;