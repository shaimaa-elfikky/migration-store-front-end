import express, { Request, Response } from 'express'
import varifyUser from '../middleware/varifyUser'
import ServiceModel from '../models/service'

const servicemodel = new ServiceModel()

 const orderProduct = async (req: Request, res: Response) => {
    try {
        const order_id = Number(req.body.order_id);
        const product_id = Number(req.body.product_id);
        const quantity = Number(req.body.quantity);
        const product = await servicemodel.create({
          order_id,
          product_id,
          quantity,
      });
      res.status(200).json(product)
    } catch (error) {
      res.status(500).json(error);
    }
  };



  const service_routes = (app: express.Application) => {
  
    app.post("/service/addProduct",varifyUser, orderProduct);
 
  };

  export default service_routes