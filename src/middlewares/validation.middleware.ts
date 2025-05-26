import { Request, Response, NextFunction } from 'express';
import { AnySchema } from 'joi';

interface ValidationOptions {
  source?: 'body' | 'params' | 'query';
  allowUnknown?: boolean;
}

export function validate(schema: AnySchema, options: ValidationOptions = {}) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { source = 'body', allowUnknown = false } = options;
    const { error, value } = schema.validate(req[source], {
      abortEarly: false,
      allowUnknown
    });

    if (error) {
      return res.status(400).json({
        errors: error.details.map(d => ({
          message: d.message,
          path: d.path
        }))
      });
    }

    req[source] = value;
    next();
  };
}