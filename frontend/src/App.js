import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import NavBar from './components/Navbar';
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import CreatePost from './pages/CreatePost';
import MyPosts from './pages/MyPosts';
import Profile from './pages/Profile';
import PostDetails from './pages/PostDetails';
import EditPost from './pages/EditPost';

function App() {
  return (
    <Router>
      <AuthProvider>
        <ThemeProvider>
          <NavBar />
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/posts/create" element={<CreatePost />} />
              <Route path="/posts/:id" element={<PostDetails />} />
              <Route path="/my-posts" element={<MyPosts />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/posts/edit/:id" element={<EditPost />} />
            </Routes>
          </Layout>
        </ThemeProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;