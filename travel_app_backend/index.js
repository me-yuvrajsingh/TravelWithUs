import express from "express"
import cors from "cors"
import dotenv from "dotenv";
import {packages} from "./data.js"
import {genSalt,hash,compare} from "bcrypt"
import {PrismaClient} from "@prisma/client"

const app = express();
const port = process.env.PORT || 8000;
const prisma = new PrismaClient();

dotenv.config();
app.use(cors());
app.use(express.json());


app.post("/api/register",async (req,res) => {
    const {fullname,username,email,password,confirm_password} = await req.body;
    const userCount = await prisma.user.count();
    const salt = await genSalt(10);

    if(userCount > 0){
        const isUserExists = await prisma.user.findUnique({ where : { email }})
        if(!fullname || !username || !email || !password || !confirm_password){
            res.status(400);
            res.send("Please fill all fields")
        }
        if(isUserExists){
            res.status(400);
            res.send("User already exists please try another email.")
        }

        if(password !== confirm_password){
            res.status(400);
            res.send("Please enter same password in both fields.")
        }

        const hashedPassword = await hash(password,salt);

        const user = await prisma.user.create({
            data : {
                fullname,
                username,
                email,
                password : hashedPassword
            }
        })

        if(user){
            res.status(200);
            res.send("User is registered successful.")
        }

    }else{
        if(!fullname || !username || !email || !password || !confirm_password){
            res.status(400);
            res.send("Please fill all fields")
        }

        if(password !== confirm_password){
            res.status(400);
            res.send("Please enter same password in both fields.")
        }

        const hashedPassword = await hash(password,salt);

        const user = await prisma.user.create({
            data : {
                fullname,
                username,
                email,
                password : hashedPassword
            }
        })

        if(user){
            res.status(200);
            res.send("User is registered successful.")
        }

    }
})
 
app.post("/api/login",async (req,res) => {
    const {email,password} = await req.body;
    const userCount = await prisma.user.count();

    if(userCount > 0){
        const isUserExists = await prisma.user.findUnique({where : {email}});

        if(!email || !password){
            res.status(400);
            res.send("Please fill both fields are required.")
        }
        
        if(isUserExists){
            const user_password = isUserExists.password;
            const isCorrectPassword = await compare(password,user_password);
            if(isCorrectPassword){
                res.status(200);
                res.json(isUserExists);
            }else{
                res.status(400);
                res.send("Invalid password please enter valid password.");
            }

        }else{
            res.status(404);
            res.send("User does'nt exists please register then login.")
        }

    }else{
        res.status(400);
        res.send("User does'nt exists please register then login.");
    }
})


app.get("/api/package_details/:city_id",async (req,res) => {
    const {city_id} = req.params;
    const getCityDetails = await prisma.packageDetail.findUnique({where : {id : city_id}})
    res.json({...getCityDetails})
})

app.post("/api/logout",(req,res) => {
    res.status(200);
    res.json({ logout : true});
})

app.post("/api/booking",async (req,res) => {
    const {where_to,how_many,arrival,leaving,userid} = await req.body;
    if(!where_to || !how_many || !arrival || !leaving){
        res.status(400);
        res.send("Please fill all the fields");
    }

    const booking = await prisma.user.update({
        where : {
            id : userid
        },
        data : {
            booking : {
                create : {
                    whereto : where_to,
                    howmany : how_many,
                    arrival,
                    leaving,
                }
            }
            
        }
    })

    res.status(200);
    res.json(booking);
})

app.post("/api/contact",async (req,res) => {
    const {name,email,phone_no,subject,message,userid} = await req.body;
    if(!name || !email || !phone_no || !subject || !message){
        res.send("Please fill all the fields.");
    }

    const contact = await prisma.user.update({
        where : {
            id : userid
        },
        data : {
            contact : {
                create : {
                    name,
                    email,
                    number : phone_no,
                    subject,
                    message
                }
            }
            
        }
    })

    res.status(200);
    res.json(contact);
})


app.listen(port,() => {
    console.log("Port is successfully listening to",port);
})