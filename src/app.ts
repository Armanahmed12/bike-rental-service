import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import notFound from './app/middlewares/notFound.js';
import globalErrorHandler from './app/middlewares/globalErrorHandler.js';
import cookieParser from 'cookie-parser';
import router from './app/routes/index.js';
import { BikeControllers } from './app/modules/bike/bike.controller.js';
const app: Application = express();

// middleware
app.use(cors());
app.use(express.json());

// ✅ Use cookie-parser middleware
app.use(cookieParser());
app.get('/', async (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.use('/api/bikes', BikeControllers.getAllBikes);
app.use('/api', router);

app.use(notFound);
app.use(globalErrorHandler);
export default app;
