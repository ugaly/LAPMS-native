// import api from '../services/api';

// const url = 'http://192.168.36.38:8000';

// export default url;


import api from '../services/api';

const originalBaseURL = api.defaults.baseURL;

// Remove '/api' from the baseURL if it exists
const url = originalBaseURL.replace('/api/', '');

export default url.replace(/^http?:\/\//, '');
