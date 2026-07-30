#!/bin/bash

sleep 1
if [ -n "$1" ]; then
	if [ -n "$2" ]; then
		mkdir -p /usr/local/src/magnus/sounds
		rm -rf /usr/local/src/magnus/sounds/*

		scp -o StrictHostKeyChecking=no -P $2 root@$1:/usr/local/src/magnus/sounds/* /usr/local/src/magnus/sounds/
		scp -o StrictHostKeyChecking=no -P "$2" "root@$1:/etc/asterisk/*magnus*" /etc/asterisk/
		scp -o StrictHostKeyChecking=no -P "$2" "root@$1:/etc/asterisk/*mbilling*" /etc/asterisk/

		chown -R asterisk:asterisk /etc/asterisk/
		asterisk -rx "reload"
	fi
fi
