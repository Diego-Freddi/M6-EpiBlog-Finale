import { Container } from 'react-bootstrap';
import '../styles/Layout.css';

const Layout = ({ children }) => {
  return (
    <>
      <div className="body-jumbotron">
        <Container>
          <div className="body-jumbotron-content">
            <h1 className="body-jumbotron-title">Benvenuto su EpiBlog</h1>
            <p className="body-jumbotron-subtitle">
              Esplora le storie, condividi le tue esperienze e connettiti con altri appassionati di scrittura.
            </p>
          </div>
        </Container>
      </div>

      <main className="main-content">
        {children}
      </main>

      <footer className="body-footer">
        <Container>
          <div className="body-footer-content">
            <p className="body-footer-text">© 2024 EpiBlog. Tutti i diritti riservati.</p>
            <div className="body-footer-links">
              <a href="#" className="body-footer-link">Privacy</a>
              <a href="#" className="body-footer-link">Termini</a>
              <a href="#" className="body-footer-link">Contatti</a>
            </div>
          </div>
        </Container>
      </footer>
    </>
  );
};

export default Layout; 