import supertest from "supertest";
import app from "../index";
import OrderModel from '../models/orders';
import UserModel from '../models/users';


type userType = {
  id?: number;
  firtname: string;
  lastname: string;
  pwd: string;
}

// type orderType = {
//   id?: number;
//   user_id: number;
//   status:string;
// }

let order: OrderModel = new OrderModel();
let user = new UserModel();
let userRes: userType;
describe('Order Model', () => {

  beforeAll(async () => {
    const result = await user.create("Shaimaa", "Elfikky", "shaimaa");
    userRes = result;
  });

  it('should have an index method', () => {
    expect(user.index).toBeDefined()
  });
  it('should have a show method', () => {
    expect(user.show).toBeDefined()
  });
  it('should have a create method', () => {
    expect(user.create).toBeDefined()
  })

  it('create method should add a order', async () => {
    const result = await order.create(userRes.id as number,'active')
    
    expect(result).toEqual({
      id: 1,
      user_id: userRes.id as number,
      status: 'active'
    })
  })

  it('index method should return a list of orders', async () => {
    const result = await order.index()
    expect(Array.isArray(result)).toBeTrue();
  })

  it('show method should return the correct order', async () => {
    const result = await order.show(userRes.id as number)
    expect(result).toEqual({
      id: 1,
      user_id: userRes.id as number,
      status: 'active'
    })
  });

  afterAll(async () => {
    await user.delete(userRes.id as number)
  });

});
