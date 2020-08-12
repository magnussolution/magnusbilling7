.. _campaign-menu-list:

***************
Lista de campos
***************



.. _campaign-id_user:

Usuário
""""""""

Nós ainda não escrevemos a descrição deste campo.




.. _campaign-id_plan:

Plano
"""""

Que plano será usado para tarifar as chamadas desta cmapanha, pode ser um plano diferente do plano cadastrado na conta do cliente




.. _campaign-name:

Nome
""""

Nós ainda não escrevemos a descrição deste campo.




.. _campaign-status:

Status
""""""

Nós ainda não escrevemos a descrição deste campo.




.. _campaign-startingdate:

Data de início
"""""""""""""""

Data que a campanha será considerada ativa.




.. _campaign-expirationdate:

Data de expiração
"""""""""""""""""""

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

Audio 2
"""""""

Se você usar TTS, o nome do número será executado entre o audio 1 e 2




.. _campaign-restrict_phone:

Telefone bloqueados
"""""""""""""""""""

Ativando esta opção o MagnusBilling vai verificar se o número que será enviado a chamada esta cadastrado no menu Números Bloqueados, se tiver, o sistema vai mudar o status do número para bloqueado e não vai enviar a chamada.




.. _campaign-auto_reprocess:

Reprocessar automático
"""""""""""""""""""""""

Reativar automaticamente todos os numeros das agendas da campanha quando não tiver mais números ativos




.. _campaign-id_phonebook:

Agenda
""""""

Selecione as agendas que esta campanha vai usar.




.. _campaign-digit_authorize:

Número para reenviar
"""""""""""""""""""""

Você quer enviar o cliente para algum destino apos o audio? Ex. Se o cliente digitar 1 transferir para uma conta SIP, entao coloque aqui o número 1, e abaixo selecione SIP, e abaixo a conta VOIP que quer enviar a chamada. Selecione "Qualquer Digito", para enviar para o destino se o cliente marcar qu




.. _campaign-type_0:

Tipo de encaminhamento
""""""""""""""""""""""

Nós ainda não escrevemos a descrição deste campo.




.. _campaign-extensions_0:

Destino
"""""""

Nós ainda não escrevemos a descrição deste campo.




.. _campaign-id_ivr_0:

URA
"""

Nós ainda não escrevemos a descrição deste campo.




.. _campaign-id_queue_0:

Fila de espera
""""""""""""""

Nós ainda não escrevemos a descrição deste campo.




.. _campaign-id_sip_0:

Conta SIP
"""""""""

Nós ainda não escrevemos a descrição deste campo.




.. _campaign-extension_0:

Destino
"""""""

Nós ainda não escrevemos a descrição deste campo.




.. _campaign-daily_start_time:

Horário de início diário
"""""""""""""""""""""""""""

Nós ainda não escrevemos a descrição deste campo.




.. _campaign-daily_stop_time:

Horário de finalização diário
"""""""""""""""""""""""""""""""""

Nós ainda não escrevemos a descrição deste campo.




.. _campaign-monday:

Segunda
"""""""

Nós ainda não escrevemos a descrição deste campo.




.. _campaign-tuesday:

Terça feira
""""""""""""

Nós ainda não escrevemos a descrição deste campo.




.. _campaign-wednesday:

Quarta feira
""""""""""""

Nós ainda não escrevemos a descrição deste campo.




.. _campaign-thursday:

Quinta feira
""""""""""""

Nós ainda não escrevemos a descrição deste campo.




.. _campaign-friday:

Sexta
"""""

Nós ainda não escrevemos a descrição deste campo.




.. _campaign-saturday:

Saturday
""""""""

Nós ainda não escrevemos a descrição deste campo.




.. _campaign-sunday:

Sunday
""""""

Nós ainda não escrevemos a descrição deste campo.




.. _campaign-frequency:

Limite de chamada
"""""""""""""""""

Quantas chamadas o sistema pode gerar por minuto nesta campanha




.. _campaign-max_frequency:

Limite máximo de chamadas
""""""""""""""""""""""""""

Este é o valor maximo que o cliente poderá alterar. Se você colocar 50, o usuário poderá alterar, desde que um valor igual ou menor que 50.




.. _campaign-nb_callmade:

Duração do áudio
"""""""""""""""""""

Tempo do audio da campanha, usado para controlar quantidade de chamadas considerada sucesso




.. _campaign-enable_max_call:

Toggle max completed calls
""""""""""""""""""""""""""

Se ativado, MagnusBilling vai verificar quantas chamadas ja foram realizadas e tiveram a duração igual ao tempo do audio, se a quantidade for igual ou mais que o campo abaixo, a campanha é desativada




.. _campaign-secondusedreal:

Quantidade máxima completada
"""""""""""""""""""""""""""""

Maximo de chamadas completas. Precisa ativar o campo acima




.. _campaign-from:

De
""

Nós ainda não escrevemos a descrição deste campo.




.. _campaign-description:

Descrição ou texto do SMS
"""""""""""""""""""""""""""

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

Opção para validar ASR
""""""""""""""""""""""""

Nós ainda não escrevemos a descrição deste campo.



