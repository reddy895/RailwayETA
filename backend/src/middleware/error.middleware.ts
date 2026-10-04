import { Request, Response, NextFunction } from "express";
import { sendError } from "../utils/response";

// 404 Not Found Middleware
export function notFoundHandler(req: Request, res: Response): Response {
  return sendError(
    res,
    `The requested endpoint ${req.originalUrl} was not found on RailETA server.`,
    404,
    "ENDPOINT_NOT_FOUND"
  );
}

// Global Error Handler Middleware
export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  _next: NextFunction
): Response {
  // Never expose raw stack traces or internal environment variables
  const statusCode = err.statusCode || err.status || 500;
  let code = err.code || "INTERNAL_SERVER_ERROR";
  let message = err.message || "An unexpected railway service error occurred.";

  // Sanitize common external network / rate limit / authentication messages
  if (err.message?.includes("429") || err.status === 429) {
    code = "RATE_LIMIT_EXCEEDED";
    message = "Live railway requests are temporarily limited. Please wait a moment before trying again.";
  } else if (err.message?.includes("401") || err.message?.includes("403")) {
    code = "RAILWAY_AUTH_ERROR";
    message = "Railway service authentication issue. Please contact support.";
  } else if (err.code === "ECONNREFUSED" || err.code === "ETIMEDOUT") {
    code = "NETWORK_TIMEOUT";
    message = "Railway server connection timed out. Please try again.";
  }

  if (process.env.NODE_ENV !== "test") {
    console.error(`[Error Handler] [${code}] ${message}`, err.stack ? `\n${err.stack}` : "");
  }

  return sendError(res, message, statusCode, code);
}
