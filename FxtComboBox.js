/**
 * FXT ComboBox Component
 * @author Ken Murray
 * @email fb3@virtualjam.net
 * @site https://virtualjam.net
 * @createdate 2/15/19
 * @updatedate 7/2/25
 * @version 3.2.02
 */

 /*
     Usage
     _root.rooms_cb = new fxtComboBox('rooms_cb', 150, 150, "users_mcContainer");
     _root.rooms_cb.init();
     _root.rooms_cb.setID('rooms_cb');

     TODO Add internal init list function handlers
     args [
         _root.array
         id
         initial value
         renderTo
         curListOptionID
         curListValue
         curListOption2
         click handler
     ]

     Populate using something similar to initRoomsCB

     initRoomsCB : ()=> {
        try {
            if ( _root.array.length ) {
                for (let i = 0; i < _root.array.length; i++) {
                    Fxt.create("div", {
                        id: "li1_" + i,
                        renderTo : "rooms_cbcomboBoxItems",
                        style: "width:97%; height:30px;  border:solid 1px #CCCCCC;color:#495057; background-color:#c8cbcf; padding:3px;overflow:hidden;cursor:pointer!important;margin-top: 1px;",
                        afterrender: function () {
                            let curListOptionID = "li1_" + i;
                            let curListValue = _root.array[i].roomName;
                            let curListPvt = _root.array[i].pvt
                            Fxt.setCmp("rooms_cbcomboBoxInput").value =_root.array[0].roomName;

                            if (Fxt.getCmp(curListOptionID)) {
                                Fxt.setText(curListOptionID, "<div id='" + curListOptionID + "' style='width:100%;border:none 1px #CCCCCC;font-size:16px;'>" +
                                    "<div style='position:absolute;    margin-top: 5px;font:normal 15px Arial!important;left:5px;width:100%!important;border:none 1px #CCCCCC;overflow:hidden!important;-o-text-overflow: ellipsis!important; text-overflow: ellipsis!important;'>" + curListValue + "</div>" +
                                    "</div>");

                                Fxt.setCmp(curListOptionID).setAttribute("class", "unselectable");
                            }

                            let listClr = '#c8cbcf';
                            Fxt.setCmp(curListOptionID).style.cssText += 'background-color:' + listClr + ';color:#495057;';
                            Fxt.setCmp(curListOptionID).addEventListener("click", function() {
                                if ( curListPvt.toString() === '0' ) {
                                    Utils.processEvent3(curListValue, '');
                                }
                                else {
                                    Fxt.setCmp("rooms_cbcomboBoxInput").value = curListValue;
                                    Fxt.setCmp("rooms_cbcomboBoxItems").style.cssText += 'display:none;';

                                    _root.curSelRoomPassCheck = curListValue;
                                    Fxt.setCmp('passwordWin_mcHolder').style.cssText += 'display:block!important;';
                                    _root.passwordWin_mc.setID('passwordWin_mc');
                                    Fxt.tween(Fxt.setCmp('passwordWin_mcHolder'),
                                        0,    1,
                                        0,0,
                                        0,0,
                                        250,
                                        'ease-in',
                                        1 );

                                    Utils.setZ('passwordWin_mcHolder');
                                    UIView.checkSizes('passwordWin_mcHolder');
                                }
                            });

                            _root.eventListeners.push({
                                id: curListOptionID,
                                type: "click",
                                listener: Utils.processEvent,
                                vars: ''
                            });

                            Fxt.setCmp(curListOptionID).addEventListener("mouseover", function () {
                                this.style.cssText += 'background-color:#d6d8db;color:#000000;';
                                _root.cbMC = this.parentNode.id.replace("comboBoxItems","");
                                _root.rooms_cb.getCBisOver(true);
                                _root.rooms_cb.onShowCB()
                            });

                            Fxt.setCmp(curListOptionID).addEventListener("mouseout", function () {
                                this.style.cssText += 'background-color:' + listClr + ';color:#495057;';
                                _root.rooms_cb.getCBisOver(false);
                                _root.rooms_cb.onRollOutCB()
                            });

                            Fxt.setCmp(curListOptionID).addEventListener("mouseup", function () {
                                this.style.cssText += 'background-color:' + listClr + ';color:#495057;';
                            });
                        },
                    });
                }
            }
        }
        catch ( e ) {
            Fxt.logger("Utils initRoomsCB catch e = "+ e );
        }
    },
 */

