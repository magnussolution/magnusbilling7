#!/bin/bash
clear
echo
echo
echo
echo "===================BY WWW.MAGNUSSOLUTION.COM=========================";
echo "_      _                               ______ _ _ _ _                ";
echo "|\    /|                               | ___ (_) | (_)               ";
echo "| \  / | ___  ____  _ __  _   _  _____ | |_/ /_| | |_ _ __   ____    ";
echo "|  \/  |/   \/  _ \| '_ \| | | \| ___| | ___ \ | | | | '_ \ /  _ \   ";
echo "| |\/| |  | |  (_| | | | | |_| ||____  | |_/ / | | | | | | |  (_| |  ";
echo "|_|  |_|\___|\___  |_| | |_____|_____|  \___/|_|_|_|_|_| |_|\___  |  ";
echo "                _/ |                                           _/ |  ";
echo "               |__/                                           |__/   ";
echo "                                                                     ";
echo "======================= VOIP SYSTEM FOR LINUX =======================";
echo

sleep 3

# Linux Distribution CentOS or Debian
get_linux_distribution ()
{ 
    if [ -f /etc/debian_version ]; then
        DIST="DEBIAN"
        HTTP_DIR="/etc/apache2/"
        HTTP_CONFIG=${HTTP_DIR}"apache2.conf"
        PHP_INI="/etc/php5/cli/php.ini"
    elif [ -f /etc/redhat-release ]; then
        DIST="CENTOS"
        HTTP_DIR="/etc/httpd/"
        HTTP_CONFIG=${HTTP_DIR}"conf/httpd.conf"
        PHP_INI="/etc/php.ini"
    else
        DIST="OTHER"
        echo 'Installation does not support your distribution'
        exit 1
    fi
}

get_linux_distribution

startup_services() 
{
    # Startup Services
    if [ ${DIST} = "DEBIAN" ]; then
        systemctl restart mysql
        systemctl restart apache2
        systemctl restart asterisk
    elif  [ ${DIST} = "CENTOS" ]; then
        systemctl restart mariadb
        systemctl restart httpd
        systemctl restart asterisk    
    fi
}

if [[ -e /var/www/html/mbilling/index.php ]]; then

    clear
    echo 
    echo
    echo "You alread have MagnusBilling installed!!!!"
    echo
    echo "Execute this command to update your MagnusBilling"
    echo "/var/www/html/mbilling/protected/commands/update.sh"
    echo 
    echo
    exit;

fi


genpasswd() 
{
    length=$1
    [ "$length" == "" ] && length=16
    tr -dc A-Za-z0-9_ < /dev/urandom | head -c ${length} | xargs
}
password=$(genpasswd)

if [ -e "/root/passwordMysql.log" ] && [ ! -z "/root/passwordMysql.log" ]
then
    password=$(awk '{print $1}' /root/passwordMysql.log)
fi

touch /root/passwordMysql.log
echo "$password" > /root/passwordMysql.log 

if  [ ${DIST} = "CENTOS" ]; then
    sed 's/SELINUX=enforcing/SELINUX=disabled/g' /etc/selinux/config > borra && mv -f borra /etc/selinux/config
fi
if [ ${DIST} = "CENTOS" ]; then
echo '[mariadb]
name = MariaDB
baseurl = http://yum.mariadb.org/10.1/centos7-amd64
gpgkey=https://yum.mariadb.org/RPM-GPG-KEY-MariaDB
gpgcheck=1' > /etc/yum.repos.d/MariaDB.repo 
fi

if [ ${DIST} = "DEBIAN" ]; then
    
    apt-get -o Acquire::Check-Valid-Until=false update 
    apt-get install -y autoconf automake devscripts gawk ntpdate ntp g++ git-core curl sudo php5-fpm php5 php5-mcrypt git xmlstarlet libmyodbc unixodbc-bin apache2 php5-dev php5-common php5-cli php5-gd libjansson-dev php-pear php5-cli php-apc php5-curl libapache2-mod-php5 uuid-dev libxml2 libxml2-dev openssl libcurl4-openssl-dev gettext gcc g++ libncurses5-dev sqlite3 libsqlite3-dev subversion mpg123
    echo mysql-server mysql-server/root_password password ${password} | debconf-set-selections
    echo mysql-server mysql-server/root_password_again password ${password} | debconf-set-selections            
    apt-get install -y mysql-server php5-mysql mysql-client
    apt-get install -y unixODBC unixODBC-dev unzip 
    apt-get install -y libmysqlclient15-dev
