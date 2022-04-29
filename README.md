# drivingapp
App for driving school

## Installation

Tested versions:   
Angular: 11.2.14  
Angular CLI: 11.2.18  
Node: 14.16.1   

Install Angular CLI and dependencies


Test webhook using stripeCLI

```bash
stripe listen --forward-to localhost:3000/payment/webhook
```


```bash
npm install -g @angular/cli

npm install

```

## Environment variables

Create .env file in server folder and configure mongodb
- MONGODB_HOST
- MONGODB_PORT
- MONGODB_DB
- SECRET_KEY

