var loki = require("lokijs");
var db = new loki("loki.json");
var read = require('read-file-utf8');
var data = read('./loki.json');
db.loadJSON(data);
window.Vue = require('vue');

if (db.getCollection('vendas') == null) {
    var vendas = db.addCollection('vendas');
    db.save();
    alert('Coleção de vendas criada com sucesso...');
}

var vendas = db.getCollection('vendas');
var clientes = db.getCollection('clientes');
var produtos = db.getCollection('produtos');

new Vue({
    el: 'body',
    data: {
        debug: false,
        vendas: [],
        clientes: [],
        produtos: [],
        total: 0,
        mode: '',
        venda: {
            clientes: '',
            produtos: '',
            preco_unitario: 0,
            quantidade: 0,
            observacao: '',
            dataVenda: ''
        },
        openModal: false
    },

    ready: function () {
        this.mode = 'edicao';
        this.vendas = vendas.data;
        this.clientes = clientes.data;
        this.produtos = produtos.data;
        console.log('==========Vendas========');
        for (var i = 0; i < this.vendas.length; i++) {
            this.total += this.vendas[i].preco_unitario * this.vendas[i].quantidade;
            console.log('Total Em Caixa: ' + this.total);
            console.log('Cliente: ' + this.vendas[i].cliente + ' - Venda: ' + this.vendas[i].preco_unitario + 1);
            console.log('-----------------------------');
        }
        this.somaTotal = this.total;
        console.log('==========Clientes========');
        for (var i = 0; i < this.clientes.length; i++) {
            console.log('Cliente: ' + this.clientes[i].nome);
            console.log('-----------------------------');
        }
        console.log('==========Produtos========');
        for (var i = 0; i < this.produtos.length; i++) {
            console.log('Produto: ' + this.produtos[i].nome + ' - Preço: R$ ' + this.produtos[i].preco);
            console.log('-----------------------------');
        }
    },
    methods: {
        makeDebug: function () {
            if (this.debug == false) {
                this.debug = true;
            } else {
                this.debug = false;
            }
        },
        editSale: function (venda) {
            // location.reload();
            this.mode = 'edicao';
            this.openModal = true;
            this.venda = venda

            console.log(this.venda);
        },
        createSale: function () {
            console.log('Method: createSale()');
            this.mode = 'cadastro';
            this.openModal = true;
            this.venda = {
                // cliente: this.clientes,
                cliente: '',
                // produto: this.produtos,
                produto: '',
                preco_unitario: '',
                quantidade: '',
                observacao: '',
                dataVenda: '',
            };
        },
        saleStoreOrUpdate: function () {
            console.log('Method: saleStoreOrUpdate()');
            // var data = new Date(),
            //     dia = data.getDate().toString(),
            //     diaF = (dia.length == 1) ? '0' + dia : dia,
            //     mes = (data.getMonth() + 1).toString(), //+1 pois no getMonth Janeiro começa com zero.
            //     mesF = (mes.length == 1) ? '0' + mes : mes,
            //     anoF = data.getFullYear();
            // hora = data.getHours();
            // minuto = data.getMinutes();
            // segundo = data.getSeconds();

            // let dataAtual =  anoF + "-" + mesF + "-" + diaF + "T" + hora + ":" + minuto + ":" + segundo;

            // this.dataVenda = dataAtual

            if (typeof this.venda.$loki !== 'undefined') {
                vendas.update(this.venda);
            } else {
                this.venda.preco_unitario = produtos.find({ nome: this.venda.produto })[0].preco;
                // console.log(produtos.find({ nome: this.venda.produto })[0]);
                vendas.insert(this.venda);
            }
            db.save();
            this.openModal = false;
            location.reload();
        },
        saveCloud: function () {
            var mysql = require("mysql");

            var connection = mysql.createConnection({
                host: "162.241.2.118",
                user: "focuxme_erp",
                password: "1423colibri",
                database: "focuxme_colibrierp"
            });

            connection.connect((err) => {
                if (err) {
                    return console.log(err.stack);
                }

                console.log("Conexão estabelecida com sucesso...");
            });

            for (let v = 0; v < this.vendas.length; v++) {

                queryString = 'INSERT INTO vendas(cliente, produto, quantidade, preco_unitario) VALUES (' + '"' + this.vendas[v].cliente + '",' + '"' + this.vendas[v].produto + '",' + this.vendas[v].preco_unitario + ',' + this.vendas[v].quantidade + ' );';
                console.log(queryString);

                connection.query(queryString, (err, rows, fields) => {
                    if (err) {
                        return console.log(" Aconteceu um erro ao consultar os dados...");
                    }

                    console.log(rows);

                });
            }

            connection.end(() => {
                console.log("Conexão fechada com sucesso...");
            });

        },
        backup: function () {
            console.log('Method: backup()');
            var dbB = new loki("backup.json");
            dbB.save();

            var vendasBackup = dbB.addCollection('vendasBackup');
            var clientesBackup = dbB.addCollection('clientesBackup');
            var produtosBackup = dbB.addCollection('produtosBackup');

            for (var i = 0; i < vendas.data.length; i++) {
                let data = {
                    cliente: vendas.data[i].cliente,
                    produto: vendas.data[i].produto,
                    preco_unitario: vendas.data[i].preco_unitario,
                    quantidade: vendas.data[i].quantidade,
                    observacao: vendas.data[i].observacao,
                }
                vendasBackup.insert(data);
                dbB.save();
            }

            for (var i = 0; i < clientes.data.length; i++) {
                let data = {
                    nome: clientes.data[i].nome,
                    cpf: clientes.data[i].cpf,
                    telefone: clientes.data[i].telefone,
                    email: clientes.data[i].email,
                    endereco: clientes.data[i].endereco,
                    bairro: clientes.data[i].bairro,
                    numero: clientes.data[i].numero,
                }
                clientesBackup.insert(data);
                dbB.save();
            }

            for (var i = 0; i < produtos.data.length; i++) {
                let data = {
                    nome: produtos.data[i].nome,
                    preco: produtos.data[i].preco,
                    quantidade: produtos.data[i].quantidade,
                    cod_barras: produtos.data[i].cod_barras,
                    peso_liquido: produtos.data[i].peso_liquido,
                    peso_bruto: produtos.data[i].peso_bruto,
                }
                produtosBackup.insert(data);
                dbB.save();
            }

            alert('Backup realizado com sucesso...');
        },
        newDB: function () {
            var dbB = new loki("backup.json");
            var dataBackup = read('./backup.json');
            dbB.loadJSON(dataBackup);
            var db = new loki("loki.json");

            var vendasBackup = dbB.getCollection('vendasBackup');
            var clientesBackup = dbB.getCollection('clientesBackup');
            var produtosBackup = dbB.getCollection('produtosBackup');

            var vendas = db.addCollection('vendas');
            var clientes = db.addCollection('clientes');
            var produtos = db.addCollection('produtos');

            for (var i = 0; i < vendasBackup.data.length; i++) {
                let data = {
                    cliente: vendasBackup.data[i].cliente,
                    produto: vendasBackup.data[i].produto,
                    observacao: '',
                    preco_unitario: vendasBackup.data[i].preco_unitario,
                    quantidade: vendasBackup.data[i].quantidade,
                }
                vendas.insert(data);
                db.save();
            }

            for (var i = 0; i < clientesBackup.data.length; i++) {
                let data = {
                    nome: clientesBackup.data[i].nome,
                    cpf: clientesBackup.data[i].cpf,
                    telefone: clientesBackup.data[i].telefone,
                    email: clientesBackup.data[i].email,
                    endereco: clientesBackup.data[i].endereco,
                    bairro: clientesBackup.data[i].bairro,
                    numero: clientesBackup.data[i].numero,
                }
                clientes.insert(data);
                db.save();
            }

            for (var i = 0; i < produtosBackup.data.length; i++) {
                let data = {
                    nome: produtosBackup.data[i].nome,
                    preco: produtosBackup.data[i].preco,
                    quantidade: produtosBackup.data[i].quantidade,
                    cod_barras: produtosBackup.data[i].cod_barras,
                    peso_liquido: produtosBackup.data[i].peso_liquido,
                    peso_bruto: produtosBackup.data[i].peso_bruto,
                }
                produtos.insert(data);
                db.save();
            }

            alert('Coleções recriadas com sucesso...');
        }
    },

    computed: {
        todaInfomacaoFront: function () {
            return this.venda.dataVenda;
        }
    }
});