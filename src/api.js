const API_BASE_URL = "http://192.168.1.3:8004";
const COMMENT_API_BASE_URL = "http://192.168.1.3:8005";

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

export const fetchChapterImagesByNumber = async (mangaId, chapterNumber) => {
  try {
    const response = await fetch(`${API_BASE_URL}/manga/${mangaId}/chapter/${chapterNumber}/images`);
    if (!response.ok) {
      throw new Error(`Failed to fetch images for chapter number ${chapterNumber} of manga with id ${mangaId}`);
    }
    const data = await response.json();
    return data.images;
  } catch (error) {
    console.error(error);
    throw error;
  }
};


export const fetchCategories = async () => {
try {
    const response = await fetch(`${API_BASE_URL}/category`);
    if (!response.ok) {
        throw new Error("Failed to fetch categories");
    }
    return await response.json();
    } catch (error) {
    console.error(error);
    throw error;
    }
};

export const fetchLatestChapters = async (limit = 6) => {
    try {
        const response = await fetch(`${API_BASE_URL}/latest-chapters?limit=${limit}`);
        if (!response.ok) {
            throw new Error("Failed to fetch categories");
        }
        return await response.json();
        } catch (error) {
        console.error(error);
        throw error;
        }
  };

  export const registerUser = async (userData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      if (!response.ok) {
        throw new Error("Registration failed");
      }
      return await response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  
  export const loginUser = async (loginData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams(loginData),
      });
      if (!response.ok) {
        throw new Error("Login failed");
      }
      return await response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  };


  export const fetchComments = async (mangaId) => {
    try {
      const response = await fetch(`${COMMENT_API_BASE_URL}/comments?manga_id=${mangaId}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch comments for manga with id ${mangaId}`);
      }
      return await response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  
  export const createComment = async (comment) => {
    try {
        console.log(comment)
      const response = await fetch(`${COMMENT_API_BASE_URL}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(comment),
      });
      if (!response.ok) {
        throw new Error("Failed to create comment");
      }
      return await response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  };