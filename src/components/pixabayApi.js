
import axios from 'axios';

const API_KEY = '40845730-59b552d3cf1577a71be805545';
const perPage = 12;

const fetchImages = async (search, page) => {
  try {
    const response = await axios.get('https://pixabay.com/api/', {
      params: {
        q: search,
        page,
        key: API_KEY,
        image_type: 'photo',
        orientation: 'horizontal',
        per_page: perPage,
      },
    });

    return {
      hits: response.data.hits,
      totalHits: response.data.totalHits,
    };
  } catch (error) {
    throw new Error('Error fetching images from Pixabay API');
  }
};

const pixabayApi = {
  fetchImages,
};

export default pixabayApi;
