var loki = require("lokijs");
var db = new loki("loki.json");
var read = require('read-file-utf8');
var data = read('./loki.json');
db.loadJSON(data);
window.Vue = require('vue');
managementData(dataAtualFormatada());

function managementData(date) {
    if (!(db.getCollection('produtos'))) {
        alert('A base de dados de produtos não está presente...');
        if (!(db.getCollection('clientes'))) {
            alert('A base de dados de clientes não está presente...');
            if (!(db.getCollection('vendas'))) {
                alert('A base de dados de vendas não está presente...');
            }
        }
    } else {
        var produtos = db.getCollection('produtos');
        var vendas = db.getCollection('vendas');
        var clientes = db.getCollection('clientes');

        /**
         * O this é referente ao que está dentro...
         */
        new Vue({
            el: 'body',
            data: {
                date: '',
                produtos: [],
                clientes: [],
                mode: '',
                venda: {
                    date: '',
                    clientes: '',
                    produtos: '',
                    preco_unitario: 0,
                    quantidade: 0,
                },
                descriptionSale: {
                    
                },
                openModal: false
            },
            ready: function () {
                this.date = date;
                this.produtos = produtos.data;
                this.clientes = clientes.data;
                console.log('<<<<<<<<Produtos');
                console.log(this.produtos);
                console.log('Produtos>>>>>>>>');
                console.log('<<<<<<<<Clientes');
                console.log(this.clientes);
                console.log('Clientes>>>>>>>>');
            },
            methods: {
                editProduct: function (product) {
                    this.openModal = true;
                    this.produto = product
                },
                createProduct: function () {
                    this.mode = 'cadastro';
                    this.openModal = true;
                    this.produto = {
                        nome: '',
                        preco: '',
                        quantidade: '',
                        cod_barras: '',
                        peso_liquido: '',
                        peso_bruto: ''
                    };
                },
                productStoreOrUpdate: function () {
                    if (typeof this.produto.$loki !== 'undefined') {
                        produtos.update(this.produto);
                    } else {
                        produtos.insert(this.produto);
                    }
                    db.save();
                    this.openModal = false;
                }
            }
        });
    }
}

function dataAtualFormatada() {
    var data = new Date(),
        dia = data.getDate().toString(),
        diaF = (dia.length == 1) ? '0' + dia : dia,
        mes = (data.getMonth() + 1).toString(), //+1 pois no getMonth Janeiro começa com zero.
        mesF = (mes.length == 1) ? '0' + mes : mes,
        anoF = data.getFullYear();
    return diaF + "/" + mesF + "/" + anoF;
}