elif  [ ${DIST} = "CENTOS" ]; then
    yum clean all
    yum -y install kernel-devel.`uname -m` epel-release
    yum -y install gcc.`uname -m` gcc-c++.`uname -m` make.`uname -m` git.`uname -m` wget.`uname -m` bison.`uname -m` openssl-devel.`uname -m` ncurses-devel.`uname -m` doxygen.`uname -m` newt-devel.`uname -m` mlocate.`uname -m` lynx.`uname -m` tar.`uname -m` wget.`uname -m` nmap.`uname -m` bzip2.`uname -m` mod_ssl.`uname -m` speex.`uname -m` speex-devel.`uname -m` unixODBC.`uname -m` unixODBC-devel.`uname -m` libtool-ltdl.`uname -m` sox libtool-ltdl-devel.`uname -m` flex.`uname -m` screen.`uname -m` autoconf automake libxml2.`uname -m` libxml2-devel.`uname -m` sqlite* subversion
    yum -y install php.`uname -m` php-cli.`uname -m` php-devel.`uname -m` php-gd.`uname -m` php-mbstring.`uname -m` php-pdo.`uname -m` php-xml.`uname -m` php-xmlrpc.`uname -m` php-process.`uname -m` php-posix libuuid uuid uuid-devel libuuid-devel.`uname -m`
    yum -y install jansson.`uname -m` jansson-devel.`uname -m` unzip.`uname -m`
    yum -y install mysql mariadb-server  mariadb-devel mariadb php-mysql mysql-connector-odbc
    yum -y install xmlstarlet libsrtp libsrtp-devel dmidecode gtk2-devel binutils-devel svn libtermcap-devel libtiff-devel audiofile-devel cronie cronie-anacron

fi

echo
echo '----------- Install PJPROJECT ----------'
echo
sleep 1
cd /usr/src
wget http://www.digip.org/jansson/releases/jansson-2.7.tar.gz
tar -zxvf jansson-2.7.tar.gz
cd jansson-2*
./configure
make clean
make && make install
ldconfig

echo
echo '----------- Install Asterisk 13 ----------'
echo
sleep 1
cd /usr/src
rm -rf asterisk*
clear
wget http://downloads.asterisk.org/pub/telephony/asterisk/asterisk-13-current.tar.gz
cd /usr/src
tar xzvf asterisk-13-current.tar.gz
rm -rf asterisk-13-current.tar.gz
cd asterisk-*
useradd -c 'Asterisk PBX' -d /var/lib/asterisk asterisk
mkdir /var/run/asterisk
mkdir /var/log/asterisk
chown -R asterisk:asterisk /var/run/asterisk
chown -R asterisk:asterisk /var/log/asterisk
make clean
./configure --with-ssl
make menuselect.makeopts
menuselect/menuselect --enable res_config_mysql  menuselect.makeopts
menuselect/menuselect --enable format_mp3  menuselect.makeopts
menuselect/menuselect --enable codec_opus  menuselect.makeopts
menuselect/menuselect --enable codec_silk  menuselect.makeopts
menuselect/menuselect --enable codec_siren7  menuselect.makeopts
menuselect/menuselect --enable codec_siren14  menuselect.makeopts
contrib/scripts/get_mp3_source.sh
make
make install
make samples
make config
ldconfig



clear


