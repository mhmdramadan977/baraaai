const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

let users = ['رجاء', 'سيف', 'عواد','عايد','ابراهيم','نصال','جنيدي','عدنان','توفيق','اخر','امير','سليمان','انس','عكور','هديل','شهد','اسراء','احمد فيصل','اخو احمد فيصل','مصطفا']; // Sample users
let items = ['نسكافيه', 'قهوة', 'شاي']; // Sample items
let orders = []; // In-memory storage for orders

// Endpoint to get all users
app.get('/api/users', (req, res) => {
    res.json(users);
});

// Endpoint to get all items
app.get('/api/items', (req, res) => {
    res.json(items);
});

// Endpoint to get orders by user
app.get('/api/orders/:user', (req, res) => {
    const { user } = req.params;
    const userOrders = orders.filter(order => order.user === user);
    res.json(userOrders);
});

// Endpoint to get orders by user
app.get('/api/orders', (req, res) => {
    let userOrders = [...orders];
    res.json(userOrders);
});

// Endpoint to create an order
app.post('/api/orders', (req, res) => {
    const order = { id: orders.length + 1, ...req.body,timestamp:new Date() };
    orders.push(order);
    res.status(201).json(order);
});

// Endpoint to delete an order
app.delete('/api/orders/:id', (req, res) => {
    const { id } = req.params;
    orders = orders.filter(order => order.id !== parseInt(id));
    res.status(204).send();
});

// Endpoint to update an order
app.put('/api/orders/:id', (req, res) => {
    const { id } = req.params;
    const index = orders.findIndex(order => order.id === parseInt(id));
    if (index !== -1) {
        orders[index] = { ...orders[index], ...req.body,timestamp:new Date() };
        res.json(orders[index]);
    } else {
        res.status(404).send();
    }
});

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
