![image](https://virtualjam.net/logo.png )
## FxtJS ( Functional Extensible Template )
#### Author — Ken Murray
#### Email — fb3@virtualjam.net
#### Site — https://virtualjam.net
#### Created — 2/25/21
#### Updated — 7/2/25
#### Version — 3.2.03

---
* FxtJS Inspired by ExtJS and Flash/Flex/ActionScript.
* Originally created to extend ExtJS (Sencha) functionality.
* Creates a dynamic UI similar to ExtJS (Sencha) JSON format.
* Simplifies common JS calls to DOM objects in a familiar format inspired by Flash and FlexBuilder.
* Current component node items depth is 10 levels MAX.
* Library expanded to include custom reusable components and helper functions.
* Alert / Dialog Component.
* Button and ComboBox for universal compatibility, style, and functionality.
* Window Component Draggable, Closeable or Chromeless container.
* UIView controller for handling resize events.
* Utilities to support components.  
---

> **FxtJS Example**

 *Bootstrap 4 - examples/BootStrap4Modal.html* 
 
 Converted to FxtJS from original HTML source—https://www.w3schools.com/bootstrap4/tryit.asp?filename=trybs_modal&stacked=h

---
> **Window Component Usage**
###### @args: [ id, w, h, holder, title, header, closeable, closeHandler, draggable, collapsable ]
    _root.win_mc = new fxtWin('win_mc', 320, 300, "apDiv1", 'Room Password', true, true, 'Utils.win_mcClose', true, false);
    _root.win_mc.init( );
    _root.win_mc.setSize(360 , 180 );
    _root.win_mc.setPosition (( parseFloat( _root.myWidth ) / 2 - 180 ) ,( parseFloat( _root.myHeight ) / 2 - 120 ));
    _root.win_mc.closeHandler = Utils.win_mcClose;
    _root.win_mc.draggable = true;
    _root.win_mc.collapsable = false;

> **ComboBox Component Usage**
###### @args: [ id, w, h, holder ]
    _root.rooms_cb = new fxtComboBox ('rooms_cb, 150, 150,'users_mcContainer');
    _root.rooms_cb.init();
    _root.rooms_cb.setID('rooms_cb');

---

> **Button Component Usage**
###### Create Button as Button
    _root.sendBtn = new fxtButton('sendBtn', 
    'button', 
    '100%', 
    '33px', 
    'font-size:26px!important; max-width:44px;', 
    'sendBtnHolder', 
    'Send Message', 
    null, 
    'fa fa-paper-plane', 
    'margin-left:-2px; margin-top:2px;', 
    'ChatMC.sendMessageHandler()',
    'button'); 

###### _root.sendBtn.init();

---

###### Create Input as Button
    _root.smilieBtn = new fxtButton('smilieBtn',
    'input',
    '100%',
    '33px',
    'font-size:26px!important;max-width:44px;',
    'smilieBtnHolder',
    'Emoji\'s',
    null,
    0xf118,
    'margin-left:-5px;margin-top:4px;',
    'ChatMC.smilieBtnHandler()', 
    'button smilie-btn');

###### _root.smilieBtn.init();

---

> **Alert / Dialog Usage**
> ###### Alert.show: ( msg , title , buttonLabel1 , buttonLabel2 , handler , w , h , modal )
    Alert.initComponents();

    //Call with args
    Alert.show( 'Hello World!' , "Hello" , "OK" , null, Alert.alert_Handler , 360 , 200, false);

    //Or use native method 
    alert("Hello World");