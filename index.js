import express from 'express';

const host = '0.0.0.0';
const porta = 9100;

const app = express();



app.get('/', (req, res) => {

    const idade = parseInt(req.query.idade);
    const sexo = req.query.sexo?.toUpperCase();
    const salarioBase = parseFloat(req.query.salario_base);
    const anoContratacao = parseInt(req.query.anoContratacao);
    const matricula = parseInt(req.query.matricula);

    if (isNaN(req.query.idade)) {
        res.send(`
             <!DOCTYPE html>
        <html lang="pt-br">
        <head>
            <meta charset="UTF-8">
            <title>Calculadora para reajuste de funcionarios</title>
        </head>
        <body>
            <h1 style="background-color:green">FACA OS CALCULOS DE REAJUSTE DE SALARIO !!!</h1>
            </br>
            <ul>
                <p>PASSO A PASSO:</p>
                <p>VÁ NO LINK DO SEU NAVEGADOR E DIGITE INFORMANDO OS DADOS</p> 
                <p>IDADE</p>
                <p>SEXO</p>
                <P>SALARIO ATUAL</p>
                <P>EM QUE ANO FOI CONTRATADO NA EMPRESA</p>
                <p>E A MATRICULA DESSE FUNCIONARIO</p>
            </ul> 
            </br>   

            <p>DE ACORDO COM O EXEMPLO ABAIXO:</p>

            <p>http://localhost:9500/?idade=30&sexo=M&salario_base=2000&anoContratacao=2010&matricula=123</p>
        </body>
        </html>
        `);
    }

  
        if (
            isNaN(idade) || idade <= 16 ||
            (sexo !== "M" && sexo !== "F") ||
            isNaN(salarioBase) ||
            isNaN(anoContratacao) || anoContratacao <= 1960 ||
            isNaN(matricula) || matricula <= 0
        )   {
            res.send("<h1>Dados inválidos!</h1>");
        }

    const anoAtual = new Date().getFullYear();
    const tempoEmpresa = anoAtual - anoContratacao;

    let percentual = 0;
    let ajusteFixo = 0;

    
    if (idade >= 18 && idade <= 39) {
        if (sexo === "M") {
            percentual = 0.10;
            ajusteFixo = tempoEmpresa <= 10 ? -10 : 17;
        } else {
            percentual = 0.08;
            ajusteFixo = tempoEmpresa <= 10 ? -11 : 16;
        }
    }

    
    else if (idade >= 40 && idade <= 69) {
        if (sexo === "M") {
            percentual = 0.08;
            ajusteFixo = tempoEmpresa <= 10 ? -5 : 15;
        } else {
            percentual = 0.10;
            ajusteFixo = tempoEmpresa <= 10 ? -7 : 14;
        }
    }

    
    else if (idade >= 70 && idade <= 99) {
        if (sexo === "M") {
            percentual = 0.15;
            ajusteFixo = tempoEmpresa <= 10 ? -15 : 13;
        } else {
            percentual = 0.17;
            ajusteFixo = tempoEmpresa <= 10 ? -17 : 12;
        }
    }

    else {
        res.write("<h1>Idade fora das faixas permitidas.</h1>");
    }

    const salarioReajustado = salarioBase + (salarioBase * percentual) + ajusteFixo;

    res.send(`
        <html>
        <body>
            <h1>Resultado do Reajuste</h1>
            <p>Matricula ${matricula}</p>
            <p>Idade:: ${idade}</p>
            <p>Sexo: ${sexo}</p>
            <p>Salario Base: R$ ${salarioBase}</p>
            <p>Tempo de Empresa: ${tempoEmpresa} anos</p>
            <h2> Novo Salario: R$ ${salarioReajustado}</h2>
        </body>
        </html>
    `);
});

app.listen(porta, host, () => {
  console.log(`Servidor escutando em http://localhost:${porta} `);
});