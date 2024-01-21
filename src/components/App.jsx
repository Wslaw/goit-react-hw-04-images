import React, { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';
import pixabayApi from './pixabayApi';


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
        {/* {images.length > 0 && this.state.total > images.length && (
          <Button onLoadMore={this.handleLoadMore} type="button" />
        )} */}
        {canLoadMore && images.length > 0 && total > images.length && (
          <Button onLoadMore={this.handleLoadMore} type="button" />
        )}{' '}
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

export default App;
