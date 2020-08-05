.. _campaign-menu-list:

**********************
Descrição dos campos
**********************



.. _campaign-id_plan:

Plan
""""

Que plano será usado para tarifar as chamadas desta cmapanha, pode ser um plano diferente do plano cadastrado na conta do cliente




.. _campaign-name:

Nome
""""

Nós ainda não escrevemos a descrição deste campo.




.. _campaign-status:

Estado
""""""

Nós ainda não escrevemos a descrição deste campo.




.. _campaign-startingdate:

Data de início
"""""""""""""""

Data que a campanha será considerada ativa.




.. _campaign-expirationdate:

Data do final
"""""""""""""

Data que a campanha não será mais considerada ativa, mesmo ser tiver números ativos




.. _campaign-type:

Tipo
""""

Nós ainda não escrevemos a descrição deste campo.




.. _campaign-audio:

Audio
"""""

Somente usado se o tipo de campanha for de voz. O audio precisa ser compativel com Asterisk. Recomendamos usar GSM. Se usar WAV, tem que ser mono e 8k hz




.. _campaign-audio_2:

Audio
"""""

Se você usar TTS, o nome do número será executado entre o audio 1 e 2




.. _campaign-restrict_phone:

Restrict phone
""""""""""""""

Ativando esta opção o MagnusBilling vai verificar se o número que será enviado a chamada esta cadastrado no menu Números Bloqueados, se tiver, o sistema vai mudar o status do número para bloqueado e não vai enviar a chamada.




.. _campaign-auto_reprocess:

Auto reprocess
""""""""""""""

Reativar automaticamente todos os numeros das agendas da campanha quando não tiver mais números ativos




.. _campaign-id_phonebook:




Selecione as agendas que esta campanha vai usar.




.. _campaign-digit_authorize:

Number to forward
"""""""""""""""""

Você quer enviar o cliente para algum destino apos o audio? Ex. Se o cliente digitar 1 transferir para uma conta SIP, entao coloque aqui o número 1, e abaixo selecione SIP, e abaixo a conta VOIP que quer enviar a chamada. Selecione "Qualquer Digito", para enviar para o destino se o cliente marcar qu




.. _campaign-type_0:

Forward type
""""""""""""

Nós ainda não escrevemos a descrição deste campo.




.. _campaign-extensions_0:

Destination
"""""""""""

Nós ainda não escrevemos a descrição deste campo.




.. _campaign-id_ivr_0:

IVR
"""

Nós ainda não escrevemos a descrição deste campo.




.. _campaign-id_queue_0:

Queue
"""""

Nós ainda não escrevemos a descrição deste campo.




.. _campaign-id_sip_0:

SIP
"""

Nós ainda não escrevemos a descrição deste campo.




.. _campaign-extension_0:

Destination
"""""""""""

Nós ainda não escrevemos a descrição deste campo.




.. _campaign-daily_start_time:

Hora de início
"""""""""""""""

Nós ainda não escrevemos a descrição deste campo.




.. _campaign-daily_stop_time:

Hora do final
"""""""""""""

Nós ainda não escrevemos a descrição deste campo.




.. _campaign-monda:

Segunda
"""""""

Nós ainda não escrevemos a descrição deste campo.




.. _campaign-tuesda:

Terça
""""""

Nós ainda não escrevemos a descrição deste campo.




.. _campaign-wednesda:

Quarta
""""""

Nós ainda não escrevemos a descrição deste campo.




.. _campaign-thursda:

Quinta
""""""

Nós ainda não escrevemos a descrição deste campo.




.. _campaign-frida:

Sexta
"""""

Nós ainda não escrevemos a descrição deste campo.




.. _campaign-saturda:

Sábado
"""""""

Nós ainda não escrevemos a descrição deste campo.




.. _campaign-sunda:

Domingo
"""""""

Nós ainda não escrevemos a descrição deste campo.




.. _campaign-frequency:

Call limit
""""""""""

Quantas chamadas o sistema pode gerar por minuto nesta campanha




.. _campaign-max_frequency:

Maximo de chamadas
""""""""""""""""""

Este é o valor maximo que o cliente poderá alterar. Se você colocar 50, o usuário poderá alterar, desde que um valor igual ou menor que 50.




.. _campaign-nb_callmade:

Tempo do áudio
"""""""""""""""

Tempo do audio da campanha, usado para controlar quantidade de chamadas considerada sucesso




.. _campaign-enable_max_call:

Habilitar max de chamadas completas
"""""""""""""""""""""""""""""""""""

Se ativado, MagnusBilling vai verificar quantas chamadas ja foram realizadas e tiveram a duração igual ao tempo do audio, se a quantidade for igual ou mais que o campo abaixo, a campanha é desativada




.. _campaign-secondusedreal:

Max chamadas completas
""""""""""""""""""""""

Maximo de chamadas completas. Precisa ativar o campo acima




.. _campaign-from:

From
""""

Nós ainda não escrevemos a descrição deste campo.




.. _campaign-description:

Texto SMS
"""""""""

Texto do SMS. Você pode usar a variavel %name% onde você deseja usar o nome do dono do número




.. _campaign-tts_audio:

Audio 1 TTS
"""""""""""

Nós ainda não escrevemos a descrição deste campo.




.. _campaign-tts_audio2:

Audio 2 TTS
"""""""""""

Nós ainda não escrevemos a descrição deste campo.




.. _campaign-asr_options:

Option to validate ASR
""""""""""""""""""""""

Nós ainda não escrevemos a descrição deste campo.



