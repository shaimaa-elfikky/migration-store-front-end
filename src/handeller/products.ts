import express, { Request, Response } from 'express'
import ProductModel from '../models/products'
import varifyUser from '../middleware/varifyUser'



const productmodel = new ProductModel()


const index = async (req: Request, res: Response) => {
    try {
      const products = await productmodel.index();
      res.json(products);
    } catch (error) {
      res.status(500).json(error);
    }
  };
  const create = async (req: Request, res: Response) => {
    try {
      console.log(123)
      const { product_name } = req.body;
      const price = Number(req.body.price );
      const newProducts = await productmodel.create(product_name,price);
      console.log(newProducts);
      res.json(newProducts);
     
    } catch (error) {
      res.status(500).json(error);
    }
  };
  const show = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      const product = await productmodel.show(id);
      res.json(product);
    } catch (error) {
      res.status(500).json(error);
    }
  };


 

  
  const products_routes = (app: express.Application) => {
    app.get("/products", index);
    app.get("/products/:id", show);
    app.post("/products",varifyUser, create);
    
  };
  
  export default products_routes;
  