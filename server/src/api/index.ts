import axios from 'axios';

// Create Food Data Central API manager
export const foodDataCentralAPI = axios.create({
  baseURL: `https://api.nal.usda.gov/fdc/v1/search`
});
// Create Taste.com.au website manager
export const tasteDotCom = axios.create({
  baseURL: `https://www.taste.com.au/`
});
