require ('dotenv').config()

const express = require('express');
const cors = require('cors');
const db = require('./Connection/db');
const router=require('./Route/route')
const eCartServer=express()

eCartServer.use(cors())
eCartServer.use(express.json())
eCartServer.use(router)
const PORT= 3000 || process.env.PORT

eCartServer.listen(PORT,()=>{
    console.log(`listening on the port `+PORT);
})

eCartServer.get('/',(req,res)=>{
    res.send('E cart server started....')
})