import supertest from "supertest";
import app from "../index";
import { JwtPayload, verify } from "jsonwebtoken";
import UserModel from "../models/users";


const request = supertest(app);
describe("Testing Endpoint:/users",()=> {
    const user = {firtname: "SAM", lastname: "ADM", pwd: "Password"};
    let token:string;
  
    it("Testing the creare Endpoint", async()=>{
        const res =   await request.post("/users").send(user).expect(200) 
         token= res.body
           
    });
    it('test get user by id', async (): Promise<void> => {
        const response = await request
            .get('/users/1')
            .set('Authorization', `Bearer ${token}`);
        expect(200);
    });

    it('test getting all users', async (): Promise<void> => {
        const res = await request
            .get('/users')
            .set('Authorization', `Bearer ${token}`);
        expect(200);


    });
    const product = {product_name: "tables", price: 30};
    it("Testing the create Endpoint", async()=>{
        const res =   await request.post("/products").send(product)
        .set('Authorization', `Bearer ${token}`)
        .expect(200) 
            
           
    });
    it('test get products by id', async (): Promise<void> => {
        const response = await request
            .get('/products/1')
          
        expect(200);
    });

    it('test getting all products', async (): Promise<void> => {
        const res = await request
            .get('/products')
         
        expect(200);


    });

    const orders = {user_id: 1, status: "active"};
    it("Testing the creare Endpoint", async()=>{
        const res =   await request.post("/orders").send(orders)
        .set('Authorization', `Bearer ${token}`)
        .expect(200) 
            
           
    });
    it('test get orders by id', async (): Promise<void> => {
        const response = await request
            .get('/orders/1')
            .set('Authorization', `Bearer ${token}`)
        .expect(200);
    });

   

        const orderProducts = { order_id: 1, product_id: 1, quantity: 5 }
        it("Testing the creare Endpoint", async()=>{
            const res =   await request.post("/service/addProduct").send(orderProducts)
            .set('Authorization', `Bearer ${token}`)
            .expect(200) 
                
               
        });
      


    });

