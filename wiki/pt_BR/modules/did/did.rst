.. _did-menu-list:

**********************
Descrição dos campos
**********************



.. _did-did:

Did
"""

O número extamente como chega no Asterisk.




.. _did-activated:

Estado
""""""

Nós ainda não escrevemos a descrição deste campo.




.. _did-callerid:

CallerID
""""""""

Coloque aqui CallerID name, deixe em branco para usar o que vem do provedor do DID.




.. _did-connection_charge:

Taxa de Ativação
""""""""""""""""""

Custo de ativaçao. ESte custo será descontado do cliente somente no momento que o DID é vinculado ao usuário.




.. _did-fixrate:

Custo mensal
""""""""""""

Custo mensal. Este valor será descontado automaticamente todos os meses do saldo do cliente. Se o cliente não tiver crédito o DID é cancelado automaticamente.




.. _did-connection_sell:

Connection charge
"""""""""""""""""

Este é o valor que será cobrado em cada chamada, simplismente por atender a chamada.




.. _did-minimal_time_charge:

Minimum time to charge
""""""""""""""""""""""

Tempo minimo para tarifar o DID. Ex. Se colocar 3, qualquer chamada com tempo menor que 3 não será tarifado.




.. _did-initblock:

Mínimo venda
"""""""""""""

Tempo minimo em segundos para tarifar. Ex, se colocar 30, qualquer chamada que durar menos de 30 segundos, será cobrado 30 segundos.




.. _did-increment:

Bloco de venda
""""""""""""""

Bloco de quantos em quantos segundos ira cobrar apos o tempo minimo. 




.. _did-charge_of:

Cobrar
""""""

Nós ainda não escrevemos a descrição deste campo.




.. _did-calllimit:

Channel Limit
"""""""""""""

Limite de chamadas simultâneas para este DID




.. _did-description:

Descrição
"""""""""""

Nós ainda não escrevemos a descrição deste campo.




.. _did-expression_1:

Regular expression
""""""""""""""""""

Esta é um REGEX(Expressão regular) para tarifar o DID conforme o número de quem liga para o DID, CallerID. Ex. Se você ligar para o DID e seu número for 51988445566, e você quer cobrar 0.1 por minuto quando o número iniciar com 2 digitos seguidos de um 9, que seria um celular no Brasil, é so colocar




.. _did-selling_rate_1:

Preço de venda por minuto
""""""""""""""""""""""""""

Preço por minuto a ser cobrado se validar a REGEX acima




.. _did-block_expression_1:

Bloquear chamadas desta regra
"""""""""""""""""""""""""""""

Se colocar como SIM, e o número de quem ligou se o número for validado com a REGEX acime, a chamada será desligada imeditamente.




.. _did-send_to_callback_1:

Send the call to callback
"""""""""""""""""""""""""

Envia a chamada para CallBack se o número for  validado com a REGEX acime, a chamada será desligada imeditamente.




.. _did-expression_2:

Regular expression
""""""""""""""""""

Igual a REGEX 1. Você pode usar ate 3 REGEX para diferenciara ate 3 tipos de tarifas para seu DID




.. _did-selling_rate_2:

Preço de venda por minuto
""""""""""""""""""""""""""

Nós ainda não escrevemos a descrição deste campo.




.. _did-block_expression_2:

Bloquear chamadas desta regra
"""""""""""""""""""""""""""""

Nós ainda não escrevemos a descrição deste campo.




.. _did-send_to_callback_2:

Send the call to callback
"""""""""""""""""""""""""

Nós ainda não escrevemos a descrição deste campo.




.. _did-expression_3:

Regular expression
""""""""""""""""""

Igual a REGEX 1. Você pode usar ate 3 REGEX para diferenciara ate 3 tipos de tarifas para seu DID




.. _did-selling_rate_3:

Preço de venda por minuto
""""""""""""""""""""""""""

Nós ainda não escrevemos a descrição deste campo.




.. _did-block_expression_3:

Bloquear chamadas desta regra
"""""""""""""""""""""""""""""

Nós ainda não escrevemos a descrição deste campo.




.. _did-send_to_callback_3:

Send the call to callback
"""""""""""""""""""""""""

Nós ainda não escrevemos a descrição deste campo.




.. _did-cbr:

CallBack Pro
""""""""""""

Ativa o CallBack Pro.




.. _did-cbr_ua:

Use Audio
"""""""""

Executar um audio




.. _did-cbr_total_try:

Maximo de tentativas
""""""""""""""""""""

Quantas vezes o sistema vai tentar retornar para o cliente?




.. _did-cbr_time_try:

Tempo entre tentativas
""""""""""""""""""""""

Intervalo de tempo entre cada tentativa, em minutos.




.. _did-cbr_em:

Early Media
"""""""""""

Executar o audio antes de antender. O provedor do DID precisa aceitar EarlyMedia.




.. _did-TimeOfDay_monFri:

Mon-Fri
"""""""

Nós ainda não escrevemos a descrição deste campo.




.. _did-TimeOfDay_sat:

Sat
"""

Mesma regra so que para sabados




.. _did-TimeOfDay_sun:

Sun
"""

Mesma regra so que para domingos




.. _did-workaudio:

Áudio Trabalhando
""""""""""""""""""

Audio que será executado quando alguem ligar dentro do horario de atendimento.




.. _did-noworkaudio:

Fora de Horário
""""""""""""""""

Audio que será executado quando ligar fora do horario de atendimento