chmod -R 777 /tmp
sleep 2



 
if [ ${DIST} = "CENTOS" ]; then
    cd /usr/src
    wget http://magnusbilling.com/mpg123-1.20.1.tar.bz2
    tar -xjvf mpg123-1.20.1.tar.bz2
    cd mpg123-1.20.1
    ./configure && make && make install

    echo "
    <IfModule mod_deflate.c>
      AddOutputFilterByType DEFLATE text/plain
      AddOutputFilterByType DEFLATE text/html
      AddOutputFilterByType DEFLATE text/xml
      AddOutputFilterByType DEFLATE text/css
      AddOutputFilterByType DEFLATE text/javascript
      AddOutputFilterByType DEFLATE image/svg+xml
      AddOutputFilterByType DEFLATE image/x-icon
      AddOutputFilterByType DEFLATE application/xml
      AddOutputFilterByType DEFLATE application/xhtml+xml
      AddOutputFilterByType DEFLATE application/rss+xml
      AddOutputFilterByType DEFLATE application/javascript
      AddOutputFilterByType DEFLATE application/x-javascript
      DeflateCompressionLevel 9
      BrowserMatch ^Mozilla/4 gzip-only-text/html
      BrowserMatch ^Mozilla/4\.0[678] no-gzip
      BrowserMatch \bMSIE !no-gzip !gzip-only-text/html
      BrowserMatch \bOpera !no-gzip
      DeflateFilterNote Input instream
      DeflateFilterNote Output outstream
      DeflateFilterNote Ratio ratio
      LogFormat '\"%r\" %{outstream}n/%{instream}n (%{ratio}n%%)' deflate
    </IfModule>
    " >> /etc/httpd/conf.d/deflate.conf

    echo "
    <IfModule mod_expires.c>
     ExpiresActive On
     ExpiresByType image/jpg \"access plus 60 days\"
     ExpiresByType image/png \"access plus 60 days\"
     ExpiresByType image/gif \"access plus 60 days\"
     ExpiresByType image/jpeg \"access plus 60 days\"
     ExpiresByType text/css \"access plus 1 days\"
     ExpiresByType image/x-icon \"access plus 1 month\"
     ExpiresByType application/pdf \"access plus 1 month\"
     ExpiresByType audio/x-wav \"access plus 1 month\"
     ExpiresByType audio/mpeg \"access plus 1 month\"
     ExpiresByType video/mpeg \"access plus 1 month\"
     ExpiresByType video/mp4 \"access plus 1 month\"
     ExpiresByType video/quicktime \"access plus 1 month\"
     ExpiresByType video/x-ms-wmv \"access plus 1 month\"
     ExpiresByType application/x-shockwave-flash \"access 1 month\"
     ExpiresByType text/javascript \"access plus 1 week\"
     ExpiresByType application/x-javascript \"access plus 1 week\"
     ExpiresByType application/javascript \"access plus 1 week\"
    </IfModule>
    " >> /etc/httpd/conf.d/expire.conf
fi

echo '
<IfModule mime_module>
AddType application/octet-stream .csv
</IfModule>

<Directory "/var/www/html">
    DirectoryIndex index.htm index.html index.php index.php3 default.html index.cgi
</Directory>


<Directory "/var/www/html/mbilling/protected">
    deny from all
</Directory>

<Directory "/var/www/html/mbilling/yii">
    deny from all
</Directory>

<Directory "/var/www/html/mbilling/doc">
    deny from all
</Directory>

<Directory "/var/www/html/mbilling/resources/*log">
    deny from all
</Directory>

<Files "*.sql">
  deny from all
</Files>

<Files "*.log">
  deny from all
</Files>
' >> ${HTTP_CONFIG}


rm -rf ${PHP_INI}_old
cp -rf ${PHP_INI} ${PHP_INI}_old

sed -i "s/memory_limit = 16M/memory_limit = 512M /" ${PHP_INI}
sed -i "s/memory_limit = 128M/memory_limit = 512M /" ${PHP_INI} 
sed -i "s/upload_max_filesize = 2M/upload_max_filesize = 3M /" ${PHP_INI}
sed -i "s/post_max_size = 8M/post_max_size = 20M/" ${PHP_INI}
sed -i "s/max_execution_time = 30/max_execution_time = 90/" ${PHP_INI}
sed -i "s/max_input_time = 60/max_input_time = 120/" ${PHP_INI}
sed -i "s/\;date.timezone =/date.timezone = America\/Sao_Paulo/" ${PHP_INI}
if [ ${DIST} = "CENTOS" ]; then
    sed -i "s/User apache/User asterisk/" ${HTTP_CONFIG}
    sed -i "s/Group apache/Group asterisk/" ${HTTP_CONFIG}
elif [ ${DIST} = "DEBIAN" ]; then
    sed -i 's/User ${APACHE_RUN_USER}/User asterisk/' ${HTTP_CONFIG}
    sed -i 's/Group ${APACHE_RUN_GROUP}/Group asterisk/' ${HTTP_CONFIG}
    mkdir -p /var/www/html
    sed -i 's/<Directory \/var\/www\/>/<Directory \/var\/www\/html\/>/' ${HTTP_CONFIG}
fi; 

