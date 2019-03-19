Para emitir uma NF-e ou NFC-e, você precisa preencher alguns campos com informações referentes aos tributos devidos na operação, como ICMS, PIS e COFINS. Estes são os tributos obrigatórios para uma venda comum de um estabelecimento.

ICMS: É um imposto estadual, portanto seu cálculo varia de acordo com o estado de origem e destino, e também conforme o produto comercializado;
PIS e COFINS: São impostos federais, calculados com base no regime tributário do contribuinte emitente da nota fiscal.
Estes 3 impostos são informados por item comercializado, e tem variações nas informações de acordo com o CST – Código da Situação Tributária. Este código pode ser informado pelo contador do contribuinte.

Neste artigo, você aprenderá, passo a passo e com fórmulas, como calcular e preencher os campos relacionados ao ICMS nos XMLs da NF-e e da NFC-e.

Para aprender sobre o cálculo do PIS e COFINS, leia o artigo Como calcular PIS e COFINS na NFe e NFCe.

ICMS Próprio
O ICMS Próprio se aplica a operações com CST 00, 10, 70 ou 90. 

Nestes casos, os campos que devem ser preenchidos são vBC, pICMS e vICMS. Vamos analisar cada um destes campos:

 

vBC: Base de cálculo
A base de cálculo normalmente é igual ao valor do produto (vProd_I11) somado ao valor do frete (vFrete_I15), seguro (vSeg_I16) e outras despesas (vOutro_I17a), e deduzindo ao final o valor do desconto (vDesc_I17), porém, em algumas exceções, pode-se somar o valor do IPI (vIPI_O14).

Fórmula: vProd + vFrete + vSeg + vOutro – vDesc
 

pICMS: Alíquota do ICMS
Valor da alíquota de ICMS do produto, em %. Pode ser obtida com o contador da empresa emissora.

 

vICMS: Valor do ICMS
Valor do ICMS devido. O valor deste campo é o produto da multiplicação entre o valor do campo vBC, inteiro, e o campo pICMS, dividido por 100.

Fórmula: vBC * (pICMS/100)
 

Exemplo:

vBC : R$1.000,00 = vProd + vFrete + vSeg + vOutro – vDesc

pICMS : 12%

vICMS : R$120,00 = vBC * (pICMS/100)

 

No TX2 ficaria assim  :

vBC_N15=1000.00

pICMS_N16=12.00

vICMS_N17=120.00

ICMS Próprio com redução da base de cálculo
O ICMS Próprio com redução da base de cálculo se aplica a operações com CST 20 ou 90, ou CSOSN 900.

Nestes casos, os campos que devem ser preenchidos são pRedBC, vBC, pICMS e vICMS. Vamos analisar cada um destes campos:

 

pRedBC: Percentual de redução da base de cálculo
Desconto, em %, sobre valor da base de cálculo. Pode ser obtida com o contador da empresa emissora.

 

vBC: Base de cálculo
A base de cálculo, normalmente é igual ao valor do produto (vProd_I11) somado ao valor do frete (vFrete_I15), seguro (vSeg_I16) e outras despesas (vOutro_I17a), e deduzindo ao final o valor do desconto (vDesc_I17). Após esse cálculo, reduza o percentual da redução da Base de cálculo (pRedBC_N14). Em algumas exceções, pode-se somar o valor do IPI (vIPI_O14).

Fórmula: (vProd + vFrete + vSeg + vOutro – vDesc) * (1-(pRedBC/100))
 

pICMS: Alíquota do ICMS
Valor da alíquota de ICMS do produto, em %. Pode ser obtida com o contador da empresa emissora.

 

vICMS: Valor do ICMS
Valor do ICMS devido. O valor deste campo é o produto da multiplicação entre o valor do campo vBC e o campo pICMS/100.

Fórmula: vBC * (pICMS/100)
 

Exemplo, a base de cálculo original era R$1.000,00:

pRedBC: 20%

vBC: R$800,00= (vProd + vFrete + vSeg + vOutro – vDesc) * (1-(pRedBC/100))

pICMS: 12%

vICMS: R$96,00 = vBC * (pICMS/100)

 

No TX2 ficaria assim:

pRedBC_N14=20.00

vBC_N15=800.00

pICMS_N16=12.00

vICMS_N17=96.00

ICMS Substituição Tributária
O ICMS Substituição Tributária se aplica a operações com CST 10, 30, 70 ou 90, ou CSOSN 201, 202, 203 ou 900.

Nestes casos, os campos que devem ser preenchidos são pMVAST, pRedBCST, vBC, pICMS e vICMS. Vamos analisar cada um destes campos:

 

pMVAST: Percentual da margem de valor adicionado do ICMS ST
Pode ser obtida com o contador da empresa emissora da NFe.

 

pRedBCST: Percentual de Redução da Base de Cálculo
Desconto, em %, sobre valor da base de cálculo. Pode ser obtida com o contador da empresa emissora.

 

