const express = require('express');
const bodyParser = require('body-parser');
const { ExpressAdapter } = require('ask-sdk-core');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Endpoint para verificar se o servidor está rodando
app.get('/', (req, res) => {
    res.send('Servidor de teste está rodando!');
});

// Endpoint para simular a Skill da Alexa
app.post('/skill', async (req, res) => {
    const handlerInput = {
        requestEnvelope: req.body,
        context: {},  // Contexto vazio para simulação
        callbackWaitsForEmptyEventLoop: false  // Para evitar problemas com a execução assíncrona
    };

    // Simula o handler da Skill
    const response = await handler(handlerInput);
    res.json(response);
});

// Função de exemplo para controlar a lâmpada
const handler = async (handlerInput) => {
    const request = handlerInput.requestEnvelope.request;
    let speechText = 'Este é um exemplo local de resposta da Skill da Alexa.';

    // Verifica o tipo de requisição da Alexa
    if (request.type === 'IntentRequest' && request.intent.name === 'LigarLuzIntent') {
        speechText = 'Ligando a luz localmente.';
    }

    // Retorna a resposta para a Skill
    return {
        version: '1.0',
        response: {
            outputSpeech: {
                type: 'PlainText',
                text: speechText
            }
        }
    };
};

// Middleware para processar requisições da Alexa
app.post('/', (req, res) => {
    ExpressAdapter.process(req, res, handler);
});

// Inicia o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
