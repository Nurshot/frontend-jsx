import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMangaById, fetchChaptersByMangaId } from '../api';
import '../styles/Manga.css';

const Manga = () => {
  const { id } = useParams();
  const [manga, setManga] = useState(null);
  const [chapters, setChapters] = useState([]);

  useEffect(() => {
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

    getManga();
    getChapters();
  }, [id]);

  if (!manga) return <div>Loading...</div>;

  return (
    <div className="manga-detail">
      <h1>{manga.title}</h1>
      <p>{manga.description}</p>
      <h2>Bölümler</h2>
      <div className="chapters-list">
        {chapters.map(chapter => (
          <div key={chapter.id} className="chapter-item">
            <h3>{chapter.title}</h3>
            <p>Chapter Number: {chapter.chapter_number}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Manga;