const API_BASE_URL = "http://localhost:8004";

export const fetchMangas = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/manga`);
    if (!response.ok) {
      throw new Error("Failed to fetch mangas");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchMangaById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/manga/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch manga with id ${id}`);
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};


  
  export const fetchChaptersByMangaId = async (mangaId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/manga/${mangaId}/chapters`);
      if (!response.ok) {
        throw new Error(`Failed to fetch chapters for manga with id ${mangaId}`);
      }
      return await response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
// Diğer API isteklerini burada ekleyebilirsiniz