
.. _queue-id_user:

Usuário
++++++++++++++++

| Nós ainda não escrevemos a descrição deste campo.




.. _queue-name:

Nome
++++++++++++++++

| Nós ainda não escrevemos a descrição deste campo.




.. _queue-language:

Idioma
++++++++++++++++

| Nós ainda não escrevemos a descrição deste campo.




.. _queue-strategy:

Estratégia
++++++++++++++++

| Nós ainda não escrevemos a descrição deste campo.




.. _queue-ringinuse:

Chamar conta SIP em uso
++++++++++++++++

| Chamar ou não agentes da fila que estejam em chamada.




.. _queue-timeout:

Chamado por
++++++++++++++++

| Por quanto tempo deve ficar chamando um agente




.. _queue-retry:

Tempo para chamar proximo agente
++++++++++++++++

| Tempo em segundos para tentar chamadas outro agente caso o anterior não atender




.. _queue-wrapuptime:

Tempo para próxima chamada
++++++++++++++++

| Intervalo de tempo em segundos que o agente poderá receber outra chamada




.. _queue-weight:

Peso
++++++++++++++++

| Importância desta fila. Por exemplo, você tem o mesmo agente em 2 filas, e chega 12 chamadas ao mesmo tempo, o Asterisk vai enviar a chamada da fila com maior importancia para o agente.




.. _queue-periodic-announce:

Periodic announce
++++++++++++++++

| Audio para os anúncios. Você pode colocar mais de um áudio, separando por  (,). Estes dados devem estar no diretório /var/lib/asterisk/sounds/




.. _queue-periodic-announce-frequency:

Frequência
++++++++++++++++

| Frequência que deve executar os anúncios.




.. _queue-announce-position:

Announce position
++++++++++++++++

| Informar a posição que a pessoa se encontra na fila




.. _queue-announce-holdtime:

Announce holdtime
++++++++++++++++

| Deveria ser incluso no anuncio da posição a estimativa de espera?




.. _queue-announce-frequency:

Frequência de anúncio
++++++++++++++++

| A cada quantos segundos deve informar a posição. Deixe em 0 para desativar o anuncio de posição.




.. _queue-joinempty:

Aceitar quando vazia
++++++++++++++++

| Permitir novas chamadas quando não tiver agente disponível para atender a chamada




.. _queue-leavewhenempty:

Desligar fila sem agentes
++++++++++++++++

| Desligar as chamadas em espera quando não tiver mais agente livres




.. _queue-max_wait_time:

Tempo máximo de espera
++++++++++++++++

| Tempo maximo de espera para ser atendido




.. _queue-max_wait_time_action:

Ação quando superar a espera
++++++++++++++++

| Conta VoIP, IVR ou Fila de espera, para enviar o cliente caso o tempo máximo de espera for superado. Formatos aceitos: SIP/conta_voip, QUEUE/nome_da_queue ou IRV/nome_da_ivr.




.. _queue-ring_or_moh:

Chamar ou executar MOH
++++++++++++++++

| Nós ainda não escrevemos a descrição deste campo.




.. _queue-musiconhold:

Audio tom de espera
++++++++++++++++

| Nós ainda não escrevemos a descrição deste campo.



