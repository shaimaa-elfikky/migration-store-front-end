import  dotenv from 'dotenv'
import {Pool} from 'pg'


dotenv.config()


 const {
    POSTGRES_HOST,
    POSTGRES_DB,
    POSTGRES_USER,
    POSTGRES_DB_TEST,
    POSTGRES_PASSWORD,
    BCRYPT_PASSWORD,
    SALT_ROUNDS,
    ENV
 } =process.env ;
  const clientconfig ={
     host:POSTGRES_HOST,
     database:ENV == 'dev'? POSTGRES_DB : POSTGRES_DB_TEST,
     user: POSTGRES_USER,
     password:POSTGRES_PASSWORD,
    
  };
 const client = new Pool(clientconfig);

 export default client



