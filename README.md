## Authorization / Authentication
### Register
`path`: "http://localhost:5000/api/register"  
`method`: "POST"  
  
```json
data = {
    "name": "John Doe",               // Required
    "phone": "082111345346",          // Required
    "email": "example@gmail.com",     // Required
    "password": "exPass321"           // Required
}
```
  
### Login
`path`: "http://localhost:5000/api/login"  
`method`: "POST"  

```json
data = {
    "email": "example@gmail.com",     // Required
    "password": "exPass321"           // Required
}
```
  
## User Management
### Get User by Email
`path`: "http://localhost:5000/api/user/{User Email. example: john@gmail.com}"  
`method`: "GET"  

``` json
return = {
    "msg": "Success get my self",
    "statusCode": 200,
    "data": {
        "id": "4e2b80e7-533d-427c-8485-021496a66b45",
        "name": "My Name",
        "phone": "088xxx",
        "m_credential": {
            "id": "091af03f-83ee-450b-bc47-e17068d79e0a",
            "email": "email@gmail.com",
            "role": "customer"
        }
    }
}
```

### Update Data User
`path`: "http://localhost:5000/api/user/update"  
`method`: "PUT"  
  
```json
data = {
    "id": "4e2b80e7-533d-427c-8485-021496a66b45",
    "name": "My Name",
    "phone": "088xxx"
}
```

## Transaction Management
`path`: "http://localhost:5000/api/purchase"  
`method`: "POST"  

We have payment Method with Bank Transfer and Gopay using Payment Gateaway Midtrans  
path url is same but for Bank Transfer you must include Name of Bank

`Gopay`:
```json
data = {
    "paymentType": "gopay",
    "userId": "4e2b80e7-533d-427c-8485-021496a66b45",
    "products": [                                             // Can have many Product in one Transaction
        {
            "id": "723a4e44-7416-4231-8b96-419b2cce0d95",
            "quantity": 3
        }
    ]
}

return = {
    "msg": "Purchase product success",
    "statusCode": 201,
    "data": {
        "status_code": "201",
        "status_message": "GoPay transaction is created",
        "transaction_id": "1bd12b2e-adbd-4417-a709-f5ef14cd0553",
        "order_id": "a7028bc92c4451f8770c",
        "merchant_id": "G138401635",
        "gross_amount": "45000.00",
        "currency": "IDR",
        "payment_type": "gopay",
        "transaction_time": "2023-03-03 13:41:00",
        "transaction_status": "pending",
        "fraud_status": "accept",
        "actions": [
            {
                "name": "generate-qr-code",
                "method": "GET",
                "url": "https://api.sandbox.midtrans.com/v2/gopay/1bd12b2e-adbd-4417-a709-f5ef14cd0553/qr-code"
            },
            {
                "name": "deeplink-redirect",
                "method": "GET",
                "url": "https://simulator.sandbox.midtrans.com/gopay/partner/app/payment-pin?id=8a6892c6-b761-4050-a4f0-25eb1c3088be"
            },
            {
                "name": "get-status",
                "method": "GET",
                "url": "https://api.sandbox.midtrans.com/v2/1bd12b2e-adbd-4417-a709-f5ef14cd0553/status"
            },
            {
                "name": "cancel",
                "method": "POST",
                "url": "https://api.sandbox.midtrans.com/v2/1bd12b2e-adbd-4417-a709-f5ef14cd0553/cancel"
            }
        ],
        "expiry_time": "2023-03-03 13:56:00"
    }
}
```
  
`Bank Transfer`:
```json
data = {
    "paymentType": "bank_transfer",
    "bankName": "bca",                                        // can input permata, bni, mandiri etc.
    "userId": "4e2b80e7-533d-427c-8485-021496a66b45",
    "products": [                                             // Can have many Product in one Transaction
        {
            "id": "723a4e44-7416-4231-8b96-419b2cce0d95",
            "quantity": 3
        }
    ]
}

return = {
    "msg": "Purchase product success",
    "statusCode": 201,
    "data": {
        "status_code": "201",
        "status_message": "Success, Bank Transfer transaction is created",
        "transaction_id": "d9ed12f7-8301-4340-a473-4ee926dbbbff",
        "order_id": "2fd491b56e7cbce34881",
        "merchant_id": "G138401635",
        "gross_amount": "45000.00",
        "currency": "IDR",
        "payment_type": "bank_transfer",
        "transaction_time": "2023-03-03 13:43:47",
        "transaction_status": "pending",
        "fraud_status": "accept",
        "va_numbers": [
            {
                "bank": "bca",
                "va_number": "01635780313"
            }
        ],
        "expiry_time": "2023-03-04 13:43:47"
    }
}
```

### Check Status Transaction
`path`: "http://localhost:5000/api/check-status/{Transaction Id. example: d9ed12f7-8301-4340-a473-4ee926dbbbff}"  
`method`: "GET"  

```json
return = {
    "msg": "Success Check data Transaction",
    "statusCode": 200,
    "data": {
        "status_code": "200",
        "transaction_id": "d9ed12f7-8301-4340-a473-4ee926dbbbff",
        "gross_amount": "45000.00",
        "currency": "IDR",
        "order_id": "2fd491b56e7cbce34881",
        "payment_type": "bank_transfer",
        "signature_key": "e56fad164c55fc7cd9908a67c2c0480e9f21e69b4c48c767a9a626cd719c10fdc5afea38ffb53dc9ec3b3efc9fa436d2b15b193125bd3b74db36d36820d67905",
        "transaction_status": "settlement",
        "fraud_status": "accept",
        "status_message": "Success, transaction is found",
        "merchant_id": "G138401635",
        "metadata": {
            "internal_service": "1oms"
        },
        "va_numbers": [
            {
                "bank": "bca",
                "va_number": "01635780313"
            }
        ],
        "payment_amounts": [],
        "transaction_time": "2023-03-03 13:43:47",
        "settlement_time": "2023-03-03 13:45:55",
        "expiry_time": "2023-03-04 13:43:47"
    }
}
```