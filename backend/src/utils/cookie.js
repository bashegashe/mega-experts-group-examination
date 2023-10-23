import { sendResponse } from '@/responses';

export function getCookie(cookies, cookieName) {
  let cookieString;
  if (Array.isArray(cookies)) {
    cookieString = cookies.join(';');
  }
  cookieString = RegExp(`${cookieName}=[^;]+`).exec(cookieString);
  return decodeURIComponent(cookieString ? cookieString.toString().replace(/^[^=]+./, '') : '');
}

export function sendCookie(token) {
  return sendResponse(200, undefined, {
    'Set-Cookie': `token=${token}; HttpOnly; Secure; SameSite=None;`,
  });
}
