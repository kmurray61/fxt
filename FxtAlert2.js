/**
 * FXT Alert V2
 * @author Ken Murray
 * @email fb3@virtualjam.net
 * @site https://virtualjam.net
 * @createdate 2/15/19
 * @updatedate 7/3/25
 * @version 3.2.02
 */

const Alert = {

    initComponents: () => {
        _root.alertWin_mc = new fxtWin('alertWin_mc', 320, 300, "apDiv1", 'Alert', true, true, 'Alert.alert_Handler', true, false);
        _root.alertWin_mc.init( );
        _root.alertWin_mc.setSize(360 , 180 );
        _root.alertWin_mc.setPosition (( parseFloat( _root.myWidth ) / 2 - 180 ) ,( parseFloat( _root.myHeight ) / 2 - 120 ));
        _root.alertWin_mc.closeHandler = Alert.alert_Handler;
        _root.alertWin_mc.draggable = true;
        _root.alertWin_mc.collapsable = false;

        Fxt.create("div", {
            id : "alertPromptModal",
            renderTo : "apDiv1",
            style : "position: fixed;top: 0;left: 0; z-index: 1040; width: 100vw;height: 100vh;background-color: #000;opacity: 0.5;display:none;"
        });

        Fxt.create("div", {
            id: "alertPromptContainer",
            renderTo: "alertWin_mcContainer",
            style: "display: flex !important;flex-direction: row !important; align-items: center;   justify-content: space-between;width: calc(100% - 6px);height: 30px;border-radius:4px;position:absolute; width:calc(100% - 20px); left:5px; top:5px; border:none 1px #CCCCCC; padding:3px; border-radius:4px;overflow:visible;",
            afterrender: function () {
                Fxt.setCmp('alertWin_mcHolder').style.cssText += 'display:none!important;';
                Fxt.setCmp("alertWin_mcContainer").style.cssText += 'background-color:#FFFFFF!important;';
            },
            items: [
                {
                    ftype : "div",
                    id: "msgAlertTxt",
                    text : '',
                    renderTo : "alertPromptContainer",
                    style: 'text-wrap: balance;width:97%; height:150px; margin-top:10px; color: black!important; text-align: center!important;  font: normal 14px Arial!important;'
                },
                {
                    ftype : "a",
                    id : "yesBtn",
                    text : '',
                    renderTo : "alertPromptContainer",
                    href : "",
                    style: "position:absolute; width:95px; height:27px; bottom:30px; left: 53px;background: linear-gradient(to bottom, #e2e2e2 0%, #CCCCCC 50%, #CCCCCC 51%, #e2e2e2 100%) !important;cursor:pointer;",
                    afterrender: function () {
                        if ( Fxt.getCmp("yesBtn") ) {
                            yesBtn = Fxt.setCmp("yesBtn");
                            yesBtn.style.cssText += 'border: solid 1px #000000!important;text-decoration:none;text-align:center; color:#000;font-family: "FontAwesome" !important;';

                            yesBtn.onmouseover = function() {
                                yesBtn.style.cssText += 'opacity:0.8;';
                            };

                            yesBtn.onmouseout = function() {
                                yesBtn.style.cssText += 'opacity:1;';
                            };

                            yesBtn.setAttribute("class", "unselectable");
                            yesBtn.setAttribute("class", "btn btn-primary");

                        }
                    }
                },
                {
                    ftype : "a",
                    id : "noBtn",
                    text : '',
                    renderTo : "alertPromptContainer",
                    href : "",
                    style: "position:absolute; width:95px; height:27px; bottom:30px; left: 153px; border: solid 1px #000000!important; cursor:pointer;",
                    afterrender: function () {
                        if ( Fxt.getCmp("noBtn") ) {
                            noBtn = Fxt.setCmp("noBtn");
                            noBtn.style.cssText += 'text-decoration:none;text-align:center; color:#000;font-family: "FontAwesome" !important;';

                            noBtn.onmouseover = function() {
                                noBtn.style.cssText += 'opacity:0.8;';
                            };

                            noBtn.onmouseout = function() {
                                noBtn.style.cssText += 'opacity:1;';
                            };

                            noBtn.setAttribute("class", "unselectable");
                            noBtn.setAttribute("class", "btn btn-danger");

                        }
                    }
                },
            ]
        });
    },
    show : function ( msg , title , buttonLabel1 , buttonLabel2 , handler , w , h , modal ) {
        try {
            alertPrompt = Fxt.setCmp('alertWin_mcHolder');
            msgAlertTxt = Fxt.setCmp('msgAlertTxt');
            alertPromptHeaderTitle = Fxt.setCmp("alertWin_mcHeaderTitle");

            if ( alertPrompt == null ) {
                return;
            }

            if ( _root.mobile ) {
                w = w - 20;
            }
            alertPromptHeaderTitle.innerHTML = title;
            alertPrompt.style.cssText += 'width:'+w+'px!important;height:'+( h + 5 )+'px';

            _root.alertWin_mc.setSize(w , ( h + 5 ) );

            msg = "<br>" + msg;
            msgAlertTxt.innerHTML = msg;
            msgAlertTxt.style.cssText += 'width:' + w - 10 + 'px!important;height:' + ( h - 30 ) + 'px;left:0:top:0';

            yesBtn = Fxt.setCmp('yesBtn');
           // yesBtn.style.cssText += 'left:' + ( w / 2 ) - ( yesBtn.style.width + 10 ) + 'px!important;top:' + ( h - 75 ) + 'px;';
            yesBtn.style.cssText += 'left:' + ( w / 2 ) - ( yesBtn.style.width + 10 ) + 'px!important;bottom:0;';
            yesBtn.text = buttonLabel1;
            yesBtn.onclick = handler;

            noBtn = Fxt.setCmp('noBtn');
            //noBtn.style.cssText += 'left:' + yesBtn.style.left + yesBtn.style.width + 10 + 'px!important;top:' + ( h - 75 ) + 'px;';
            noBtn.style.cssText += 'left:' + yesBtn.style.left + yesBtn.style.width + 10 + 'px!important;bottom:0;';

            noBtn.text = buttonLabel2;

            noBtn.onclick = Alert.alert_Handler;
            if ( _root.privateRequestSender != null || _root.privateRequestSender !== '' ) {
                if ( typeof Chat !== "undefined" ) {
                    if ( typeof Chat.privateRequest_HandlerNo === "function" ) {
                        noBtn.onclick = Chat.privateRequest_HandlerNo;
                    }
                }
            }

            if ( buttonLabel1 === "OK" ) {
                // set only 1 button visible and move it to center;
                yesBtn.value = buttonLabel1;
                //yesBtn.style.cssText += 'left:' + ( w / 2 ) - ( yesBtn.style.width / 2 ) + 'px!important;top:' + ( h - 75 ) + 'px;';
                yesBtn.style.cssText += 'left:' + ( w / 2 ) - ( yesBtn.style.width / 2 ) + 'px!important;bottom:0;';
                if ( buttonLabel2 !== "Cancel" ) {
                    Fxt.setCmp('noBtn').style.cssText += 'display:none!important;';
                    //yesBtn.style.cssText += 'left:' + ( ( w / 2 ) - ( parseFloat( yesBtn.style.width ) / 2 ) ) + 'px!important;top:' + ( h - 75 ) + 'px;';
                    yesBtn.style.cssText += 'left:' + ( ( w / 2 ) - ( parseFloat( yesBtn.style.width ) / 2 ) ) + 'px!important;bottom:0;';

                }
                else {
                    //yesBtn.style.cssText += 'left:' + ( w / 2 ) - ( yesBtn.style.width + 5 ) + 'px!important;top:' + ( h - 75 ) + 'px;';
                    yesBtn.style.cssText += 'left:' + ( w / 2 ) - ( yesBtn.style.width + 5 ) + 'px!important;bottom:0;';
                }
            }

            if ( buttonLabel1 === "HIDE" ) {
                //show no buttons
                yesBtn.style.cssText += 'display:none!important;';
                noBtn.style.cssText += 'display:none!important;';
            }

            alertPrompt.style.cssText += 'display:inline!important;z-index:1041;opacity:1';
            let msgAlertTxtHeight = msgAlertTxt.offsetHeight;
            //Fxt.logger( "alertShow msgAlertTxtHeight = " + msgAlertTxtHeight );

            alertPromptContainer = Fxt.setCmp("alertPromptContainer");
            alertPromptContainer.style.cssText += 'height:'+( msgAlertTxtHeight + 5 )+'px; top: 5px;';


            UIView.checkSizes("alertShow");

            if ( modal ) {
                alertPromptModal = Fxt.setCmp('alertPromptModal');
                alertPromptModal.style.cssText += 'display:inline!important;';
                Utils.setZ('alertPromptModal');
            }
            Alert.handleTweenShowComplete();
        }
        catch ( e ) {
            Fxt.logger( "alertShow catch e = " + e );
        }
    },

    handleTweenShowComplete : function () {
        Fxt.logger( "handleTweenShowComplete");
        Fxt.tween(Fxt.setCmp('alertWin_mcHolder'),
            0,    1,
            0,0,
            0,0,
            250,
            'ease-in',
            1 );
        Utils.setZ('alertWin_mcHolder');
    },

    handleTweenHideComplete : function () {
        try {
            this.alert_Handler();
        }
        catch ( e ) {
            Fxt.logger( "alert handleTweenHideComplete catch e = " + e );
        }
    },

    alert_Handler : function () {
        try {
            try {
                alertPrompt = Fxt.setCmp('alertWin_mcHolder');
                Fxt.setCmp("msgAlertTxt").style.cssText += 'padding-left:0;margin-top: 10px;text-align: center !important;';
                alertPrompt.style.cssText += 'display:none!important;z-index:0;';

                alertPromptModal = Fxt.setCmp('alertPromptModal');
                alertPromptModal.style.cssText += 'display:none!important;z-index:0';
            }
            catch ( e ) {
                Fxt.logger( "alert handleTweenHideComplete catch e = " + e );
            }
        }
        catch ( e ) {
            Fxt.logger( "alert_Handler catch e = " + e );
        }
    }
}

window.alert = function ( message ) {
    Alert.show( message , "Alert" , "OK" , "HIDE", Alert.alert_Handler , 320 , 140,true);
};