import { API_URI } from './constants';

export function signOut(name: string) {
  const withoutHttp = API_URI.replace('https://', '');
  const modifiedUrl = withoutHttp.replace('/api/', '');
  alert('Fungerar inte än.');

  document.cookie = name + `=; expires=Thu, 01 Jan 1970 00:00:00 UTC; domain=.${modifiedUrl}; path=/;`;
  // window.location.reload();
}
