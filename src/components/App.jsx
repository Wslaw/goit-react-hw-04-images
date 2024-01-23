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
  const [hasLoadedMore, setHasLoaderMore] = useState(false);
  const [canLoadMore, setCanLoadMore] = useState(true);
  const [error, setError] = useState(null);

useEffect(async ()=>{
  const fetchImages = async ()=> {
    setSearch({ isLoading: true });

    try {
      const response = await pixabayApi.fetchImages(search, page);
          const { totalHits } = response;
  
      setSearch(prevState => ({
        images: [...prevState.images, ...response.hits],
        total: totalHits,
        canLoadMore: page < Math.ceil(totalHits / 12),
      }));
    } catch (error) {
      console.error('Error fetching images:', error);
    } finally {
      setSearch({ isLoading: false });
    }
  }
  fetchImages();
},[])

  const handleSearchSubmit = async search => {
    await setSearch({
      search,
      images: [],
      page: 1,
    });

    fetchImages();
  };

  const handleLoadMore = () => {
    setIsLoading(
      prevState => ({ page: prevState.page + 1 }),
      () => {
        fetchImages();
        setHasLoaderMore({ hasLoadedMore: true }); // Устанавливаем флаг после загрузки
      }
    );
  };

  const handleImageClick = image => {
    setSelectedImage({
      showModal: true,
      selectedImage: image.largeImageURL,
    });
  };

 const handleModalClose = () => {
    setShowModal({
      showModal: false,
      selectedImage: '',
    });
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setHasLoaderMore({ hasLoadedMore: false }); // Сбрасываем флаг после возвращения к началу
  };

 
 return (
   <div className="App">
     <Searchbar onSubmit={handleSearchSubmit} />
     <ImageGallery images={images} onImageClick={handleImageClick} />
     {isLoading && <Loader />}

     {canLoadMore && images.length > 0 && total > images.length && (
       <Button onLoadMore={handleLoadMore} type="button" />
     )}
     {showModal && (
       <Modal image={selectedImage} onClose={handleModalClose} />
     )}
     {hasLoadedMore && window.scrollY > 0 && (
       <button className="Button" onClick={handleScrollToTop}>
         Scroll to Top
       </button>
     )}
   </div>
 );

}


export default App;
/*
class App extends Component {
  state = {
    search: '',
    images: [],
    page: 1,
    isLoading: false,
    showModal: false,
    selectedImage: '',
    hasLoadedMore: false,
    canLoadMore: true,
  };

  handleSearchSubmit = async search => {
    await this.setState({
      search,
      images: [],
      page: 1,
    });

    this.fetchImages();
  };

  handleLoadMore = () => {
    this.setState(
      prevState => ({ page: prevState.page + 1 }),
      () => {
        this.fetchImages();
        this.setState({ hasLoadedMore: true }); // Устанавливаем флаг после загрузки
      }
    );
  };

  handleImageClick = image => {
    this.setState({
      showModal: true,
      selectedImage: image.largeImageURL,
    });
  };

  handleModalClose = () => {
    this.setState({
      showModal: false,
      selectedImage: '',
    });
  };

  fetchImages = async () => {
    const { search, page } = this.state;
    this.setState({ isLoading: true });

    try {
      const response = await pixabayApi.fetchImages(search, page);
          const { totalHits } = response;

      this.setState(prevState => ({
        images: [...prevState.images, ...response.hits],
        total: totalHits,
        canLoadMore: page < Math.ceil(totalHits / 12),
      }));
    } catch (error) {
      console.error('Error fetching images:', error);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.setState({ hasLoadedMore: false }); // Сбрасываем флаг после возвращения к началу
  };

  componentDidUpdate(_, prevState) {
    const { search, page } = this.state;
    if (search && (search !== prevState.search || page !== prevState.page)) {
      this.fetchImages();
    }
  }

  render() {
    const { images, isLoading, showModal,total, selectedImage,canLoadMore, hasLoadedMore } =
      this.state;

    return (
      <div className="App">
        <Searchbar onSubmit={this.handleSearchSubmit} />
        <ImageGallery images={images} onImageClick={this.handleImageClick} />
        {isLoading && <Loader />}
      
        {canLoadMore && images.length > 0 && total > images.length && (
          <Button onLoadMore={this.handleLoadMore} type="button" />
        )}
        {showModal && (
          <Modal image={selectedImage} onClose={this.handleModalClose} />
        )}
        {hasLoadedMore && window.scrollY > 0 && (
          <button className="Button" onClick={this.handleScrollToTop}>
            Scroll to Top
          </button>
        )}
      </div>
    );
  }
}
*/

