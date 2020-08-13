.. _user-menu-list:

***************
Lista de campos
***************



.. _user-username:

Usuário
""""""""

| Usuário para logar no painel de cliente.
| Descriçao




.. _user-password:

Senha
"""""

| Senha para logar no painel de cliente.




.. _user-id_group:

Grupo
"""""

| Existe 3 tipos de grupos: Administrador, Revendedor e Cliente. Você pode criar or editar qualquer destes grupos. Cada grupo tem suas permissōes especificas. Veja o menu Configurações, Grupo para Clientes.




.. _user-id_group_agent:

Grupo para os usuários do agente
"""""""""""""""""""""""""""""""""

| Nós ainda não escrevemos a descrição deste campo.




.. _user-id_plan:

Plano
"""""

| Plano usado para tarifar este cliente.




.. _user-language:

Idioma
""""""

| Nós ainda não escrevemos a descrição deste campo.




.. _user-prefix_local:

Regra prefixo
"""""""""""""

| Esta regra permite o cliente discar no formato local. 
|  EX 0ddd ou somente o número dentro de seu DDD. As regras são separadas por virgula e composta por 2 ou 3 parametros separados por /.
| 1º é o número que sera subistituido. Pode ser * para pegar qualquer digito.
| 2º é o número que vai subistituir o 1º.
| 3º é a quantidade de digitos do número. Se nao colocar o 3º paramentro, nao sera verificado a quantidade de digitos.
| 
| Alguns exemplos.
| 
| Permite ligar 55DDDnº, 0DDDnº ou so numero
| 
| 0/55,*/5511/8,*/5511/9
| Regra 1 -> números que iniciam com 0, o zero sera subistituido por 55, independente de quantos digitos tiver o numero. 
| Regra 2 -> números que iniciam com qualquer valor e tem 8 digitos, sera adicionado 5511 na frente. 
| Regra 3 -> números que iniciam com qualquer valor e tem 9 digitos, sera adicionado 5511 na frente
| 
| 
| Permite ligar 55DDDnº, 0DDDnº, DDDnº ou so numero
| 
| 0/55,*/5511/8,*/5511/9,*/55/10,*/55/11
| Regra 1 -> números que iniciam com 0, o zero sera subistituido por 55, independente de quantos digitos tiver o numero. 
| Regra 2 -> números que iniciam com qualquer valor e tem 8 digitos, sera adicionado 55 na frente. 
| Regra 3 -> números que iniciam com qualquer valor e tem 9 digitos, sera adicionado 55 na frente
| Regra 4 -> números que iniciam com qualquer valor e tem 10 digitos, sera adicionado 5511 na frente. 
| Regra 5 -> números que iniciam com qualquer valor e tem 11 digitos, sera adicionado 5511 na frente
| 




.. _user-active:

Ativo
"""""

| Somente usuários ativos podem fazer chamadas.




.. _user-country:

País
"""""

| Usado para CID Callback. O DDI do país será adicionado antes do CallerID to converter o CallerID para o formato DDI DDD nº




.. _user-id_offer:

Pacotes grátis
"""""""""""""""

| Usado para ativar um pacote gratis. É necessario informar as tarifas que vão pertencer aos pacotes gratís.




.. _user-cpslimit:

Limite de CPS
"""""""""""""

| Limite de CPS(chamadas por segundo) para este cliente. As chamadas que superar este limite seráenviado CONGESTION.




.. _user-company_name:

Nome da empresa
"""""""""""""""

| magnus




.. _user-state_number:

Inscrição estadual
""""""""""""""""""""

| Nós ainda não escrevemos a descrição deste campo.




.. _user-lastname:

Sobrenome
"""""""""

| Nós ainda não escrevemos a descrição deste campo.




.. _user-firstname:

Nome
""""

| Nós ainda não escrevemos a descrição deste campo.




.. _user-city:

Cidade
""""""

| Nós ainda não escrevemos a descrição deste campo.




.. _user-state:

Estado
""""""

| Nós ainda não escrevemos a descrição deste campo.




.. _user-address:

