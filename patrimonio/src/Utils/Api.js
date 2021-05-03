const axios = require('axios');
//import axios from 'axios';
//const API_URL = process.env.API_URL || 'http://64.225.54.253:8080'
//const API_URL = process.env.API_URL || 'http://192.168.1.164:5000'
const API_URL = process.env.API_URL || 'http://64.225.54.253:5000'


export default axios.create({
  baseURL: API_URL
});