echo
echo "----------- Create mysql password: Your mysql root password is $password ----------"
echo


if [ ${DIST} = "DEBIAN" ]; then
    systemctl start mysql
    systemctl enable apache2 
    systemctl enable mysql
else [ -f /etc/redhat-release ]
    systemctl enable httpd
    systemctl enable mariadb
    systemctl start mariadb
fi


if [ ${DIST} = "CENTOS" ]; then
  mysql -uroot -e "UPDATE mysql.user SET password=PASSWORD('${password}') WHERE user='root'; FLUSH PRIVILEGES;"
fi


if [ ${DIST} = "CENTOS" ]; then
echo "
[mysqld]
join_buffer_size = 128M
sort_buffer_size = 2M
read_rnd_buffer_size = 2M
datadir=/var/lib/mysql
socket=/var/lib/mysql/mysql.sock
secure-file-priv = ''
symbolic-links=0
sql_mode=NO_ENGINE_SUBSTITUTION,STRICT_TRANS_TABLES

[mysqld_safe]
log-error=/var/log/mariadb/mariadb.log
pid-file=/var/run/mariadb/mariadb.pid
" > /etc/my.cnf
elif [ ${DIST} = "DEBIAN" ]; then
echo "
[client]
port    = 3306
socket    = /var/run/mysqld/mysqld.sock

[mysqld_safe]
socket    = /var/run/mysqld/mysqld.sock
nice    = 0

[mysqld]
join_buffer_size = 128M
sort_buffer_size = 2M
read_rnd_buffer_size = 2M
user    = mysql
pid-file  = /var/run/mysqld/mysqld.pid
socket    = /var/run/mysqld/mysqld.sock
port    = 3306
basedir   = /usr
datadir   = /var/lib/mysql
tmpdir    = /tmp
language  = /usr/share/mysql/english
skip-external-locking
secure-file-priv = ""
symbolic-links=0
sql-mode=NO_ENGINE_SUSTITUTION,STRICT_TRANS_TABLES
bind-address    = 127.0.0.1
key_buffer      = 16M
max_allowed_packet  = 16M
thread_stack    = 192K
thread_cache_size   = 8
myisam-recover      = BACKUP
query_cache_limit = 1M
query_cache_size    = 16M
expire_logs_days  = 10
max_binlog_size     = 100M

[mysqldump]
quick
quote-names
max_allowed_packet  = 16M

[mysql]

[isamchk]
key_buffer    = 16M
!includedir /etc/mysql/conf.d/
" > /etc/my.cnf
fi;


startup_services

clear
echo
echo '----------- Installing the Web Interface ----------'
echo
sleep 2
if [ ${DIST} = "DEBIAN" ]; then
    rm -rf /var/www/html/index.html
fi;
cd /var/www/html
git clone https://github.com/magnussolution/magnusbilling6.git mbilling
cd /var/www/html/mbilling/
rm -rf /var/www/html/mbilling/tmp && mkdir /var/www/html/mbilling/tmp
mkdir /var/www/html/mbilling/assets
chown -R asterisk:asterisk /var/www/html/mbilling
mkdir /var/run/magnus
touch /etc/asterisk/extensions_magnus.conf
touch /etc/asterisk/sip_magnus_register.conf
touch /etc/asterisk/sip_magnus.conf
touch /etc/asterisk/sip_magnus_user.conf
touch /etc/asterisk/iax_magnus_register.conf
touch /etc/asterisk/iax_magnus.conf
touch /etc/asterisk/iax_magnus_user.conf

selectLanguage() {
   echo "SELECT THE MAIN LANGUAGE"  
   echo "------------------------------------------"
   echo "Options:"
   echo
   echo "1. Portuguese"
   echo "2. English"
   echo "3. Spanish"
   echo
   echo -n "Select one option: "
   read opcao
   case $opcao in
      1) installBr;;
      2) installEn;;
      3) installEs;;
      *) "Invalid option." ; echo ; selectLanguage ;;
   esac
}

cp -rf /var/www/html/mbilling/resources/sounds/br /var/lib/asterisk/sounds
cp -rf /var/www/html/mbilling/resources/sounds/es /var/lib/asterisk/sounds
cp -rf /var/www/html/mbilling/resources/sounds/en /var/lib/asterisk/sounds

