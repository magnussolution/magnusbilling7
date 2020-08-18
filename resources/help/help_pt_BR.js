Help.load({
    //API
    'api.id_user': `Usuário que poderá usar esta API.||Para usar a API é necessário o uso do projeto MagnusBilling API PHP publicado no GITHUB.
    
O projeto esta publicado no link https://github.com/magnussolution/magnusbilling-api-php. 
A API tem documentação, atualmente somente em Ingles, e esta publicado no link https://github.com/magnussolution/magnusbilling-api-php/wiki. `,
    'api.api_key': `Key necessária para autenticar na API.`,
    'api.api_secret': `Secret necessário para autenticar na API.`,
    'api.status': `Permitir ou não a conexão na API.`,
    'api.action': `Quais as açōes será permitidas na conexão.`,
    'api.api_restriction_ips': `Quais os IPs poderão conectar na API.
Deixar em branco para permitir a conexão de qualquer IP.

É extremamente recomendável somente liberar os IPs que realmente deseja conectar.`,
    //BOLETO
    'boleto.id_user': ``,
    'boleto.payment': ``,
    'boleto.status': ``,
    'boleto.vencimento': ``,
    'boleto.description': ``,
    //EXTRATO DE CHAMADAS
    'call.starttime': `Dia e hora do início da chamada`,
    'call.src': `Conta SIP que realizou a chamada`,
    'call.callerid': `Número enviado para o tronco como identificador de chamada.||
Caso o tronco aceite o envio de callerid, então este número será usado como identificador de chamada.

Para funcionar é necessário deixar o campo Fromuser no tronco em branco.`,
    'call.calledstation': `Número discado pelo cliente`,
    'call.idPrefixdestination': `Nome do destino, este nome está relacionado com o menu Prefixos`,
    'call.idUserusername': `Usuário que realizou a chamada, e ao qual o custo da chamada foi discontado`,
    'call.idTrunktrunkcode': `Tronco que foi utilizado para completar a chamada`,
    'call.sessiontime': `Duração da chamada em segundos`,
    'call.buycost': `Preço de compra. Clique para entender como é calculado o preço|https://wiki.magnusbilling.org/pt_BR/source/price_calculation.html`,
    'call.sessionbill': `Preço de venda, este foi o valor descontado do cliente. Clique para entender como é calculado o preço|https://wiki.magnusbilling.org/pt_BR/source/price_calculation.html`,
    'call.agent_bill': `Preço de venda, este foi o valor descontado do cliente. Clique para entender como é calculado o preço|https://wiki.magnusbilling.org/pt_BR/source/price_calculation.html`,
    'call.uniqueid': `ID único gerado pelo Asterisk, este campo é também a hora de início da chamada em Epoch Unix`,
    //CHAMADAS ARQUIVADAS
    'callarchive.calledstation': `Número discado pelo cliente`,
    'callarchive.sessiontime': `Duração da chamada em segundos`,
    'callarchive.buycost': `Preço de compra. Clique para entender como é calculado o preço|https://wiki.magnusbilling.org/pt_BR/source/price_calculation.html`,
    'callarchive.sessionbill': `Preço de compra. Clique para entender como é calculado o preço|https://wiki.magnusbilling.org/pt_BR/source/price_calculation.html`,
    'callarchive.agent_bill': `Preço de compra. Clique para entender como é calculado o preço|https://wiki.magnusbilling.org/pt_BR/source/price_calculation.html`,
    //CALLBACK
    'callback.id_user': `Usuário dono do DID que recebeu a solicitaçao de CallBack`,
    'callback.exten': `Número da pessoa que ligou para o DID solicitando o CallBack`,
    'callback.status': `Status da chamada||Os status podem ser:
* Ativa
    O CallBack ainda nao foi processado.
* Pendente
    O MagnusBilling processou o CallBack e enviou para o tronco.
* Enviado
    O CallBack foi processado com sucesso.
* Fora do horário
    A chamada foi recebida fora do horário de atendimento configurado no menu DID, tab CallBack pro.
    `,
    //CALLERID
    'callerid.id_user': ``,
    'callerid.cid': `Número do callerid para autenticar o Calling Card. É necessário cadastrar o número no formato que chega no servidor. Verifique o formato no Cli do Asterisk, ou consulte com o provedor do DID.`,
    'callerid.activated': ``,
    //CHAMADAS ONLINE
    'callonline.idUserusername': `Usuário principal da conta SIP que inicou a chamada.`,
    'callonline.sip_account': `Conta SIP que solicitou a chamada.`,
    'callonline.idUsercredit': `Credito do usuário`,
    'callonline.ndiscado': `Número no formato que o usuário discou.`,
    'callonline.codec': `Codec usado na chamada`,
    'callonline.callerid': `Número enviado para o tronco como identificador de chamada.||
Caso o tronco aceite o envio de callerid, então este número será usado como identificador de chamada.

Você pode confirmar este valor no campo abaixo onde mostra o resultado do comando core show channel, no valor [Caller ID] => 3341185338
Para funcionar é necessário deixar o campo Fromuser no tronco em branco.`,
    'callonline.tronco': `Tronco que foi utilizado para completar a chamada`,
    'callonline.reinvite': `Reinvite é o parametro que informa se o audio esta passando pelo Asterisk, ou se esta passando diretamente entre o cliente e o tronco. Clique para saber mais sobre esta opção|https://wiki.magnusbilling.org/pt_BR/source/asterisk_options/directmedia.html`,
    'callonline.from_ip': `Ip do terminal SIP que foi iniciado a chamada`,
    'callonline.description': `Dados do comando sip show channel`,
    //RELATóRIO
    'callshopcdr.id_user': ``,
    //RESUMO POR DIA
    'callsummarycallshop.sumsessiontime': `Somatorio de minutos chamadas.`,
    'callsummarycallshop.sumprice': ``,
    'callsummarycallshop.sumlucro': `Somatório do lucro`,
    'callsummarycallshop.sumbuycost': `Somatório do preço de compra`,
    'callsummarycallshop.sumnbcall': `Total de chamadas`,
    //RESUMO POR REVENDEDOR
    'callsummarydayagent.sumsessiontime': `Somatorio de minutos chamadas.||É possível realizar filtros, por exemplo, filtrar os dias da última semana, ou de um revendedor específico, neste caso. Este somatório mostrará somente os dados do filtro executado.`,
    'callsummarydayagent.sumsessionbill': `Somatório do preço de venda`,
    'callsummarydayagent.sumbuycost': `Somatório do preço de compra`,
    'callsummarydayagent.sumlucro': `Somatório do lucro`,
    'callsummarydayagent.sumnbcall': `Total de chamadas`,
    //RESUMO POR DIA/TRONO
    'callsummarydaytrunk.sumsessiontime': `Somatorio de minutos chamadas.||É possível realizar filtros, por exemplo, filtrar os dias da última semana, ou de um tronco específico, neste caso. Este somatório mostrará somente os dados do filtro executado.`,
    'callsummarydaytrunk.sumsessionbill': `Somatório do preço de venda`,
    'callsummarydaytrunk.sumbuycost': `Somatório do preço de compra`,
    'callsummarydaytrunk.sumlucro': `Somatório do lucro`,
    'callsummarydaytrunk.sumnbcall': `Total de chamadas`,
    //RESUMO POR DIA/USUáRIO
    'callsummarydayuser.sumsessiontime': `Somatorio de minutos chamadas.||É possível realizar filtros, por exemplo, filtrar os dias da última semana, ou de um usuário específico, neste caso. Este somatório mostrará somente os dados do filtro executado.`,
    'callsummarydayuser.sumlucro': `Somatório do lucro`,
    'callsummarydayuser.sumnbcall': `Total de chamadas`,
    //RESUMO POR MêS/TRONCO
    'callsummarymonthtrunk.sumsessiontime': `Somatorio de minutos chamadas.||É possível realizar filtros, por exemplo, filtrar os últimos 3 meses, ou de um tronco específico, neste caso. Este somatório mostrará somente os dados do filtro executado.`,
    'callsummarymonthtrunk.sumsessionbill': `Somatório do preço de venda`,
    'callsummarymonthtrunk.sumbuycost': `Somatório do preço de compra`,
    'callsummarymonthtrunk.sumlucro': `Somatório do lucro`,
    'callsummarymonthtrunk.sumnbcall': `Total de chamadas`,
    //RESUMO POR MêS/USUáRIO
    'callsummarymonthuser.sumsessiontime': `Somatorio de minutos chamadas.||É possível realizar filtros, por exemplo, filtrar os últimos 3 meses, ou de um usuário específico, neste caso. Este somatório mostrará somente os dados do filtro executado.`,
    'callsummarymonthuser.sumlucro': `Somatório do lucro`,
    'callsummarymonthuser.sumnbcall': `Total de chamadas`,
    //RESUMO POR DIA
    'callsummaryperday.sumsessiontime': `Somatorio de minutos chamadas.||É possível realizar filtros, por exemplo, filtrar os dias da última semana, neste caso. Este somatório mostrará somente os dados do filtro executado.`,
    'callsummaryperday.sumsessionbill': `Somatório do preço de venda`,
    'callsummaryperday.sumbuycost': `Somatório do preço de compra`,
    'callsummaryperday.sumlucro': `Somatório do lucro`,
    'callsummaryperday.sumnbcall': `Total de chamadas`,
    'callsummaryperday.sumnbcallfail': `Total de chamadas rejeitadas`,
    //RESUMO POR MêS
    'callsummarypermonth.sumsessiontime': `Somatorio de minutos chamadas.||É possível realizar filtros, por exemplo, filtrar os últimos 3 meses, neste caso. Este somatório mostrará somente os dados do filtro executado.`,
    'callsummarypermonth.sumsessionbill': `Somatório do preço de venda`,
    'callsummarypermonth.sumbuycost': `Somatório do preço de compra`,
    'callsummarypermonth.sumlucro': `Somatório do lucro`,
    'callsummarypermonth.sumnbcall': `Total de chamadas`,
    //RESUMO POR TRONCO
    'callsummarypertrunk.sumsessiontime': `Somatorio de minutos chamadas.||É possível realizar filtros, por exemplo, filtrar os últimos 3 meses, neste caso. Este somatório mostrará somente os dados do filtro executado.`,
    'callsummarypertrunk.sumsessionbill': `Somatório do preço de venda`,
    'callsummarypertrunk.sumbuycost': `Somatório do preço de compra`,
    'callsummarypertrunk.sumlucro': `Somatório do lucro`,
    'callsummarypertrunk.sumnbcall': `Total de chamadas`,
    'callsummarypertrunk.sumnbcallfail': `Total de chamadas rejeitadas`,
    //RESUMO POR USUáRIO
    'callsummaryperuser.sumsessiontime': `Somatorio de minutos chamadas por usuário.||É possível realizar filtros, por exemplo, somente usuários que iniciam com a letra a, ou um usuário específico. Este somatório mostrará somente os dados do filtro executado.`,
    'callsummaryperuser.sumlucro': `Somatório do lucro`,
    'callsummaryperuser.sumnbcall': `Total de chamadas`,
    'callsummaryperuser.sumnbcallfail': `Total de chamadas rejeitadas`,
    //CAMPANHAS
    'campaign.id_user': `Usuário dono da campanha`,
    'campaign.id_plan': `Que plano será usado para tarifar as chamadas desta campanha, pode ser um plano diferente do plano cadastrado na conta do cliente`,
    'campaign.name': `Nome para a campanha.`,
    'campaign.status': `Status da campanha.`,
    'campaign.startingdate': `Data que a campanha será considerada ativa.`,
    'campaign.expirationdate': `Data que a campanha não será mais considerada ativa, mesmo ser tiver números ativos`,
    'campaign.type': `Selecione entre VOZ ou SMS, se for audio, precisa importar áudio, se for SMS, preciso colocar o texto do SMS na tab SMS.`,
    'campaign.audio': `Somente usado se o tipo de campanha for de voz. O áudio precisa ser compativel com Asterisk. Recomendamos usar GSM. Se usar WAV, tem que ser mono e 8k hz`,
    'campaign.audio_2': `Se você usar TTS, o nome cadastrado do número será executado entre o áudio 1 e 2`,
    'campaign.restrict_phone': `Ativando esta opção o MagnusBilling vai verificar se o número que será enviado a chamada está cadastrado no menu Números Bloqueados, se tiver, o sistema vai mudar o status do número para bloqueado e não vai enviar a chamada.`,
    'campaign.auto_reprocess': `Reativar automaticamente todos os números das agendas da campanha quando não tiver mais números ativos`,
    'campaign.id_phonebook': `Selecione as agendas que esta campanha vai usar.`,
    'campaign.digit_authorize': `Você quer enviar o cliente para algum destino após o audio? Ex. Se o cliente digitar 1 transferir para uma conta SIP, então coloque aqui o número 1, e abaixo selecione SIP, e abaixo a conta VOIP que quer enviar a chamada. Selecione "Qualquer Dígito", para enviar para o destino se o cliente marcar qu`,
    'campaign.type_0': `Selecionar o tipo de reenvio, esta opção vai redirecionar a chamada para o destino selecionado conforme o tipo escolhido`,
    'campaign.id_ivr_0': `Selecione uma URA para enviar a chamada, a URA precisa ser do mesmo usuário dono da campanha`,
    'campaign.id_queue_0': `Selecione uma fila de espera para enviar a chamada, a fila de espera precisa ser do mesmo usuário dono da campanha`,
    'campaign.id_sip_0': `Selecione uma conta SIP para enviar a chamada, a conta SIP precisa ser do mesmo usuário dono da campanha`,
    'campaign.extension_0': `Clique para mais detalhes||Temos duas opcōes, conforme o tipo selecionado, personalizado ou grupo.

* Grupo, o nome do grupo colocado aqui, deve ser exatamente o mesmo do grupo das contas SIP que deseja receber as chamadas, vai chamar todas as contas SIP do grupo. 
* Personalizado, então é possível a execução de qualquer opção válida do comando DIAL do asterisk, exemplo: SIP/contaSIP,45,tTr`,
    'campaign.daily_start_time': `Hora que a campanha vai iniciar o envio`,
    'campaign.daily_stop_time': `Hora que a campanha vai parar o envio`,
    'campaign.monday': `Ativando esta opção o sistema vai enviar chamadas desta campanha nas segundas feiras.`,
    'campaign.tuesday': `Ativando esta opção o sistema vai enviar chamadas desta campanha nas terças feiras.`,
    'campaign.wednesday': `Ativando esta opção o sistema vai enviar chamadas desta campanha nas quartas feiras.`,
    'campaign.thursday': `Ativando esta opção o sistema vai enviar chamadas desta campanha nas quintas feiras.`,
    'campaign.friday': `Ativando esta opção o sistema vai enviar chamadas desta campanha nas sextas feiras.`,
    'campaign.saturday': `Ativando esta opção o sistema vai enviar chamadas desta campanha nos sabados.`,
    'campaign.sunday': `Ativando esta opção o sistema vai enviar chamadas desta campanha nos domingos.`,
    'campaign.frequency': `Quantas chamadas o sistema deverá gerar por minuto nesta campanha.||Este valor será divido por 60 segundos, e as chamadas serão enviadas durante o minuto, e nao todas de uma vez.`,
    'campaign.max_frequency': `Este é o valor máximo que o cliente poderá alterar. Se você colocar 50, o usuário poderá alterar, desde que um valor igual ou menor que 50.`,
    'campaign.nb_callmade': `Tempo do áudio da campanha, usado para controlar quantidade de chamadas considerada sucesso`,
    'campaign.enable_max_call': `Se ativado, MagnusBilling vai verificar quantas chamadas já foram realizadas e tiveram a duração igual à duração do áudio.  Se a quantidade for igual ou maior que o valor colocado no próximo campo , a campanha será desativada`,
    'campaign.secondusedreal': `Máximo de chamadas completas. Precisa ativar o campo acima.`,
    'campaign.description': `Este campo tem uso diferente dependendo se a campanha é VOZ ou SMS.||Tipos possíveis:

* VOZ, neste caso este campo é simplesmente a descrição da campanha. 
* SMS, quando a campanha for do tipo SMS, então o texto colocado aqui será o SMS que será enviado aos números das agendas da campanha. 

No caso de SMS, você pode usar a variável %name% onde você deseja usar o nome do dono do número, exemplo:

Ola %name% temos uma promoção para você.....

Então digamos que tenha cadastrado na agenda utilizada por esta campanha uma lista de números contendo número e nome.

5511998844334,Paulo Ricardo
5511974635734,João Matos

Então para o número 5511998844334 a mensagem enviada será. 
Ola Paulo Ricardo temos uma promoção para você.....

e para 

5511974635734 a mensagem enviada será. 
Ola João Matos temos uma promoção para você.....

`,
    'campaign.tts_audio': `Com esta opção de TTS, o sistema vai gerar o áudio 1 da campanha via TTS, text to speech, tradução livre, texto para áudio||Para que esta opção funcione, será necessário a configuração da url TTS no menu Configurações, sub menu Ajustes, opção Tts URL.

Clique neste link para saber mais cobre como configurar TTS no Magnusbilling https://wiki.magnusbilling.org/pt_BR/source/tts.html
`,
    'campaign.tts_audio2': `Mesma função do campo campo anterior, mas para o áudio 2. Lembra que entre o áudio 1 e 2, o TTS executa o nome importado nos números.`,
    //MONITOR DE CAMPANHAS
    'campaigndashboard.name': `Nome da campanha`,
    //CHAMADAS POR MINUTO
    'campaignlog.total': `Total de chamadas`,
    //ENQUETES
    'campaignpoll.id_campaign': `Selecione a campanha que esta enquete será executa`,
    'campaignpoll.name': `Nome para a enquete, este nome é somente para seu contro`,
    'campaignpoll.repeat': `Quantas vezes o MagnusBilling deve repetir o áudio da enquete caso o cliente não digite nenhuma opção ou digite uma opção inválida.||O que é opção inválida?

É quando a opção digitada pelo cliente está vazia na TAB opções. Conforme a imagem abaixo.

.. image:: ../img/pool_blank.png
        :scale: 100%

`,
    'campaignpoll.request_authorize': `Em alguns casos, é necessário solicitar autorização para executar a enquete, nestes casos, deixe esta opção para sim||Um exemplo de caso seria:

Digamos que seja necessário enviar uma campanha com o seguinte áudio.


    Ola, temos uma oferta incrível para você. Se deseja escutar digite 1.

caso o cliente digitar 1, executar o áudio.


    Que bom que não perdeu esta chance de contratar seu plano de saúde …...

Neste caso, o áudio “Ola, temos uma oferta incrível para você. Se deseja escutar digite 1” seria o áudio da campanha.

E o áudio “Que bom que não perdeu esta chance de contratar seu plano de saúde …...” seria o áudio da enquete.

As opções, solicitar autorização deverá ser SIM e a opção dígito para autorizar deve ser 1.

Neste exemplo somente seria executado áudio da enquete caso o cliente digitar a tecla 1, caso contrário a chamada seria finalizada.
`,
    'campaignpoll.digit_authorize': `Digito que para autorizar a execução da enquete.`,
    'campaignpoll.arq_audio': `Arquivo de audio, lembre-se que somente é valido audios em GSM ou WAV 8khz mono`,
    'campaignpoll.description': `Descrição para a enquete`,
    'campaignpoll.option0': `Descreva a opção||Vamos supor que uma enquete política.

Onde a pergunta é:
Nas próximas eleições em quem você votaria?
    Digite 1 se você votaria no Roberto Matos
    Digite 2 se você votaria no Heleno Souza
    Digite 3 se você votaria na Roberta Silva

Neste exemplo você completaria as opções da seguinte forma


.. image:: ../img/poll_options.png
    :scale: 100% 

Estas opções será útil para ver os relatórios no menu Relatório de Enquete

`,
    'campaignpoll.option1': `Descreva a opção, veja a descriçao da opção 0`,
    'campaignpoll.option2': `Descreva a opção, veja a descriçao da opção 0`,
    'campaignpoll.option3': `Descreva a opção, veja a descriçao da opção 0`,
    'campaignpoll.option4': `Descreva a opção, veja a descriçao da opção 0`,
    'campaignpoll.option5': `Descreva a opção, veja a descriçao da opção 0`,
    'campaignpoll.option6': `Descreva a opção, veja a descriçao da opção 0`,
    'campaignpoll.option7': `Descreva a opção, veja a descriçao da opção 0`,
    'campaignpoll.option8': `Descreva a opção, veja a descriçao da opção 0`,
    'campaignpoll.option9': `Descreva a opção, veja a descriçao da opção 0`,
    //ENQUETE RELATóRIOS
    'campaignpollinfo.number': `Número da pessao que votou`,
    'campaignpollinfo.resposta': `Opção votada`,
    'campaignpollinfo.obs': ``,
    //NúMEROS BLOQUEADOS
    'campaignrestrictphone.number': ``,
    //AJUSTES
    'configuration.config_value': ``,
    'configuration.config_description': ``,
    //DIDS
    'did.did': `O número exatamente como chega no Asterisk.`,
    'did.activated': `Somente os números ativos podem receber chamadas`,
    'did.callerid': `Coloque aqui CallerID name, deixe em branco para usar o que vem do provedor do DID.`,
    'did.connection_charge': `Custo de ativaçao. Este custo será descontado do cliente somente no momento que o DID é vinculado ao usuário.`,
    'did.fixrate': `Custo mensal. Este valor será descontado automaticamente todos os meses do saldo do cliente. Se o cliente não tiver crédito o DID é cancelado automaticamente.`,
    'did.connection_sell': `Este é o valor que será cobrado em cada chamada, simplesmente por atender a chamada.`,
    'did.minimal_time_charge': `Tempo mínimo para tarifar o DID. Ex. Se colocar 3, qualquer chamada com tempo menor que 3 não será tarifado.`,
    'did.initblock': `Tempo mínimo em segundos para tarifar. Ex, se colocar 30, qualquer chamada que durar menos de 30 segundos, será cobrado 30 segundos.`,
    'did.increment': `Bloco de quantos em quantos segundos irá cobrar após o tempo mínimo. Ex: se colocar 6, quer dizer que sempre vai arredondar de 6 em 6 segundos, ou seja, uma chamada durou 32s, vai cobrar 36s.`,
    'did.charge_of': `Esta opção é para quando o DID tiver custo, neste caso poderá cobrar do usuario dono do DID, ou somente permitir chamadas de números cadastrado no menu CallerID.||Neste caso, o custo será cobrado do usuário ao qual o número foi atrelado.`,
    'did.calllimit': `Limite de chamadas simultâneas para este DID`,
    'did.description': `Usado para seu controle interno.`,
    'did.expression_1': `Esta é uma Expressão regular para tarifar o DID conforme o número de quem liga para o DID||Vamos analisar um exemplo real:

Digamos que queremos cobrar 0.10 quando recebemos uma chamada de um telefone fixo, e 0.20 se for de um celular, e bloquear qualquer outro formato.

Neste exemplo vamos criar regras para identificar o CallerID nos formatos 0 DDD número, DDD número ou 55 DDD número.

Veja na imagem abaixo como ficaria.

.. image:: ../img/did_regex.png
    :scale: 100% 


Expressão regular para celular
^[1-9][0-9]9\d{8}$|^0[1-9][0-9]9\d{8}$|^55[1-9][0-9]9\d{8}$

Expressão regular para fixo
^[1-9][0-9]\d{8}$|^0[1-9][0-9]\d{8}$|^55[1-9][0-9]\d{8}$



`,
    'did.selling_rate_1': `Preço por minuto a ser cobrado se validar a Expressão regular acima`,
    'did.block_expression_1': `Se colocar como SIM, e o número de quem ligou for validado com a Expressão regular acima, a chamada será desligada imediatamente.`,
    'did.send_to_callback_1': `Envia a chamada para CallBack se o número for validado com a Expressão regular acima||Como a chamada será enviada para um CallBack, então a chamada será desligada imediatamente. 
E se todas as configurações estiverem corretas, o CallBack este executado e o telefone do cliente tocará.`,
    'did.expression_2': `Igual a opçao 1. Clique para mais informaçōes.|https://wiki.magnusbilling.org/pt_BR/source/modules/did/did.html#did-expression-1`,
    'did.selling_rate_2': `Preço por minuto a ser cobrado se validar a Expressão regular acima`,
    'did.block_expression_2': `Se colocar como SIM, e o número de quem ligou for validado com a Expressão regular acima, a chamada será desligada imediatamente.`,
    'did.send_to_callback_2': `Envia a chamada para CallBack se o número for validado com a Expressão regular acima||Como a chamada será enviada para um CallBack, então a chamada será desligada imediatamente. 
E se todas as configurações estiverem corretas, o CallBack este executado e o telefone do cliente tocará.`,
    'did.expression_3': `Igual a opçao 1. Clique para mais informaçōes.|https://wiki.magnusbilling.org/pt_BR/source/modules/did/did.html#did-expression-1`,
    'did.selling_rate_3': `Preço por minuto a ser cobrado se validar a Expressão regular acima`,
    'did.block_expression_3': `Se colocar como SIM, e o número de quem ligou for validado com a Expressão regular acima, a chamada será desligada imediatamente.`,
    'did.send_to_callback_3': `Envia a chamada para CallBack se o número for validado com a Expressão regular acima||Como a chamada será enviada para um CallBack, então a chamada será desligada imediatamente. 
E se todas as configurações estiverem corretas, o CallBack este executado e o telefone do cliente tocará.`,
    'did.cbr': `Ativa o CallBack Pro.`,
    'did.cbr_ua': `Executar um áudio`,
    'did.cbr_total_try': `Quantas vezes o sistema vai tentar retornar para o cliente?`,
    'did.cbr_time_try': `Intervalo de tempo entre cada tentativa, em minutos.`,
    'did.cbr_em': `Executar o áudio antes de atender. O provedor do DID precisa aceitar EarlyMedia.`,
    'did.TimeOfDay_monFri': `Ex: sua trabalha de 09 as 12 e de 14h às 18h, e dentro deste horário você quer executar o callback e retornar a chamada para a pessoa que ligou, então coloque 09:00-12:00|14:00-18:00, os intervalos são separados por |`,
    'did.TimeOfDay_sat': `Mesma regra só que para sábados`,
    'did.TimeOfDay_sun': `Mesma regra só que para domingos`,
    'did.workaudio': `Áudio que será executado quando alguém ligar dentro do horário de atendimento.`,
    'did.noworkaudio': `Áudio que será executado quando ligar fora do horário de atendimento`,
    //DESTINO DE DID
    'diddestination.id_did': `Selecione o DID para criar o novo destino`,
    'diddestination.id_user': `Usuário que sera o dono deste DID`,
    'diddestination.activated': `Somente destinos ativos serão usados.`,
    'diddestination.priority': `Você pode criar até 5 destino para o mesmo DID. Se a chamada não completa no 1º tenta o 2º, até completar. `,
    'diddestination.voip_call': `Tipo de destinos. Esta opção vai redirecionar a chamada para o destino selecionado conforme o tipo escolhido.`,
    'diddestination.destination': ``,
    'diddestination.id_ivr': `Selecione uma URA para enviar a chamada, a URA precisa ser do mesmo usuário dono do DID`,
    'diddestination.id_queue': `Selecione uma fila de espera para enviar a chamada, a fila de espera precisa ser do mesmo usuário dono do DID`,
    'diddestination.id_sip': `Selecione uma conta SIP para enviar a chamada, a conta SIP precisa ser do mesmo usuário dono do DID`,
    'diddestination.context': `Nesta opção poderá ser usado um contexto no formato aceito pelo Asterisk||Como por exemplo:

_X. => 1,Dial(SIP/contavoip,45)
    same => n,Goto(s-\${DIALSTATUS},1)


exten => s-NOANSWER,1,Hangup
exten => s-CONGESTION,1,Congestion
exten => s-CANCEL,1,Hangup
exten => s-BUSY,1,Busy
exten => s-CHANUNAVAIL,1,SetCallerId(4545454545)
exten => s-CHANUNAVAIL,2,Dial(SIP/contavoip2,,T)


NÃO deve ser colocado o nomer para o context, pois o nome do contexto sera [did-numero-do-did]

Você pode verificar o contexto no arquivo /etc/asterisk/extensions_magnus_did.conf


    `,
    //USO DE DIDS
    'diduse.id_user': ``,
    'diduse.id_did': ``,
    'diduse.reservationdate': ``,
    //FIREWALL
    'firewall.ip': ``,
    'firewall.action': ``,
    'firewall.description': ``,
    //TOKEN
    'gauthenticator.username': ``,
    'gauthenticator.googleAuthenticator_enable': `Após o usuário ativar o Token, somente será possível logar no painel ou desativar o token com o token gerado pela APP Google Authenticator.`,
    'gauthenticator.code': ``,
    'gauthenticator.google_authenticator_key': ``,
    //GROUPMODULE
    'groupmodule.id_group': ``,
    'groupmodule.id_module': ``,
    //GRUPOS PARA CLIENTE
    'groupuser.id': ``,
    'groupuser.name': ``,
    //GRUPOS ADMINISTRADORES
    'groupusergroup.name': ``,
    'groupusergroup.user_prefix': ``,
    'groupusergroup.id_group': ``,
    //CONTAS IAX
    'iax.id_user': ``,
    'iax.username': ``,
    'iax.secret': ``,
    'iax.callerid': ``,
    'iax.disallow': ``,
    'iax.allow': ``,
    'iax.host': ``,
    'iax.nat': ``,
    'iax.context': ``,
    'iax.qualify': ``,
    'iax.dtmfmode': ``,
    'iax.insecure': ``,
    'iax.type': ``,
    'iax.calllimit': ``,
    //URAS
    'ivr.name': ``,
    'ivr.id_user': ``,
    'ivr.monFriStart': `Hora que inicia o horário de atendimento semanal`,
    'ivr.satStart': `Hora que inicia o horário de atendimento no sábado`,
    'ivr.sunStart': `Hora que inicia o horário de atendimento no domingo`,
    'ivr.workaudio': `Audio para executar dentro dos horários de atendimento`,
    'ivr.noworkaudio': `Áudio para executar fora de atendimento`,
    'ivr.type_0': ``,
    'ivr.id_ivr_0': ``,
    'ivr.id_queue_0': ``,
    'ivr.id_sip_0': ``,
    'ivr.extension_0': ``,
    'ivr.type_1': ``,
    'ivr.id_ivr_1': ``,
    'ivr.id_queue_1': ``,
    'ivr.id_sip_1': ``,
    'ivr.extension_1': ``,
    'ivr.type_2': ``,
    'ivr.id_ivr_2': ``,
    'ivr.id_queue_2': ``,
    'ivr.id_sip_2': ``,
    'ivr.extension_2': ``,
    'ivr.type_3': ``,
    'ivr.id_ivr_3': ``,
    'ivr.id_queue_3': ``,
    'ivr.id_sip_3': ``,
    'ivr.extension_3': ``,
    'ivr.type_4': ``,
    'ivr.id_ivr_4': ``,
    'ivr.id_queue_4': ``,
    'ivr.id_sip_4': ``,
    'ivr.extension_4': ``,
    'ivr.type_5': ``,
    'ivr.id_ivr_5': ``,
    'ivr.id_queue_5': ``,
    'ivr.id_sip_5': ``,
    'ivr.extension_5': ``,
    'ivr.type_6': ``,
    'ivr.id_ivr_6': ``,
    'ivr.id_queue_6': ``,
    'ivr.id_sip_6': ``,
    'ivr.extension_6': ``,
    'ivr.type_7': ``,
    'ivr.id_ivr_7': ``,
    'ivr.id_queue_7': ``,
    'ivr.id_sip_7': ``,
    'ivr.extension_7': ``,
    'ivr.type_8': ``,
    'ivr.id_ivr_8': ``,
    'ivr.id_queue_8': ``,
    'ivr.id_sip_8': ``,
    'ivr.extension_8': ``,
    'ivr.type_9': ``,
    'ivr.id_ivr_9': ``,
    'ivr.id_queue_9': ``,
    'ivr.id_sip_9': ``,
    'ivr.extension_9': ``,
    'ivr.type_10': ``,
    'ivr.id_ivr_10': ``,
    'ivr.id_queue_10': ``,
    'ivr.id_sip_10': ``,
    'ivr.extension_10': ``,
    'ivr.direct_extension': ``,
    'ivr.type_out_0': ``,
    'ivr.id_ivr_out_0': ``,
    'ivr.id_queue_out_0': ``,
    'ivr.id_sip_out_0': ``,
    'ivr.extension_out_0': ``,
    'ivr.type_out_1': ``,
    'ivr.id_ivr_out_1': ``,
    'ivr.id_queue_out_1': ``,
    'ivr.id_sip_out_1': ``,
    'ivr.extension_out_1': ``,
    'ivr.type_out_2': ``,
    'ivr.id_ivr_out_2': ``,
    'ivr.id_queue_out_2': ``,
    'ivr.id_sip_out_2': ``,
    'ivr.extension_out_2': ``,
    'ivr.type_out_3': ``,
    'ivr.id_ivr_out_3': ``,
    'ivr.id_queue_out_3': ``,
    'ivr.id_sip_out_3': ``,
    'ivr.extension_out_3': ``,
    'ivr.type_out_4': ``,
    'ivr.id_ivr_out_4': ``,
    'ivr.id_queue_out_4': ``,
    'ivr.id_sip_out_4': ``,
    'ivr.extension_out_4': ``,
    'ivr.type_out_5': ``,
    'ivr.id_ivr_out_5': ``,
    'ivr.id_queue_out_5': ``,
    'ivr.id_sip_out_5': ``,
    'ivr.extension_out_5': ``,
    'ivr.type_out_6': ``,
    'ivr.id_ivr_out_6': ``,
    'ivr.id_queue_out_6': ``,
    'ivr.id_sip_out_6': ``,
    'ivr.extension_out_6': ``,
    'ivr.type_out_7': ``,
    'ivr.id_ivr_out_7': ``,
    'ivr.id_queue_out_7': ``,
    'ivr.id_sip_out_7': ``,
    'ivr.extension_out_7': ``,
    'ivr.type_out_8': ``,
    'ivr.id_ivr_out_8': ``,
    'ivr.id_queue_out_8': ``,
    'ivr.id_sip_out_8': ``,
    'ivr.extension_out_8': ``,
    'ivr.type_out_9': ``,
    'ivr.id_ivr_out_9': ``,
    'ivr.id_queue_out_9': ``,
    'ivr.id_sip_out_9': ``,
    'ivr.extension_out_9': ``,
    'ivr.type_out_10': ``,
    'ivr.id_ivr_out_10': ``,
    'ivr.id_queue_out_10': ``,
    'ivr.id_sip_out_10': ``,
    'ivr.extension_out_10': ``,
    //LOG DE ACESSOS
    'logusers.id_user': ``,
    'logusers.id_log_actions': ``,
    'logusers.ip': ``,
    'logusers.description': ``,
    //MéTODOS DE PAGAMENTO
    'methodpay.show_name': `Nome que será mostrado no painel do cliente`,
    'methodpay.id_user': ``,
    'methodpay.country': `Somente para referencia`,
    'methodpay.active': `Ative se quiser deixar disponível para os clientes`,
    'methodpay.min': `Valor mínimo que deseja aceitar`,
    'methodpay.max': `Valor máximo que deseja aceitar`,
    'methodpay.username': ``,
    'methodpay.url': ``,
    'methodpay.fee': ``,
    'methodpay.boleto_banco': ``,
    'methodpay.boleto_agencia': ``,
    'methodpay.boleto_conta_corrente': ``,
    'methodpay.boleto_taxa': ``,
    'methodpay.boleto_instrucoes': ``,
    'methodpay.boleto_nome_emp': ``,
    'methodpay.boleto_end_emp': ``,
    'methodpay.boleto_cidade_emp': ``,
    'methodpay.boleto_estado_emp': ``,
    'methodpay.boleto_cpf_emp': ``,
    'methodpay.pagseguro_TOKEN': ``,
    'methodpay.P2P_CustomerSiteID': ``,
    'methodpay.P2P_KeyID': ``,
    'methodpay.P2P_Passphrase': ``,
    'methodpay.P2P_RecipientKeyID': ``,
    'methodpay.P2P_tax_amount': ``,
    'methodpay.client_id': ``,
    'methodpay.client_secret': ``,
    //MENUS
    'module.text': ``,
    'module.icon_cls': ``,
    'module.id_module': ``,
    'module.priority': ``,
    //PACOTES GRáTIS
    'offer.label': ``,
    'offer.packagetype': ``,
    'offer.freetimetocall': ``,
    'offer.billingtype': ``,
    'offer.price': ``,
    //RELATóRIO DE PACOTES
    'offercdr.id_user': ``,
    'offercdr.id_offer': ``,
    'offercdr.used_secondes': ``,
    'offercdr.date_consumption': ``,
    //USO DE PACOTES
    'offeruse.id_user': ``,
    'offeruse.id_offer': ``,
    'offeruse.month_payed': ``,
    'offeruse.reservationdate': ``,
    //AGENDAS
    'phonebook.name': ``,
    'phonebook.status': ``,
    'phonebook.description': ``,
    //NúMEROS
    'phonenumber.id_phonebook': ``,
    'phonenumber.number': `Nümero para enviar o torpedo/sms. Deve ser usado sempre no formato DDI+DDD+número`,
    'phonenumber.name': `Nome do dono do número, usado para TTS ou SMS`,
    'phonenumber.city': ``,
    'phonenumber.status': `MagnusBilling somente tenta enviar quando o status está ativo. Quando a chamada é enviada para seu provedor, o número fica com estado pendente. Se a chamada é completada, o estado muda para enviado, caso contrário ficará como pendente. Você pode usar o botão processar para reativar os números que e`,
    'phonenumber.info': ``,
    //PLANOS
    'plan.name': ``,
    'plan.signup': `Disponibilizar este plano no formulário de registro. Se tiver somente 1 plano os clientes que se registrarem vão usar este plano, se tiver mais de 1, aí o cliente poderá escolher. É necessário ter pelo menos 1 plano com esta opção ativada para funcionar o registro.`,
    'plan.ini_credit': `Quanto de crédito você quer dar para clientes que se registram através do formulário de registro.`,
    'plan.play_audio': `Executar áudios para os cliente deste plano ou mandar somente erro? Por exemplo os áudios que acabou o crédito.`,
    'plan.techprefix': `Techprefix é como uma senha para o cliente poder usar mais de uma plano. Por exemplo, digamos que você tem 3 tipos de planos,GSM, TDM e CLI, e quer deixar seu cliente escolher qual plano ele deseja usar. Então coloque techprefix nos planos e solicite ai seu cliente que para usar cada um dos planos e`,
    'plan.id_service': ``,
    //PREFIXOS
    'prefix.prefix': `Prefixo. Prefixo serão usados para criar as tarifas. EX. 5511.`,
    'prefix.destination': `Nome do destino. EX: Brasil SP`,
    //PROVEDORES
    'provider.provider_name': `Nome do provedor. Provedor é a empresa que você compra os minutos. O mesmo provedor pode ter vários troncos`,
    'provider.credit': `Quanto você tem de crédito com o provedor? Este campo é opcional.`,
    'provider.credit_control': ``,
    'provider.description': ``,
    //FILAS DE ESPERA
    'queue.id_user': ``,
    'queue.name': ``,
    'queue.language': ``,
    'queue.strategy': ``,
    'queue.ringinuse': `Chamar ou não agentes da fila que estejam em chamada.`,
    'queue.timeout': `Por quanto tempo deve ficar chamando um agente`,
    'queue.retry': `Tempo em segundos para tentar chamadas outro agente caso o anterior não atender`,
    'queue.wrapuptime': `Intervalo de tempo em segundos que o agente poderá receber outra chamada`,
    'queue.weight': `Importância desta fila. Por exemplo, você tem o mesmo agente em 2 filas, e chega 12 chamadas ao mesmo tempo, o Asterisk vai enviar a chamada da fila com maior importancia para o agente.`,
    'queue.periodic-announce': `Audio para os anúncios. Você pode colocar mais de um áudio, separando por  (,). Estes dados devem estar no diretório /var/lib/asterisk/sounds/`,
    'queue.periodic-announce-frequency': `Frequência que deve executar os anúncios.`,
    'queue.announce-position': `Informar a posição que a pessoa se encontra na fila`,
    'queue.announce-holdtime': `Deveria ser incluso no anuncio da posição a estimativa de espera?`,
    'queue.announce-frequency': `A cada quantos segundos deve informar a posição. Deixe em 0 para desativar o anuncio de posição.`,
    'queue.joinempty': `Permitir novas chamadas quando não tiver agente disponível para atender a chamada`,
    'queue.leavewhenempty': `Desligar as chamadas em espera quando não tiver mais agente livres`,
    'queue.max_wait_time': `Tempo maximo de espera para ser atendido`,
    'queue.max_wait_time_action': `Conta VoIP, IVR ou Fila de espera, para enviar o cliente caso o tempo máximo de espera for superado. Formatos aceitos: SIP/conta_voip, QUEUE/nome_da_queue ou IRV/nome_da_ivr.`,
    'queue.ring_or_moh': ``,
    'queue.musiconhold': ``,
    //AGENTES DA FILA
    'queuemember.queue_name': ``,
    'queuemember.interface': ``,
    'queuemember.paused': ``,
    //TARIFAS
    'rate.id_plan': `O plano que você quer adicionar esta tarifa.`,
    'rate.id_prefix': `Selecione o prefixo que quer criar a tarifa`,
    'rate.id_trunk_group': ``,
    'rate.rateinitial': `Preço de venda por minuto para este destino`,
    'rate.initblock': `Tempo mínimo em segundos para tarifar a venda. Ex, se colocar 30, qualquer chamada que durar menos de 30 segundos, será cobrado 30 segundos.`,
    'rate.billingblock': `Bloco de quantos em quantos segundos ira cobrar após o tempo minimo. Ex: se colocar 6, quer dizer que sempre vai arredondar de 6 em 6 segundos, ou seja, uma chamada durou 32s, vai cobrar 36s.`,
    'rate.minimal_time_charge': `Tempo mínimo para tarifar. Se colocar 3, só vai tarifar chamadas que o tempo for => que 3 segundos`,
    'rate.additional_grace': `Tempo para adicionar na duração da chamada. EX. se colocar 10, será adicionar 10 segundos no tempo de todas as chamadas, isso afeta a tarifação.`,
    'rate.package_offer': `Ative esta opção se você quer que esta tarifa seja usada nos pacotes grátis`,
    'rate.status': ``,
    //TARIFAS
    'ratecallshop.dialprefix': ``,
    'ratecallshop.destination': ``,
    'ratecallshop.buyrate': ``,
    'ratecallshop.minimo': ``,
    'ratecallshop.block': ``,
    'ratecallshop.minimal_time_charge': ``,
    //TARIFAS PROVEDORES
    'rateprovider.id_provider': ``,
    'rateprovider.id_prefix': ``,
    'rateprovider.buyrate': ``,
    'rateprovider.buyrateinitblock': ``,
    'rateprovider.buyrateincrement': ``,
    'rateprovider.minimal_time_buy': ``,
    //RECARGAS
    'refill.id_user': ``,
    'refill.credit': `Valor da recarga`,
    'refill.description': ``,
    'refill.payment': `Esta opção é somente para seu controle. O crédito será liberado para o cliente mesmo colocando como NÃO`,
    'refill.invoice_number': ``,
    //RECARGA DE PROVEDORES
    'refillprovider.id_provider': ``,
    'refillprovider.credit': ``,
    'refillprovider.description': ``,
    'refillprovider.payment': ``,
    //NúMEROS BLOQUEADOS
    'restrictedphonenumber.id_user': ``,
    'restrictedphonenumber.number': ``,
    'restrictedphonenumber.direction': ``,
    //SEND CREDIT PRODUCTS
    'sendcreditproducts.country': ``,
    'sendcreditproducts.operator_name': ``,
    'sendcreditproducts.operator_id': ``,
    'sendcreditproducts.SkuCode': ``,
    'sendcreditproducts.product': ``,
    'sendcreditproducts.send_value': ``,
    'sendcreditproducts.wholesale_price': ``,
    'sendcreditproducts.provider': ``,
    'sendcreditproducts.status': ``,
    'sendcreditproducts.info': ``,
    //SEND CREDIT RATES
    'sendcreditrates.idProductcountry': ``,
    'sendcreditrates.idProductoperator_name': ``,
    'sendcreditrates.sell_price': ``,
    //SEND CREDIT SUMMARY
    'sendcreditsummary.id_user': ``,
    //SERVIDORES
    'servers.name': ``,
    'servers.host': `Este menu é exclusivo para quem usa Slave e Proxy. Clique para saber mais sobre servidores Slave e Proxy|https://magnussolution.com/br/servicos/auto-desempenho/servidor-slave.html`,
    'servers.public_ip': ``,
    'servers.username': ``,
    'servers.password': ``,
    'servers.port': ``,
    'servers.sip_port': ``,
    'servers.type': ``,
    'servers.weight': ``,
    'servers.status': ``,
    'servers.description': ``,
    //SERVIçOS
    'services.type': `Tipo de serviço`,
    'services.name': `Nome para o serviço`,
    'services.calllimit': ``,
    'services.disk_space': `Coloque o total de espaço em disco em GB.`,
    'services.sipaccountlimit': ``,
    'services.price': ``,
    'services.return_credit': ``,
    'services.description': ``,
    //USO DE SERVIçOS
    'servicesuse.id_user': ``,
    'servicesuse.id_services': ``,
    'servicesuse.price': ``,
    'servicesuse.method': ``,
    'servicesuse.reservationdate': ``,
    //CONTAS SIP
    'sip.id_user': ``,
    'sip.defaultuser': `Usuário que será usado para logar nos softphones ou qualquer dispositivo SIP.`,
    'sip.secret': `Senha que será usado para logar nos softphones ou qualquer dispositivo SIP.`,
    'sip.callerid': `Este é o CallerID que será mostrado no destino, em chamadas externas o provedor precisa permitir CLI para que seja identificado corretamente no destino.`,
    'sip.alias': `Alias é um número para facilitar a discagem, pode colocar qualquer número. Pode repetir os mesmos números para contas diferente.`,
    'sip.disallow': `Esta opção desativa todos os codecs e deixa disponível para o usuário somente os que você selecionar abaixo.`,
    'sip.allow': ``,
    'sip.host': `Dynamic é a opção para deixar o usuário registrar sua conta em qualquer IP. Se você deseja autenticar o usuário por IP, coloque aqui o IP do cliente, deixe a senha em branco e coloque insecure para port/invite na TAB Informaçōes Adicionais.`,
    'sip.sip_group': `Usado a chamadas recebidas. Quando enviar um DID parar um grupo, vai chamar todas as contas que tiver no grupo. Você pode criar os grupos com qualquer nome`,
    'sip.videosupport': ``,
    'sip.block_call_reg': `Bloquear chamadas usando REGEX. EX: Para bloquear chamadas para celular é so colocar ^55\\d\\d9. Click para ir ao site que testa REGEX.|https://regex101.com`,
    'sip.record_call': ``,
    'sip.techprefix': ``,
    'sip.nat': `O cliente esta atras de NAT? Clique para mais informaçōes|https://www.voip-info.org/asterisk-sip-nat/`,
    'sip.directmedia': `Se ativado, Asterisk vai tentar enviar a mídia RTP direto entre seu cliente e seu provedor. Precisa ativar no tronco também. Clique para mais informaçōes|https://www.voip-info.org/asterisk-sip-canreinvite/`,
    'sip.qualify': `Enviar pacote OPTION para verificar se o usuário está online.`,
    'sip.context': `Somente altere se você sabe o que está fazendo.`,
    'sip.dtmfmode': ``,
    'sip.insecure': `Se o host estiver dynamic esta opção precisa estar como NO. Para IP authentication alterar para port,invite.`,
    'sip.deny': ``,
    'sip.permit': ``,
    'sip.type': ``,
    'sip.allowtransfer': `Permite esta conta VoIP fazer transferência. O código para transferência é *2ramal. É necessário ativar a transferência no arquivo features.conf do Asterisk`,
    'sip.ringfalse': `Ativa ring falso. Adiciona rR do comando Dial.`,
    'sip.calllimit': `Chamadas simultâneas permitidas.`,
    'sip.mohsuggest': ``,
    'sip.url_events': ``,
    'sip.addparameter': ``,
    'sip.amd': ``,
    'sip.type_forward': ``,
    'sip.id_ivr': ``,
    'sip.id_queue': ``,
    'sip.id_sip': ``,
    'sip.extension': ``,
    'sip.dial_timeout': `Tempo em segundos que será aguardado para atender a chamada.`,
    'sip.voicemail': ``,
    'sip.voicemail_email': ``,
    'sip.voicemail_password': ``,
    'sip.sipshowpeer': ``,
    //SIP TRACE
    'siptrace.head': ``,
    //ATA LINKSYS
    'sipuras.nserie': `Linksys serial number`,
    'sipuras.macadr': `Linksys MAC address`,
    'sipuras.senha_user': `Usuário para entrar na configuração do LinkSys`,
    'sipuras.senha_admin': `Senha para entrar na configuração do LinkSys`,
    'sipuras.antireset': `Tenha cuidado. Esta opção desativa o reinicio com o comando *73738#`,
    'sipuras.Enable_Web_Server': `Tenha cuidado! Se desativado, não será mais possível entrar nas configuraçōes do Linksys.`,
    'sipuras.marca': ``,
    'sipuras.altera': ``,
    'sipuras.User_ID_1': ``,
    'sipuras.Password_1': `Senha da Conta VoIP`,
    'sipuras.Use_Pref_Codec_Only_1': `Somente usar o codec preferencial`,
    'sipuras.Preferred_Codec_1': `Configurar codec preferencial`,
    'sipuras.Register_Expires_1': `Tempo em segundos que o Linksys fica enviando o REGISTER para o servidor. Se for receber chamadas nesta linha, melhor deixar entre 120 e 480 segundos.`,
    'sipuras.Dial_Plan_1': `Read linksys documentation`,
    'sipuras.NAT_Mapping_Enable_1_': ``,
    'sipuras.NAT_Keep_Alive_Enable_1_': ``,
    'sipuras.User_ID_2': ``,
    'sipuras.Password_2': ``,
    'sipuras.Use_Pref_Codec_Only_2': ``,
    'sipuras.Preferred_Codec_2': ``,
    'sipuras.Register_Expires_2': ``,
    'sipuras.Dial_Plan_2': ``,
    'sipuras.NAT_Mapping_Enable_2_': ``,
    'sipuras.NAT_Keep_Alive_Enable_2_': ``,
    'sipuras.STUN_Enable': ``,
    'sipuras.STUN_Test_Enable': ``,
    'sipuras.Substitute_VIA_Addr': ``,
    'sipuras.STUN_Server': ``,
    //SMS
    'sms.id_user': ``,
    'sms.telephone': `Número no formato E 164`,
    'sms.sms': ``,
    'sms.sms_from': ``,
    //SMTP
    'smtps.host': `Você precisa verificar se o datacenter não bloqueia as portas usada pelo SMTP`,
    'smtps.username': ``,
    'smtps.password': ``,
    'smtps.port': ``,
    'smtps.encryption': ``,
    //MODELOS DE EMAIL
    'templatemail.fromname': ``,
    'templatemail.fromemail': ``,
    'templatemail.subject': ``,
    'templatemail.messagehtml': ``,
    //TRONCOS
    'trunk.id_provider': ``,
    'trunk.trunkcode': ``,
    'trunk.user': `Somente coloque usuário se seu tronco for autenticado por usuário e senha.`,
    'trunk.secret': `Somente coloque senha se seu tronco for autenticado por usuário e senha.`,
    'trunk.host': `IP ou Domínio do tronco`,
    'trunk.trunkprefix': `Adiciona um prefixo no inicio do número to enviar para o tronco. Também usado para quando você precisa enviar um techprefix. EX: Se você tem que enviar o número no formato 0DDD número, coloque aqui 0 e no campo abaixo 55. Isso vai remover o 55 e adiconar o 0 `,
    'trunk.removeprefix': `Remove este prefixo do número.`,
    'trunk.allow': `Selecione os codecs que o tronco aceita.`,
    'trunk.providertech': `Protocolo do tronco. Alguns protocolos como Dahdi, Dongle, DGV, khomp, precisam ser instalado no Asterisk antes de usar.`,
    'trunk.status': `Se o tronco for inativado, Magnusbilling enviara a chamada para o tronco backup`,
    'trunk.allow_error': `Se SIM, a chamadas será enviada para o tronco backup a menos que a chamada seja atendida ou cancelada. Somente use quando seu tronco tiver algum problema de sinalização, por exemplo sinaliza BUSY quando não tiver canal disponível.`,
    'trunk.register': `Somente ative se seu tronco for por usuário e senha.`,
    'trunk.register_string': ``,
    'trunk.fromuser': `Many SIP providers require this. Normally it is the some username`,
    'trunk.fromdomain': ``,
    'trunk.language': ``,
    'trunk.context': `Somente altere se você souber o que está fazendo.`,
    'trunk.dtmfmode': `Tipo de DTMF. Clique para mais informaçōes|https://www.voip-info.org/asterisk-dtmf/`,
    'trunk.insecure': `Insecure. Clique para mais informaçōes|https://www.voip-info.org/asterisk-sip-insecure/`,
    'trunk.maxuse': `Número máximo de chamadas simultâneas.`,
    'trunk.nat': ``,
    'trunk.directmedia': ``,
    'trunk.qualify': ``,
    'trunk.type': ``,
    'trunk.disallow': ``,
    'trunk.sendrpid': ``,
    'trunk.addparameter': ``,
    'trunk.port': `Porta do tronco. Se você precisar usar outra porta diferente da 5060, lembre-se de liberar a porta no IPTABLES.`,
    'trunk.link_sms': `URL para enviar SMS. Substituir o número por %number% e o texto por %text%. EX. a URL enviada pelo seu provedor de SMS é http://trunkWebSite.com.br/sendsms.php?usuário=magnus&senha=billing&numero=XXXXXX&texto=SSSSSSSSSSS. altere XXXXXX per %number% e SSSSSSSSSSS por %text% `,
    'trunk.sms_res': `Deixe em branco para não aguardar resposta do provedor. Ou coloque o texto que deve constar na resposta do provedor para ser considerado ENVIADO.`,
    'trunk.sip_config': `Formato válido no Asterisk sip.conf, uma opção por linha.`,
    //GRUPO DE TRONCOS
    'trunkgroup.name': ``,
    'trunkgroup.type': ``,
    'trunkgroup.id_trunk': ``,
    //USUáRIOS
    'user.username': `Usuário para logar no painel de cliente.`,
    'user.password': `Senha para logar no painel de cliente.`,
    'user.id_group': `Existe 3 tipos de grupos: Administrador, Revendedor e Cliente. Você pode criar or editar qualquer destes grupos. Cada grupo tem suas permissōes específicas. Veja o menu Configurações, Grupo para Clientes.`,
    'user.id_group_agent': ``,
    'user.id_plan': `Plano usado para tarifar este cliente.`,
    'user.language': ``,
    'user.prefix_local': `Esta regra permite o cliente discar no formato local. ||EX 0 DDD ou somente o número dentro de seu DDD. As regras são separadas por vírgula e composta por 2 ou 3 parâmetros separados por /.
1º é o número que será substituído. Pode ser * para pegar qualquer dígito.
2º é o número que vai substituir o 1º.
3º é a quantidade de dígitos do número. Se nao colocar o 3º parametro, nao sera verificado a quantidade de dígitos.

Alguns exemplos.

Permite ligar 55DDDnº, 0DDDnº ou somente o número

0/55,*/5511/8,*/5511/9
Regra 1 -> números que iniciam com 0, o zero será substituído por 55, independente de quantos digitos tiver o número. 
Regra 2 -> números que iniciam com qualquer valor e tem 8 dígitos, será adicionado 5511 na frente. 
Regra 3 -> números que iniciam com qualquer valor e tem 9 dígitos, será adicionado 5511 na frente


Permite ligar 55DDDnº, 0DDDnº, DDDnº ou somente o número

0/55,*/5511/8,*/5511/9,*/55/10,*/55/11
Regra 1 -> números que iniciam com 0, o zero será substituído por 55, independente de quantos digitos tiver o número. 
Regra 2 -> números que iniciam com qualquer valor e tem 8 dígitos, será adicionado 55 na frente. 
Regra 3 -> números que iniciam com qualquer valor e tem 9 dígitos, será adicionado 55 na frente
Regra 4 -> números que iniciam com qualquer valor e tem 10 dígitos, será adicionado 5511 na frente. 
Regra 5 -> números que iniciam com qualquer valor e tem 11 dígitos, será adicionado 5511 na frente
`,
    'user.active': `Somente usuários ativos podem fazer chamadas.`,
    'user.country': `Usado para CID Callback. O DDI do país será adicionado antes do CallerID to converter o CallerID para o formato DDI DDD nº`,
    'user.id_offer': `Usado para ativar um pacote grátis. É necessário informar as tarifas que vão pertencer aos pacotes gratís.`,
    'user.cpslimit': `Limite de CPS(chamadas por segundo) para este cliente. As chamadas que superar este limite será enviado CONGESTION.`,
    'user.company_name': `magnus`,
    'user.state_number': ``,
    'user.lastname': ``,
    'user.firstname': ``,
    'user.city': ``,
    'user.state': ``,
    'user.address': ``,
    'user.neighborhood': ``,
    'user.zipcode': ``,
    'user.phone': ``,
    'user.mobile': ``,
    'user.email': ``,
    'user.doc': ``,
    'user.vat': `Usado em alguns métodos de pagamento.`,
    'user.typepaid': ``,
    'user.creditlimit': `Somente usado para Pos-Pago. O cliente poderá ligar até chegar a este limite negativo.`,
    'user.credit_notification': `Se o crédito do cliente ficar menor que esta campo, MagnusBilling vai enviar um email para o cliente informando que está com pouco crédito. NECESSÁRIO TER CADASTRADO UM SERVIDOR SMTP NO MENU CONFIGURAÇŌES`,
    'user.enableexpire': ``,
    'user.expirationdate': `Data que este cliente não poderá mais efetuar chamadas`,
    'user.record_call': `Esta opção é somente para chamadas de DID, para chamadas externas tem que ativar nas Contas VoIP.`,
    'user.mix_monitor_format': `Formato que será usado para gravar as chamadas.`,
    'user.calllimit': `Chamadas simultâneas permitidas para este usuário.`,
    'user.calllimit_error': ``,
    'user.callshop': `Ativa o módulo CallShop. Somente ative se realmente for usar. É necessário dar permissōes ao grupo selecionado.`,
    'user.disk_space': `Espaço em GB que o usuário poderá usar com as gravaçōes. Coloque -1 para deixar sem limite.É necessário adicionar no cron o seguinte comando php /var/www/html/mbilling/cron.php UsuárioDiskSpace `,
    'user.sipaccountlimit': `Quantas Contas VoIP este usuário poderá ter. Será necessário dar permissōes no grupo para criar Contas VoIP.`,
    'user.callingcard_pin': `Usado para autenticação do calling card.`,
    'user.restriction': ``,
    'user.transfer_international_profit': ``,
    'user.transfer_flexiload_profit': ``,
    'user.transfer_bkash_profit': ``,
    'user.transfer_dbbl_rocket': ``,
    'user.transfer_dbbl_rocket_profit': ``,
    'user.transfer_show_selling_price': ``,
    //TARIFAS PARA CLIENTES
    'userrate.id_prefix': `Selecione o prefixo que você deseja subscrever.`,
    'userrate.rateinitial': `Novo preço de venda para este prefixo`,
    'userrate.initblock': `Mínimo de venda`,
    'userrate.billingblock': `Bloco de venda`,
    //VOUCHER
    'voucher.credit': `Valor do VOUCHER`,
    'voucher.id_plan': `Plano que será usado no cliente que usar este VOUCHER.`,
    'voucher.language': `Idioma que será usado`,
    'voucher.prefix_local': `Regra que será usado no campo DDD do cliente`,
    'voucher.quantity': `Quantos VOUCHER você deseja gerar?`,
    'voucher.tag': ``,
    'voucher.voucher': ``,
});