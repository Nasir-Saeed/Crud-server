import express from 'express';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3000

let users = [];
app.use(cors())
app.use(express.json())

// GET
app.get('/users', (req, res) => {
    res.send(users);
})
app.get('/user/:id', (req, res) => {
    if (users[req.params.id]) {
        res.send(users[req.params.id]);
    }
    else {
        res.send("User Not Found");
    }
})

// POST

app.post('/user', (req, res) => {
    if (!req.body.name || !req.body.email || !req.body.address) {
        res.status(404).send("Invalid User");
    } else {
        users.push({
            name: req.body.name,
            email: req.body.email,
            address: req.body.address
        })
        res.send("User Created");
    }
})

// UPDATE
app.put("/user/:id", (req, res) => {
    if (users[req.params.id]) {
        if (req.body.name) {
            users[req.params.id].name = req.body.name
        }
        if (req.body.email) {
            users[req.params.id].email = req.body.email
        }
        if (req.body.address) {
            users[req.params.id].address = req.body.address
        }
        res.send(users[req.params.id]);
    } else {
        req.send("User Not Found");
    }
})

// DELETE
app.delete('/user/:id', (req, res) => {
    if (users[req.params.id]) {
        users[req.params.id] = {}
        res.send("User Deleted")
    }
    else {
        res.send("User Not Found")
    }
})

app.listen(port, () =>
    console.log(`Example app listening on port 4000! , ${port}`),
);