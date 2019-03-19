var loki = require("lokijs");
var db = new loki("loki.json");
var fileExists = require('file-exists');
var read = require('read-file-utf8');
var data = read('./loki.json');
db.loadJSON(data);
window.Vue = require('vue');

var vendas = db.getCollection('vendas');
var clientes = db.getCollection('clientes');
var produtos = db.getCollection('produtos');
var cidadesestados = db.getCollection('cidadesestados');
var estados = db.getCollection('estados');
var ncms = db.getCollection('ncms');
var cnaes = db.getCollection('cnaes');
var cfops = db.getCollection('cfops');
var cests = db.getCollection('tabelacests');

new Vue({
    el: 'body',
    data: {
        frontDB: false,
        jumbotron: true,
        debug: false,
        cidadesestados: [],
        estados: [],
        ncms: [],
        cnaes: [],
        cfops: [],
        cests: [],
    },
    ready: function () {        
        this.cidadesestados = cidadesestados.data;
        this.estados = estados.data;
        this.ncms = ncms.data;
        this.cnaes = cnaes.data;
        this.cfops = cfops.data;
        this.cests = cests.data;
    },
    methods: {
        // dbFront: function () {
        //     if (this.frontDB == false) {
        //         this.frontDB = true;
        //         this.jumbotron = false;           
        //     } else {
        //         this.frontDB = false;
        //         this.jumbotron = true;
        //     }
        // },
        makeDebug: function () {
            if (this.debug == false) {
                this.debug = true;
            } else {
                this.debug = false;
            }
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
                    observacao: vendasBackup.data[i].observacao,
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

            // alert('Coleções recriadas com sucesso...');
        }
    }
});