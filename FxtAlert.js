/**
 * FXT Alert V1
 */

var Alert = {
    Fxt : parent.Fxt,
    show : function ( msg , title , buttonLabel1 , buttonLabel2 , handler , w , h , modal ) {
		try {
			alertPrompt = Fxt.setCmp('alertPrompt');
            msgAlertTxt = Fxt.setCmp('msgAlertTxt');
            alertPromptHeaderTitle = Fxt.setCmp("alertPromptHeaderTitle");

			if ( alertPrompt == null ) {
                return;
            }

			if ( _root.mobile ) {
				w = w - 20;
			}
			alertPromptHeaderTitle.innerHTML = title;
            alertPrompt.style.cssText += 'width:'+w+'px!important;height:'+( h + 5 )+'px';

			msg = "<br>" + msg;
            msgAlertTxt.innerHTML = msg;
            msgAlertTxt.style.cssText += 'width:' + w - 10 + 'px!important;height:' + ( h - 30 ) + 'px;left:0:top:0';

			yesBtn = Fxt.setCmp('yesBtn');
            yesBtn.style.cssText += 'left:' + ( w / 2 ) - ( yesBtn.style.width + 10 ) + 'px!important;top:' + ( h - 75 ) + 'px;';
            yesBtn.text = buttonLabel1;
            yesBtn.onclick = handler;

			noBtn = Fxt.setCmp('noBtn');
            noBtn.style.cssText += 'left:' + yesBtn.style.left + yesBtn.style.width + 10 + 'px!important;top:' + ( h - 75 ) + 'px;';
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
                yesBtn.style.cssText += 'left:' + ( w / 2 ) - ( yesBtn.style.width / 2 ) + 'px!important;top:' + ( h - 75 ) + 'px;';

				if ( buttonLabel2 !== "Cancel" ) {
                    Fxt.setCmp('noBtn').style.cssText += 'display:none!important;';
                    yesBtn.style.cssText += 'left:' + ( ( w / 2 ) - ( parseFloat( yesBtn.style.width ) / 2 ) ) + 'px!important;top:' + ( h - 75 ) + 'px;';
				}
				else {
                    yesBtn.style.cssText += 'left:' + ( w / 2 ) - ( yesBtn.style.width + 5 ) + 'px!important;top:' + ( h - 75 ) + 'px;';
				}
			}

			if ( buttonLabel1 === "HIDE" ) {
				//show no buttons
                yesBtn.style.cssText += 'display:none!important;';
                noBtn.style.cssText += 'display:none!important;';
			}
        
            alertPrompt.style.cssText += 'display:inline!important;z-index:1041;opacity:1';
			let msgAlertTxtHeight = msgAlertTxt.offsetHeight;
			Fxt.logger( "alertShow msgAlertTxtHeight = " + msgAlertTxtHeight );
			alertPromptContainer.style.cssText += 'height:'+( msgAlertTxtHeight + 5 )+'px;    top: 33px;';

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
		Utils.setZ('alertPrompt');
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
				alertPrompt = Fxt.setCmp('alertPrompt');
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
	},
    
	initComponents : function () {
        var alertPromptModal = Fxt.create("div", {
			id : "alertPromptModal", 
			renderTo : "apDiv1",
			style : "position: fixed;top: 0;left: 0; z-index: 1040; width: 100vw;height: 100vh;background-color: #000;opacity: 0.5;display:none;"
        });
        
        var alertPrompt = Fxt.create("div", {
			id : "alertPrompt", 
			renderTo : "apDiv1",
			style : "position:absolute; z-index: 1041; width:320px; height:240px; left:505px; top:535px; border:none 1px #CCCCCC;overflow:hidden;display:none;",
			items : 
			[
				{
					ftype : "div",
					id : "alertPromptHeader",
					text : '', 
					renderTo : "alertPrompt",
					style : "position:absolute; width:97%; height:25px; left:0px; top:0px; border:solid 1px #000000; padding:3px; border-radius:0px;overflow:hidden;background-position:center; background: linear-gradient(to bottom, #f1f1f1 0%, #CCCCCC 50%, #CCCCCC 51%, #f1f1f1 100%) !important;cursor:pointer;",
					afterrender: function () {
						Fxt.setCmp("alertPromptHeader").setAttribute("class", "headbar");
						Fxt.setCmp("alertPromptHeader").onmousedown = function(e) {
							_root.curDragObj = "alertPrompt";
							window.addEventListener('mousemove', Utils.popupMove, true );
       						this.addEventListener('mousemove', Utils.popupMove, true );
							this.style.cursor = "all-scroll";
						};

						Fxt.setCmp("alertPromptHeader").onmouseup = function(e) {
							_root.curDragObj = null;
							window.removeEventListener('mousemove', Utils.popupMove, true );
	   						this.removeEventListener('mousemove', Utils.popupMove, true );
							this.style.cursor = "pointer";
						};
					},
				},
				{
					ftype : "span",
					id : "alertPromptHeaderTitle",
					text : '', 
					renderTo : "alertPromptHeader",
					afterrender: function () {
						if ( Fxt.getCmp("alertPromptHeaderTitle") ) {
							Fxt.setCmp("alertPromptHeaderTitle").style.cssText += 'text-align: left;color:#000;position:absolute; width:150px; top:8px; left:5px;';
							Fxt.setCmp("alertPromptHeaderTitle").setAttribute("class", "unselectable");
							Fxt.setCmp("alertPromptHeaderTitle").setAttribute("class", "headbarTitle");
							Fxt.setText('alertPromptHeaderTitle' , 'Alert');
						}
					},
				},
				{
					ftype : "input",
					id : "alertPromptHeaderCloseBtn",
					cls : 'closeBtn',
					renderTo : "alertPromptHeader",
					afterrender: function () {
						if ( Fxt.getCmp("alertPromptHeaderCloseBtn") ) {
                            alertPromptHeaderCloseBtn = Fxt.setCmp("alertPromptHeaderCloseBtn");
							alertPromptHeaderCloseBtn.style.cssText += 'position:absolute; width:30px; height:24px; top:3px; right: 5px;';
							alertPromptHeaderCloseBtn.type = "button";
                            alertPromptHeaderCloseBtn.style.cssText += 'font-size:16px;font-family: "FontAwesome" !important;';
                            alertPromptHeaderCloseBtn.value = String.fromCharCode(0xf00d) + "" ;
                            alertPromptHeaderCloseBtn.onclick = Alert.alert_Handler;
						}
					},
				},
				{
					ftype : "div",
					id : "alertPromptContainer",
					text : '', 
					renderTo : "alertPrompt",
					style : "position:absolute; width:97%; height:70%; left:0px; top:30px; border:solid 1px #000000;border-top: none; padding:3px;border-radius:0px;overflow:hidden;background-position:center; background-color:#FFFFFF;",
                    items: [
                    {
						ftype : "div",
                        id: "msgAlertTxt",
                        text : '',
                        renderTo : "alertPromptContainer",
                        style: 'width:97%; height:150px; margin-top:10px; color: black!important; text-align: center!important;  font: normal 14px Arial!important;'
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
                ]}
			],
		});
    }
}



window.alert = function ( message ) {
    Alert.show( message , "Alert" , "OK" , "HIDE", Alert.alert_Handler , 320 , 140,true);
};