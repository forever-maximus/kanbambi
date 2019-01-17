let backendHost = '';
const hostname = window.location.hostname;

if (hostname === 'localhost') {
  backendHost = 'http://localhost:8080';
} else {
  backendHost = 'https://kanbambi.maxbrereton.com';
}

const API_ROOT = `${backendHost}/api`;

export default API_ROOT;