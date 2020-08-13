*************
Installation
*************

In order to install MagnusBilling you'll need a server with CentOS 7 or Debian 8, minimal install. Keep in mind that all testing and development of MagnusBilling occurs in CentOS 7, so we highly recommend using CentOS 7.

    
**1.** Execute the following commands as root to run the script that will install MagnusBilling, Asterisk and all dependencies needed like: IPTables, Fail2ban, Apache, PHP and MySQL.

Install CentOS 7 **minimal**.

::
     
  cd /usr/src/
  yum -y install wget
  wget https://raw.githubusercontent.com/magnussolution/magnusbilling6/master/script/install.sh
  chmod +x install.sh
  ./install.sh     

**2.** During the install you'll be asked what language MagnusBilling should use. Choose by typing the number of the language.

::

   Install complete. The server will restart.

   Use a browser to access the interface.
      Go to: http://xxx.xxx.xxx.xxx
      User: root
      Password: magnus (Remember to change the password)


.. image:: ../img/ilogin.png
        :scale: 80%
