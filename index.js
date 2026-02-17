import express from 'express';

const host = '0.0.0.0';
const porta = 1750;

const app = express();

app.get('/', (requisicao, resposta) => {
    resposta.send(`
        <!DOCTYPE html>
        <html lang="pt-br">
        <head>
            <meta charset="UTF-8">
            <title>William - Apresentacao</title>
        </head>
        <body>
            <h1>WILLIAM ALCÂNTARA DALAQUA</h1>
            <h2>Estudane de T.I</h2>
                <p><strong>Ola sou estudante de tecnologia, e tenho grande interesse na parte de HTML e CSS, perco horas na frente do computador.</strong></p>
            <h3>HTML</h3>
            <h3>CSS</h3>
            <h3>DESENVOLVEDOR FRONT END</h3>
            <h4>Telefone: (18) 997653897</h4>
        </body>
        </html>
    `);  
});

app.get('/horaAtual', (requisicao, resposta) => {
    const horaAtual = new Date();
    const hora = horaAtual.getHours() + ':' + horaAtual.getMinutes() + ':' + horaAtual.getSeconds();
    resposta.send(`
        <!DOCTYPE html>
        <html lang="pt-br">
        <head>
            <meta charset="UTF-8">
            <title>Horario do Servidor</title>
        </head>
        <body>
            <h1> Agora são ${hora} </h1>
           
               
        </body>
        </html>
    `);
});


app.listen(porta, host, () => {
  console.log(`Servidor escutando em http://${host}:${porta} `);
});