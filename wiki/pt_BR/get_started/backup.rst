******
Backup
******

É sempre uma boa ideia ter um backup.

O backup não salva a tabela de chamada rejeitadas, pois esta tabela costuma ser enorme.

Backup manual
^^^^^^^^^^^^^

O projeto já conta com um script para fazer o backup do Banco de Dados e dos arquivos do Asterisk.
Na instalação já é adicionado o script no Crontab do Linux para que realize um backup diário. Por padrão as 02:00.
O backup é salvo no diretório /usr/local/src

Manualmente
^^^^^^^^^^^

Execute este comando no SHELL do seu servidor.
php /var/www/html/mbilling/cron.php Backup

Crontab
^^^^^^^

Configurando o crontab -e
 
::

 crontab -e

Procure a linha abaixo e altere para o horário desejado, ou comente a linha com ; para não fazer backup automático.

::

 0 2 * * * php /var/www/html/mbilling/cron.php Backup


Menu Backup
^^^^^^^^^^^

Também é possível ver, baixar e/ou deletar os backups através do menu Backup localizado em Configurações.


