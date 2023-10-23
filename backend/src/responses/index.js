export function sendResponse(statusCode, response, extraHeaders = {}) {
  const responseObj = {
    statusCode,
    headers: {
      'Content-Type': 'application/json',
      ...extraHeaders,
    },
  };

  if (statusCode >= 200 && statusCode < 300) {
    responseObj.body = JSON.stringify({
      success: true,
      ...(response ? { data: response } : {}),
    });
  } else {
    responseObj.body = JSON.stringify({
      success: false,
      error: response || 'Something went wrong',
    });
  }

  return responseObj;
}
