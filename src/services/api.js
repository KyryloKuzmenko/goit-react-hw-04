import axios from "axios"

const ACCESS_KEY = 'sA9R9ZVaNwhyuHv6tWgTOkMsW4NV_fhwtV29nsOhneI';

export const requestImages = async (query, page) => {
    const response = await axios.get('https://api.unsplash.com/search/photos', {
      params: {
        client_id: ACCESS_KEY,
        query,
        page,
        per_page: 12,
        orientation: 'landscape',
      },
    });
    return response.data.results;
}