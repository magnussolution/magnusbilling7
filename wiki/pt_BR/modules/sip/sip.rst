
.. _sip-id-user:

Usuário
++++++++++++++++

| Nós ainda não escrevemos a descrição deste campo.




.. _sip-defaultuser:

Conta SIP
++++++++++++++++

| Usuário que será usado para logar nos softphones ou qualquer dispositivo SIP.




.. _sip-secret:

Senha SIP
++++++++++++++++

| Senha que será usado para logar nos softphones ou qualquer dispositivo SIP.




.. _sip-callerid:

CallerID
++++++++++++++++

| Este é o CallerID que será mostrado no destino, em chamadas externas o provedor precisa permitir CLI para que seja identificado corretamente no destino.




.. _sip-alias:

Alias
++++++++++++++++

| Alias é um número para facilitar a discagem, pode colocar qualquer número. Pode repetir os mesmos números para contas diferente.




.. _sip-disallow:

Disallow
++++++++++++++++

| Esta opção desativa todos os codecs e deixa disponível para o usuário somente os que você selecionar abaixo.




.. _sip-allow:

Codec
++++++++++++++++

| Nós ainda não escrevemos a descrição deste campo.




.. _sip-host:

Host
++++++++++++++++

| Dynamic é a opção para deixar o usuário registrar sua conta em qualquer IP. Se você deseja autenticar o usuário por IP, coloque aqui o IP do cliente, deixe a senha em branco e coloque insecure para port/invite na TAB Informaçōes Adicionais.




.. _sip-sip-group:

Grupo
++++++++++++++++

| Usado a chamadas recebidas. Quando enviar um DID parar um grupo, vai chamar todas as contas que tiver no grupo. Você pode criar os grupos com qualquer nome




.. _sip-videosupport:

Suporte a vídeo
++++++++++++++++

| Nós ainda não escrevemos a descrição deste campo.




.. _sip-block-call-reg:

REGEX para bloqueio de chamadas
++++++++++++++++

| Bloquear chamadas usando REGEX. EX: Para bloquear chamadas para celular é so colocar ^55\\d\\d9. Você pode ver mais detalhes no link `https://regex101.com  <https://regex101.com>`_.




.. _sip-record-call:

Gravar chamadas
++++++++++++++++

| Nós ainda não escrevemos a descrição deste campo.




.. _sip-techprefix:

Tech prefix
++++++++++++++++

| Nós ainda não escrevemos a descrição deste campo.




.. _sip-nat:

NAT
++++++++++++++++

| O cliente esta atras de NAT. Você pode ver mais detalhes no link `https://www.voip-info.org/asterisk-sip-nat/  <https://www.voip-info.org/asterisk-sip-nat/>`_.




.. _sip-directmedia:

Directmedia
++++++++++++++++

| Se ativado, Asterisk vai tentar enviar a mídia RTP direto entre seu cliente e seu provedor. Precisa ativar no tronco também. Você pode ver mais detalhes no link `https://www.voip-info.org/asterisk-sip-canreinvite/  <https://www.voip-info.org/asterisk-sip-canreinvite/>`_.




.. _sip-qualify:

Qualify
++++++++++++++++

| Enviar pacote OPTION para verificar se o usuário está online.




.. _sip-context:

Contexto
++++++++++++++++

| Somente altere se você sabe o que está fazendo.




.. _sip-dtmfmode:

Dtmfmode
++++++++++++++++

| Nós ainda não escrevemos a descrição deste campo.




.. _sip-insecure:

Insecure
++++++++++++++++

| Se o host estiver dynamic esta opção precisa estar como NO. Para IP authentication alterar para port,invite.




.. _sip-deny:

Deny
++++++++++++++++

| Nós ainda não escrevemos a descrição deste campo.




.. _sip-permit:

Permit
++++++++++++++++

| Nós ainda não escrevemos a descrição deste campo.




.. _sip-type:

Tipo
++++++++++++++++

| Nós ainda não escrevemos a descrição deste campo.




.. _sip-allowtransfer:

Permitir transferência
++++++++++++++++

| Permite esta conta VoIP fazer transferência. O código para transferência é *2ramal. É necessário ativar a transferência no arquivo features.conf do Asterisk




.. _sip-ringfalse:

Ring falso
++++++++++++++++

| Ativa ring falso. Adiciona rR do comando Dial.




.. _sip-calllimit:

Limite de chamada
++++++++++++++++

| Chamadas simultâneas permitidas.




.. _sip-mohsuggest:

MOH
++++++++++++++++

| Nós ainda não escrevemos a descrição deste campo.




.. _sip-url-events:

URL notificaçōes de eventos
++++++++++++++++

| Nós ainda não escrevemos a descrição deste campo.




.. _sip-addparameter:

Adicionar parâmetro
++++++++++++++++

| Nós ainda não escrevemos a descrição deste campo.




.. _sip-amd:

AMD
++++++++++++++++

| Nós ainda não escrevemos a descrição deste campo.




.. _sip-type-forward:

Encaminhar
++++++++++++++++

| Nós ainda não escrevemos a descrição deste campo.




.. _sip-id-ivr:

URA
++++++++++++++++

| Nós ainda não escrevemos a descrição deste campo.




.. _sip-id-queue:

Fila de espera
++++++++++++++++

| Nós ainda não escrevemos a descrição deste campo.




.. _sip-id-sip:

Conta SIP
++++++++++++++++

| Nós ainda não escrevemos a descrição deste campo.




.. _sip-extension:

DialPlan
++++++++++++++++

| Nós ainda não escrevemos a descrição deste campo.




.. _sip-dial-timeout:

Tocar por quantos seg.
++++++++++++++++

| Tempo em segundos que será aguardado para atender a chamada.




.. _sip-voicemail:

Habilitar voicemail
++++++++++++++++

| Nós ainda não escrevemos a descrição deste campo.




.. _sip-voicemail-email:

Email
++++++++++++++++

| Nós ainda não escrevemos a descrição deste campo.




.. _sip-voicemail-password:

Senha
++++++++++++++++

| Nós ainda não escrevemos a descrição deste campo.




.. _sip-sipshowpeer:

Peer
++++++++++++++++

| Nós ainda não escrevemos a descrição deste campo.



