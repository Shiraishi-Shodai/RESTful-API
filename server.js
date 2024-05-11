const express = require('express');
const app = express();
const PORT = 5000;
app.use(express.json());

app.listen(PORT, ()=> {
    console.log('Server is starting ...');
});

app.get("/", (req, res)=> {
    res.send("プログラミングチュートリアル");
})

// 顧客情報
const customers = [
    {title: "田中", id: 1},
    {title: "斎藤", id: 2},
    {title: "橋本", id: 3},
    {title: "鈴木", id: 4},
    {title: "安藤", id: 5},
];

app.get('/api/customers', (req, res)=> {
    res.send(customers);
});

app.get('/api/customers/:id', (req, res)=> {
    const customer = customers.find((c)=> c.id === parseInt(req.params.id));
    res.send(customer);
});

// 新規データの追加
app.post('/api/customers', (req, res)=> {
    const customer = {
        title: req.body.title,
        id: customers.length + 1
    }

    customers.push(customer);
    res.send(customers);
});

// 既存データの完全更新
app.put('/api/customers/:id', (req, res)=> {
    const customer = customers.find((c)=> c.id === parseInt(req.params.id));
    customer.title = req.body.title;
    customer.id = req.body.id;
    res.send(customer);
});

// 既存データの部分更新
app.patch('/api/customers/:id', (req, res)=> {
    const customer = customers.find((c)=> c.id === parseInt(req.params.id));
    customer.title = req.body.title;
    res.send(customer);
});

app.delete('/api/customers/:id', (req, res)=> {
    const id =  parseInt(req.params.id) - 1;
    customers.splice(id, 1);
    res.send(customers);
})