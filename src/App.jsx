import { useState, useEffect } from 'react';
import fetchImages from './api/fetchImages';
import SearchBar from './components/SearchBar/SearchBar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Loader from './components/Loader/Loader';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn';
import './App.css'; 

function App() {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState(''); 
  const [page, setPage] = useState(1); 
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(null); 
  const [totalImages, setTotalImages] = useState(0); 

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

  const loadMoreImages = async () => {
    try {
      setLoading(true);
      const nextPage = page + 1;
      const data = await fetchImages(query, nextPage);
      setImages((prevImages) => [...prevImages, ...data.results]);
      setPage(nextPage);

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
      {}
      <SearchBar onSubmit={handleSearch} />

      {}
      {error && <ErrorMessage message={error} />}
      <ImageGallery images={images} />

      {}
      {loading && <Loader />}

      {}
      {!loading && images.length > 0 && images.length < totalImages && (
        <LoadMoreBtn onClick={loadMoreImages} />
      )}
    </div>
  );
}

export default App;
