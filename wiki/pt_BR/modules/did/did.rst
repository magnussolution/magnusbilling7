.. _did-menu-list:

***************
Lista de campos
***************



.. _did-did:

DID
"""

| O número extamente como chega no Asterisk.




.. _did-activated:

Status
""""""

| Nós ainda não escrevemos a descrição deste campo.




.. _did-callerid:

Callerid name
"""""""""""""

| Coloque aqui CallerID name, deixe em branco para usar o que vem do provedor do DID.




.. _did-connection_charge:

Taxa de conexão
""""""""""""""""

| Custo de ativaçao. ESte custo será descontado do cliente somente no momento que o DID é vinculado ao usuário.




.. _did-fixrate:

Preço mensal
"""""""""""""

| Custo mensal. Este valor será descontado automaticamente todos os meses do saldo do cliente. Se o cliente não tiver crédito o DID é cancelado automaticamente.




.. _did-connection_sell:

Taxa de conexão
""""""""""""""""

| Este é o valor que será cobrado em cada chamada, simplismente por atender a chamada.




.. _did-minimal_time_charge:

Tempo mínimo para tarifar
""""""""""""""""""""""""""

| Tempo minimo para tarifar o DID. Ex. Se colocar 3, qualquer chamada com tempo menor que 3 não será tarifado.




.. _did-initblock:

Bloco mínimo
"""""""""""""

| Tempo minimo em segundos para tarifar. Ex, se colocar 30, qualquer chamada que durar menos de 30 segundos, será cobrado 30 segundos.




.. _did-increment:

Bloco de tarifação
""""""""""""""""""""

| Bloco de quantos em quantos segundos ira cobrar apos o tempo minimo. Ex: se colocar 6, quer dizer que sempre vai arredondar de 6 em 6 segundos, ou seja, uma chamada durou 32s, vai cobrar 36s.




.. _did-charge_of:

Quem será cobrado
""""""""""""""""""

| Nós ainda não escrevemos a descrição deste campo.




.. _did-calllimit:

Limite de canais
""""""""""""""""

| Limite de chamadas simultâneas para este DID




.. _did-description:

Descrição
"""""""""""

| Nós ainda não escrevemos a descrição deste campo.




.. _did-expression_1:

Expressão regular
""""""""""""""""""

| Esta é um REGEX(Expressão regular) para tarifar o DID conforme o número de quem liga para o DID, CallerID. Ex. Se você ligar para o DID e seu número for 51988445566, e você quer cobrar 0.1 por minuto quando o número iniciar com 2 digitos seguidos de um 9, que seria um celular no Brasil, é so colocar




.. _did-selling_rate_1:

Preço de venda por min
"""""""""""""""""""""""

| Preço por minuto a ser cobrado se validar a REGEX acima




.. _did-block_expression_1:

Bloquear chamadas a partir desta expressão
"""""""""""""""""""""""""""""""""""""""""""

| Se colocar como SIM, e o número de quem ligou se o número for validado com a REGEX acime, a chamada será desligada imeditamente.




.. _did-send_to_callback_1:

Enviar a chamada para callback
""""""""""""""""""""""""""""""

| Envia a chamada para CallBack se o número for  validado com a REGEX acime, a chamada será desligada imeditamente.




.. _did-expression_2:

Expressão regular
""""""""""""""""""

| Igual a REGEX 1. Você pode usar ate 3 REGEX para diferenciara ate 3 tipos de tarifas para seu DID




.. _did-selling_rate_2:

Preço de venda por min
"""""""""""""""""""""""

| Nós ainda não escrevemos a descrição deste campo.




.. _did-block_expression_2:

Bloquear chamadas a partir desta expressão
"""""""""""""""""""""""""""""""""""""""""""

| Nós ainda não escrevemos a descrição deste campo.




.. _did-send_to_callback_2:

Enviar a chamada para callback
""""""""""""""""""""""""""""""

| Nós ainda não escrevemos a descrição deste campo.




.. _did-expression_3:

Expressão regular
""""""""""""""""""

| Igual a REGEX 1. Você pode usar ate 3 REGEX para diferenciara ate 3 tipos de tarifas para seu DID




.. _did-selling_rate_3:

Preço de venda por min
"""""""""""""""""""""""

| Nós ainda não escrevemos a descrição deste campo.




.. _did-block_expression_3:

Bloquear chamadas a partir desta expressão
"""""""""""""""""""""""""""""""""""""""""""

| Nós ainda não escrevemos a descrição deste campo.




.. _did-send_to_callback_3:

Enviar a chamada para callback
""""""""""""""""""""""""""""""

| Nós ainda não escrevemos a descrição deste campo.




.. _did-cbr:

Callback pro
""""""""""""

| Ativa o CallBack Pro.




.. _did-cbr_ua:

Usar áudio
"""""""""""

| Executar um audio




.. _did-cbr_total_try:

Tentativa máxima
"""""""""""""""""

| Quantas vezes o sistema vai tentar retornar para o cliente?




.. _did-cbr_time_try:

Intervalo entre tentativas
""""""""""""""""""""""""""

| Intervalo de tempo entre cada tentativa, em minutos.




.. _did-cbr_em:

Early media
"""""""""""

| Executar o audio antes de antender. O provedor do DID precisa aceitar EarlyMedia.




.. _did-TimeOfDay_monFri:

Seg-Sex
"""""""

| Ex: sua trabalha de 09 as 12 e de 14 as 18 horas, e dentro deste horario você quer executar o callback e retornar a chamada para a pessoa que ligou, entao coloque 09:00-12:00|14:00-18:00, os intervalos sao separados por |




.. _did-TimeOfDay_sat:

Sab
"""

| Mesma regra so que para sabados




.. _did-TimeOfDay_sun:

Domingo
"""""""

| Mesma regra so que para domingos




.. _did-workaudio:

Áudio Trabalhando
""""""""""""""""""

| Audio que será executado quando alguem ligar dentro do horario de atendimento.




.. _did-noworkaudio:

Trabalhando
"""""""""""

| Audio que será executado quando ligar fora do horario de atendimento



