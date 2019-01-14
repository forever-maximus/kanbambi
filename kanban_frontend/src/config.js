let backendHost = '';
const hostname = window.location.hostname;

if (hostname === 'localhost') {
  backendHost = 'http://localhost:8080';
} else {
  backendHost = 'http://172.104.162.144';
}

const API_ROOT = `${backendHost}/api`;

export default API_ROOT;