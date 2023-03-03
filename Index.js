import  express   from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import {} from "dotenv/config";
import authRouter from "./Controllers/AuthController/AuthController.js";
import UserController from './Controllers/UserController/UserController.js';
import ProductRouter from './Controllers/ProductController/ProductController.js';
import TransactionRouter from './Controllers/TransactionController/TransactionController.js';

const app = express();
const port = process.env.PORT;

app.use(bodyParser.json());
app.use(express.json());
app.use(cors());
app.use('/api', authRouter);
app.use('/api', UserController);
app.use('/api', ProductRouter);
app.use('/api', TransactionRouter);

app.listen(port, () => console.log(`Running in http://localhost:${port}`));