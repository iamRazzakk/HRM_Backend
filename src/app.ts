import express, { Request, Response } from 'express';
import cors from 'cors';
import { StatusCodes } from 'http-status-codes';
import router from './router';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req: Request, res: Response) => {
  const date = new Date().toLocaleString();
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>HRM Server Status</title>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600&family=Roboto+Mono:wght@300&display=swap');
        
        body {
          background: #0f0f0f;
          color: #f0f0f0;
          font-family: 'Montserrat', sans-serif;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          margin: 0;
          overflow: hidden;
        }
        
        .container {
          text-align: center;
          padding: 2rem;
          border-radius: 12px;
          background: rgba(15, 23, 42, 0.8);
          box-shadow: 0 8px 32px rgba(0, 179, 119, 0.3);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(0, 255, 170, 0.2);
          max-width: 600px;
          animation: fadeIn 1.5s ease-in-out;
        }
        
        h1 {
          color: #00ffaa;
          font-size: 2.5rem;
          margin-bottom: 1rem;
          text-shadow: 0 0 10px rgba(0, 255, 170, 0.5);
          font-weight: 600;
        }
        
        .status {
          color: #00ffaa;
          font-family: 'Roboto Mono', monospace;
          font-size: 1.2rem;
          margin-bottom: 1.5rem;
        }
        
        .date {
          color: #94a3b8;
          font-family: 'Roboto Mono', monospace;
          font-size: 1rem;
        }
        
        .pulse {
          display: inline-block;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #00ffaa;
          box-shadow: 0 0 0 0 rgba(0, 255, 170, 0.7);
          animation: pulse 1.5s infinite;
          margin-right: 8px;
          vertical-align: middle;
        }
        
        @keyframes pulse {
          0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(0, 255, 170, 0.7); }
          70% { transform: scale(1); box-shadow: 0 0 0 10px rgba(0, 255, 170, 0); }
          100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(0, 255, 170, 0); }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>HRM Server is Running</h1>
        <p class="status">
          <span class="pulse"></span>
          Operational • All systems normal
        </p>
        <p class="date">${date}</p>
      </div>
    </body>
    </html>
  `);
});

app.use("/api/v1", router)

app.use((req, res) => {
  res.status(StatusCodes.NOT_FOUND).json({
    success: false,
    message: 'Not found',
    errorMessages: [
      {
        path: req.originalUrl,
        message: "API DOESN'T EXIST",
      },
    ],
  });
});

export default app;