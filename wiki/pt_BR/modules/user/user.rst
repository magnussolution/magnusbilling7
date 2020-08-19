
.. _user-username:

Usuário
--------

| Usuário para logar no painel de cliente.




.. _user-password:

Senha
-----

| Senha para logar no painel de cliente.




.. _user-id-group:

Grupo
-----

| Existe 3 tipos de grupos: Administrador, Revendedor e Cliente. Você pode criar or editar qualquer destes grupos. Cada grupo tem suas permissōes específicas. Veja o menu Configurações, Grupo para Clientes.




.. _user-id-group-agent:

Grupo para os usuários do agente
---------------------------------

| Nós ainda não escrevemos a descrição deste campo.




.. _user-id-plan:

Plano
-----

| Plano usado para tarifar este cliente.




.. _user-language:

Idioma
------

| Nós ainda não escrevemos a descrição deste campo.




.. _user-prefix-local:

Regra prefixo
-------------

| Esta regra permite o cliente discar no formato local. 
| EX 0 DDD ou somente o número dentro de seu DDD. As regras são separadas por vírgula e composta por 2 ou 3 parâmetros separados por /.
| 1º é o número que será substituído. Pode ser * para pegar qualquer dígito.
| 2º é o número que vai substituir o 1º.
| 3º é a quantidade de dígitos do número. Se nao colocar o 3º parametro, nao será verificado a quantidade de dígitos.
| 
| Alguns exemplos.
| 
| Permite ligar 55DDDnº, 0DDDnº ou somente o número
| 
| 0/55,*/5511/8,*/5511/9
| Regra 1 -> números que iniciam com 0, o zero será substituído por 55, independente de quantos digitos tiver o número. 
| Regra 2 -> números que iniciam com qualquer valor e tem 8 dígitos, será adicionado 5511 na frente. 
| Regra 3 -> números que iniciam com qualquer valor e tem 9 dígitos, será adicionado 5511 na frente
| 
| 
| Permite ligar 55DDDnº, 0DDDnº, DDDnº ou somente o número
| 
| 0/55,*/5511/8,*/5511/9,*/55/10,*/55/11
| Regra 1 -> números que iniciam com 0, o zero será substituído por 55, independente de quantos digitos tiver o número. 
| Regra 2 -> números que iniciam com qualquer valor e tem 8 dígitos, será adicionado 55 na frente. 
| Regra 3 -> números que iniciam com qualquer valor e tem 9 dígitos, será adicionado 55 na frente
| Regra 4 -> números que iniciam com qualquer valor e tem 10 dígitos, será adicionado 5511 na frente. 
| Regra 5 -> números que iniciam com qualquer valor e tem 11 dígitos, será adicionado 5511 na frente
| 




.. _user-active:

Ativo
-----

| Somente usuários ativos podem fazer chamadas.




.. _user-country:

País
-----

| Usado para CID Callback. O DDI do país será adicionado antes do CallerID to converter o CallerID para o formato DDI DDD nº




.. _user-id-offer:

Pacotes grátis
---------------

| Usado para ativar um pacote grátis. É necessário informar as tarifas que vão pertencer aos pacotes gratís.




.. _user-cpslimit:

Limite de CPS
-------------

| Limite de CPS(chamadas por segundo) para este cliente. As chamadas que superar este limite será enviado CONGESTION.




.. _user-company-name:

Nome da empresa
---------------

| magnus




.. _user-state-number:

Inscrição estadual
--------------------

| Nós ainda não escrevemos a descrição deste campo.




.. _user-lastname:

Sobrenome
---------

| Nós ainda não escrevemos a descrição deste campo.




.. _user-firstname:

Nome
----

| Nós ainda não escrevemos a descrição deste campo.




.. _user-city:

Cidade
------

| Nós ainda não escrevemos a descrição deste campo.




.. _user-state:

Estado
------

| Nós ainda não escrevemos a descrição deste campo.




.. _user-address:

Endereço
---------

| Nós ainda não escrevemos a descrição deste campo.




.. _user-neighborhood:

Bairro
------

| Nós ainda não escrevemos a descrição deste campo.




.. _user-zipcode:

CEP
---

| Nós ainda não escrevemos a descrição deste campo.




.. _user-phone:

Fone
----

| Nós ainda não escrevemos a descrição deste campo.




.. _user-mobile:

Celular
-------

| Nós ainda não escrevemos a descrição deste campo.




.. _user-email:

Email
-----

| Nós ainda não escrevemos a descrição deste campo.




.. _user-doc:

CPF/CNPJ
--------

| Nós ainda não escrevemos a descrição deste campo.




.. _user-vat:

Imposto
-------

| Usado em alguns métodos de pagamento.




.. _user-typepaid:

Tipo pago
---------

| Nós ainda não escrevemos a descrição deste campo.




.. _user-creditlimit:

Limite de crédito
------------------

| Somente usado para Pos-Pago. O cliente poderá ligar até chegar a este limite negativo.




.. _user-credit-notification:

Notificação de crédito
-------------------------

| Se o crédito do cliente ficar menor que esta campo, MagnusBilling vai enviar um email para o cliente informando que está com pouco crédito. NECESSÁRIO TER CADASTRADO UM SERVIDOR SMTP NO MENU CONFIGURAÇŌES




.. _user-enableexpire:

Habilitar vencimento
--------------------

| Nós ainda não escrevemos a descrição deste campo.




.. _user-expirationdate:

Data de expiração
-------------------

| Data que este cliente não poderá mais efetuar chamadas




.. _user-record-call:

Gravar chamadas
---------------

| Esta opção é somente para chamadas de DID, para chamadas externas tem que ativar nas Contas VoIP.




.. _user-mix-monitor-format:

Formato das gravaçōes
-----------------------

| Formato que será usado para gravar as chamadas.




.. _user-calllimit:

Limite de chamada
-----------------

| Chamadas simultâneas permitidas para este usuário.




.. _user-calllimit-error:

Erro ao superar limite
----------------------

| Nós ainda não escrevemos a descrição deste campo.




.. _user-callshop:

CallShop
--------

| Ativa o módulo CallShop. Somente ative se realmente for usar. É necessário dar permissōes ao grupo selecionado.




.. _user-disk-space:

Espaço em disco
----------------

| Espaço em GB que o usuário poderá usar com as gravaçōes. Coloque -1 para deixar sem limite.É necessário adicionar no cron o seguinte comando php /var/www/html/mbilling/cron.php UsuárioDiskSpace 




.. _user-sipaccountlimit:

Limite de contas SIP
--------------------

| Quantas Contas VoIP este usuário poderá ter. Será necessário dar permissōes no grupo para criar Contas VoIP.




.. _user-callingcard-pin:

CallingCard PIN
---------------

| Usado para autenticação do calling card.




.. _user-restriction:

Restriction
-----------

| Nós ainda não escrevemos a descrição deste campo.




.. _user-transfer-international-profit:

Lucro
-----

| Nós ainda não escrevemos a descrição deste campo.




.. _user-transfer-flexiload-profit:

Lucro
-----

| Nós ainda não escrevemos a descrição deste campo.




.. _user-transfer-bkash-profit:

Lucro
-----

| Nós ainda não escrevemos a descrição deste campo.




.. _user-transfer-dbbl-rocket:

Enable DBBL/Rocket
------------------

| Nós ainda não escrevemos a descrição deste campo.




.. _user-transfer-dbbl-rocket-profit:

Lucro
-----

| Nós ainda não escrevemos a descrição deste campo.




.. _user-transfer-show-selling-price:

Mostrar preço de venda
-----------------------

| Nós ainda não escrevemos a descrição deste campo.



