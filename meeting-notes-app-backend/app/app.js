import cors from 'cors';
import express from 'express';
import initializeRoutes from './routes/index.js';
import mongoose from 'mongoose';
import models from './models/index.js';

const initialize = (app) => {
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded());
  mongoose.connect(process.env.MONGO_CONNECTION);
  initializeRoutes(app);
};

export default initialize;
