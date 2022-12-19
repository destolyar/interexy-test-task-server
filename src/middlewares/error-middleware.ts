import type { NextFunction, Request, Response } from "express"
import type ApiError from "../exceptions/api-error";

const errorMiddleware = (err: ApiError, _req: Request, res: Response, _next: NextFunction) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || 'Something went wrong';
  res.status(errorStatus).json({
      success: false,
      status: errorStatus,
      message: errorMessage,
  })
}

export default errorMiddleware;