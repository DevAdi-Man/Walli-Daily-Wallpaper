import axios from 'axios';

const API_Key = '48648142-7099311e9bd6a5c1a6609bdff';
const apiUrl = `https://pixabay.com/api/?key=${API_Key}`;

const formaltURL = (param:any) => {
  let url = apiUrl + '&per_page=25&safesearch=true&editors_choice=true';
  if (!param) { return url; }
  let paramKeys = Object.keys(param);
  paramKeys.map(key => {
    let value = key == 'q' ? encodeURIComponent(param[key]) : param[key];
    url += `&${key}=${value}`;
  });
  console.log('final uri : ', url);
  return url;
};

export const apiCall = async (param:any) => {
  try {
    const response = await axios.get(formaltURL(param));
    const { data } = response;
    return { success: true, data };
  } catch (error: any) {
    console.error('get error : ', error.message);
    return { success: false, msg: error.message };
  }
};
