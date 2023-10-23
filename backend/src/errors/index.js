export class ApiError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;
  }
}

export class DbError extends Error {
  constructor(code, message) {
    super(message);
    this.name = 'DbError';
    this.code = code;
  }
}
