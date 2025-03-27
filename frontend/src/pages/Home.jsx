import { useState, useEffect } from 'react';
import { Container, Row, Col, Pagination } from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom';
import api from '../utils/api';
import PostCard from '../components/PostCard';
import PageNavigation from '../components/PageNavigation';
import '../styles/Layout.css';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const search = searchParams.get('search');
        const queryString = new URLSearchParams({
          page: currentPage,
          limit: 9,
          ...(search && { search })
        }).toString();

        const response = await api.get(`/posts?${queryString}`);
        setPosts(response.data.posts);
        setTotalPages(response.data.totalPages);
        setError(null);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setError('Errore nel caricamento dei post');
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, [currentPage, searchParams]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchParams]);

  if (loading) {
    return (
      <Container>
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '400px' }}>
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Caricamento...</span>
          </div>
        </div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <PageNavigation 
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
      
      {posts.length > 0 ? (
        <>
          <Row className="g-4">
            {posts.map(post => (
              <Col key={post._id} xs={12} md={6} lg={4}>
                <PostCard post={post} />
              </Col>
            ))}
          </Row>

          {totalPages > 1 && (
            <div className="d-flex justify-content-center mt-5">
              <Pagination>
                <Pagination.Prev 
                  disabled={currentPage === 1} 
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} 
                />
                {[...Array(totalPages)].map((_, idx) => (
                  <Pagination.Item 
                    key={idx + 1} 
                    active={idx + 1 === currentPage} 
                    onClick={() => setCurrentPage(idx + 1)}
                  >
                    {idx + 1}
                  </Pagination.Item>
                ))}
                <Pagination.Next 
                  disabled={currentPage === totalPages} 
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} 
                />
              </Pagination>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-5">
          <h3 className="text-muted">Nessun post disponibile</h3>
          <p className="text-muted">Prova a modificare i tuoi criteri di ricerca</p>
        </div>
      )}
    </Container>
  );
};

export default Home;