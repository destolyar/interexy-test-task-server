class ApiError extends Error {
  status;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }

  static BadRequest(message: string) {
    return new ApiError(400, message);
  };

  static Forbidden(message: string) {
    return new ApiError(403, message);
  }

  static NotFound(message: string) {
    return new ApiError(404, message);
  };

  static Conflict(message: string) {
    return new ApiError(409, message)
  }

  static DatabaseUpdateError(message: string) {
    return new ApiError(502, message);
  };
};

export default ApiError;