import axios from  'axios';

const api = axios.create({
    baseURL: 'https://chamonebox.herokuapp.com/'
});

export default api; 