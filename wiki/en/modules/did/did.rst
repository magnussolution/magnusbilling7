.. _did-menu-list:

**********
Field list
**********



.. _did-did:

DID
"""

The exact number coming from the context. We recommend you to always use the E164 format.




.. _did-activated:

Status
""""""

We did not write the description to this field.




.. _did-callerid:

Callerid name
"""""""""""""

Use this field to set a Callerid name, or leave blank to use the received callerid from the DID provider.




.. _did-connection_charge:

Connection charge
"""""""""""""""""

Activation cost. E.




.. _did-fixrate:

Monthly price
"""""""""""""

We did not write the description to this field.




.. _did-connection_sell:

Connection charge
"""""""""""""""""

We did not write the description to this field.




.. _did-minimal_time_charge:

Minimum time to charge
""""""""""""""""""""""

We did not write the description to this field.




.. _did-initblock:

Initial block
"""""""""""""

Minimum time in seconds to buy. E.g., if set to 30s and the call duration is 10s, charged for 30s.




.. _did-increment:

Billing block
"""""""""""""

This defines how the time is incremented after the minimum. E.g, if set to 6s and call duration is 32s, charged for 36.




.. _did-charge_of:

Charge who
""""""""""

We did not write the description to this field.




.. _did-calllimit:

Channel limit
"""""""""""""

DID simultaneous calls




.. _did-description:

Description
"""""""""""

We did not write the description to this field.




.. _did-expression_1:

Regular expression
""""""""""""""""""

Use REGEX to able to bill the incomming calls by CallerID(ANI). E.g, if you are calling your DID and your number is 443432221234, suppose you want to charge all calls that start with 44 for 0.1. Therefore you can use ^44, and Sell price per min 0.1.




.. _did-selling_rate_1:

Sell price per min
""""""""""""""""""

Price per minute if the number matches the above regular expression.




.. _did-block_expression_1:

Block calls from this expression
""""""""""""""""""""""""""""""""

Set to yes to block calls that matches with the above regular expression




.. _did-send_to_callback_1:

Send the call to callback
"""""""""""""""""""""""""

Send this call to CallBack if it matches with the above regular expression




.. _did-expression_2:

Regular expression
""""""""""""""""""

Same as the field above but you can use 3 REGEXes to bill with 3 diferent rules. E.g, on the first REGEX you want to charge 0.1 for numbers that start with 44, the second rule charges 0.2 for numbers that start with 447. Therefore you can use ^447 and Sell price per min 0.2.




.. _did-selling_rate_2:

Sell price per min
""""""""""""""""""

We did not write the description to this field.




.. _did-block_expression_2:

Block calls from this expression
""""""""""""""""""""""""""""""""

We did not write the description to this field.




.. _did-send_to_callback_2:

Send the call to callback
"""""""""""""""""""""""""

We did not write the description to this field.




.. _did-expression_3:

Regular expression
""""""""""""""""""

We did not write the description to this field.




.. _did-selling_rate_3:

Sell price per min
""""""""""""""""""

We did not write the description to this field.




.. _did-block_expression_3:

Block calls from this expression
""""""""""""""""""""""""""""""""

We did not write the description to this field.




.. _did-send_to_callback_3:

Send the call to callback
"""""""""""""""""""""""""

We did not write the description to this field.




.. _did-cbr:

CallBack pro
""""""""""""

Enables CallBack Pro. Only works if DID destination is a QUEUE.




.. _did-cbr_ua:

Use audio
"""""""""

Tries to execute an audio when a call is received.




.. _did-cbr_total_try:

Maximum trying
""""""""""""""

We did not write the description to this field.




.. _did-cbr_time_try:

Interval beteween trying
""""""""""""""""""""""""

We did not write the description to this field.




.. _did-cbr_em:

Early media
"""""""""""

Tries to execute an audio before the call is answered. Your DID provider needs to allow early media.




.. _did-TimeOfDay_monFri:

Mon-Fri
"""""""

E.g, your company will only callback to the callee if the call was in between 09-12PM and 02:06PM MON-FRY, between this time interval the workaudio is going to be played and then callback to the callee. You can use multiple time intervals with | separated.




.. _did-TimeOfDay_sat:

Sat
"""

The same but for Sat.




.. _did-TimeOfDay_sun:

Sun
"""

The same but for Sun.




.. _did-workaudio:

Work audio
""""""""""

Audio to execute when a call is received at the time interval.




.. _did-noworkaudio:

Out work audio
""""""""""""""

Audio to execute when a call is received out of the time interval.



