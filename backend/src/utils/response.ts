import { Response } from "express";

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: any;
  };
  meta?: {
    source: string;
    timestamp: string;
    [key: string]: any;
  };
}

export function sendSuccess<T>(
  res: Response,
  data: T,
  statusCode: number = 200,
  extraMeta: Record<string, any> = {}
): Response {
  const payload: ApiResponse<T> = {
    success: true,
    data,
    meta: {
      source: "railkit",
      timestamp: new Date().toISOString(),
      ...extraMeta,
    },
  };
  return res.status(statusCode).json(payload);
}

export function sendError(
  res: Response,
  message: string,
  statusCode: number = 400,
  code: string = "RAILWAY_API_ERROR",
  details?: any
): Response {
  const payload: ApiResponse = {
    success: false,
    error: {
      code,
      message,
      ...(details ? { details } : {}),
    },
    meta: {
      source: "railkit",
      timestamp: new Date().toISOString(),
    },
  };
  return res.status(statusCode).json(payload);
}