Endereço
"""""""""

| Nós ainda não escrevemos a descrição deste campo.




.. _user-neighborhood:

Bairro
""""""

| Nós ainda não escrevemos a descrição deste campo.




.. _user-zipcode:

CEP
"""

| Nós ainda não escrevemos a descrição deste campo.




.. _user-phone:

Fone
""""

| Nós ainda não escrevemos a descrição deste campo.




.. _user-mobile:

Celular
"""""""

| Nós ainda não escrevemos a descrição deste campo.




.. _user-email:

Email
"""""

| Nós ainda não escrevemos a descrição deste campo.




.. _user-doc:

CPF/CNPJ
""""""""

| Nós ainda não escrevemos a descrição deste campo.




.. _user-vat:

VAT
"""

| Usado em algums metodos de pagamento.




.. _user-typepaid:

Tipo pago
"""""""""

| Nós ainda não escrevemos a descrição deste campo.




.. _user-creditlimit:

Limite de crédito
""""""""""""""""""

| Somente usado para Pos-Pago. O cliente poderá ligar até chegar a este limite negativo.




.. _user-credit_notification:

Notificação de crédito
"""""""""""""""""""""""""

| Se o crédito do cliente ficar menor que esta campo, MagnusBilling vai enviar um email para o cliente informando que esta com pouco crédito. NECESSARIO TER CADASTRADO UM SERVIDOR SMTP NO MENU CONFIGURAÇŌES




.. _user-enableexpire:

Habilitar vencimento
""""""""""""""""""""

| Nós ainda não escrevemos a descrição deste campo.




.. _user-expirationdate:

Data de expiração
"""""""""""""""""""

| Data que este cliente não poderá mais efetuar chamadas




.. _user-record_call:

Gravar chamadas
"""""""""""""""

| Esta opção é somente para chamadas de DID, para chamadas externas tem que ativar nas Contas VoIP.




.. _user-mix_monitor_format:

Formato das gravaçōes
"""""""""""""""""""""""

| Formato que será usado para gravar chamadas.




.. _user-calllimit:

Limite de chamada
"""""""""""""""""

| Chamadas simultâneas permitidas para este usuário.




.. _user-calllimit_error:

Erro ao superar limite
""""""""""""""""""""""

| Nós ainda não escrevemos a descrição deste campo.




.. _user-callshop:

CallShop
""""""""

| Ativa o modulo CallShop. Somente ative se realmente for usar. É necessário dar permissōes ao grupo selecionado.




.. _user-disk_space:

Espaço em disco
""""""""""""""""

| Espaço em GB que o usuário podera usar com as gravaçōes. Coloque -1 para deixar sem limite.É necessário adicionar no cron o seguinte comando php /var/www/html/mbilling/cron.php UsuárioDiskSpace 




.. _user-sipaccountlimit:

Limite de contas SIP
""""""""""""""""""""

| Quantas Contas VoIP este usuário poderá ter. Será necessário dar permissōes no grupo para criar Contas VoIP.




.. _user-callingcard_pin:

CallingCard PIN
"""""""""""""""

| Usado para autentição do callingcard.




.. _user-restriction:

Restriction
"""""""""""

| Nós ainda não escrevemos a descrição deste campo.




.. _user-transfer_international_profit:

Lucro
"""""

| Nós ainda não escrevemos a descrição deste campo.




.. _user-transfer_flexiload_profit:

Lucro
"""""

| Nós ainda não escrevemos a descrição deste campo.




.. _user-transfer_bkash_profit:

Lucro
"""""

| Nós ainda não escrevemos a descrição deste campo.




.. _user-transfer_dbbl_rocket:

Enable DBBL/Rocket
""""""""""""""""""

| Nós ainda não escrevemos a descrição deste campo.




.. _user-transfer_dbbl_rocket_profit:

Lucro
"""""

| Nós ainda não escrevemos a descrição deste campo.




.. _user-transfer_show_selling_price:

Mostrar preço de venda
"""""""""""""""""""""""

| Nós ainda não escrevemos a descrição deste campo.



