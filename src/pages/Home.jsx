import React, { useState, useEffect } from 'react';
import MangaList from '../components/MangaList';
import { fetchMangas } from '../api';
import '../styles/Home.css';

const Home = () => {
  const [mangas, setMangas] = useState([]);

  useEffect(() => {
    const getMangas = async () => {
      try {
        const data = await fetchMangas();
        setMangas(data);
      } catch (error) {
        console.error("Failed to fetch mangas", error);
      }
    };

    getMangas();
  }, []);

  return (
    <div className="home">
      <div className="banner">
        <h2>Popüler Seriler</h2>
        <div className="popular-series">
          <img src="path_to_image.jpg" alt="Sex Stopwatch" />
          <div className="series-info">
            <h3>Sex Stopwatch</h3>
            <p>Merhaba, ezik Joo. Gizlice göğsüme ve küloduma mı baktın? Sıradan öğrenci, ezik Joo Ohyoung, seksi...</p>
            <button>Seri Sayfası</button>
          </div>
        </div>
      </div>
      <h2>Son Yayımlanan Bölümler</h2>
      <MangaList mangas={mangas} />
    </div>
  );
};

export default Home;