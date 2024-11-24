import axios from 'axios';

const API_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

const fetchImages = async (query, page = 1) => {
  const response = await axios.get('https://api.unsplash.com/search/photos', {
    params: {
      query,        
      page,         
      per_page: 12, 
    },
    headers: {
      Authorization: `Client-ID ${API_KEY}`, 
    },
  });
  return response.data; 
};

export default fetchImages;
