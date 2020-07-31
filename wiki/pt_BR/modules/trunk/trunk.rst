.. _trunk-menu-list:

***************
Lista de campos
***************



.. _trunk-addparameter:

Parametros adicionais
""""""""""""





.. _trunk-allow:

allow
"""""

Selecione os codecs que o tronco aceita.



.. _trunk-allow_error:

Enviar para tronco backup independente do erro
"""""""""""

Se SIM, a chamadas será enviada para o tronco backup a menos que a chamada seja atendida ou cancelada. Somente use quando seu tronco tiver algum problema de sinalização, por exemplo sinaliza BUSY quando não tiver canal disponivel.



.. _trunk-context:

Contexto
"""""""

Somente altere se você souber o que esta fazendo.



.. _trunk-directmedia:

directmedia
"""""""""""





.. _trunk-disallow:

disallow
""""""""





.. _trunk-dtmfmode:

dtmfmode
""""""""

Clique para mais informaçōes|htt



.. _trunk-fromdomain:

fromdomain
""""""""""





.. _trunk-fromuser:

fromuser
""""""""

Many SIP providers require this. Normally it is the some username



.. _trunk-host:

Host
""""

IP ou Dominio do tronco



.. _trunk-insecure:

insecure
""""""""

Clique para mais informaçōes|htt



.. _trunk-language:

Idioma
""""""""





.. _trunk-link_sms:

Link SMS
""""""""

URL para enviar SMS. Subistituir o número por %number% e o texto por %text%. EX. a URL enviada pelo seu provedor de SMS é ht



.. _trunk-maxuse:

Maximo de canais
""""""

Número maximo de chamadas simultaneas.



.. _trunk-nat:

nat
"""





.. _trunk-port:

port
""""

Porta do tronco. Se você precisar usar outra porta diferente da 5060, lembre-se de liberar a porta no IPTABLES.



.. _trunk-providertech:

Sinalização
""""""""""""

Protocolo do tronco. Alguns protocolos como Dahdi, Dongle, DGV, khomp, precisam ser instalado no Asterisk antes de usar.



.. _trunk-qualify:

qualify
"""""""





.. _trunk-register:

Registro
""""""""

Somente ative se seu tronco for por usuário e senha.



.. _trunk-register_string:

register_string
"""""""""""""""





.. _trunk-removeprefix:

removeprefix
""""""""""""

Remove este prefixo do número.



.. _trunk-secret:

secret
""""""

Somente coloque senha se seu tronco for autenticado por usuário e senha.



.. _trunk-sendrpid:

sendrpid
""""""""





.. _trunk-sip_config:

sip_config
""""""""""

Formato válido no Asterisk sip.conf, uma opção por linha.



.. _trunk-sms_res:

Resposta esperada
"""""""

Deixe em branco para não aguardar resposta do provedor. Ou coloque o texto que deve conter na resposta do provedor para ser considerado ENVIADO.



.. _trunk-status:

Estado
""""""

Se o tronco for inativado, Magnusbilling enviara a chamada para o tronco backup



.. _trunk-trunkcode:

Nome do tronco
"""""""""





.. _trunk-trunkprefix:

trunkprefix
"""""""""""

Adiciona um prefixo no inicio do número to enviar para o tronco. Tambem usado para quando você precisa enviar um techprefix. 



.. _trunk-type:

Tipo
""""





.. _trunk-user:

Usuário
""""

Somente coloque usuário se seu tronco for autenticado por usuário e senha.


