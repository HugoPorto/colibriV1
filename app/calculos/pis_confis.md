Para emitir uma NF-e ou NFC-e, você precisa preencher alguns campos com informações referentes aos tributos devidos na operação, como ICMS, PIS e COFINS. Estes são os tributos obrigatórios para uma venda comum de um estabelecimento.

ICMS: É um imposto estadual, portanto seu cálculo varia de acordo com o estado de origem e destino, e também conforme o produto comercializado;
PIS/COFINS: São impostos federais, calculados com base no regime tributário do contribuinte emitente da nota fiscal.
Estes 3 impostos são informados por item comercializado, e tem variações nas informações de acordo com o CST – Código da Situação Tributária. Este código pode ser informado pelo contador do contribuinte.

Neste artigo, você aprenderá, passo a passo e com fórmulas, como calcular e preencher os campos relacionados ao PIS e COFINS nos XMLs da NF-e e da NFC-e.

Para aprender sobre o cálculo do ICMS, leia o artigo Como calcular o ICMS na NF-e e NFC-e.

Como calcular o PIS
O PIS por alíquota se aplica a operações com CST 01, 02, 49, 50, 51, 52, 53, 54, 55, 56, 60, 61, 62, 63, 64, 65, 66, 67, 70, 71, 72, 73, 74, 75, 98 e 99. 

Nestes casos, os campos que devem ser preenchidos são vBC, pPIS e vPIS. Vamos analisar cada um destes campos:

 

vBC: Base de cálculo
A base de cálculo do PIS é a receita bruta da operação.

 

pPIS: Alíquota do PIS
Valor da alíquota de PIS, em %. Esse valor é determinado pelo regime tributário em que a empresa emissora está enquadrada.

Lucro Real ou Presumido Cumulativo: 0,65%
Lucro Real Não Cumulativo: 1,65%
 

vPIS: Valor do PIS
Valor do PIS devido. O valor deste campo é o produto da multiplicação entre o valor do campo vBC, inteiro, e o campo pPIS, dividido por 100.

Fórmula: vBC * (pPIS/100)
 

Exemplo, um caso onde a empresa é do Lucro Real Cumulativo e foi feita uma venda de R$1.000,00:

vBC: R$1.000,00
pPIS: 0,65%
vPIS: R$6,50 – Fórmula – vBC * (pPIS/100)
 

No TX2 ficaria assim  :

vBC_Q07=1000.00
pPIS_Q08=0.65
vPIS_Q09=6.50
NF-e

Como calcular o COFINS
O COFINS por alíquota se aplica a operações com CST 01, 02, 49, 50, 51, 52, 53, 54, 55, 56, 60, 61, 62, 63, 64, 65, 66, 67, 70, 71, 72, 73, 74, 75, 98 e 99. 

Nestes casos, os campos que devem ser preenchidos são vBC, pCOFINS e vCOFINS. Vamos analisar cada um destes campos:

 

vBC: Base de cálculo
A base de cálculo do COFINS é a receita bruta da operação.

 

pCOFINS: Alíquota do COFINS
Valor da alíquota de COFINS, em %. Esse valor é determinado pelo regime tributário em que a empresa emissora está enquadrada.

Lucro Real ou Presumido Cumulativo: 3,00%
Lucro Real Não Cumulativo: 7,60%
 

vCOFINS: Valor do COFINS
Valor do COFINS devido. O valor deste campo é o produto da multiplicação entre o valor do campo vBC, inteiro, e o campo pCOFINS, dividido por 100.

Fórmula: vBC * (pCOFINS/100)
 

Exemplo, um caso onde a empresa é do Lucro Real Cumulativo e foi feita uma venda de R$1.000,00:

vBC: R$1.000,00
pCOFINS: 3,00%
vCOFINS: R$30,00 – Fórmula – vBC * (pCOFINS/100)
 

No TX2 ficaria assim  :

vBC_S07=1000.00
pCOFINS_S08=3.00
vCOFINS_S11=30.00