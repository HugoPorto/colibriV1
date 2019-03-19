CREATE  TABLE IF NOT EXISTS `estados` (
  `id` INT(16) NOT NULL AUTO_INCREMENT ,
  `nome_estado` VARCHAR(64) NOT NULL ,
  `uf_estado` VARCHAR(2) NOT NULL ,
  `codigo_estado` VARCHAR(2) NOT NULL ,
  PRIMARY KEY (`id`) )
ENGINE = InnoDB;

INSERT INTO `estados` (id, nome_estado, uf_estado, codigo_estado) VALUES (1, 'Acre', 'AC', '12');
INSERT INTO `estados` (id, nome_estado, uf_estado, codigo_estado) VALUES (2, 'Alagoas', 'AL', '27');
INSERT INTO `estados` (id, nome_estado, uf_estado, codigo_estado) VALUES (3, 'Amapá', 'AP', '16');
INSERT INTO `estados` (id, nome_estado, uf_estado, codigo_estado) VALUES (4, 'Amazonas', 'AM', '13');
INSERT INTO `estados` (id, nome_estado, uf_estado, codigo_estado) VALUES (5, 'Bahia', 'BA', '29');
INSERT INTO `estados` (id, nome_estado, uf_estado, codigo_estado) VALUES (6, 'Ceará', 'CE', '23');
INSERT INTO `estados` (id, nome_estado, uf_estado, codigo_estado) VALUES (7, 'Distrito Federal', 'DF', '53');
INSERT INTO `estados` (id, nome_estado, uf_estado, codigo_estado) VALUES (8, 'Espírito Santo', 'ES', '32');
INSERT INTO `estados` (id, nome_estado, uf_estado, codigo_estado) VALUES (9, 'Goiás', 'GO', '52');
INSERT INTO `estados` (id, nome_estado, uf_estado, codigo_estado) VALUES (10, 'Maranhão', 'MA', '21');
INSERT INTO `estados` (id, nome_estado, uf_estado, codigo_estado) VALUES (11, 'Mato Grosso do Sul', 'MS', '50');
INSERT INTO `estados` (id, nome_estado, uf_estado, codigo_estado) VALUES (12, 'Mato Grosso', 'MT', '51');
INSERT INTO `estados` (id, nome_estado, uf_estado, codigo_estado) VALUES (13, 'Minas Gerais', 'MG', '31');
INSERT INTO `estados` (id, nome_estado, uf_estado, codigo_estado) VALUES (14, 'Paraná', 'PR', '41');
INSERT INTO `estados` (id, nome_estado, uf_estado, codigo_estado) VALUES (15, 'Paraíba', 'PB', '25');
INSERT INTO `estados` (id, nome_estado, uf_estado, codigo_estado) VALUES (16, 'Pará', 'PA', '15');
INSERT INTO `estados` (id, nome_estado, uf_estado, codigo_estado) VALUES (17, 'Pernambuco', 'PE', '26');
INSERT INTO `estados` (id, nome_estado, uf_estado, codigo_estado) VALUES (18, 'Piauí', 'PI', '22');
INSERT INTO `estados` (id, nome_estado, uf_estado, codigo_estado) VALUES (19, 'Rio de Janeiro', 'RJ', '33');
INSERT INTO `estados` (id, nome_estado, uf_estado, codigo_estado) VALUES (20, 'Rio Grande do Norte', 'RN', '24');
INSERT INTO `estados` (id, nome_estado, uf_estado, codigo_estado) VALUES (21, 'Rio Grande do Sul', 'RS', '43');
INSERT INTO `estados` (id, nome_estado, uf_estado, codigo_estado) VALUES (22, 'Rondônia', 'RO', '11');
INSERT INTO `estados` (id, nome_estado, uf_estado, codigo_estado) VALUES (23, 'Roraima', 'RR', '14');
INSERT INTO `estados` (id, nome_estado, uf_estado, codigo_estado) VALUES (24, 'Santa Catarina', 'SC', '42');
INSERT INTO `estados` (id, nome_estado, uf_estado, codigo_estado) VALUES (25, 'Sergipe', 'SE', '28');
INSERT INTO `estados` (id, nome_estado, uf_estado, codigo_estado) VALUES (26, 'São Paulo', 'SP', '35');
INSERT INTO `estados` (id, nome_estado, uf_estado, codigo_estado) VALUES (27, 'Tocantins', 'TO', '17');
