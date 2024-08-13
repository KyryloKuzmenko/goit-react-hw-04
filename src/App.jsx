import { useState } from 'react'
import './App.css'
import SearchBar from './components/SearchBar/SearchBar'
import Loader from './components/Loader/Loader'
import ImageGallery from './components/ImageGallery/ImageGallery'
import { requestImages } from './services/api'

function App() {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showLoadMore, setShowLoadMore] = useState(false);

  const fetchImages = async (searchQuery, page = 1) => {
    setIsLoading(true)
    try {
      const data = await requestImages(searchQuery, page);
      if (data.length > 0) {
        setImages((prevImages) => (page === 1 ? data : [...prevImages, ...data]));
        setShowLoadMore(data.length === 12);
      } else {
        setShowLoadMore(false);
      }
    } catch (error) {
      console.error('Error fetching images:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
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
      <SearchBar onSubmit={onSearch}/>
      {isLoading && <Loader />}
      <ImageGallery images={images} />
      {showLoadMore && !isLoading && (
        <button onClick={loadMore}>
          Load more
        </button>
      )}
    </>
  )
}

export default App
