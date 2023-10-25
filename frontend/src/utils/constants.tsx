export const BASE_URI = 'https://bashegashe.github.io/mega-experts-group-examination/';
// export const API_URI = 'https://1z1eshubtb.execute-api.eu-north-1.amazonaws.com/api/';

let cachedAPIURI: string | null = null;
const getAPIURI = () => {
  if (cachedAPIURI) return cachedAPIURI;
  const search = window.location.search;
  const params = new URLSearchParams(search);
  const api_uri = import.meta.env.VITE_APP_API_URL || params.get('api_url');
  cachedAPIURI = api_uri;
  return api_uri
} 

export const API_URI = getAPIURI();
