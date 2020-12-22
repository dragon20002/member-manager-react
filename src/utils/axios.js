import axios from 'axios';

let $axios = null;

function BaseAxios() {
  if (!$axios) {
    $axios = axios.create({
      baseURL: `${process.env.REACT_APP_HOST}`,
      timeout: 10000,
      headers: {
        type: '',
        token: '',
      },
    });
  }

  return $axios;
}

export default BaseAxios;
