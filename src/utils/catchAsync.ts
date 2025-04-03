import { Request, Response, NextFunction } from 'express';

// This function takes the async function and catches errors automatically
const catchAsync = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next);
  };
};

export default catchAsync;