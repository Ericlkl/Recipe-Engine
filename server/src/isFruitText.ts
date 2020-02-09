import path from 'path';

import { foodDataCentralAPI } from './api';
require('dotenv').config({ path: path.resolve(__dirname, '../', '.env') });

const test = async (name: string) => {
  const res = await foodDataCentralAPI.get('/', {
    params: {
      api_key: process.env.DATA_CENTRAL_APIKEY,
      generalSearchInput: name,
      pageNumber: 1,
      requireAllWords: true
    }
  });

  console.log(res.data);
};

test('pika');
