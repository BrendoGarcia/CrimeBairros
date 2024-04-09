const express = require('express');
const mysql = require('mysql');

const app = express();
app.use(express.json());

const db = mysql.createConnection({
    host: 'db4free.net',
    user: 'brendofcghh',
    password: 'qwer1234',
    database: 'projetinho'
});

// Endpoint para registrar um crime
app.post('/crimes', (req, res) => {
    const { data, cep, tipo_crime, detalhes } = req.body;
    const sql = 'INSERT INTO crimes (data, cep, tipo_crime, detalhes) VALUES (?, ?, ?, ?)';
    db.query(sql, [data, cep, tipo_crime, detalhes], (err, result) => {
        if (err) {
            console.error('Erro ao registrar crime:', err);
            res.status(500).send('Erro ao registrar crime');
        } else {
            console.log('Crime registrado com sucesso!');
            res.sendStatus(200);
        }
    });
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
