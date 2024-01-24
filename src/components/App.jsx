import React, { useState, useEffect } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';
import pixabayApi from './pixabayApi';

const App = () => {
  const [search, setSearch] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [hasLoadedMore, setHasLoadedMore] = useState(false);
  const [canLoadMore, setCanLoadMore] = useState(true);
  const [total, setTotal] = useState(0);
  const [prevSearch, setPrevSearch] = useState('');
  const [prevPage, setPrevPage] = useState(0);

  const handleSearchSubmit = async search => {
    setSearch(search);
    setImages([]);
    setPage(1);
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
    setHasLoadedMore(true);
  };

  const handleImageClick = image => {
    setShowModal(true);
    setSelectedImage(image.largeImageURL);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setSelectedImage('');
  };

  const fetchImages = async () => {
    setIsLoading(true);
    try {
      const response = await pixabayApi.fetchImages(search, page);
      const { totalHits } = response;

      setImages(prevImages => [...prevImages, ...response.hits]);
      setTotal(totalHits);
      setCanLoadMore(page < Math.ceil(totalHits / 12));
    } catch (error) {
      console.error('Error fetching images:', error);
    } finally {
      setIsLoading(false);
      setHasLoadedMore(true);
    }
  };

  // useEffect(() => {
  //   if (!search) return;

  //   fetchImages();
  //   setPrevSearch(search);
  //   setPrevPage(page);
  // }, [search, page]);

  useEffect(() => {
    if (!search) return;

    const fetchImages = async () => {
      setIsLoading(true);
      try {
        const response = await pixabayApi.fetchImages(search, page);
        const { totalHits } = response;

        setImages(prevImages => [...prevImages, ...response.hits]);
        setTotal(totalHits);
        setCanLoadMore(page < Math.ceil(totalHits / 12));
      } catch (error) {
        console.error('Error fetching images:', error);
      } finally {
        setIsLoading(false);
        setHasLoadedMore(true);
      }
    };

    fetchImages();
    setPrevSearch(search);
    setPrevPage(page);
  }, [search, page]);

  
  useEffect(() => {
    const handleScrollToTop = () => {
      if (!hasLoadedMore && window.scrollY > 0) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setHasLoadedMore(false);
      }
    };

    window.addEventListener('scroll', handleScrollToTop);
    return () => {
      window.removeEventListener('scroll', handleScrollToTop);
    };
  }, [hasLoadedMore]);

  useEffect(() => {
    const fetchImages = async () => {
      setIsLoading(true);

      try {
        const response = await pixabayApi.fetchImages(search, page);
        const { totalHits } = response;

        setImages(prevImages => [...prevImages, ...response.hits]);
        setTotal(totalHits);
        setCanLoadMore(page < Math.ceil(totalHits / 12));
      } catch (error) {
        console.error('Error fetching images:', error);
      } finally {
        setIsLoading(false);
        setHasLoadedMore(true);
      }
    };

    if (search && (search !== prevSearch || page !== prevPage)) {
      setHasLoadedMore(false);
      fetchImages();
    }
  }, [search, page, prevSearch, prevPage]);

  return (
    <div className="App">
      <Searchbar onSubmit={handleSearchSubmit} />
      <ImageGallery images={images} onImageClick={handleImageClick} />
      {isLoading && <Loader />}
      {canLoadMore && images.length > 0 && total > images.length && (
        <Button onLoadMore={handleLoadMore} type="button" />
      )}
      {showModal && <Modal image={selectedImage} onClose={handleModalClose} />}
      {/* {hasLoadedMore && window.scrollY > 0 && (
        <button className="Button" onClick={() => setHasLoadedMore(false)}>
          Scroll to Top
        </button>
      )} */}
    </div>
  );
};

export default App;
