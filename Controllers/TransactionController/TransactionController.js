import express from "express";
import TransactionDetalService from "../../Services/TransactionService/TransactionDetalService.js";

const service = new TransactionDetalService();
const TransactionRouter = express.Router();

TransactionRouter.post('/purchase', service.CreateTransaction);
TransactionRouter.get('/check-status/:id', service.CheckStatus);

export default TransactionRouter;