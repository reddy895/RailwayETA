import { Request, Response, NextFunction } from "express";
import { z, ZodError } from "zod";
import { sendError } from "../utils/response";

export const validateRequest = (schema: z.ZodSchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      return next();
    } catch (error) {
      if (error instanceof ZodError) {
        const issues = error.issues.map((i) => `${i.path.join(".")}: ${i.message}`).join(", ");
        return sendError(res, `Validation Error: ${issues}`, 400, "VALIDATION_ERROR", error.issues);
      }
      return sendError(res, "Invalid request payload", 400, "VALIDATION_ERROR");
    }
  };
};

// Custom validation schemas
export const trainNumberSchema = z.object({
  params: z.object({
    trainNumber: z
      .string()
      .trim()
      .regex(/^\d{5}$/, "Train number must be a 5-digit number"),
  }),
});

export const stationCodeSchema = z.object({
  params: z.object({
    stationCode: z
      .string()
      .trim()
      .min(2, "Station code must be at least 2 characters")
      .max(10, "Station code must not exceed 10 characters"),
  }),
});

export const pnrSchema = z.object({
  params: z.object({
    pnr: z
      .string()
      .trim()
      .regex(/^\d{10}$/, "PNR must be exactly 10 digits"),
  }),
});
