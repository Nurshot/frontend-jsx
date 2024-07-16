import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MangaList from '../components/MangaList';
import { fetchMangas, fetchLatestChapters } from '../api';
import { formatDistanceToNow } from 'date-fns';
import { tr } from 'date-fns/locale';
import '../styles/Home.css';

const Home = () => {
  const [mangas, setMangas] = useState([]);
  const [latestChapters, setLatestChapters] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getMangas = async () => {
      try {
        const data = await fetchMangas();
        setMangas(data);
      } catch (error) {
        console.error("Failed to fetch mangas", error);
      }
    };

    const getLatestChapters = async () => {
      try {
        const data = await fetchLatestChapters();
        setLatestChapters(data);
      } catch (error) {
        console.error("Failed to fetch latest chapters", error);
      }
    };

    getMangas();
    getLatestChapters();
  }, []);

  const formatDate = (date) => {
    return formatDistanceToNow(new Date(date), { addSuffix: true, locale: tr });
  };

  const handleChapterClick = (mangaId, chapterNumber) => {
    navigate(`/manga/${mangaId}/chapter/${chapterNumber}`);
  };

  return (
    <div className="home">
      <div className="banner">
        <h2>Popüler Seriler</h2>
        <div className="popular-series">
          <img src="path_to_image.jpg" alt="Se Stopwatch" />
          <div className="series-info">
            <h3>Se Stopwatch</h3>
            <p>Merhaba, ezik Joo. Gizlice göa mı baktın? Sıradan öğrenci, ezik Joo Ohyoung, </p>
            <button>Seri Sayfası</button>
          </div>
        </div>
      </div>

      <h2>Son Yayımlanan Bölümler</h2>
      <div className="latest-chapters">
        {latestChapters.map(chapter => (
          <div key={chapter.id} className="chapter-item" onClick={() => handleChapterClick(chapter.manga_id, chapter.chapter_number)}>
            <div className="chapter-info">
              <h3>{chapter.manga_title}</h3>
              <h4>Bölüm {chapter.chapter_number}</h4>
              <p>{formatDate(chapter.release_date)}</p>
            </div>
          </div>
        ))}
      </div>

      <h2>Son Yayımlanan Mangalar</h2>
      <MangaList mangas={mangas} />
    </div>
  );
};

export default Home;