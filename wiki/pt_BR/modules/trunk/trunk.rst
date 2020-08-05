.. _trunk-menu-list:

**********************
Descrição dos campos
**********************



.. _trunk-trunkcode:

Nome do tronco
""""""""""""""

Nós ainda não escrevemos a descrição deste campo.




.. _trunk-user:

Usuário
""""""""

Somente coloque usuário se seu tronco for autenticado por usuário e senha.




.. _trunk-secret:

Senha
"""""

Somente coloque senha se seu tronco for autenticado por usuário e senha.




.. _trunk-host:

Host
""""

IP ou Dominio do tronco




.. _trunk-trunkprefix:

Adicionar prefixo
"""""""""""""""""

Adiciona um prefixo no inicio do número to enviar para o tronco. Tambem usado para quando você precisa enviar um techprefix. 




.. _trunk-removeprefix:

Remover prefixo
"""""""""""""""

Remove este prefixo do número.




.. _trunk-allow:

Codec
"""""

Selecione os codecs que o tronco aceita.




.. _trunk-providertech:

Sinalização
"""""""""""""

Protocolo do tronco. Alguns protocolos como Dahdi, Dongle, DGV, khomp, precisam ser instalado no Asterisk antes de usar.




.. _trunk-status:

Estado
""""""

Se o tronco for inativado, Magnusbilling enviara a chamada para o tronco backup




.. _trunk-allow_error:

Enviar para tronco backup independente do erro
""""""""""""""""""""""""""""""""""""""""""""""

Se SIM, a chamadas será enviada para o tronco backup a menos que a chamada seja atendida ou cancelada. Somente use quando seu tronco tiver algum problema de sinalização, por exemplo sinaliza BUSY quando não tiver canal disponivel.




.. _trunk-register:

Registrar Tronco
""""""""""""""""

Somente ative se seu tronco for por usuário e senha.




.. _trunk-register_string:

Register String
"""""""""""""""

Nós ainda não escrevemos a descrição deste campo.




.. _trunk-fromuser:




Many SIP providers require this. Normally it is the some username




.. _trunk-fromdomain:




Nós ainda não escrevemos a descrição deste campo.




.. _trunk-language:

Idioma
""""""

Nós ainda não escrevemos a descrição deste campo.




.. _trunk-context:

Contexto
""""""""

Somente altere se você souber o que esta fazendo.




.. _trunk-dtmfmode:




Clique para mais informaçōes|htt




.. _trunk-insecure:




Clique para mais informaçōes|htt




.. _trunk-maxuse:

Maximo de canais
""""""""""""""""

Número maximo de chamadas simultaneas.




.. _trunk-nat:




Nós ainda não escrevemos a descrição deste campo.




.. _trunk-directmedia:




Nós ainda não escrevemos a descrição deste campo.




.. _trunk-qualify:




Nós ainda não escrevemos a descrição deste campo.




.. _trunk-type:




Nós ainda não escrevemos a descrição deste campo.




.. _trunk-disallow:

Disallow
""""""""

Nós ainda não escrevemos a descrição deste campo.




.. _trunk-sendrpid:




Nós ainda não escrevemos a descrição deste campo.




.. _trunk-addparameter:

Parametros adicionais
"""""""""""""""""""""

Nós ainda não escrevemos a descrição deste campo.




.. _trunk-port:

Port
""""

Porta do tronco. Se você precisar usar outra porta diferente da 5060, lembre-se de liberar a porta no IPTABLES.




.. _trunk-link_sms:

Link SMS
""""""""

URL para enviar SMS. Subistituir o número por %number% e o texto por %text%. EX. a URL enviada pelo seu provedor de SMS é ht




.. _trunk-sms_res:

Resposta esperada
"""""""""""""""""

Deixe em branco para não aguardar resposta do provedor. Ou coloque o texto que deve conter na resposta do provedor para ser considerado ENVIADO.




.. _trunk-sip_config:

Configuração do Asterisk
""""""""""""""""""""""""""

Formato válido no Asterisk sip.conf, uma opção por linha.



