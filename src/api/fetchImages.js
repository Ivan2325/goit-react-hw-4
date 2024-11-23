import axios from 'axios';

// Отримуємо ключ доступу з файлу .env
const API_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

// Функція для виконання запитів до Unsplash API
const fetchImages = async (query, page = 1) => {
  const response = await axios.get('https://api.unsplash.com/search/photos', {
    params: {
      query,        // ключове слово для пошуку
      page,         // номер сторінки
      per_page: 12, // кількість зображень на сторінку
    },
    headers: {
      Authorization: `Client-ID ${API_KEY}`, // Додаємо ключ доступу
    },
  });
  return response.data; // Повертаємо дані
};

export default fetchImages;
