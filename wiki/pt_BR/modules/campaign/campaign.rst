.. _campaign-menu-list:

***************
Lista de campos
***************



.. _campaign-asr_options:

asr_options
"""""""""""





.. _campaign-audio:

audio
"""""

Somente usado se o tipo de campanha for de voz. O audio precisa ser compativel com Asterisk. Recomendamos usar GSM. Se usar WAV, tem que ser mono e 8k hz



.. _campaign-audio_2:

audio_2
"""""""

Se você usar TTS, o nome do número será executado entre o audio 1 e 2



.. _campaign-auto_reprocess:

auto_reprocess
""""""""""""""

Reativar automaticamente todos os numeros das agendas da campanha quando não tiver mais números ativos



.. _campaign-daily_start_time:

Hora de início
""""""""""""""""





.. _campaign-daily_stop_time:

Hora do final
"""""""""""""""





.. _campaign-description:

Descrição
"""""""""""

Texto do SMS. Você pode usar a variavel %name% onde você deseja usar o nome do dono do número



.. _campaign-digit_authorize:

digit_authorize
"""""""""""""""

Você quer enviar o cliente para algum destino apos o audio? Ex. Se o cliente digitar 1 transferir para uma conta SIP, entao coloque aqui o número 1, e abaixo selecione SIP, e abaixo a conta VOIP que quer enviar a chamada. Selecione "Qualquer Digito", para enviar para o destino se o cliente marcar qu



.. _campaign-enable_max_call:

enable_max_call
"""""""""""""""

Se ativado, MagnusBilling vai verificar quantas chamadas ja foram realizadas e tiveram a duração igual ao tempo do audio, se a quantidade for igual ou mais que o campo abaixo, a campanha é desativada



.. _campaign-expirationdate:

Data do final
""""""""""""""

Data que a campanha não será mais considerada ativa, mesmo ser tiver números ativos



.. _campaign-extension_0:

extension_0
"""""""""""





.. _campaign-extensions_0:

extensions_0
""""""""""""





.. _campaign-frequency:

frequency
"""""""""

Quantas chamadas o sistema pode gerar por minuto nesta campanha



.. _campaign-frida:

frida
"""""





.. _campaign-from:

from
""""





.. _campaign-id_ivr_0:

id_ivr_0
""""""""





.. _campaign-id_phonebook:

id_phonebook
""""""""""""

Selecione as agendas que esta campanha vai usar.



.. _campaign-id_plan:

id_plan
"""""""

Que plano será usado para tarifar as chamadas desta cmapanha, pode ser um plano diferente do plano cadastrado na conta do cliente



.. _campaign-id_queue_0:

id_queue_0
""""""""""





.. _campaign-id_sip_0:

id_sip_0
""""""""





.. _campaign-max_frequency:

max_frequency
"""""""""""""

Este é o valor maximo que o cliente poderá alterar. Se você colocar 50, o usuário poderá alterar, desde que um valor igual ou menor que 50.



.. _campaign-monda:

monda
"""""





.. _campaign-name:

Nome
""""





.. _campaign-nb_callmade:

nb_callmade
"""""""""""

Tempo do audio da campanha, usado para controlar quantidade de chamadas considerada sucesso



.. _campaign-restrict_phone:

restrict_phone
""""""""""""""

Ativando esta opção o MagnusBilling vai verificar se o número que será enviado a chamada esta cadastrado no menu Números Bloqueados, se tiver, o sistema vai mudar o status do número para bloqueado e não vai enviar a chamada.



.. _campaign-saturda:

saturda
"""""""





.. _campaign-secondusedreal:

Minutos Usados
""""""""""""""

Maximo de chamadas completas. Precisa ativar o campo acima



.. _campaign-startingdate:

Data de início
""""""""""""

Data que a campanha será considerada ativa.



.. _campaign-status:

Estado
""""""





.. _campaign-sunda:

sunda
"""""





.. _campaign-thursda:

thursda
"""""""





.. _campaign-tts_audio:

tts_audio
"""""""""





.. _campaign-tts_audio2:

tts_audio2
""""""""""





.. _campaign-tuesda:

tuesda
""""""





.. _campaign-type:

Tipo
""""





.. _campaign-type_0:

type_0
""""""





.. _campaign-wednesda:

wednesda
""""""""




