#!/bin/bash
clear
echo
echo
echo
echo "=======================WWW.MAGNUSSOLUTION.COM===========================";
echo "_      _                               ______ _ _ _ _                  ";
echo "|\    /|                               | ___ (_) | (_)                 ";
echo "| \  / | ___  ____  _ __  _   _  _____ | |_/ /_| | |_ _ __   ____      ";
echo "|  \/  |/   \/  _ \| '_ \| | | \| ___| | ___ \ | | | | '_ \ /  _ \     ";
echo "| |\/| |  | |  (_| | | | | |_| ||____  | |_/ / | | | | | | |  (_| |    ";
echo "|_|  |_|\___|\___  |_| | |_____|_____|  \___/|_|_|_|_|_| |_|\___  |    ";
echo "                _/ |                                           _/ |    ";
echo "               |__/                                           |__/     ";
echo "                                                                       ";
echo "======================= VOIP SYSTEM FOR LINUX =========================";
echo

unset HISTFILE
if [ -z "$1" ]; then
  echo "Using ./installOpenSips.sh LOCAL_IP MBILLING_IP LOCANET(optinal)";
  exit
fi

if [ -z "$2" ]; then
  echo "Using ./installOpenSips.sh LOCAL_IP MBILLING_IP LOCANET(optinal)";
  exit
fi

sleep 3

proxyip=$1
ipMbilling=$2

if [ -z "$3" ]; then
  localIP=$1
else
  localIP=$3
fi

echo "TRIS SCRIPT WILL INSTALL OPENSIPS IN THIS SERVER PUBLIC IP $proxyip LOCALNET $localIP TO CONNECT WITH MAGNUSBILLING IP $ipMbilling"
apt -y update
apt -y upgrade
apt -y install m4 git nano sudo curl dbus apache2 lsb-release dirmngr apt-transport-https ca-certificates
apt -o Acquire::Check-Valid-Until=false update 
apt -y install php php-gd php-mysql php-xmlrpc php-pear php-cli php-apcu php-curl php-xml libapache2-mod-php
apt -y install git gcc bison flex make openssl perl libdbi-perl libdbd-mysql-perl libdbd-pg-perl libfrontier-rpc-perl libterm-readline-gnu-perl libberkeleydb-perl ssh libxml2 libxml2-dev libxmlrpc-core-c3-dev libpcre3 libpcre3-dev subversion libncurses5-dev git ngrep libssl-dev net-tools
apt -y install autoconf automake devscripts gawk ntpdate ntp g++ git-core curl sudo xmlstarlet unixodbc-bin apache2 libjansson-dev git  odbcinst1debian2 libodbc1 odbcinst unixodbc unixodbc-dev
apt -y install php-fpm php  php-dev php-common php-cli php-gd php-pear php-cli php-sqlite3 php-curl php-mbstring unzip libapache2-mod-php uuid-dev libxml2 libxml2-dev openssl libcurl4-openssl-dev gettext gcc g++ libncurses5-dev sqlite3 libsqlite3-dev subversion mpg123
apt -y install mariadb-server php-mysql
apt -y install unzip git libcurl4-openssl-dev htop


systemctl enable apache2 && systemctl enable mariadb


MAXSIZE=10

array1=( 
w e r t y u p a s d f h j k z x c v b m Q W E R T Y U P A D 
F H J K L Z X C V B N M 2 3 4 7 8
) 