var fxtComboBox = function ( id, w, h, holder) {
    this.id = id;
    me = this;
    this.myMC = id;
    this.myHolder = holder;
    this.myW = w;
    this.myH = h;
    this.isOver = false;
    this.cbOpen = false;

    this.getID = () => {
        return this.id;
    };

    this.setID = (id)=> {
        this.id = id;
        this.myMC = id;
    };

    this.init = ()=> {
        try {
            Fxt.create("div", {
                id: this.myMC + "comboBoxHolder",
                renderTo: this.myHolder,
                style: " display: flex;justify-content: flex-start;position:absolute; width: calc(100% - 108px); height:23px; left:95px; top:3px; border:solid 1px #000000; padding:3px; border-radius:4px;background-color: white;",
                items: [
                    {
                        ftype : "input",
                        id : this.myMC + "comboBoxInput",
                        value : '',
                        renderTo : this.myMC + "comboBoxHolder",
                        afterrender: function () {
                            if ( Fxt.getCmp(me.myMC + "comboBoxInput") ) {
                                Fxt.setCmp(me.myMC + "comboBoxInput").style.cssText += 'width: 100%; border:none;';
                                Fxt.setCmp(me.myMC + "comboBoxInput").setAttribute("readonly", true);
                                Fxt.setCmp(me.myMC + "comboBoxInput").cbOpen = false;
                                Fxt.setCmp(me.myMC + "comboBoxInput").name = me.myMC +  "comboBoxInput";
                            }
                            Fxt.setCmp(me.myMC + "comboBoxInput").onclick = function() {
                                //Fxt.logger("comboBoxInput onclick this.id = "+ this.id ); rooms_cbcomboBoxItems
                                me.myMC = this.id.replace("comboBoxInput","");

                                me.getCBOpenCB = eval(me.myMC.replace(me.myMC,"_root." + me.myMC + '.getCBOpenCB') );
                                me.cbOpen = me.getCBOpenCB();

                                Fxt.setCmp(me.myMC + "comboBoxItems").style.cssText += 'display:block;';
                                Fxt.setCmp(me.myMC + "comboBoxItems").style.cssText += 'left:' + parseFloat(parseFloat(Fxt.setCmp(me.myMC + "comboBoxHolder").offsetLeft) ) +'px;';
                                Fxt.setCmp(me.myMC + "comboBoxItems").style.cssText += 'top:' + parseFloat(parseFloat(Fxt.setCmp(me.myMC + "comboBoxHolder").offsetTop) + parseFloat(Fxt.setCmp(me.myMC + "comboBoxHolder").offsetHeight) ) +'px;';
                                Fxt.setCmp(me.myMC + "comboBoxItems").style.cssText += 'width:' + parseFloat(parseFloat(Fxt.setCmp(me.myMC + "comboBoxHolder").offsetWidth) ) +'px;';
                                let getBoundingClientRectOutput = Fxt.setCmp(me.myMC + "comboBoxItems").getBoundingClientRect()

                                if ( parseFloat( _root.myHeight ) < parseFloat( getBoundingClientRectOutput.top ) + parseFloat(  getBoundingClientRectOutput.top ) ) {
                                    Fxt.setCmp(me.myMC + "comboBoxItems").style.cssText += 'top:' + parseFloat(parseFloat(Fxt.setCmp(me.myMC + "comboBoxHolder").offsetTop) - parseFloat(getBoundingClientRectOutput.height)  )  +'px;';
                                }

                                if ( me.myMC === 'video_cb' ) {
                                    Fxt.setCmp("settingsWin_mcTabHolderVideo").style.cssText += 'z-index:1000;';
                                    Fxt.setCmp("settingsWin_mcTabHolderAudio").style.cssText += 'z-index:0;';
                                }
                                else if ( me.myMC === 'audio_cb' ) {
                                    Fxt.setCmp("settingsWin_mcTabHolderAudio").style.cssText += 'z-index:1000;';
                                    Fxt.setCmp("settingsWin_mcTabHolderVideo").style.cssText += 'z-index:0;';
                                }

                                me.onShowCB = eval(me.myMC.replace(me.myMC,"_root." + me.myMC + '.onShowCB') );
                                //Fxt.logger("fxtComboBox me.onShowCB = " + me.onShowCB );
                                if( me.cbOpen ) {
                                    me.cbOpen = false;
                                    Fxt.setCmp(me.myMC +"comboBoxItems").style.cssText += 'display:none;';
                                    if ( _root.mobileBrowser ) {
                                        if (me.myMC === 'rooms_cb') {
                                            Fxt.setCmp("users_mcContainer").style.cssText += 'overflow: hidden;';
                                        }
                                    }
                                }
                                else {
                                    me.cbOpen = true;
                                    me.onShowCB();
                                    if ( _root.mobileBrowser ) {
                                        if (me.myMC === 'rooms_cb') {
                                            Fxt.setCmp("users_mcContainer").style.cssText += 'overflow: visible;';
                                        }
                                    }
                                }
                            };
                        },
                    },
                    {
                        ftype : "input",
                        id : this.myMC + "comboBoxBtn",
                        renderTo :this.myMC +  "comboBoxHolder",
                        afterrender: function () {
                            if ( Fxt.getCmp(me.myMC + "comboBoxBtn") ) {
                                Fxt.setCmp(me.myMC + "comboBoxBtn").style.cssText += 'margin-left: 3px;height: 24px;padding: 10px;padding-top: 3px;width:34px; border:solid 1px #CCCCCC; border-radius:0px; color:#000; background-repeat: no-repeat !important; background-position:center; cursor:pointer;background-image: url(assets/trigger2.png) !important;border:none!important;background-color: #FFF;';
                            }
                            Fxt.setCmp(me.myMC + "comboBoxBtn").type = "button";
                            Fxt.setCmp(me.myMC + "comboBoxBtn").name = me.myMC +  "comboBoxHolder";
                            Fxt.setCmp(me.myMC + "comboBoxBtn").value = "";
                            Fxt.setCmp(me.myMC + "comboBoxBtn").onclick = function() {
                                me.myMC = this.id.replace("comboBoxBtn","");

                                Fxt.setCmp(me.myMC + "comboBoxItems").style.cssText += 'display:block;';
                                Fxt.setCmp(me.myMC + "comboBoxItems").style.cssText += 'left:' + parseFloat(parseFloat(Fxt.setCmp(me.myMC + "comboBoxHolder").offsetLeft) ) +'px;';
                                Fxt.setCmp(me.myMC + "comboBoxItems").style.cssText += 'top:' + parseFloat(parseFloat(Fxt.setCmp(me.myMC + "comboBoxHolder").offsetTop) + parseFloat(Fxt.setCmp(me.myMC + "comboBoxHolder").offsetHeight) ) +'px;';
                                Fxt.setCmp(me.myMC + "comboBoxItems").style.cssText += 'width:' + parseFloat(parseFloat(Fxt.setCmp(me.myMC + "comboBoxHolder").offsetWidth) ) +'px;';
                                let getBoundingClientRectOutput = Fxt.setCmp(me.myMC + "comboBoxItems").getBoundingClientRect();

                                if ( parseFloat( _root.myHeight ) < parseFloat( getBoundingClientRectOutput.top ) + parseFloat(  getBoundingClientRectOutput.top ) ) {
                                    Fxt.setCmp(me.myMC + "comboBoxItems").style.cssText += 'top:' + parseFloat(parseFloat(Fxt.setCmp(me.myMC + "comboBoxHolder").offsetTop) - parseFloat(getBoundingClientRectOutput.height)  )  +'px;';
                                }

                                me.onShowCB = eval(me.myMC.replace(me.myMC,"_root." + me.myMC + '.onShowCB') );

                                if ( me.myMC === 'video_cb' ) {
                                    Fxt.setCmp("settingsWin_mcTabHolderVideo").style.cssText += 'z-index:1000;';
                                    Fxt.setCmp("settingsWin_mcTabHolderAudio").style.cssText += 'z-index:0;';
                                }
                                else if ( me.myMC === 'audio_cb' ) {
                                    Fxt.setCmp("settingsWin_mcTabHolderAudio").style.cssText += 'z-index:1000;';
                                    Fxt.setCmp("settingsWin_mcTabHolderVideo").style.cssText += 'z-index:0;';
                                }

                                if ( me.cbOpen ) {
                                    me.cbOpen = false;
                                    Fxt.setCmp(me.myMC +"comboBoxItems").style.cssText += 'display:none;';

                                    if ( _root.mobileBrowser ) {
                                        if (me.myMC === 'rooms_cb') {
                                            Fxt.setCmp("users_mcContainer").style.cssText += 'overflow: hidden;';
                                        }
                                    }
                                }
                                else {
                                    me.cbOpen = true;
                                    me.onShowCB();
                                    if ( _root.mobileBrowser ) {
                                        if (me.myMC === 'rooms_cb') {
                                            Fxt.setCmp("users_mcContainer").style.cssText += 'overflow: visible;';
                                        }
                                    }
                                }
                            };
                        },
                    },
                    {
                        ftype : "div",
                        id : this.myMC + "comboBoxItems",
                        text : '',
                        renderTo: this.myHolder,
                        afterrender: function () {
                            Fxt.setCmp(me.myMC +"comboBoxItems").style.cssText += 'z-index: 99;position:absolute;width: calc(100% - 100px);left:95px;top:40px; overflow-y: auto;overflow-x: hidden;background-color:#FFFFFF;max-height:240px;';
                            me.initCB();
                            Fxt.setCmp(me.myMC +"comboBoxItems").style.cssText += 'display:none;';
                            me.cbOpen = false;

                            Fxt.setCmp(me.myMC +"comboBoxItems").addEventListener('mouseleave', me.onRollOutCB, false );
                            Fxt.setCmp(me.myMC +"comboBoxItems").addEventListener('mouseover', me.onRollOverTimerCB, false );

                        },
                    },
                ]
            });
        }
        catch ( e ) {
            Fxt.logger("fxtComboBox init catch e = " + e );
        }
    }
    this.initCB = () => {
        //Fxt.logger("fxtComboBox initCB");
    }
    this.processCB = (curListValue)=> {
        Fxt.setCmp(me.myMC + "comboBoxInput").value = curListValue;
        Fxt.setCmp(me.myMC +"comboBoxItems").style.cssText += 'display:none;';
        me.cbOpen = false;
    }
    this.onRollOutCB = ()=> {
        try {
            clearInterval( _root.myIVLCB );
            let dp1 = Fxt.setCmp(me.myMC +"comboBoxItems");
            if ( dp1 != null ) {
                if ( me.cbOpen ) {
                    if ( !me.isOver ) {
                        me.onRollOutTimerCB = eval(me.myMC.replace(me.myMC,"_root." + me.myMC + '.onRollOutTimerCB') );
                        _root.myIVLCB = setInterval( me.onRollOutTimerCB, 5000 );
                    }
                }
            }
        }
        catch ( e ) {
            Fxt.logger("onRollOutCB error: " + e.toString());
        }
    }
    this.onRollOutTimerCB = ()=> {
        if ( me.myMC ) {
            if (Fxt.getCmp(me.myMC +"comboBoxItems")) {
                Fxt.setCmp(me.myMC +"comboBoxItems").style.cssText += 'display:none;';
            }
        }
        me.cbOpen = false;
        clearInterval( _root.myIVLCB );
    }
    this.onRollOverTimerCB = ()=> {
        clearInterval( _root.myIVLCB );
    }
    this.onShowCB = ()=> {
        clearInterval( _root.myIVLCB );
        if ( me.cbOpen ) {
            if ( !me.isOver ) {
                me.onRollOutTimerCB = eval(me.myMC.replace(me.myMC,"_root." + me.myMC + '.onRollOutTimerCB') );
                _root.myIVLCB = setInterval( me.onRollOutTimerCB, 5000 );
            }
        }
    }
    this.getCBisOver = (arg)=> {
        me.isOver = arg;
    }
    this.getCBOpenCB = () => {
        if ( !me.cbOpen ) {
            me.cbOpen = false;
        }
        return me.cbOpen;
    }
    this.initCBList = function() {

    }
}