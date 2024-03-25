import axios from 'axios';

export const baseURL = 'http://localhost:1337/api';

// Generic axios requests utility
export const request = async (url: string, body: any = {}, type = 'GET') => {
  try {
    // constants options
    let perms: any = {
      url: `${baseURL}${url}`,
      method: `${type}`,
      responseType: 'json'
    }

    // if request using params
    if (body.params) perms.params = body.params;

    // if request sends in data
    if (body.data) perms.data = body.data;

    const { data } = await axios(perms)
    
    return data
  }
  catch(err: Error | any) {
    throw new Error(`${err.code}: ${err.message}`);
  }
};

export const apiGet = async (url: string, data: any) => await request(url, data, 'GET')