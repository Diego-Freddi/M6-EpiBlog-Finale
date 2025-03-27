import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Alert, Image, Modal } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import '../styles/Profile.css';

const Profile = () => {
  const { user, login } = useAuth();
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || ''
    // currentPassword: '',
    // newPassword: '',
    // confirmPassword: ''
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [error, setError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [success, setSuccess] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(
    user?.profileImage || `https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=${user?.firstName}+${user?.lastName}`
  );

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handlePasswordChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('firstName', formData.firstName);
      formDataToSend.append('lastName', formData.lastName);
      
      // Aggiungi l'immagine solo se è stata modificata
      if (profileImage) {
        formDataToSend.append('profileImage', profileImage);
      }

      const response = await axios.put(
        `http://localhost:5020/api/users/${user._id}`, 
        formDataToSend,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      login(response.data); // Aggiorna i dati dell'utente nel context
      setSuccess('Profilo aggiornato con successo');
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Errore durante aggiornamento del profilo');
      setSuccess('');
    }
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    try {
      if (passwordData.newPassword !== passwordData.confirmPassword) {
        setPasswordError('Le password non coincidono');
        return;
      }

      await axios.put(`http://localhost:5020/api/users/${user._id}/password`, {
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword
      });

      setSuccess('Password aggiornata con successo');
      setPasswordError('');
      setShowPasswordModal(false);
      
      // Resetta i campi password
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    } catch (err) {
      setPasswordError(err.response?.data?.message || 'Errore durante aggiornamento della password');
    }
  };

  return (
    <div className="profile-container">
      <h1 className="profile-title">Il Tuo Profilo</h1>
      
      {error && (
        <Alert variant="danger" className={`alert alert-danger`}>
          {error}
        </Alert>
      )}
      {success && (
        <Alert variant="success" className={`alert alert-success`}>
          {success}
        </Alert>
      )}

      <div className="profile-image-container">
        <img
          src={previewUrl}
          alt="Profile"
          className="profile-page-image"
        />
        <input 
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          style={{ display: 'none' }}
          id="profileImageInput"
        />
        <button
          onClick={() => document.getElementById('profileImageInput').click()}
          className="profile-image-button"
        >
          Cambia Avatar
        </button>
      </div>

      <Form className="profile-form" onSubmit={handleProfileUpdate}>
        <Form.Group className="form-group">
          <Form.Label className="form-label">Nome</Form.Label>
          <Form.Control
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="form-control"
          />
        </Form.Group>

        <Form.Group className="form-group">
          <Form.Label className="form-label">Cognome</Form.Label>
          <Form.Control
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="form-control"
          />
        </Form.Group>

        <Form.Group className="form-group">
          <Form.Label className="form-label">Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="form-control"
            disabled
          />
        </Form.Group>

        <div className="d-flex justify-content-between">
          <Button type="submit" className="profile-button">
            Salva Modifiche
          </Button>
          <Button
            variant="danger"
            onClick={() => setShowPasswordModal(true)}
            className="profile-button secondary"
          >
            Modifica Password
          </Button>
        </div>
      </Form>

      {/* Modal per la modifica della password */}
      <Modal show={showPasswordModal} onHide={() => setShowPasswordModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Modifica Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {passwordError && <Alert variant="danger">{passwordError}</Alert>}
          <Form onSubmit={handlePasswordUpdate}>
            <Form.Group className="mb-3">
              <Form.Label className="text-dark">Password Attuale</Form.Label>
              <Form.Control
                type="password"
                name="currentPassword"
                value={passwordData.currentPassword}
                onChange={handlePasswordChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="text-dark">Nuova Password</Form.Label>
              <Form.Control
                type="password"
                name="newPassword"
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="text-dark">Conferma Nuova Password</Form.Label>
              <Form.Control
                type="password"
                name="confirmPassword"
                value={passwordData.confirmPassword}
                onChange={handlePasswordChange}
                required
              />
            </Form.Group>

            <div className="d-grid">
              <Button variant="primary" type="submit">
                Aggiorna Password
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Profile;