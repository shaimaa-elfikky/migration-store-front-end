import express, { Request, Response } from 'express'
import UserModel from '../models/users'
import JWT, { sign } from 'jsonwebtoken'
import { setOriginalNode } from 'typescript';
import varifyUser from '../middleware/varifyUser'


   const usermodel = new UserModel()



    const index = async (req: Request, res: Response) => {
        try {
          const users = await usermodel.index();
          res.json(users);
        } catch (error) {
          res.status(500).json(error);
        }
      };
      const create = async (req: Request, res: Response) => {
        try {
        //  console.log(123)
          const { firtname } = req.body;
          const { lastname } = req.body;
          const { pwd } = req.body;
          const newUser = await usermodel.create(firtname,lastname,pwd);
          console.log(newUser)
          let token = sign({newUser}, process.env.TOKEN_SECRET as string);
          res.json(token);
        
         // res.send(newUser);
        } catch (error) {
          res.status(500).json(error);
        }
      };
      const show = async (req: Request, res: Response) => {
        try {
          const id = Number(req.params.id);
          const user = await usermodel.show(id);
          res.send(user);
        } catch (error) {
          res.status(500).json(error);
        }
      };


      
      const users_routes = (app: express.Application) => {
       
        app.get("/users",varifyUser, index);
        app.get("/users/:id",varifyUser, show);
        app.post("/users",create);
      
      };
      
      export default users_routes;