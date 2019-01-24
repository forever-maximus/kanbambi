let backendHost = '';
let wsAddress = '';
const hostname = window.location.hostname;

if (hostname === 'localhost') {
  backendHost = 'http://localhost:8080';
  wsAddress = 'ws://localhost:8081';
} else {
  backendHost = 'https://kanbambi.maxbrereton.com';
  wsAddress = 'wss://kanbambi.maxbrereton:8081.com';
}

const API_ROOT = `${backendHost}/api`;

export default API_ROOT;
export const websocketAddress = wsAddress;