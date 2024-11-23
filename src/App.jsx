import React, { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar/SearchBar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Loader from "./components/Loader/Loader";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import ImageModal from "./components/ImageModal/ImageModal";
import axios from "axios";
import "./App.css";

const App = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [modalImage, setModalImage] = useState(null);

  const handleSearch = (newQuery) => {
    setQuery(newQuery);
    setPage(1);
    setImages([]);
  };

  useEffect(() => {
    if (!query) return;

    const fetchImages = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await axios.get(
          `https://api.unsplash.com/search/photos`,
          {
            params: {
              query,
              page,
              per_page: 12,
              client_id: "YOUR_UNSPLASH_API_KEY",
            },
          }
        );

        const newImages = response.data.results.map((img) => ({
          id: img.id,
          small: img.urls.small,
          large: img.urls.full,
          alt: img.alt_description,
        }));

        setImages((prevImages) => [...prevImages, ...newImages]);

        // Автоскрол після додавання нових зображень
        if (page > 1) {
          window.scrollBy({
            top: window.innerHeight / 1.5,
            behavior: "smooth",
          });
        }
      } catch (error) {
        setError("Something went wrong. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, [query, page]);

  const loadMore = () => setPage((prevPage) => prevPage + 1);

  const openModal = (image) => setModalImage(image);
  const closeModal = () => setModalImage(null);

  return (
    <div className="app">
      <SearchBar onSubmit={handleSearch} />
      {error && <ErrorMessage message={error} />}
      <ImageGallery images={images} onImageClick={openModal} />
      {isLoading && <Loader />}
      {images.length > 0 && !isLoading && <LoadMoreBtn onClick={loadMore} />}
      {modalImage && <ImageModal image={modalImage} onClose={closeModal} />}
    </div>
  );
};

export default App;

