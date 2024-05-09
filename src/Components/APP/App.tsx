import { useEffect, useState } from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");

import "../APP/App.css";

import { Data, Photo } from "./App.types";

import ErrorMessage from "../ErrorMessage/ErrorMessage";
import SearchBar from "../SearchBar/SearchBar";
import Loader from "../Loader/Loader";
import ImageGallery from "../ImageGallery/ImageGallery";
import ImageModal from "../ImageModal/ImageModal";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import { searchPhoto } from "../services/api";

function App() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const [query, setQuery] = useState<string>("");

  const [page, setPage] = useState<number>(1);

  const [total, setTotal] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    if (!query) {
      return;
    }

    async function handleSearch(): Promise<void> {
      try {
        setIsLoading(true);
        const data: Data = await searchPhoto(query, page);

        setPhotos((prevPhotos) => [...prevPhotos, ...data.results]);
        setTotal(data.total);

        setIsLoading(false);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }

    handleSearch();
  }, [query, page]);

  const onSetPage = () => {
    setPage((prevState) => prevState + 1);
  };

  const totalPage = Math.ceil(total / 12);

  const searchInput = (query: string) => {
    setQuery(query);
    setPhotos([]);
    setPage(1);
  };

  const openModal = (photo: Photo) => {
    setSelectedImage(photo.urls.regular);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      {isError && <ErrorMessage />}
      <SearchBar onSubmit={searchInput} />
      {isLoading && <Loader />}
      <ImageGallery photos={photos} onImageClick={openModal} />
      <ImageModal
        imageUrl={selectedImage}
        isOpen={isModalOpen}
        onRequestClose={closeModal}
      />
      {photos.length > 0 && page < totalPage && (
        <LoadMoreBtn onIncrement={onSetPage} />
      )}
    </div>
  );
}

export default App;
