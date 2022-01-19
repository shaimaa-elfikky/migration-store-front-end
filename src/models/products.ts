import client from "../database"





  export  type product = {
    id: number;
    product_name: string;
    price: number   
}

class ProductModel {
    async index(): Promise<product[]> {
        try {
      
          const conn = await client.connect()
          const sql = 'SELECT * FROM products'
          const result = await conn.query(sql);
          conn.release()
          return result.rows 
        } catch (err) {
          throw new Error(`Could not get products.Error: ${err}`)
        }
}

        async create(product_name: string, price:number) : Promise<product> {
        try {
          const conn = await client.connect();
          const sql = 'INSERT INTO products (product_name, price) VALUES($1,$2) RETURNING * ';
          const result =await conn.query(sql,[product_name,price]);
          console.log(result)
          conn.release();
        return  result.rows[0]; 
        
        } catch (error){
     throw new Error (`failed to add product with error ${error}`);
        }
      } 

      async show(id: number) : Promise<product> {
        try {
          const conn = await client.connect();
          const sql = 'SELECT * FROM products WHERE ID=($1)';
          const result =await conn.query(sql,[id]);
          conn.release();
        return  result.rows[0]; 
        } catch (error){
     throw new Error (`failed to get product with error ${error}`);
        }
      } 
}
export default ProductModel
