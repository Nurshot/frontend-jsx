import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchChapterImagesByNumber } from '../api';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import '../styles/Chapter.css';

const Chapter = () => {
  const { mangaId, chapterNumber } = useParams();
  const [images, setImages] = useState([]);
  const [showNavButtons, setShowNavButtons] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getChapterImages = async () => {
      try {
        const data = await fetchChapterImagesByNumber(mangaId, chapterNumber);
        setImages(data);
        window.scrollTo(0, 0);  // Sayfa yüklendiğinde en üste kaydırma
      } catch (error) {
        console.error("There was an error fetching the chapter images!", error);
      }
    };

    getChapterImages();
  }, [mangaId, chapterNumber]);

  const handleNextChapter = () => {
    navigate(`/manga/${mangaId}/chapter/${parseInt(chapterNumber, 10) + 1}`);
    window.scrollTo(0, 0);  // Sonraki bölüme geçildiğinde en üste kaydırma
  };

  const handlePreviousChapter = () => {
    if (parseInt(chapterNumber, 10) > 1) {
      navigate(`/manga/${mangaId}/chapter/${parseInt(chapterNumber, 10) - 1}`);
      window.scrollTo(0, 0);  // Önceki bölüme geçildiğinde en üste kaydırma
    }
  };

  const toggleNavButtons = () => {
    setShowNavButtons(!showNavButtons);
  };

  return (
    <div className="chapter-container" onClick={toggleNavButtons}>
      <div className="chapter-images">
        {images.map((image, index) => (
          <LazyLoadImage
            key={index}
            src={`data:image/png;base64,${image}`}
            alt={`Page ${index + 1}`}
            className="chapter-image"
            effect="blur"
          />
        ))}
      </div>
      {showNavButtons && (
        <div className="navigation-buttons">
          <button onClick={handlePreviousChapter} className="nav-button">&lt;</button>
          <button onClick={handleNextChapter} className="nav-button">&gt;</button>
        </div>
      )}
    </div>
  );
};

export default Chapter;