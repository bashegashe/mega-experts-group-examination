import { API_URI } from '../utils/constants';

const createRequest = (method: string, body?: string) => {
  return {
    method: `${method}`,
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    ...(body ? { body: body } : {}),
  };
};

const callApi = async (endpoint: string, method: string, body?: string, param?: string) => {
  const request = createRequest(method, body || undefined);

  let url = `${API_URI}${endpoint}`;

  if (param) url = `${API_URI}${endpoint}/${param}`;

  try {
    const response = await fetch(url, request);

    if (response.status === 204) {
      return { success: true };
    }

    const result = await response.json();

    if (result.status === false) {
      return { success: false, message: 'fail' };
    }

    return result;
  } catch (error) {
    return { success: false, message: 'error' };
  }
};

export const getMeetupsProfile = () => callApi('profile', 'GET');
export const postSignin = (body: string) => callApi('auth/login', 'POST', body);
export const postSignup = (body: string) => callApi('auth/register', 'POST', body);
