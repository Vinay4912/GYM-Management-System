const express = require("express")
const cors = require('cors');
const path = require("path")
const bcrypt = require("bcryptjs")
const bodyParser = require('body-parser');
const { PrismaClient } = require('@prisma/client')

const app = express()
const port = 8080;
const salt = 10
const prisma = new PrismaClient()
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', (req, res) => {
    res.sendFile("/public/index.html")
})

app.get('/login', (req, res) => {
    res.sendFile("/public/login.html")
})

app.get('/register', async (req, res) => {
    res.sendFile("/public/register.html")
})

app.get('/admin',async(req,res)=>{
    let email = req.query.email
    let user 
   try{ 
    user = await prisma.user.findUnique({where: {email}})

    if (user.admin) {
        res.send(`You are logged in as admin your user name is ${user.name}`)
    }
}catch (error){
    return res.send("user not found ").status(404)
}
    res.send(`${user.name} is not an admin`)
})

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            return res.status(401).json({ error: 'User not found' });
        }
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ error: 'Invalid password' });
        }
        res.json({ message: 'Login successful', user });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred' });
    }
})

app.post('/register', async (req, res) => {
    let { email, name, number, gender, password, weight, height, age } = req.body;
    console.log(name);

    try {
        let hash = await bcrypt.hash(password, salt);

        const user = await prisma.user.create({
            data: {
                email,
                name,
                password: hash,
                number,
                age : parseInt(age),
                gender: gender === "male" ? "MALE" : "FEMALE",
                weight: parseInt(weight),
                height: parseInt(height),
            }
        });

       // console.log(user);
        res.status(200).json({ user: user.name, status: "User Registered Successfully" });
    } catch (error) {
        console.error(error); 
        res.status(400).json({ error: "Registration failed", message: error.message });
    }
}); 

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})