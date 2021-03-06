this.loadpattern();

new Vue({
    el: 'body',
    data: {
        debug: false,
        empresas: [],
        cidadesestados: [],
        estados: [],
        empresa: {
            nome: '',
            site: '',
            email: '',
            cnpj: '',
            status: 1,
            endereco: {
                endereco: '',
                complemento: '',
                numero: '',
                bairro: '',
                municipio: '',
                codigoMunicipio: '',
                uf: '',
                cep: '',
                pais: 'Brasil',
                codigoPais: '1058',
                fone: ''
            },
        },
    },

    ready: function () {
        this.empresas = empresas.data;
        this.cidadesestados = cidadesestados.data[0].cidades;
        this.estados = [estados.data[0]][0].estados;
        console.log('Empresas | Registros: ' + this.empresas.length);
        console.log('Cidades e Estados | Registros: ' + this.cidadesestados.length);
        console.log('Estados | Registros: ' + [estados.data[0]][0].estados.length);
    },
    methods: {
        makeDebug: function () {
            if (this.debug == false) {
                this.debug = true;
            } else {
                this.debug = false;
            }
        },
        saleStoreOrUpdate: function () {
            if (this.empresa.nome == "") {
                alert('O Nome precisa ser preenchido!');
            }
            if (this.empresa.cnpj == "") {
                alert('O CNPJ precisa ser preenchido!');
            }
            if (this.empresa.endereco.endereco == "") {
                alert('O Endereço precisa ser preenchido!');
            }
            if (this.empresa.endereco.numero == "") {
                alert('O Número precisa ser preenchido!');
            }
            if (this.empresa.endereco.bairro == "") {
                alert('O Bairro precisa ser preenchido!');
            }
            if (this.empresa.endereco.municipio == "") {
                alert('O Município precisa ser preenchido!');
            }
            if (this.empresa.endereco.uf == "") {
                alert('O UF do estado precisa ser preenchido!');
            }
            if (this.empresa.endereco.cep == "") {
                alert('O CEP precisa ser preenchido!');
            }
            if (this.empresa.endereco.pais == "") {
                alert('O País precisa ser preenchido!');
            }
            if (this.empresa.endereco.fone == "") {
                alert('O Telefone precisa ser preenchido!');
            }

            if (this.empresa.nome !== "") {
                if (this.empresa.cnpj !== "") {
                    if (this.empresa.endereco.endereco !== "") {
                        if (this.empresa.endereco.numero !== "") {
                            if (this.empresa.endereco.bairro !== "") {
                                if (this.empresa.endereco.municipio !== "") {

                                    for (var c = 0; c < this.cidadesestados.length; c++) {
                                        if (this.empresa.endereco.municipio == this.cidadesestados[c].nome_cidade) {
                                            this.empresa.endereco.codigoMunicipio = this.cidadesestados[c].ibge_cidade;
                                        }
                                    }

                                    if (this.empresa.endereco.uf !== "") {
                                        if (this.empresa.endereco.cep !== "") {
                                            if (this.empresa.endereco.pais !== "") {
                                                if (this.empresa.endereco.fone !== "") {
                                                    if (typeof this.empresa.$loki !== 'undefined') {
                                                        empresas.update(this.empresa);
                                                    } else {
                                                        empresas.insert(this.empresa);
                                                    }
                                                    db.save();

                                                    this.empresa = {
                                                        nome: '',
                                                        site: '',
                                                        email: '',
                                                        cnpj: '',
                                                        status: 0,
                                                        endereco: {
                                                            endereco: '',
                                                            complemento: '',
                                                            numero: '',
                                                            bairro: '',
                                                            municipio: '',
                                                            codigoMunicipio: '',
                                                            uf: '',
                                                            cep: '',
                                                            pais: 'Brasil',
                                                            codigoPais: '1058',
                                                            fone: ''
                                                        },
                                                    }
                                                    // location.reload();
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
});

function loadpattern() {
    var loki = require("lokijs");
    var db = new loki("loki.json");
    var read = require('read-file-utf8');
    var data = read('./loki.json');
    db.loadJSON(data);
    window.Vue = require('vue');

    if (db.getCollection('empresas') == null) {
        db.addCollection('empresas');
        db.save();
        alert('Coleção de empresas criada com sucesso...');
    }

    var empresas = db.getCollection('empresas');
    var cidadesestados = db.getCollection('cidadesestados');
    var estados = db.getCollection('estados');
}