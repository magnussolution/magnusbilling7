.. _did-menu-list:

***************
Lista de campos
***************



.. _did-activated:

activated
"""""""""





.. _did-block_expression_1:

block_expression_1
""""""""""""""""""

Se colocar como SIM, e o número de quem ligou se o número for validado com a REGEX acime, a chamada será desligada imeditamente.



.. _did-block_expression_2:

block_expression_2
""""""""""""""""""





.. _did-block_expression_3:

block_expression_3
""""""""""""""""""





.. _did-callerid:

Caller Id
""""""""

Coloque aqui CallerID name, deixe em branco para usar o que vem do provedor do DID.



.. _did-calllimit:

Limite de chamadas
"""""""""

Limite de chamadas simultâneas para este DID



.. _did-cbr:

cbr
"""

Ativa o CallBack Pro.



.. _did-cbr_em:

cbr_em
""""""

Executar o audio antes de antender. O provedor do DID precisa aceitar EarlyMedia.



.. _did-cbr_time_try:

cbr_time_try
""""""""""""

Intervalo de tempo entre cada tentativa, em minutos.



.. _did-cbr_total_try:

cbr_total_try
"""""""""""""

Quantas vezes o sistema vai tentar retornar para o cliente?



.. _did-cbr_ua:

cbr_ua
""""""

Executar um audio



.. _did-charge_of:

charge_of
"""""""""





.. _did-connection_charge:

Taxa de Ativação
"""""""""""""""""

Custo de ativaçao. ESte custo será descontado do cliente somente no momento que o DID é vinculado ao usuário.



.. _did-connection_sell:

connection_sell
"""""""""""""""

Este é o valor que será cobrado em cada chamada, simplismente por atender a chamada.



.. _did-description:

Descrição
"""""""""""





.. _did-did:

Did
"""

O número extamente como chega no Asterisk.



.. _did-expression_1:

expression_1
""""""""""""

Esta é um REGEX(Expressão regular) para tarifar o DID conforme o número de quem liga para o DID, CallerID. Ex. Se você ligar para o DID e seu número for 51988445566, e você quer cobrar 0.1 por minuto quando o número iniciar com 2 digitos seguidos de um 9, que seria um celular no Brasil, é so colocar



.. _did-expression_2:

expression_2
""""""""""""

Igual a REGEX 1. Você pode usar ate 3 REGEX para diferenciara ate 3 tipos de tarifas para seu DID



.. _did-expression_3:

expression_3
""""""""""""

Igual a REGEX 1. Você pode usar ate 3 REGEX para diferenciara ate 3 tipos de tarifas para seu DID



.. _did-fixrate:

fixrate
"""""""

Custo mensal. Este valor será descontado automaticamente todos os meses do saldo do cliente. Se o cliente não tiver crédito o DID é cancelado automaticamente.



.. _did-increment:

increment
"""""""""

Bloco de quantos em quantos segundos ira cobrar apos o tempo minimo. 



.. _did-initblock:

Mínimo venda
"""""""""

Tempo minimo em segundos para tarifar. Ex, se colocar 30, qualquer chamada que durar menos de 30 segundos, será cobrado 30 segundos.



.. _did-minimal_time_charge:

minimal_time_charge
"""""""""""""""""""

Tempo minimo para tarifar o DID. Ex. Se colocar 3, qualquer chamada com tempo menor que 3 não será tarifado.



.. _did-noworkaudio:

Fora de Horário
"""""""""""

Audio que será executado quando ligar fora do horario de atendimento



.. _did-selling_rate_1:

selling_rate_1
""""""""""""""

Preço por minuto a ser cobrado se validar a REGEX acima



.. _did-selling_rate_2:

selling_rate_2
""""""""""""""





.. _did-selling_rate_3:

selling_rate_3
""""""""""""""





.. _did-send_to_callback_1:

send_to_callback_1
""""""""""""""""""

Envia a chamada para CallBack se o número for  validado com a REGEX acime, a chamada será desligada imeditamente.



.. _did-send_to_callback_2:

send_to_callback_2
""""""""""""""""""





.. _did-send_to_callback_3:

send_to_callback_3
""""""""""""""""""





.. _did-TimeOfDay_monFri:

TimeOfDay_monFri
""""""""""""""""





.. _did-TimeOfDay_sat:

TimeOfDay_sat
"""""""""""""

Mesma regra so que para sabados



.. _did-TimeOfDay_sun:

TimeOfDay_sun
"""""""""""""

Mesma regra so que para domingos



.. _did-workaudio:

Áudio Trabalhando
"""""""""

Audio que será executado quando alguem ligar dentro do horario de atendimento.


