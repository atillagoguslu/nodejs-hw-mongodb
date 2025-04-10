import { Router } from 'express';

const rootRouter = Router();

rootRouter.get('/', (req, res) => {
  res.status(200).json({
    status: 200,
    message: 'Hello World',
    data: { 'Your lovely URL': 'https://youtu.be/dQw4w9WgXcQ' },
  });
});

export default rootRouter;
