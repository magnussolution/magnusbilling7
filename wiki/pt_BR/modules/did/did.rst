
.. _did-did:

DID
++++++++++++++++

| O número exatamente como chega no Asterisk.




.. _did-activated:

Status
++++++++++++++++

| Nós ainda não escrevemos a descrição deste campo.




.. _did-callerid:

Callerid name
++++++++++++++++

| Coloque aqui CallerID name, deixe em branco para usar o que vem do provedor do DID.




.. _did-connection-charge:

Taxa de ativação
++++++++++++++++

| Custo de ativaçao. ESte custo será descontado do cliente somente no momento que o DID é vinculado ao usuário.




.. _did-fixrate:

Preço mensal
++++++++++++++++

| Custo mensal. Este valor será descontado automaticamente todos os meses do saldo do cliente. Se o cliente não tiver crédito o DID é cancelado automaticamente.




.. _did-connection-sell:

Taxa de conexão
++++++++++++++++

| Este é o valor que será cobrado em cada chamada, simplesmente por atender a chamada.




.. _did-minimal-time-charge:

Tempo mínimo para tarifar
++++++++++++++++

| Tempo mínimo para tarifar o DID. Ex. Se colocar 3, qualquer chamada com tempo menor que 3 não será tarifado.




.. _did-initblock:

Bloco mínimo
++++++++++++++++

| Tempo mínimo em segundos para tarifar. Ex, se colocar 30, qualquer chamada que durar menos de 30 segundos, será cobrado 30 segundos.




.. _did-increment:

Bloco de tarifação
++++++++++++++++

| Bloco de quantos em quantos segundos ira cobrar após o tempo minimo. Ex: se colocar 6, quer dizer que sempre vai arredondar de 6 em 6 segundos, ou seja, uma chamada durou 32s, vai cobrar 36s.




.. _did-charge-of:

Quem será cobrado
++++++++++++++++

| Nós ainda não escrevemos a descrição deste campo.




.. _did-calllimit:

Limite de canais
++++++++++++++++

| Limite de chamadas simultâneas para este DID




.. _did-description:

Descrição
++++++++++++++++

| Nós ainda não escrevemos a descrição deste campo.




.. _did-expression-1:

Expressão regular
++++++++++++++++

| Esta é um REGEX(Expressão regular) para tarifar o DID conforme o número de quem liga para o DID, CallerID. Ex. Se você ligar para o DID e seu número for 51988445566, e você quer cobrar 0.1 por minuto quando o número iniciar com 2 dígitos seguidos de um 9, que seria um celular no Brasil, é só colocar




.. _did-selling-rate-1:

Preço de venda por min
++++++++++++++++

| Preço por minuto a ser cobrado se validar a REGEX acima




.. _did-block-expression-1:

Bloquear chamadas a partir desta expressão
++++++++++++++++

| Se colocar como SIM, e o número de quem ligou se o número for validado com a REGEX acima, a chamada será desligada imediatamente.




.. _did-send-to-callback-1:

Enviar a chamada para callback
++++++++++++++++

| Envia a chamada para CallBack se o número for  validado com a REGEX acime, a chamada será desligada imediatamente.




.. _did-expression-2:

Expressão regular
++++++++++++++++

| Igual a REGEX 1. Você pode usar até 3 REGEX para diferenciar até 3 tipos de tarifas para seu DID




.. _did-selling-rate-2:

Preço de venda por min
++++++++++++++++

| Nós ainda não escrevemos a descrição deste campo.




.. _did-block-expression-2:

Bloquear chamadas a partir desta expressão
++++++++++++++++

| Nós ainda não escrevemos a descrição deste campo.




.. _did-send-to-callback-2:

Enviar a chamada para callback
++++++++++++++++

| Nós ainda não escrevemos a descrição deste campo.




.. _did-expression-3:

Expressão regular
++++++++++++++++

| Igual a REGEX 1. Você pode usar até 3 REGEX para diferenciar até 3 tipos de tarifas para seu DID




.. _did-selling-rate-3:

Preço de venda por min
++++++++++++++++

| Nós ainda não escrevemos a descrição deste campo.




.. _did-block-expression-3:

Bloquear chamadas a partir desta expressão
++++++++++++++++

| Nós ainda não escrevemos a descrição deste campo.




.. _did-send-to-callback-3:

Enviar a chamada para callback
++++++++++++++++

| Nós ainda não escrevemos a descrição deste campo.




.. _did-cbr:

Callback pro
++++++++++++++++

| Ativa o CallBack Pro.




.. _did-cbr-ua:

Usar áudio
++++++++++++++++

| Executar um áudio




.. _did-cbr-total-try:

Tentativa máxima
++++++++++++++++

| Quantas vezes o sistema vai tentar retornar para o cliente?




.. _did-cbr-time-try:

Intervalo entre tentativas
++++++++++++++++

| Intervalo de tempo entre cada tentativa, em minutos.




.. _did-cbr-em:

Early media
++++++++++++++++

| Executar o áudio antes de atender. O provedor do DID precisa aceitar EarlyMedia.




.. _did-TimeOfDay-monFri:

Seg-Sex
++++++++++++++++

| Ex: sua trabalha de 09 as 12 e de 14h às 18h, e dentro deste horário você quer executar o callback e retornar a chamada para a pessoa que ligou, então coloque 09:00-12:00|14:00-18:00, os intervalos são separados por |




.. _did-TimeOfDay-sat:

Sab
++++++++++++++++

| Mesma regra só que para sábados




.. _did-TimeOfDay-sun:

Domingo
++++++++++++++++

| Mesma regra só que para domingos




.. _did-workaudio:

Áudio Trabalhando
++++++++++++++++

| Audio que será executado quando alguém ligar dentro do horário de atendimento.




.. _did-noworkaudio:

Trabalhando
++++++++++++++++

| Áudio que será executado quando ligar fora do horário de atendimento



