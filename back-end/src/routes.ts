import express from 'express';
import PointsController from './controllers/PointsController';
import ItemsController from './controllers/ItemsController';

const pointController = new PointsController();
const itensController = new ItemsController();
const routes = express.Router();

routes.get('/items', itensController.index);
routes.post('/points', pointController.create);

export default routes;