vBCST: Base de cálculo
A base de cálculo, normalmente é igual ao valor do produto (vProd_I11) somado ao valor do frete (vFrete_I15), seguro (vSeg_I16) e outras despesas (vOutro_I17a), e deduzindo ao final o valor do desconto (vDesc_I17). Feito isso acrescente o percentual do MVA (pMVAST_N19). Após esse cálculo, reduza o percentual da redução da Base de cálculo (pRedBC_N14). Em algumas exceções, pode-se somar o valor do IPI (vIPI_O14).

Fórmula: ((vProd + vFrete + vSeg + vOutro – vDesc) * (1+pMVAST/100)) * (1-(pRedBC/100))
 

pICMSST: Alíquota do ICMS
Valor da alíquota de ICMS do produto, em %. Pode ser obtida com o contador da empresa emissora.

 

vICMSST: Valor do ICMS
O valor deste campo é o produto da multiplicação entre o valor do campo vBCST e o campo pICMSST/100.

Fórmula: vBCST * (pICMSST/100)
 

Exemplo, a base de cálculo original era R$1.000,00:

pMVAST: 50%

pRedBCST: 20%

vBCST: R$1.200,00 – Fórmula = ((vProd + vFrete + vSeg + vOutro – vDesc) * (1+pMVAST/100)) * (1-(pRedBC/100))

pICMSST: 12%

vICMSST:  R$144,00 – Fórmula = vBCST * (pICMSST/100)

 

No TX2 ficaria assim:

pMVAST_N19=50.00

pRedBCST_N20=20.00

vBCST_N21=1200.00

pICMSST_N22=12.00

vICMSST_N23=144.00

 

ICMS Diferimento
O ICMS Substituição Tributária se aplica a operações com CST 51.

Nestes casos, os campos que devem ser preenchidos são pRedBC, vBC, pICMS e vICMSOp, pDif, vICMSDif e vICMS. Vamos analisar cada um destes campos:

 

pRedBC: Percentual de redução da base de cálculo
Desconto, em %, sobre valor da base de cálculo. Pode ser obtida com o contador da empresa emissora.

 

vBC: Base de cálculo
A base de cálculo, normalmente é igual ao valor do produto (vProd_I11) somado ao valor do frete (vFrete_I15), seguro (vSeg_I16) e outras despesas (vOutro_I17a), e deduzindo ao final o valor do desconto (vDesc_I17). Após esse cálculo, reduza o percentual da redução da Base de cálculo (pRedBC_N14). Em algumas exceções, pode-se somar o valor do IPI (vIPI_O14).

Fórmula: (vProd + vFrete + vSeg + vOutro – vDesc) * (1-(pRedBC/100))
 

pICMS: Alíquota do ICMS
Pode ser obtida com o contador da empresa emissora da NFe.

 

vICMSOp: Valor do ICMS
Valor do ICMS antes do cálculo de diferimento. O valor deste campo é o produto da multiplicação entre o valor do campo vBC e o campo pICMS/100.

Fórmula: vBC * (pICMS/100)
 

pDif: Percentual do diferimento
Alíquota, em %, do ICMS a ser diferido. Pode ser obtido com o contador da empresa emissora da NFe.

 

vICMSDif: Valor do ICMS Diferido
Valor do ICMS diferido, isto é, que não será pago. O valor deste campo é o produto da multiplicação entre o valor do campo vICMSOP e o campo pDif/100

Fórmula: vICMSOp * (pDif/100)
 

vICMS: Valor do ICMS realmente devido
Valor final do ICMS, que realmente será pago. Resulta do vICMSOp menos o vICMSDif.

Fórmula: vICMSOp – vICMSDif
 

Exemplo, a base de cálculo original era R$1.000,00:

pRedBC: 20%

vBC: R$800,00 – Fórmula = (vProd + vFrete + vSeg + vOutro – vDesc) * (1-(pRedBC/100))

pICMS: 12%

vICMSOp: R$96,00 – Fórmula = vBC * (pICMS/100)

pDif: 30%

vICMSDif: R$28,80 – Fórmula = vICMSOp * (pDif/100)

vICMS: R$67,20 – Fórmula = vICMSOp – vICMSDif

 

No TX2 ficaria assim  :

pRedBC_N14=20.00

vBC_N15=800.00

pICMS_N16=12.00

vICMSOp_N16a=96.00

pDif_N16b=30.00

vICMSDif_N16c=28.80

vICMS_N17=67.20

 

ICMS Simples Nacional com crédito de ICMS
O ICMS Substituição Tributária se aplica a operações com CSOSN 101, 201 ou 900.

Nestes casos, os campos que devem ser preenchidos são pCredSN e vCredICMSSN. Vamos analisar cada um destes campos:

 

pCredSN : Alíquota para cálculo do crédito
Valor da alíquota para cálculo de crédito, em %. É determinada pelo enquadramento da empresa emissora, no anexo da tabela do Simples Nacional. Pode ser obtida pelo contador da empresa.

 

vCredICMSSN : Valor do crédito de ICMS
Neste caso, não possui o campo de base de cálculo para ser informado, portanto, para obtê-la, deve ser utilizada a fórmula da base do ICMS próprio.

 

Exemplo (Vamos utilizar como valor dos produtos R$1.000,00):

pCredSN: 3%

vCredICMSSN: R$30,00

 

No TX2, ficaria assim:

pCredSN_N29=3.00

vCredICMSSN_N30=30.00