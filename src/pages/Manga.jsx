import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchMangaById, fetchChaptersByMangaId, fetchComments, createComment } from '../api';
import { AuthContext } from '../AuthContext';
import { Button, Form } from 'react-bootstrap';
import { FaSortAmountDown, FaSortAmountUp, FaEye, FaHeart } from 'react-icons/fa';
import '../styles/Manga.css';

const Manga = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [manga, setManga] = useState(null);
  const [chapters, setChapters] = useState([]);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    if (id) {
      const getManga = async () => {
        try {
          const data = await fetchMangaById(id);
          setManga(data);
        } catch (error) {
          console.error(`Failed to fetch manga with id ${id}`, error);
        }
      };

      const getChapters = async () => {
        try {
          const data = await fetchChaptersByMangaId(id);
          setChapters(data);
        } catch (error) {
          console.error(`Failed to fetch chapters for manga with id ${id}`, error);
        }
      };

      const getComments = async () => {
        try {
          const data = await fetchComments(id);
          setComments(data);
        } catch (error) {
          console.error(`Failed to fetch comments for manga with id ${id}`, error);
        }
      };

      getManga();
      getChapters();
      getComments();
    }
  }, [id]);

  const handleChapterClick = (chapterNumber) => {
    navigate(`/manga/${id}/chapter/${chapterNumber}`);
  };

  const handleSort = () => {
    const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    const sortedChapters = [...chapters].sort((a, b) => {
      if (newSortOrder === 'asc') {
        return a.chapter_number - b.chapter_number;
      } else {
        return b.chapter_number - a.chapter_number;
      }
    });
    setSortOrder(newSortOrder);
    setChapters(sortedChapters);
  };

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const commentData = {
      user_id: user.id,
      manga_id: parseInt(id),
      username: user.username,
      text: newComment,
    };

    try {
      const createdComment = await createComment(commentData);
      setComments((prevComments) => [...prevComments, createdComment]);
      setNewComment('');
    } catch (error) {
      console.error('Failed to create comment', error);
    }
  };

  if (!manga) return <div>Loading...</div>;

  return (
    <div className="manga-detail-container">
      <div className="manga-header">
        <img src={manga.cover_image} alt={manga.title} className="manga-cover" />
        <div className="manga-info">
          <h1>{manga.title}</h1>
          <p>{manga.description}</p>
          <ul className="manga-details">
            <li><strong>Yazar:</strong> {manga.author}</li>
            <li><strong>Çizer:</strong> {manga.artist || 'Unknown'}</li>
            <li><strong>Dil:</strong> {manga.language || 'Unknown'}</li>
            <li><strong>Tür:</strong> {manga.genre || 'Unknown'}</li>
            <li><strong>Durum:</strong> {manga.status || 'Unknown'}</li>
            <li><strong>Yayıncı:</strong> {manga.publisher || 'Unknown'}</li>
            <li><strong>Çıkış Yılı:</strong> {manga.year || 'Unknown'}</li>
            <li><strong>Puan:</strong> {manga.rating || 'Unknown'}</li>
            <li><strong>Okunma:</strong> {manga.read_count}</li>
            <li><strong>Kategoriler:</strong> {manga.categories ? manga.categories.map(category => category.name).join(', ') : 'N/A'}</li>
          </ul>
          <div className="manga-buttons">
            <Button><FaHeart className="icon" /> Takip Et</Button>
            <Button><FaEye className="icon" /> Devam Et</Button>
          </div>
        </div>
      </div>
      <div className="manga-chapters">
        <h2>
          Chapters
          <Button className="sort-button" onClick={handleSort}>
            {sortOrder === 'asc' ? <FaSortAmountDown /> : <FaSortAmountUp />}
          </Button>
        </h2>
        <div className="chapters-list">
          {chapters.map((chapter) => (
            <div 
              key={chapter.id} 
              className="chapter-item" 
              onClick={() => handleChapterClick(chapter.chapter_number)}
            >
              <h3>{chapter.title}</h3>
              <p>Chapter Number: {chapter.chapter_number}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="manga-comments">
        <h2>Comments</h2>
        <div className="comments-list">
          {comments.map((comment) => (
            <div key={comment.id} className="comment-item">
              <p><strong>{comment.username}:</strong> {comment.text}</p>
              <small>{new Date(comment.created_at).toLocaleString()}</small>
            </div>
          ))}
        </div>
        <Form onSubmit={handleCommentSubmit} className="add-comment">
          <Form.Group controlId="commentText">
            <Form.Label>Add a comment:</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={newComment}
              onChange={handleCommentChange}
              placeholder="Write your comment here..."
            />
          </Form.Group>
          <Button type="submit">Submit</Button>
        </Form>
      </div>
    </div>
  );
};

export default Manga;