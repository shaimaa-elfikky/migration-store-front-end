import client from "../database"
import { Client } from "pg";




  export  type order = {
    id?: number;
    user_id: number;
    status:string;
  

}

class OrderModel {
    async index(): Promise<order[]> {
        try {
      
          const conn = await client.connect()
          const sql = 'SELECT * FROM orders'
          const result = await conn.query(sql);
          conn.release()
          return result.rows 
        } catch (err) {
          throw new Error(`Could not get orders.Error: ${err}`)
        }
}

        async create(user_id: number, status: string) : Promise<order> {
        try {
          const conn = await client.connect();
          const sql = 'INSERT INTO orders (user_id,status) VALUES($1,$2) RETURNING *';
          const result =await conn.query(sql,[user_id,status]);
          conn.release();
        return  result.rows[0]; 
        } catch (error){
     throw new Error (`failed to add order with error ${error}`);
        }
      } 

      async show(id: number) : Promise<order> {
        try {
          const conn = await client.connect();
          const sql = 'SELECT * FROM orders WHERE ID=($1)';
          const result =await conn.query(sql,[id]);
          conn.release();
        return  result.rows[0]; 
        } catch (error){
     throw new Error (`failed to get order with error ${error}`);
        }
      } 
}
export default OrderModel
