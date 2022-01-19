import express, { Application, Request, Response } from 'express'
import users_routes from "./handeller/users"
import orders_routes from "./handeller/orders"
import products_routes from "./handeller/products"
import service_routes from "./handeller/srvice"
import client from './database'

import cors from 'cors';




const PORT = process.env.PORT ||  3000
const app: Application = express()
//console.log('server is on')
app.use(express.json())
 


app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Hello World 🌍'
  })
})
app.get('/',async (req:Request,res:Response) => {
  
  const connction = await client.connect();
  const sql = 'SELECT * FROM products';
  const result =await connction.query(sql);
  connction.release();
    res.json(result.rows);
  });
  //  const corsOptions ={
  //    origin:'http://localhost',
  //    optionSucsessStatus:200
  //  }

  users_routes(app);
  orders_routes(app);
  products_routes(app);
  service_routes(app);
     
  // app.get('/test-cors', cors(corsOptions), function(req,res,next){
  //   res.json({msg:'This is Cors-enabled with a middle ware'})
  // })
  // start express server
  app.listen(PORT, () => {
    console.log(`Server is starting at http://localhost:${PORT}`)
})

export default app