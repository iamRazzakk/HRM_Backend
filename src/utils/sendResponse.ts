import { Response } from 'express';

interface ResponseData {
  success: boolean;
  message: string;
  data?: any;
  errorMessages?: any;
}

export const sendResponse = (res: Response, statusCode: number, data: ResponseData) => {
  return res.status(statusCode).json(data);
};