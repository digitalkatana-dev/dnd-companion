import axios from 'axios';

const instance = axios.create({
	baseURL: 'https://api.open5e.com/v1',
});

export default instance;
