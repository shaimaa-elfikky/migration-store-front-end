import bcrypt from "bcrypt";
import client from "../database";




const pepper = process.env.BCRYPT_PASSWORD
const saltRounds = process.env.SALT_ROUNDS



type user = {
  id?: number;
  firtname: string;
  lastname: string;
  pwd: string;

}

class UserModel {
  async index(): Promise<user[]> {
    try {

      const conn = await client.connect()
      const sql = 'SELECT * FROM users'
      const result = await conn.query(sql);
      conn.release()
      return result.rows
    } catch (err) {
      throw new Error(`Could not get user. Error: ${err}`)
    }
  }
  async create(firtname: string, lastname: string, pwd: string): Promise<user> {
    try {
      //  console.log(123);

      const conn = await client.connect()
      const sql = 'INSERT INTO users (firtname,lastname, pwd) VALUES($1, $2, $3) RETURNING *'

      const hash = bcrypt.hashSync(
        pwd + pepper,
        Number(saltRounds)
      );
      console.log(hash);
      const result = await conn.query(sql, [firtname, lastname, hash])
      const user = result.rows[0]

      conn.release()

      return user
    } catch (err) {
      throw new Error(`unable create user (${firtname}): ${err}`)
    }
  }
  async show(id: number): Promise<user> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM users WHERE ID=($1)';
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`failed to get user with error ${error}`);
    }
  }

  async update(id: number, firstname: string): Promise<user> {
    try {
      const connection = await client.connect();
      const sql = "UPDATE students SET name=($1) WHERE id=($2) RETURNING *";
      const result = await connection.query(sql, [firstname, id]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `Failed to update user with the following error: ${error}`
      );
    }
  }

  async delete(id: number): Promise<user> {
    try {
      const connection = await client.connect();
      const sql = "DELETE FROM users WHERE id=($1) RETURNING *";
      const result = await connection.query(sql, [id]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `Failed to delete user with the following error: ${error}`
      );
    }
  }


  //    async   authenticate(firstname: string,lastname:string,  pwd: string): Promise<user | null>
  // {

  //         const conn = await client.connect();
  //         const sql = 'SELECT pwd FROM users WHERE firstname=($1) AND lastname=($2)'
  //         const result =await conn.query(sql,[firstname , lastname])
  //         console.log(pwd+pepper)
  //         if(result.rows.length){
  //           const user = result.rows[0]
  //          // console.log(user)
  //         if(bcrypt.compareSync(pwd+pepper , user.pwd)){
  //             return user
  //           }
  //         }
  //         return null
  //       } 

}


export default UserModel
