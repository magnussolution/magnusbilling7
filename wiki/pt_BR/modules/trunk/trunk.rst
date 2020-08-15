
.. _trunk-id_provider:

Provedor
++++++++++++++++

| Nós ainda não escrevemos a descrição deste campo.




.. _trunk-trunkcode:

Nome
++++++++++++++++

| Nós ainda não escrevemos a descrição deste campo.




.. _trunk-user:

Usuário
++++++++++++++++

| Somente coloque usuário se seu tronco for autenticado por usuário e senha.




.. _trunk-secret:

Senha
++++++++++++++++

| Somente coloque senha se seu tronco for autenticado por usuário e senha.




.. _trunk-host:

Host
++++++++++++++++

| IP ou Domínio do tronco




.. _trunk-trunkprefix:

Adicionar prefixo
++++++++++++++++

| Adiciona um prefixo no inicio do número to enviar para o tronco. Também usado para quando você precisa enviar um techprefix. EX: Se você tem que enviar o número no formato 0DDD número, coloque aqui 0 e no campo abaixo 55. Isso vai remover o 55 e adiconar o 0 




.. _trunk-removeprefix:

Remover prefixo
++++++++++++++++

| Remove este prefixo do número.




.. _trunk-allow:

Codec
++++++++++++++++

| Selecione os codecs que o tronco aceita.




.. _trunk-providertech:

Tipo sinalização
++++++++++++++++

| Protocolo do tronco. Alguns protocolos como Dahdi, Dongle, DGV, khomp, precisam ser instalado no Asterisk antes de usar.




.. _trunk-status:

Status
++++++++++++++++

| Se o tronco for inativado, Magnusbilling enviara a chamada para o tronco backup




.. _trunk-allow_error:

Permitir erro
++++++++++++++++

| Se SIM, a chamadas será enviada para o tronco backup a menos que a chamada seja atendida ou cancelada. Somente use quando seu tronco tiver algum problema de sinalização, por exemplo sinaliza BUSY quando não tiver canal disponível.




.. _trunk-register:

Registrar tronco
++++++++++++++++

| Somente ative se seu tronco for por usuário e senha.




.. _trunk-register_string:

Linha de registro
++++++++++++++++

| Nós ainda não escrevemos a descrição deste campo.




.. _trunk-fromuser:

Do usuário
++++++++++++++++

| Many SIP providers require this. Normally it is the some username




.. _trunk-fromdomain:

Do domínio
++++++++++++++++

| Nós ainda não escrevemos a descrição deste campo.




.. _trunk-language:

Idioma
++++++++++++++++

| Nós ainda não escrevemos a descrição deste campo.




.. _trunk-context:

Contexto
++++++++++++++++

| Somente altere se você souber o que está fazendo.




.. _trunk-dtmfmode:

Dtmfmode
++++++++++++++++

| Tipo de DTMF. Você pode ver mais detalhes no link `https://www.voip-info.org/asterisk-dtmf/  <https://www.voip-info.org/asterisk-dtmf/>`_.




.. _trunk-insecure:

Insecure
++++++++++++++++

| Insecure. Você pode ver mais detalhes no link `https://www.voip-info.org/asterisk-sip-insecure/  <https://www.voip-info.org/asterisk-sip-insecure/>`_.




.. _trunk-maxuse:

Máximo uso
++++++++++++++++

| Número máximo de chamadas simultâneas.




.. _trunk-nat:

NAT
++++++++++++++++

| Nós ainda não escrevemos a descrição deste campo.




.. _trunk-directmedia:

Directmedia
++++++++++++++++

| Nós ainda não escrevemos a descrição deste campo.




.. _trunk-qualify:

Qualify
++++++++++++++++

| Nós ainda não escrevemos a descrição deste campo.




.. _trunk-type:

Tipo
++++++++++++++++

| Nós ainda não escrevemos a descrição deste campo.




.. _trunk-disallow:

Disallow
++++++++++++++++

| Nós ainda não escrevemos a descrição deste campo.




.. _trunk-sendrpid:

Sendrpid
++++++++++++++++

| Nós ainda não escrevemos a descrição deste campo.




.. _trunk-addparameter:

Adicionar parâmetro
++++++++++++++++

| Nós ainda não escrevemos a descrição deste campo.




.. _trunk-port:

Porta
++++++++++++++++

| Porta do tronco. Se você precisar usar outra porta diferente da 5060, lembre-se de liberar a porta no IPTABLES.




.. _trunk-link_sms:

Link SMS
++++++++++++++++

| URL para enviar SMS. Substituir o número por %number% e o texto por %text%. EX. a URL enviada pelo seu provedor de SMS é http://trunkWebSite.com.br/sendsms.php?usuario=magnus&senha=billing&numero=XXXXXX&texto=SSSSSSSSSSS. altere XXXXXX per %number% e SSSSSSSSSSS por %text% 




.. _trunk-sms_res:

SMS Resposta esperada
++++++++++++++++

| Deixe em branco para não aguardar resposta do provedor. Ou coloque o texto que deve constar na resposta do provedor para ser considerado ENVIADO.




.. _trunk-sip_config:

Parâmetros
++++++++++++++++

| Formato válido no Asterisk sip.conf, uma opção por linha.