installBr() {
   clear
   language='br'
   cd /var/lib/asterisk
   wget https://sourceforge.net/projects/disc-os/files/Disc-OS%20Sounds/1.0-RELEASE/Disc-OS-Sounds-1.0-pt_BR.tar.gz
   tar xzf Disc-OS-Sounds-1.0-pt_BR.tar.gz
   rm -rf Disc-OS-Sounds-1.0-pt_BR.tar.gz

   cp -n /var/lib/asterisk/sounds/pt_BR/*  /var/lib/asterisk/sounds/br
   rm -rf /var/lib/asterisk/sounds/pt_BR
   mkdir -p /var/lib/asterisk/sounds/br/digits
   cp -rf /var/lib/asterisk/sounds/digits/pt_BR/* /var/lib/asterisk/sounds/br/digits
   cp -n /var/www/html/mbilling/resources/sounds/br/* /var/lib/asterisk/sounds
}

installEn() {
    clear
    language='en'
    cp -n /var/www/html/mbilling/resources/sounds/en/* /var/lib/asterisk/sounds
}

installEs() {
  clear
  language='es'
  cp -n /var/www/html/mbilling/resources/sounds/es/* /var/lib/asterisk/sounds
  cd /var/lib/asterisk/sounds/es
  wget -O core.zip http://www.asterisksounds.org/es-ar/download/asterisk-sounds-core-es-AR-sln16.zip
  wget -O extra.zip http://www.asterisksounds.org/es-ar/download/asterisk-sounds-extra-es-AR-sln16.zip
  unzip core.zip
  unzip extra.zip
  chown -R asterisk.asterisk /var/lib/asterisk/sounds/es
}


if [[ $1 == '' ]]; then
  selectLanguage
elif [[ $1 == 'en' ]]; then
  installEn
elif [[ $1 == 'br' ]]; then
  installBr
elif [[ $1 == 'es' ]]; then
  installEs
else
  selectLanguage
fi

cd /var/www/html/mbilling

echo $'[billing]
exten => _X.,1,AGI("/var/www/html/mbilling/agi.php")

exten => 111,1,VoiceMailMain(${SIPCHANINFO(peername)}@billing)
  same => n,Hangup()

exten => _*7.,1,Pickup(${EXTEN:2})
  same => n,Hangup()
' > /etc/asterisk/extensions_magnus.conf

echo "
[general]
enabled = yes

port = 5038
bindaddr = 0.0.0.0
displayconnects = no

[magnus]
secret = magnussolution
deny=0.0.0.0/0.0.0.0
permit=127.0.0.1/255.255.255.0
read = system,call,log,verbose,agent,user,config,dtmf,reporting,cdr,dialplan
write = system,call,agent,user,config,command,reporting,originate
" > /etc/asterisk/manager.conf


echo "#include extensions_magnus.conf" >> /etc/asterisk/extensions.conf

echo "[settings]
voicemail => mysql,general,pkg_voicemail_users
queues => mysql,general,pkg_queue
queue_members => mysql,general,pkg_queue_member
" > /etc/asterisk/extconfig.conf

echo "
noload => cdr_csv.so
" >> /etc/asterisk/modules.conf

echo "
/var/log/asterisk/*log {
  missingok
  rotate 3
  weekly
  postrotate
  /usr/sbin/asterisk -rx 'logger reload' > /dev/null 2> /dev/null
  endscript
}

/var/log/asterisk/messages {
  missingok
  rotate 3
  weekly
  postrotate
  /usr/sbin/asterisk -rx 'logger reload' > /dev/null 2> /dev/null
  endscript
}

/var/log/asterisk/fail2ban {
  missingok
  rotate 3
  weekly
  postrotate
  /usr/sbin/asterisk -rx 'logger reload' > /dev/null 2> /dev/null
  endscript
}
" > /etc/logrotate.d/asterisk


MBillingMysqlPass=$(genpasswd)

echo
echo "----------- Installing the new Database ----------"
echo
sleep 2

mysql -uroot -p${password} -e "create database mbilling;"
mysql -uroot -p${password} -e "CREATE USER 'mbillingUser'@'localhost' IDENTIFIED BY '${MBillingMysqlPass}';"
mysql -uroot -p${password} -e "GRANT ALL PRIVILEGES ON \`mbilling\` . * TO 'mbillingUser'@'localhost' WITH GRANT OPTION;FLUSH PRIVILEGES;"    
mysql -uroot -p${password} -e "GRANT FILE ON * . * TO  'mbillingUser'@'localhost' WITH MAX_QUERIES_PER_HOUR 0 MAX_CONNECTIONS_PER_HOUR 0 MAX_UPDATES_PER_HOUR 0 MAX_USER_CONNECTIONS 0;"

mysql mbilling -u root -p${password}  < /var/www/html/mbilling/doc/script.sql
rm -rf /var/www/html/mbilling/doc
rm -rf /var/www/html/mbilling/script

echo "[general]
dbhost = 127.0.0.1
dbname = mbilling
dbuser = mbillingUser
dbpass = $MBillingMysqlPass
" > /etc/asterisk/res_config_mysql.conf

echo '[directories](!)
astetcdir => /etc/asterisk
astmoddir => /usr/lib/asterisk/modules
astvarlibdir => /var/lib/asterisk
astdbdir => /var/lib/asterisk
astkeydir => /var/lib/asterisk
astdatadir => /var/lib/asterisk
astagidir => /var/lib/asterisk/agi-bin
astspooldir => /var/spool/asterisk
astrundir => /var/run/asterisk
astlogdir => /var/log/asterisk
' > /etc/asterisk/asterisk.conf

echo "
[options]
verbose = 0
debug = 0

[compat]
pbx_realtime=1.6
res_agi=1.6
app_set=1.6" >> /etc/asterisk/asterisk.conf

if [ ${DIST} = "CENTOS" ]; then
    cd /etc/init.d/
    mv /etc/init.d/asterisk /tmp/asterisk_old
    rm -rf /etc/init.d/asterisk
    wget http://magnusbilling.com/scriptsSh/asterisk
    chmod +x /etc/init.d/asterisk
fi;

if [ ${DIST} = "DEBIAN" ]; then
    CRONPATH='/var/spool/cron/crontabs/root'
elif [ ${DIST} = "CENTOS" ]; then
    CRONPATH='/var/spool/cron/root'
fi

echo "
8 8 * * * php /var/www/html/mbilling/cron.php servicescheck
* * * * * php /var/www/html/mbilling/cron.php callchart
1 * * * * php /var/www/html/mbilling/cron.php NotifyClient
1 22 * * * php /var/www/html/mbilling/cron.php DidCheck
1 23 * * * php /var/www/html/mbilling/cron.php PlanCheck
* * * * * php /var/www/html/mbilling/cron.php MassiveCall
* * * * * php /var/www/html/mbilling/cron.php Sms
0 2 * * * php /var/www/html/mbilling/cron.php Backup
0 4 * * * /var/www/html/mbilling/protected/commands/verificamemoria
" > $CRONPATH
chmod 600 $CRONPATH
crontab $CRONPATH


echo "
[general]
bindaddr=0.0.0.0
bindport=5060
context = billing
dtmfmode=RFC2833
disallow=all
allow=g729
allow=g723
allow=ulaw  
allow=alaw  
allow=gsm
rtcachefriends=yes
srvlookup=yes
allowsubscribe = no
alwaysauthreject=yes
rtupdate=yes
allowguest=no
language=$language
rtptimeout=60
rtpholdtimeout=300
rtsavesysname=yes
rtupdate=yes
ignoreregexpire=yes

#include sip_magnus_register.conf
#include sip_magnus_user.conf
#include sip_magnus.conf
" > /etc/asterisk/sip.conf

echo "
[general]
bandwidth=low
disallow=lpc10
jitterbuffer=no
autokill=yes

#include iax_magnus_register.conf
#include iax_magnus_user.conf
#include iax_magnus.conf
" > /etc/asterisk/iax.conf


echo "<?php 
header('Location: ./mbilling');
?>
" > /var/www/html/index.php

echo "
User-agent: *
Disallow: /mbilling/
" > /var/www/html/robots.txt

systemctl daemon-reload

install_fail2ban()
{
  yum install -y iptables-services
  rm -rf /etc/fail2ban
  cd /tmp
  git clone https://github.com/fail2ban/fail2ban.git
  cd /tmp/fail2ban
  python setup.py install

  if [ ${DIST} = "CENTOS" ]; then
    systemctl mask firewalld.service
    systemctl enable iptables.service
    systemctl enable ip6tables.service
    systemctl stop firewalld.service
    systemctl start iptables.service
    systemctl start ip6tables.service
    systemctl enable iptables
    systemctl stop firewalld
    chkconfig --levels 123456 firewalld off
  fi       
      
}


echo
echo "Installing Fail2ban & Iptables"
echo


install_fail2ban


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
iptables -A INPUT -p udp -m udp --dport 10000:20000 -j ACCEPT
iptables -A INPUT -p tcp -m tcp --dport 80 -j ACCEPT
iptables -I INPUT -j DROP -p udp --dport 5060 -m string --string "friendly-scanner" --algo bm
iptables -I INPUT -j DROP -p udp --dport 5060 -m string --string "sundayddr" --algo bm
iptables -I INPUT -j DROP -p udp --dport 5060 -m string --string "sipsak" --algo bm
iptables -I INPUT -j DROP -p udp --dport 5060 -m string --string "sipvicious" --algo bm
iptables -I INPUT -j DROP -p udp --dport 5060 -m string --string "iWar" --algo bm
iptables -A INPUT -j DROP -p udp --dport 5060 -m string --string "sipcli/" --algo bm
iptables -A INPUT -j DROP -p udp --dport 5060 -m string --string "VaxSIPUserAgent/" --algo bm


if [ ${DIST} = "DEBIAN" ]; then
    echo iptables-persistent iptables-persistent/autosave_v4 boolean true | debconf-set-selections
    echo iptables-persistent iptables-persistent/autosave_v6 boolean true | debconf-set-selections
    apt-get install -y --force-yes  iptables-persistent
elif [ ${DIST} = "CENTOS" ]; then
    service iptables save
    systemctl restart iptables
fi




touch /var/www/html/mbilling/protected/runtime/application.log
chmod 655 /var/www/html/mbilling/protected/runtime/application.log


echo
echo "Fail2ban configuration!"
echo

echo '
Defaults!/usr/bin/fail2ban-client !requiretty
asterisk ALL=(ALL) NOPASSWD: /usr/bin/fail2ban-client
' >> /etc/sudoers



echo '
[INCLUDES]
[Definition]
failregex = NOTICE.* .*: Useragent: sipcli.*\[<HOST>\] 
ignoreregex =
' > /etc/fail2ban/filter.d/asterisk_cli.conf

echo '
[INCLUDES]
[Definition]
failregex = .*NOTICE.* <HOST> tried to authenticate with nonexistent user.*
ignoreregex =
' > /etc/fail2ban/filter.d/asterisk_manager.conf

echo '
[INCLUDES]
[Definition]
failregex = NOTICE.* .*hangupcause to DB: 200, \[<HOST>\]
ignoreregex =
' > /etc/fail2ban/filter.d/asterisk_hgc_200.conf

echo '
[INCLUDES]
[Definition]
failregex = .*client <HOST>\].*request failed: URI too long.*
     .*client <HOST>\].*request failed: error reading the headers
ignoreregex =
' > /etc/fail2ban/filter.d/mbilling_ddos.conf

echo '
[INCLUDES]
[Definition]
failregex = .* Username or password is wrong - User .* from IP - <HOST>
ignoreregex =
' > /etc/fail2ban/filter.d/mbilling_login.conf







echo "
[DEFAULT]
ignoreip = 127.0.0.1
bantime  = 600
findtime  = 600
maxretry = 3
backend = auto
usedns = warn


[asterisk-iptables]   
enabled  = true           
filter   = asterisk       
action   = iptables-allports[name=ASTERISK, port=5060, protocol=all]   
logpath  = /var/log/asterisk/messages 
maxretry = 5  
bantime = 600

[ast-cli-attck]   
enabled  = true           
filter   = asterisk_cli     
action   = iptables-allports[name=AST_CLI_Attack, port=5060, protocol=all]
logpath  = /var/log/asterisk/messages 
maxretry = 1  
bantime = -1

[asterisk-manager]   
enabled  = true           
filter   = asterisk_manager     
action   = iptables-allports[name=AST_MANAGER, port=5038, protocol=all]
logpath  = /var/log/asterisk/messages 
maxretry = 1  
bantime = -1

[ast-hgc-200]
enabled  = true           
filter   = asterisk_hgc_200     
action   = iptables-allports[name=AST_HGC_200, port=5060, protocol=all]
logpath  = /var/log/asterisk/messages
maxretry = 20
bantime = -1

[mbilling_login]
enabled  = true
filter   = mbilling_login
action   = iptables-allports[name=mbilling_login, port=all, protocol=all]
logpath  = /var/www/html/mbilling/protected/runtime/application.log
maxretry = 3
bantime = 600

[ip-blacklist]
enabled   = true
filter    = ip-blacklist
action    = iptables-allports[name=ASTERISK, protocol=all] 
logpath   = /var/www/html/mbilling/resources/ip.blacklist
maxretry  = 0
findtime  = 15552000
bantime   = -1
" > /etc/fail2ban/jail.local



if [ ${DIST} = "DEBIAN" ]; then
echo "
[sshd]
enablem=true

[mbilling_ddos]
enabled  = true
filter   = mbilling_ddos
action   = iptables-allports[name=mbilling_ddos, port=all, protocol=all]
logpath  = /var/log/apache2/error.log
maxretry = 20
bantime = 3600" >> /etc/fail2ban/jail.local
elif [ ${DIST} = "CENTOS" ]; then
echo "
[ssh-iptables]
enabled  = true
filter   = sshd
action   = iptables-allports[name=SSH, port=all, protocol=all]
logpath  = /var/log/secure
maxretry = 3
bantime = 600

[mbilling_ddos]
enabled  = true
filter   = mbilling_ddos
action   = iptables-allports[name=mbilling_ddos, port=all, protocol=all]
logpath  = /var/log/httpd/error_log
maxretry = 20
bantime = 3600
 " >> /etc/fail2ban/jail.local
fi



rm -rf /var/www/html/mbilling/resources/ip.blacklist
touch /var/www/html/mbilling/resources/ip.blacklist
chown -R asterisk:asterisk /var/www/html/mbilling/resources/

echo "
[Definition]
failregex = ^<HOST> \[.*\]$
ignoreregex =
" > /etc/fail2ban/filter.d/ip-blacklist.conf

echo "
[general]
dateformat=%F %T       ; ISO 8601 date format
[logfiles]

;debug => debug
;security => security
console => error
;console => notice,warning,error,debug
messages => notice,warning,error
;full => notice,warning,error,debug,verbose,dtmf,fax

" > /etc/asterisk/logger.conf

cp -Rf /tmp/fail2ban/build/fail2ban.service /usr/lib/systemd/system/fail2ban.service

mkdir /var/run/fail2ban/
asterisk -rx "module reload logger"
systemctl enable fail2ban.service 
systemctl restart fail2ban.service 
iptables -L -v

php /var/www/html/mbilling/cron.php updatemysql

chown -R asterisk:asterisk /var/lib/php/session/
chown -R asterisk:asterisk /var/spool/asterisk/outgoing/
chown -R asterisk:asterisk /etc/asterisk
chmod -R 777 /tmp
chmod -R 555 /var/www/html/mbilling/
chmod -R 750 /var/www/html/mbilling/resources/reports 
chmod -R 774 /var/www/html/mbilling/protected/runtime/
chmod +x /var/www/html/mbilling/agi.php

mkdir -p /usr/local/src/magnus/monitor
mkdir -p /usr/local/src/magnus/sounds
mkdir -p /usr/local/src/magnus/backup

mkdir -p /var/www/tmpmagnus
chown -R asterisk:asterisk /var/www/tmpmagnus
chmod -R 777 /var/www/tmpmagnus

mv /usr/local/src/backup* /usr/local/src/magnus/backup
chown -R asterisk:asterisk /usr/local/src/magnus/
chmod -R 755 /usr/local/src/magnus/

chmod 774 /var/www/html/mbilling/resources/ip.blacklist
chmod -R 655 /var/www/html/mbilling/tmp
chmod -R 750 /var/www/html/mbilling/resources/sounds
chmod -R 770 /var/www/html/mbilling/resources/images
chmod -R 755 /var/www/html/mbilling/assets/
chown -R asterisk:asterisk /var/www/html/mbilling
echo
echo
echo ===============================================================
echo 
echo Congratulations! You have installed MagnusBilling in your Server.
echo
echo Access your MagnusBilling in http://your_ip/
echo Username = root
echo Passwor = magnus
echo
echo Your mysql root password is $password
echo 
echo ===============================================================
echo 
echo           YOUR SERVER ESTART IN 5 SECONDS
echo
echo
echo ===============================================================
echo
sleep 5
reboot