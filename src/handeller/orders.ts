import express, { Request, Response } from 'express'
import OrdersModel from '../models/orders'
import varifyUser from '../middleware/varifyUser'
import orderProduct from '../handeller/products'


const ordermodel = new OrdersModel()

 const index = async (req: Request, res: Response) => {
    try {
      const orders = await ordermodel.index();
      res.json(orders);
    } catch (error) {
      res.status(500).json(error);
    }
  };
  const create = async (req: Request, res: Response) => {
    try {
      const { user_id } = req.body;
      const { status } = req.body;
      const newOrder = await ordermodel.create(user_id,status);
      res.json(newOrder);
    } catch (error) {
      res.status(500).json(error);
    }
  };
  const show = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      const order = await ordermodel.show(id);
      res.json(order);
    } catch (error) {
      res.status(500).json(error);
    }
  };




  
  const orders_routes = (app: express.Application) => {
    app.get("/orders",varifyUser, index);
    app.get("/orders/:id",varifyUser, show);
    app.post("/orders",varifyUser, create);
    app.post("/orders/addProduct",varifyUser, orderProduct);
 
  };
  
  export default orders_routes;