
.. _firewall-ip:

IP
--

| IP




.. _firewall-action:

Banido permanente
-----------------

| Com esta opção em SIM, o ip será colocado na lista de ip-blacklist do fail2ban e ficará bloqueado para sempre.
| A opção NÃO vai bloquear o ip momentaneamente conforme os parâmetros no arquivo /etc/fail2ba/jail.local.
| 
|     Por padrão o IP ficará bloqueado por 10 minutos.




.. _firewall-description:

Descrição
-----------

| Estas informaçōes são capturadas do arquivo de log /var/log/fail2ban.log
| É possível acompanhar esse LOG com o comando 
| 
| 
| tail -f /var/log/fail2ban.log
| 
|     



