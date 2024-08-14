import { useState } from 'react'
import './App.css'
import SearchBar from './components/SearchBar/SearchBar'
import Loader from './components/Loader/Loader'
import ImageGallery from './components/ImageGallery/ImageGallery'
import { requestImages } from './services/api'
import ImageModal from './components/ImageModal/ImageModal'
import { Toaster } from 'react-hot-toast';
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn'
import ErrorMessage from './components/ErrorMessage/ErrorMessage'
import NoResultsMessage from './components/NoResultsMessage/NoResultsMessage'

function App() {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showLoadMore, setShowLoadMore] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(false)
  const [searchWithoutResults, setSearchWithoutResults] = useState(false)

  let subtitle;

  const fetchImages = async (searchQuery, page = 1) => {
    setIsLoading(true)
    setErrorMessage(false)
    setSearchWithoutResults(false)
    setShowLoadMore(false)
    try {
      const data = await requestImages(searchQuery, page);
      if (data.length > 0) {
        setImages((prevImages) => (page === 1 ? data : [...prevImages, ...data]));
        setShowLoadMore(data.length === 12);
      } else {
        setShowLoadMore(false);
        setSearchWithoutResults(true)
      }
    } catch (error) {
      setErrorMessage(true);
    } finally {
      setIsLoading(false);
    }
  };

  const openModal = (image) => {
    setSelectedImage(image)
    setIsOpen(true);
  };

  const closeModal = () => {
     setIsOpen(false);
     setSelectedImage(null)
   }
  
  const onSearch = searchQuery => {
    setQuery(searchQuery);
    setImages([]);
    setPage(1);
    fetchImages(searchQuery, 1)
  };

  const loadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchImages(query, nextPage)
  }

  return (
    <>
      <SearchBar
        onSubmit={onSearch}/>
      {isLoading && <Loader />}
      {searchWithoutResults && <NoResultsMessage/>}
      {errorMessage ? (
        <ErrorMessage />
      ) : (
      <ImageGallery images={images} openModal={openModal}/>
      )}
      <LoadMoreBtn
        showLoadMore={showLoadMore}
        isLoading={isLoading}
        loadMore={loadMore}
      />
      {selectedImage && (
        <ImageModal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          image={selectedImage}
        />
      )}
      <Toaster />
    </>
  );
}

export default App;
