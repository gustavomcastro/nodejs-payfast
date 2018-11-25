
class PagamentoDao {
    constructor(connection) {
        this._connection = connection;
    }

    salva (pagamento, callback) {
        this._connection.query('INSERT INTO pagamento SET ?', pagamento, callback)
    }

}

module.exports = () => {
    return PagamentoDao;
}