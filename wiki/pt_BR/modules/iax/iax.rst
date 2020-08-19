
.. _iax-id-user:

Usuário
--------

| Usuário ao qual está conta IAX vai pertencer




.. _iax-username:

Conta IAX
---------

| Usuário que será usado para autenticar no softphone.




.. _iax-secret:

Senha IAX
---------

| Senha que será usado para autenticar no softphone.




.. _iax-callerid:

CallerID
--------

| Este é o CallerID que será mostrado no destino, em chamadas externas o provedor precisa permitir CLI para que seja identificado corretamente no destino.




.. _iax-disallow:

Disallow
--------

| Esta opção desativa todos os codecs e deixa disponível para o usuário somente os que você selecionar abaixo.




.. _iax-allow:

Codec
-----

| Codecs que será aceito




.. _iax-host:

Host
----

| Dynamic é a opção para deixar o usuário registrar sua conta em qualquer IP. Se você deseja autenticar o usuário por IP, coloque aqui o IP do cliente, deixe a senha em branco e coloque insecure para port/invite na TAB Informaçōes Adicionais.




.. _iax-nat:

NAT
---

| O cliente está atrás de NAT. Você pode ver mais detalhes no link `https://www.voip-info.org/asterisk-sip-nat/  <https://www.voip-info.org/asterisk-sip-nat/>`_.




.. _iax-context:

Contexto
--------

| Este é o contexto que a chamada será processada, por padrão é billing. Somente alterar se tiver conhecimento sobre Asterisk.




.. _iax-qualify:

Qualify
-------

| Enviar pacote OPTION para verificar se o usuário está online.




.. _iax-dtmfmode:

Dtmfmode
--------

| Tipo de DTMF. Você pode ver mais detalhes no link `https://www.voip-info.org/asterisk-sip-dtmfmode/  <https://www.voip-info.org/asterisk-sip-dtmfmode/>`_.




.. _iax-insecure:

Insecure
--------

| Se o host estiver dynamic está opção precisa estar como NO.Para autenticação por IP alterar para port. Você pode ver mais detalhes no link `https://www.voip-info.org/asterisk-sip-insecure/  <https://www.voip-info.org/asterisk-sip-insecure/>`_.




.. _iax-type:

Tipo
----

| Tipo padrão é friend, ou seja pode fazer e receber chamadas. Você pode ver mais detalhes no link `https://www.voip-info.org/asterisk-sip-type/  <https://www.voip-info.org/asterisk-sip-type/>`_.




.. _iax-calllimit:

Limite de chamada
-----------------

| Total de chamadas simultâneas permitida para está conta IAX.



