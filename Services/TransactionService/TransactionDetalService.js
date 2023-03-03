import axios from "axios";
import {} from "dotenv/config";
import crypto from "crypto";

import TransactionDetail from "../../Entities/TransactionEntity/TransactionDetail.js";
import Repository from "../../Repositories/Repository.js";
import TransactionService from "./TransactionService.js";
import UserService from "../UserService/UserService.js";
import ProductService from "../ProductService/ProductService.js";

const repo = new Repository(TransactionDetail);
const transacService = new TransactionService();
const servProduct = new ProductService();
const servUser = new UserService();

const merchantId = process.env.MERCHANTID;
const urlPg = process.env.PGURLDEV;

class TranDetailService{

    async CreateTransaction(req, res){
        try{
            let data = await ReqObjForPayment(req.body.paymentType, req.body.userId, req.body.products, req.body.bankName);

            const option = {
                method: 'POST',
                url: urlPg+'charge',
                headers: {
                    accept: 'application/json',
                    'content-type': 'application/json',
                    authorization: `Basic U0ItTWlkLXNlcnZlci1Mei1hTGlXNjVONXFlNlRZM0dpM3p6U006`
                },
                data: data
            };

            var result = await axios.request(option);

            var saveTransac = await transacService.CreateTransaction({
                id: result.data.transaction_id,
                paymentType: req.body.paymentType,
                referencePg: merchantId,
                status: "pending",
                mUserId: req.body.userId
            });

            var tmpDetail = [];
            req.body.products.forEach( async (e) => {
                var detail = {
                    quantity: e.quantity,
                    tTransactionId: saveTransac.id,
                    mProductId: e.id
                };
                tmpDetail.push(detail);
            });

            var saveDetail = await repo.SaveAll(tmpDetail);
            res.status(201).json({
                msg: "Purchase product success",
                statusCode: 201,
                data: result.data
            });
        }
        catch(err){
            res.status(500).json({msg: "Error while Create Transaction"+err, statusCode: 500});
        }
    }

    async CheckStatus(req, res){
        var id = req.params.id;
        if(id == null) res.status(400).json({msg: 'TransactionId is cannot be null', statusCode: 400});

        var option = {
            method: 'GET',
                url: `${urlPg}${id}/status`,
                headers: {
                    accept: 'application/json',
                    'content-type': 'application/json',
                    authorization: `Basic U0ItTWlkLXNlcnZlci1Mei1hTGlXNjVONXFlNlRZM0dpM3p6U006`
                }
        }
        var request = await axios.request(option);
        var updateStatus = await transacService.UpdateStatus({
            id: request.data.transaction_id,
            status: request.data.transaction_status
        });
        res.status(200).json({
            msg: "Success Check data Transaction",
            statusCode: 200,
            data: request.data
        });
    }
}


const ReqObjForPayment = async (isfor, userId, products, bank) => {
    let amount = 0;

    products.forEach(async (e) => {
        let res = await servProduct.GetForTransac(e.id);
        amount += res.price * e.quantity;
    });

    var user = await servUser.GetForTransac(userId);

    switch(isfor){
        case 'gopay':
            let dataGopay = {
                payment_type: isfor,
                transaction_details: {
                    order_id: getRandomId(),
                    gross_amount: amount
                },
                customer_details: {
                    first_name: user.name.split(' ')[0],
                    last_name: user.name.split(' ')[1],
                    email: user.m_credential.email,
                    phone: user.phone
                }
            };

            return dataGopay;
        case 'bank_transfer':
            let dataBank = {
                payment_type: isfor,
                bank_transfer: {
                    bank: bank
                  },
                transaction_details: {
                    order_id: getRandomId(),
                    gross_amount: amount
                },
                customer_details: {
                    first_name: user.name.split(' ')[0],
                    last_name: user.name.split(' ')[1],
                    email: user.m_credential.email,
                    phone: user.phone
                }
            };

            return dataBank;
        default:
            throw new Error("Error while create Object Request, payment Method not supported");
    }
}

function getRandomId(){
    var id = crypto.randomBytes(10).toString('hex');
    return id;
}

export default TranDetailService;
