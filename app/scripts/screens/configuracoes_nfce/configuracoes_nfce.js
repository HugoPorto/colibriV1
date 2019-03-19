var loki = require("lokijs");
var db = new loki("loki.json");
var read = require('read-file-utf8');
var data = read('./loki.json');
db.loadJSON(data);
window.Vue = require('vue');

if (db.getCollection('config_nfce') == null) {
    db.addCollection('config_nfce');
    db.save();
    alert('Coleção de empresas criada com sucesso...');
}

var config_nfces = db.getCollection('config_nfce');

new Vue({
    el: 'body',
    data: {
        add: true,
        debug: false,
        mode: '',
        config_nfce: {
            icms: {
                cst: '',
                modalidade_bc_icms: '',
                valor_do_frete_nao_compoe_bc_icms: '',
                valor_despesas_nao_compoe_valor_bc_icms: '',
                valor_desconto_nao_compoe_valor_bc_icms: ''
            },
            pis: {
                situacao_tributaria_pis: '',
                valor_frete_compoe_bc_pis: '',
                valor_despesas_compoe_valor_bc_pis: '',
                valor_desconto_compoe_valor_bc_pis: ''
            },
            confins: {
                situacao_tributaria_cofins: '',
                valor_frete_compoe_bc_cofins: '',
                valor_despesas_compoe_valor_bc_cofins: '',
                valor_desconto_compoe_valor_bc_cofins: ''
            },
            cfop: {
                codigo: ''
            },
            gerais: {
                tipo_atendimento: '',
                layout_impressao: '',
                csc: '',
                token: '',
            }
        },
        openModal: false
    },
    ready: function () {
        this.config_nfces = config_nfces.data;
        if (this.config_nfces[0].$loki !== 'undefined') {
            this.add = false;
        }
    },
    methods: {
        makeDebug: function () {
            if (this.debug == false) {
                this.debug = true;
                this.add = true;
            } else {
                this.debug = false;
                this.add = false;
            }
        },
        editEmpresa: function (em) {
            this.mode = 'edicao';
            this.openModal = true;
            this.empresa = em;
        },
        createEmpresa: function () {
            this.mode = 'cadastro';
            this.openModal = true;
            this.empresa = {
                nome: '',
                site: '',
                email: '',
                cnpj: '',
                status: 1,
                contabilidade: {
                    cnpj: '',
                    responsavel: '',
                    email: '',
                    telefone: '',
                },
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
                }
            };
        },
        emStoreOrUpdate: function () {
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
                                                    this.openModal = false;
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