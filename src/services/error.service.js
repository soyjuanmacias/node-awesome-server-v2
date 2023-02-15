class ErrorApi extends Error {
  constructor(statusCode, msg) {
    super();
    this.message = msg;
    this.status = statusCode;
  }
}

export default ErrorApi;