MODNUM=${#array1[*]} 

pwd_len=0 

while [ $pwd_len -lt $MAXSIZE ] 
do 
  index=$(($RANDOM%$MODNUM)) 
  password="${password}${array1[$index]}" 
  ((pwd_len++)) 
done 

if [ -e "/root/passwordMysql.log" ] && [ ! -z "/root/passwordMysql.log" ]
then
    password=$(awk '{print $1}' /root/passwordMysql.log)
fi


touch /root/passwordMysql.log
echo "$password" > /root/passwordMysql.log

chmod -R 777 /tmp

systemctl start  mariadb
mysqladmin -u root password $password




apt-key adv --keyserver keyserver.ubuntu.com --recv-keys 049AD65B
echo "deb https://apt.opensips.org $(lsb_release -sc) 3.1-releases" >/etc/apt/sources.list.d/opensips.list
echo "deb https://apt.opensips.org $(lsb_release -sc) cli-nightly" >/etc/apt/sources.list.d/opensips-cli.list
apt update

apt -y install opensips opensips-cli opensips-mysql-module opensips-postgres-module opensips-unixodbc-module opensips-jabber-module opensips-cpl-module opensips-radius-modules opensips-presence-modules opensips-xmlrpc-module opensips-perl-modules opensips-snmpstats-module opensips-xmpp-module opensips-carrierroute-module opensips-berkeley-module opensips-ldap-modules opensips-geoip-module opensips-regex-module opensips-identity-module opensips-b2bua-module opensips-dbhttp-module opensips-dialplan-module opensips-http-modules opensips-tls-module opensips-cgrates-module


touch /var/log/opensips.log
chown opensips:opensips /var/log/opensips.log

echo "DBENGINE=MYSQL
DBHOST=localhost
DBNAME=opensips
DBRWUSER=opensips
DBRWPW=$password
" > /etc/opensips/opensipsctlrc



cp -rf /etc/mysql/mariadb.conf.d/50-server.cnf /etc/mysql/mariadb.conf.d/50-server.cnf_old
echo "
[server]

[mysqld]
user    = mysql
pid-file  = /var/run/mysqld/mysqld.pid
socket    = /var/run/mysqld/mysqld.sock
port    = 3306
basedir   = /usr
datadir   = /var/lib/mysql
tmpdir    = /tmp
lc-messages-dir = /usr/share/mysql
skip-external-locking
max_connections = 500
key_buffer_size   = 16M
max_allowed_packet  = 16M
thread_stack    = 192K
thread_cache_size       = 8
query_cache_limit = 1M
query_cache_size        = 16M
log_error = /var/log/mysql/error.log
expire_logs_days  = 10
max_binlog_size   = 100M
secure-file-priv = ""
symbolic-links=0
sql_mode=NO_ENGINE_SUBSTITUTION,STRICT_TRANS_TABLES

[embedded]

[mariadb]

[mariadb-10.1]
" > /etc/mysql/mariadb.conf.d/50-server.cnf


systemctl restart  mariadb

clear
echo ""
echo ""
echo "----------------USE this password $password--------------------"
echo ""
echo ""
sed -i "s/pswd = getpass(\"Password for admin {} user ({}): \".format(/pswd = \"$password\"/g" /usr/lib/python3/dist-packages/opensipscli/modules/database.py
sed -i "s/                osdb.get_url_driver/                ##/g" /usr/lib/python3/dist-packages/opensipscli/modules/database.py
sed -i "s/                osdb.get_url_user(admin_url/                ##/g" /usr/lib/python3/dist-packages/opensipscli/modules/database.py

yes | opensips-cli -x database create
yes | opensips-cli -x database add ratecacher

chkconfig opensips on
systemctl enable opensips

systemctl restart opensips

mysql -u root -p$(awk '{print $1}' /root/passwordMysql.log) opensips -e "ALTER TABLE subscriber ADD accountcode VARCHAR( 50 ) NOT NULL"
mysql -u root -p$(awk '{print $1}' /root/passwordMysql.log) opensips -e "ALTER TABLE subscriber ADD trace TINYINT(1) NOT NULL DEFAULT '0'"
mysql -u root -p$(awk '{print $1}' /root/passwordMysql.log) opensips -e "ALTER TABLE subscriber ADD  cpslimit INT( 11 ) NOT NULL DEFAULT  '-1'"
mysql -u root -p$(awk '{print $1}' /root/passwordMysql.log) opensips -e "ALTER TABLE address CHANGE context_info  context_info CHAR( 70 ) NULL DEFAULT NULL ;"

echo "
* * * * * root /usr/bin/opensips-cli -x mi ds_reload
* * * * * root /usr/bin/opensips-cli -x mi address_reload
" >> /etc/crontab


cd /etc/opensips/
mv opensips.cfg opensips.cfg_old
wget https://raw.githubusercontent.com/magnussolution/magnusbilling7/source/script/opensips-3.1.cfg
mv opensips-3.1.cfg opensips.cfg
sed -i "s/MYSQLUSER:MYSQLPASS/root:$password/g" /etc/opensips/opensips.cfg
sed -i "s/MYIP/$proxyip/g" /etc/opensips/opensips.cfg
sed -i "s/LOCALIP/$localIP/g" /etc/opensips/opensips.cfg


MAXSIZE=10

array1=( 
w e r t y u p a s d f h j k z x c v b m Q W E R T Y U P A D 
F H J K L Z X C V B N M 2 3 4 7 8
) 


MODNUM=${#array1[*]} 

pwd_len=0 

while [ $pwd_len -lt $MAXSIZE ] 
do 
  index=$(($RANDOM%$MODNUM)) 
  password2="${password2}${array1[$index]}" 
  ((pwd_len++)) 
done 

if [ -e "/root/.passwordMysqlToMbilling" ] && [ ! -z "/root/.passwordMysqlToMbilling" ]
then
    password2=$(awk '{print $1}' /root/.passwordMysqlToMbilling)
fi

touch /root/.passwordMysqlToMbilling
echo "$password2" > /root/.passwordMysqlToMbilling


# now create mysql user to allow MagnusBilling write in database
mysql -uroot -p${password} -e "CREATE USER 'proxy_magnus'@'$ipMbilling' IDENTIFIED BY '${password2}';"
mysql -uroot -p${password} -e "GRANT ALL PRIVILEGES ON \`opensips\` . * TO 'proxy_magnus'@'$ipMbilling' WITH GRANT OPTION;FLUSH PRIVILEGES;"    

echo "INSTALL MONITOR TOLLS"
cd /usr/local/sbin
wget magnusbilling.com/download/sip
wget magnusbilling.com/download/config
chmod 777 /usr/local/sbin/*
apt install -y sngrep ngrep htop

echo "local0.*                                            /var/log/opensips.log" >> /etc/rsyslog.conf
systemctl restart rsyslog
systemctl restart opensips 

apachectl restart

echo
echo "Installing Fail2ban & Iptables"
echo


iptables -F
iptables -A INPUT -p icmp --icmp-type echo-request -j ACCEPT
iptables -A OUTPUT -p icmp --icmp-type echo-reply -j ACCEPT
iptables -A INPUT -i lo -j ACCEPT
iptables -A INPUT -m state --state ESTABLISHED,RELATED -j ACCEPT
iptables -A INPUT -p tcp --dport 22 -j ACCEPT
iptables -P INPUT DROP
iptables -P FORWARD DROP
iptables -P OUTPUT ACCEPT
iptables -A INPUT -p udp -m udp --dport 5060 -j ACCEPT
iptables -A INPUT -p udp -m udp --dport 10000:40000 -j ACCEPT
iptables -A INPUT -p tcp -m tcp --dport 80 -j ACCEPT
iptables -A INPUT -p tcp -m tcp --dport 443 -j ACCEPT
iptables -A INPUT -p tcp -m tcp --dport 19639 -j ACCEPT
iptables -I INPUT -p tcp -s $ipMbilling --dport 3306 -j ACCEPT


echo iptables-persistent iptables-persistent/autosave_v4 boolean true | debconf-set-selections
echo iptables-persistent iptables-persistent/autosave_v6 boolean true | debconf-set-selections
apt-get install -y iptables-persistent

sudo iptables-save > /etc/iptables/rules.v4

apt-get -y install fail2ban
systemctl enable fail2ban

echo "
[DEFAULT]
ignoreip = 127.0.0.1
bantime  = 600
findtime  = 600
maxretry = 3
backend = auto
usedns = warn


[ssh-iptables]
enabled  = true
filter   = sshd
action   = iptables-allports[name=SSH, port=all, protocol=all]
logpath  = /var/log/secure
maxretry = 3
bantime = 600

[opensips-iptables]
enabled  = true
filter   = opensips
action   = iptables-allports[name=OPENSIPS, protocol=all]
logpath  = /var/log/opensips.log
maxretry = 10
bantime  = 1800

 " >> /etc/fail2ban/jail.local



echo $'
[INCLUDES]
before = common.conf
[Definition]
_daemon = sshd
failregex = ^%(__prefix_line)s(?:error: PAM: )?Authentication failure for .* from <HOST>\s*$
            ^%(__prefix_line)s(?:error: PAM: )?User not known to the underlying authentication module for .* from <HOST>\s*$
            ^%(__prefix_line)sFailed (?:password|publickey) for .* from <HOST>(?: port \d*)?(?: ssh\d*)?$
            ^%(__prefix_line)sFailed (?:password|publickey) for .* from <HOST>(?: port \d*)?(?: ssh\d*)?.*$
            ^%(__prefix_line)sFailed (?:password|publickey) for .* from <HOST>(?: port \d*)?(?: ssh2\d*)?.*$
            ^%(__prefix_line)sFailed (?:password|publickey) for .* from <HOST>(?: port \d*)?(?: ssh2\d*)?$
            ^%(__prefix_line)sROOT LOGIN REFUSED.* FROM <HOST>\s*$
            ^%(__prefix_line)s[iI](?:llegal|nvalid) user .* from <HOST>\s*$
            ^%(__prefix_line)sUser \S+ from <HOST> not allowed because not listed in AllowUsers$
            ^%(__prefix_line)sauthentication failure; logname=\S* uid=\S* euid=\S* tty=\S* ruser=\S* rhost=<HOST>(?:\s+user=.*)?\s*$
            ^%(__prefix_line)srefused connect from \S+ \(<HOST>\)\s*$
            ^%(__prefix_line)sAddress <HOST> .* POSSIBLE BREAK-IN ATTEMPT!*\s*$
            ^%(__prefix_line)sUser \S+ from <HOST> not allowed because none of user\'s groups are listed in AllowGroups$

ignoreregex =
' > /etc/fail2ban/filter.d/sshd.conf



echo $'
[Definition]
failregex = Blocking traffic from <HOST>
' > /etc/fail2ban/filter.d/opensips.conf




systemctl restart fail2ban 

iptables -L -v
clear



cd /usr/src
wget https://www.kamailio.org/pub/mirrors/rtpproxy/rtpproxy-1.2.1.tar.gz
tar xzvf rtpproxy-1.2.1.tar.gz
cd rtpproxy-1.2.1
./configure
make
make install

groupadd rtpproxy
useradd -d /var/run/rtpproxy -s /bin/true -g rtpproxy rtpproxy
mkdir /var/log/rtpproxy
chown -R rtpproxy.rtpproxy /var/log/rtpproxy
chown -R rtpproxy.rtpproxy /var/run/rtpproxy

echo $'#!/bin/bash
#
# Startup script for rtpproxy
#
# chkconfig: 345 85 15
# description: A symmetric RTP proxy
#
# processname: rtpproxy
# pidfile: /var/run/rtpproxy.pid

# Source function library.
. /etc/rc.d/init.d/functions


prog=rtpproxy
rtpproxy=/usr/local/bin/$prog
user=rtpproxy
USELOG=0
lockfile=/var/lock/subsys/$prog
pidfile=/var/run/$prog.pid

RETVAL=0
OPTIONS=" -l 192.168.0.166 -s udp:127.0.0.1:7890 -u $user"

start() {
        echo -n $"Starting $prog: "
        if [ "${USELOG}" = "0" ]; then
          daemon $rtpproxy $OPTIONS
        else
          daemon $rtpproxy $OPTIONS -F -f -d DBUG 2&> /dev/null
        fi

        RETVAL=$?
        echo
        [ $RETVAL = 0 ] && touch /var/lock/subsys/rtpproxy
        return $RETVAL
}

stop() {
  echo -n $"Stopping $prog: "
  killproc $rtpproxy
  RETVAL=$?
  echo
  [ $RETVAL = 0 ] && rm -f /var/lock/subsys/rtpproxy /var/run/rtpproxy.pid
}

reload() {
  echo -n $"Reloading $prog: "
  killproc $rtpproxy -HUP
  RETVAL=$?
  echo
}

# See how we were called.
case "$1" in
  start)
  start
  ;;
  stop)
  stop
  ;;
  status)
        status $rtpproxy
  RETVAL=$?
  ;;
  restart)
  stop
  start
  ;;
  condrestart)
  if [ -f /var/run/rtpproxy.pid ] ; then
    stop
    start
  fi
  ;;
  *)
  echo $"Usage: $prog {start|stop|restart|condrestart|status|help}"
  exit 1
esac

exit $RETVAL
' > /etc/rc.d/init.d/rtpproxy

chmod +x /etc/rc.d/init.d/rtpproxy
systemctl daemon-reload
systemctl start rtpproxy
chkconfig rtpproxy on

chmod -R 7777 /tmp

echo 500000 > /proc/sys/fs/file-max
echo "fs.file-max=500000">>/etc/sysctl.conf

echo '
* soft nofile 500000
* hard nofile 500000
* soft core unlimited
* hard core unlimited
* soft data unlimited
* hard data unlimited
* soft fsize unlimited
* hard fsize unlimited
* soft memlock unlimited
* hard memlock unlimited
* soft cpu unlimited
* hard cpu unlimited
* soft nproc unlimited
* hard nproc unlimited
* soft locks unlimited
* hard locks unlimited
* soft sigpending unlimited
* hard sigpending unlimited' >> /etc/security/limits.conf


ulimit -c unlimited # The maximum size of core files created.
ulimit -d unlimited # The maximum size of a process's data segment.
ulimit -f unlimited # The maximum size of files created by the shell (default option)
ulimit -i unlimited # The maximum number of pending signals
ulimit -n 999999    # The maximum number of open file descriptors.
ulimit -q unlimited # The maximum POSIX message queue size
ulimit -u unlimited # The maximum number of processes available to a single user.
ulimit -v unlimited # The maximum amount of virtual memory available to the process.
ulimit -x unlimited # ???
ulimit -s 240         # The maximum stack size
ulimit -l unlimited # The maximum size that may be locked into memory.
ulimit -a           # All current limits are reported.


sed -i -e 's/$S_MEMORY/2048/g' /lib/systemd/system/opensips.service
sed -i -e 's/$P_MEMORY/2048/g' /lib/systemd/system/opensips.service

echo 'SystemMaxUse=10M' >> /etc/systemd/journald.conf
systemctl daemon-reload
systemctl restart systemd-journald


clear
echo ""
echo ""
echo "----------------GO TO TO YOUR MAGNUSBILLING PANEL, MENU SERVERS AND ADD A NEW SERVER WITH THESE DATA--------------------"
echo ""
echo "Host=$proxyip"
echo "Username=proxy_magnus"
echo "Password=$password2"
echo "Port=3306"
echo "Type=SipProxy"
echo "Status=Active"
echo ""
echo "Is necessary execute this script in your MagnusBilling server [php /var/www/html/mbilling/cron.php sipproxyaccounts] you can add it on Crontab"



history -c