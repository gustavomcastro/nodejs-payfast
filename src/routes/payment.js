
module.exports = (app) => {
    app.get('/pagamentos', (req, resp) => {
        console.log('Request Recebida')
        resp.send('A request GET CHegou')
    });

    app.post('/pagamentos/pagamento', (req, resp) => {

        req.assert('forma_de_pagamento', 'Forma de pagamento é obrigatório').notEmpty();
        req.assert('valor', 'Valor é obrigatório e deve ser decimal').notEmpty().isFloat();
        const errors = req.validationErrors();
        if(errors) {
            console.log('Errors Encontrados');
            resp.status(400).send(errors);
            return;
        }

        var pagamento = req.body;
        console.log('Processando requisição novo pagamento');
        pagamento.status = 'Criado';
        pagamento.data = new Date();
        const connection = app.src.connection.connectionFactory();
        var pagamentoDao = new app.src.dao.PagamentoDao(connection);
        pagamentoDao.salva(pagamento, (error, result) => {
            
            if(error){
                console.error('Erro ao inserir o registro no banco')
                resp.status(500).send(error);
            }else{
                console.log('pagamento criado');
                console.log(result)
                pagamento.id = result.insertId;
                resp.status(201).json(pagamento);
            }
            
        })
    })
}
