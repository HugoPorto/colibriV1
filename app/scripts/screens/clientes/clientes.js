var loki = require("lokijs");
var db = new loki("loki.json");
var read = require('read-file-utf8');
var data = read('./loki.json');
db.loadJSON(data);
window.Vue = require('vue');

console.log('========Load dos Clientes========');
console.log('Tipo: ' + typeof db.getCollection('clientes'));
console.log('Collection: ' + db.getCollection('clientes'));
console.log('========Load dos Clientes========');


if (db.getCollection('clientes') == null) {
    var clientes = db.addCollection('clientes');
    db.save();
    alert('Coleção de clientes criada com sucesso...');
}


var clientes = db.getCollection('clientes');
var cidadesestados = db.getCollection('cidadesestados');
var estados = db.getCollection('estados');

new Vue({
    el: 'body',
    data: {
        debug: false,
        clientes: [],
        cidadesestados: [],
        estados: [],
        mode: '',
        client: {
            nome: '',
            cpf: '',
            telefone: '',
            email: '',
            endereco: '',
            bairro: '',
            complemento: '',
            numero: '',
            municipio: '',
            codigoMunicipio: '',
            uf: '',
            cep: '',
            codigoPais: '1058',
            Pais: 'Brasil',
        },
        openModal: false
    },
    ready: function () {
        this.mode = 'edicao';
        this.clientes = clientes.data;
        this.cidadesestados = cidadesestados.data[0].cidades;
        this.estados = [estados.data[0]][0].estados;
        console.log(this.clientes);
    },
    methods: {
        makeDebug: function () {
            if (this.debug == false) {
                this.debug = true;
            } else {
                this.debug = false;
            }
        },
        editClient: function (client) {
            this.openModal = true;
            this.client = client
        },
        createClient: function () {
            this.mode = 'cadastro';
            this.openModal = true;
            this.client = {
                nome: '',
                cpf: '',
                telefone: '',
                email: '',
                endereco: '',
                bairro: '',
                complemento: '',
                numero: '',
                municipio: '',
                codigoMunicipio: '',
                uf: '',
                cep: '',
                codigoPais: '1058',
                Pais: 'Brasil',
            };
        },
        clientStoreOrUpdate: function () {
            for (var c = 0; c < this.cidadesestados.length; c++) {
                if (this.client.municipio == this.cidadesestados[c].nome_cidade) {
                    this.client.codigoMunicipio = this.cidadesestados[c].ibge_cidade;
                }
            }

            if (typeof this.client.$loki !== 'undefined') {
                clientes.update(this.client);
            } else {
                clientes.insert(this.client);
            }
            db.save();
            this.openModal = false;

        }

    },
    computed: {
        todaInfomacaoFront: function () {
            return this.client.nome
                && this.client.cpf
                && this.client.telefone
                && this.client.endereco
                && this.client.bairro
                && this.client.numero
                && this.client.municipio
                && this.client.uf
                && this.client.cep
        }
    }
});