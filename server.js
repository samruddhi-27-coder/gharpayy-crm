const express = require("express")
const mongoose = require("mongoose")
const swaggerUi = require("swagger-ui-express")
const swaggerJsdoc = require("swagger-jsdoc")
const cors = require("cors")

const app = express()

app.use(cors())
app.use(express.json())

// ---------------- DATABASE ----------------

mongoose.connect("mongodb://127.0.0.1:27017/gharpayycrm")
.then(()=>console.log("MongoDB Connected"))
.catch(err=>console.log(err))

// ---------------- MODEL ----------------

const LeadSchema = new mongoose.Schema({

name:String,
phone:String,
source:String,

status:{
type:String,
default:"New Lead"
},

assignedAgent:String,

property:String,
visitDate:String,
visitTime:String,
visitOutcome:String

})

const Lead = mongoose.model("Lead",LeadSchema)

// ---------------- SWAGGER CONFIG ----------------

const options = {

definition:{
openapi:"3.0.0",
info:{
title:"Gharpayy CRM API",
version:"1.0.0",
description:"Lead Management System"
},
servers:[
{
url:"http://localhost:5000"
}
]
},

apis:["./server.js"]

}

const swaggerSpec = swaggerJsdoc(options)

app.use("/api-docs",swaggerUi.serve,swaggerUi.setup(swaggerSpec))

// ---------------- ROOT ----------------

app.get("/",(req,res)=>{
res.send("🚀 Gharpayy CRM Backend Running")
})

/**
 * @swagger
 * /api/leads:
 *   post:
 *     summary: Create a new lead
 */

app.post("/api/leads",async(req,res)=>{

const lead = new Lead({

name:req.body.name,
phone:req.body.phone,
source:req.body.source,
assignedAgent:"Agent1"

})

await lead.save()

res.json({
message:"Lead created",
lead
})

})

/**
 * @swagger
 * /api/leads:
 *   get:
 *     summary: Get all leads
 */

app.get("/api/leads",async(req,res)=>{

const leads = await Lead.find()

res.json(leads)

})

/**
 * @swagger
 * /api/leads/{id}/status:
 *   patch:
 *     summary: Update lead pipeline stage
 */

app.patch("/api/leads/:id/status",async(req,res)=>{

const lead = await Lead.findByIdAndUpdate(

req.params.id,
{status:req.body.status},
{new:true}

)

res.json(lead)

})

/**
 * @swagger
 * /api/leads/{id}/visit:
 *   patch:
 *     summary: Schedule property visit
 */

app.patch("/api/leads/:id/visit",async(req,res)=>{

const lead = await Lead.findByIdAndUpdate(

req.params.id,

{
property:req.body.property,
visitDate:req.body.visitDate,
visitTime:req.body.visitTime,
status:"Visit Scheduled"
},

{new:true}

)

res.json(lead)

})

/**
 * @swagger
 * /api/leads/{id}/visit-outcome:
 *   patch:
 *     summary: Update visit outcome
 */

app.patch("/api/leads/:id/visit-outcome",async(req,res)=>{

const lead = await Lead.findByIdAndUpdate(

req.params.id,
{
visitOutcome:req.body.visitOutcome
},

{new:true}

)

res.json(lead)

})

/**
 * @swagger
 * /api/dashboard:
 *   get:
 *     summary: Get dashboard analytics
 */

app.get("/api/dashboard",async(req,res)=>{

const totalLeads = await Lead.countDocuments()

const newLeads = await Lead.countDocuments({status:"New Lead"})

const contacted = await Lead.countDocuments({status:"Contacted"})

const visitsScheduled = await Lead.countDocuments({status:"Visit Scheduled"})

const booked = await Lead.countDocuments({visitOutcome:"Booked"})

const lost = await Lead.countDocuments({visitOutcome:"Lost"})

res.json({

totalLeads,
newLeads,
contacted,
visitsScheduled,
booked,
lost

})

})

// ---------------- SERVER ----------------

const PORT = process.env.PORT || 5001

app.listen(PORT,()=>{
console.log(`Server running at http://localhost:${PORT}`)
})