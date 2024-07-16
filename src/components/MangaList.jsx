import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/MangaList.css';

const MangaList = ({ mangas }) => {
  return (
    <div className="manga-list">
      {mangas.map(manga => (
        <div key={manga.id} className="manga-item">
          <Link to={`/manga/${manga.id}`}>
            <img src={manga.cover_image} alt={manga.title} />
            <h2>{manga.title}</h2>
          </Link>
          <p>{manga.description}</p>
        </div>
      ))}
    </div>
  );
};

export default MangaList;