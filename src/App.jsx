import { useState, useEffect, useCallback, useMemo } from "react";
import Searchbar from "./components/Searchbar";
import ImageGallery from "./components/ImageGallery";
import Button from "./components/Button";
import Loader from "./components/Loader";
import Modal from "./components/Modal";
import { fetchImages } from "./services/api";

import "./App.css";

export default function App() {
  const [query, setQuery] = useState("");
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [modalImage, setModalImage] = useState(null);

  useEffect(() => {
    if (!query) return;

    const getImages = async () => {
      setLoading(true);
      try {
        const data = await fetchImages(query, page);
        setImages((prev) => [...prev, ...data]);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getImages();
  }, [query, page]);

  const handleSearch = useCallback((newQuery) => {
    setQuery(newQuery);
    setImages([]);
    setPage(1);
  }, []);

  const loadMore = useCallback(() => {
    setPage((prev) => prev + 1);
  }, []);

  const openModal = useCallback((url) => {
    setModalImage(url);
  }, []);

  const closeModal = useCallback(() => {
    setModalImage(null);
  }, []);

  // useMemo приклад
  const hasImages = useMemo(() => images.length > 0, [images]);

  return (
    <div>
      <Searchbar onSubmit={handleSearch} />

      <ImageGallery images={images} onClick={openModal} />

      {loading && <Loader />}

      {hasImages && !loading && <Button onClick={loadMore} />}

      {modalImage && <Modal image={modalImage} onClose={closeModal} />}
    </div>
  );
}