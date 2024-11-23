import { useState, useEffect } from 'react';
import fetchImages from './api/fetchImages';
import SearchBar from './components/SearchBar/SearchBar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Loader from './components/Loader/Loader';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn';
import './App.css'; // Загальні стилі для App

function App() {
  const [images, setImages] = useState([]); // Список зображень
  const [query, setQuery] = useState(''); // Ключове слово пошуку
  const [page, setPage] = useState(1); // Поточна сторінка
  const [loading, setLoading] = useState(false); // Індикатор завантаження
  const [error, setError] = useState(null); // Помилки
  const [totalImages, setTotalImages] = useState(0); // Загальна кількість зображень

  // Обробник пошуку
  const handleSearch = async (newQuery) => {
    if (newQuery.trim() === '') return;

    setQuery(newQuery);
    setPage(1);
    setImages([]);
    setError(null);

    try {
      setLoading(true);
      const data = await fetchImages(newQuery, 1);
      setImages(data.results);
      setTotalImages(data.total);
    } catch (err) {
      setError('Failed to fetch images. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Завантаження додаткових сторінок
  const loadMoreImages = async () => {
    try {
      setLoading(true);
      const nextPage = page + 1;
      const data = await fetchImages(query, nextPage);
      setImages((prevImages) => [...prevImages, ...data.results]);
      setPage(nextPage);

      // Автоскрол на нові рядки
      setTimeout(() => {
        window.scrollBy({
          top: window.innerHeight,
          behavior: 'smooth',
        });
      }, 500);
    } catch (err) {
      setError('Failed to load more images.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      {/* Пошуковий бар */}
      <SearchBar onSubmit={handleSearch} />

      {/* Галерея зображень */}
      {error && <ErrorMessage message={error} />}
      <ImageGallery images={images} />

      {/* Індикатор завантаження */}
      {loading && <Loader />}

      {/* Кнопка "Load More" */}
      {!loading && images.length > 0 && images.length < totalImages && (
        <LoadMoreBtn onClick={loadMoreImages} />
      )}
    </div>
  );
}

export default App;
