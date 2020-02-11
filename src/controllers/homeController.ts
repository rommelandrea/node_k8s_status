import { Request, Response } from 'express';

const index = (req: Request, res: Response) => {
  res.json({ status: 'OK' });
};

export default index;
