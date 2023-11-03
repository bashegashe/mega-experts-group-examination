import { sendResponse } from '@/responses';

const COOKIE_FLAGS = 'Path=/; HttpOnly; Secure; SameSite=None;';

export function getCookie(cookies, cookieName) {
  let cookieString;
  if (Array.isArray(cookies)) {
    cookieString = cookies.join(';');
  }
  cookieString = RegExp(`${cookieName}=[^;]+`).exec(cookieString);
  return decodeURIComponent(cookieString ? cookieString.toString().replace(/^[^=]+./, '') : '');
}

export function sendCookie(token, userId) {
  return sendResponse(200, { userId }, {
    'Set-Cookie': `token=${token}; ${COOKIE_FLAGS}`,
  });
}

export function sendDeleteCookie(cookieName = 'token') {
  return sendResponse(200, undefined, {
    'Set-Cookie': `${cookieName}=; ${COOKIE_FLAGS} Expires=Thu, 01 Jan 1970 00:00:00 GMT;`,
  });
}
