import axios from 'axios';

// Create a Food Data Central API server
export const foodDataCentralAPI = axios.create({
  baseURL: `https://api.nal.usda.gov/fdc/v1/search`
});

export const tasteDotCom = axios.create({
  baseURL: `https://www.taste.com.au/`
});
