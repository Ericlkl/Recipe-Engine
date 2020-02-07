import { foodDataCentralAPI, tasteDotCom } from '../api';

export const identifyFruit = async (name: string) => {
  const res = await foodDataCentralAPI.get('/', {
    params: {
      api_key: process.env.DATA_CENTRAL_APIKEY,
      generalSearchInput: name
    }
  });

  console.log(res.data);
};
