/**
 * FXT Window Component
 * @author Ken Murray
 * @email fb3@virtualjam.net
 * @site https://virtualjam.net
 * @createdate 2/15/19
 * @updatedate 7/2/25
 * @version 3.2.02
 */

/** Usage
 _root.passwordWin_mc = new fxtWin('passwordWin_mc', 320, 300, "apDiv1", 'Room Password', true, true, 'Utils.passwordWinClose', true, false);
 _root.passwordWin_mc.init( );
 _root.passwordWin_mc.setSize(360 , 180 );
 _root.passwordWin_mc.setPosition (( parseFloat( _root.myWidth ) / 2 - 180 ) ,( parseFloat( _root.myHeight ) / 2 - 120 ));
 _root.passwordWin_mc.closeHandler = Utils.passwordWinClose;
 _root.passwordWin_mc.draggable = true;
 _root.passwordWin_mc.collapsable = false;
*/

var fxtWin = function (id, w, h, holder, title, header, closeable, closeHandler, draggable, collapsable) {
    this.id = id;
    me = this;
    this.myMC = id;
    this.myHolder = holder;
    this.myW = w;
    this.myH = h;
    this.myTitle= title;
    this.myHeader = header;
    this.myCloseable = closeable;
    this.closeHandler = closeHandler;
    this.collapsed =  false;
    this.draggable =  draggable;
    this.collapsable = collapsable;

    this.getID = function() {
        return this.id;
    };

    this.setID = function(id) {
        this.id = id;
        this.myMC = id;
    };

    this.init = function(  ){
        try {
            Fxt.create("div", {
                id : this.myMC + "Holder",
                renderTo : this.myHolder,
                handler : this.closeHandler,
                style : "position:absolute;border:none 1px #CCCCCC;", //transition: height .3s ease 0s,top .3s ease 0s;
                items : [
                    {
                        ftype : "div",
                        id : this.myMC + "Header",
                        text : '',
                        renderTo : this.myMC + "Holder",
                        cls:'headbar',
                        style : "position:absolute; width:100%; height:25px; left:0px; top:0px;  ",
                        afterrender: function () {
                            if ( me.draggable) {
                                if ( _root.mobileBrowser ) {
                                    Fxt.setCmp( me.myMC + "Header").addEventListener('touchstart', function( e) {
                                        let curID = this.id.replace("Header","");
                                        _root.curDragObj = curID + 'Holder';
                                        Utils.setZ(_root.curDragObj);
                                    }, { passive: true });

                                    Fxt.setCmp(me.myMC + "Header").addEventListener('touchend', function( e ) {
                                        _root.curDragObj = null;
                                    }, { passive: true });

                                    Fxt.setCmp(me.myMC + "Header").addEventListener('touchmove', function( e ) {
                                        if ( e.targetTouches.length === 1 ) {
                                            pauseEvent(e);
                                            Utils.popupMove(e);
                                        }
                                    }, { passive: true });
                                }
                                else {
                                    Fxt.setCmp(me.myMC + "Header").style.cursor = "all-scroll";
                                    Fxt.setCmp(me.myMC + "Header").onmousedown = function(e) {
                                        let curID = this.id.replace("Header","");
                                        _root.curDragObj = curID + 'Holder';
                                        Utils.setZ(_root.curDragObj);

                                        _root.previousPosX = e.clientX;
                                        _root.previousPosY = e.clientY;

                                        window.addEventListener('mousemove', Utils.popupMove, true );
                                        this.addEventListener('mousemove', Utils.popupMove, true );
                                        this.style.cursor = "all-scroll";
                                    };

                                    Fxt.setCmp(me.myMC + "Header").onmouseup = function(e) {
                                        _root.curDragObj = null;
                                        window.removeEventListener('mousemove', Utils.popupMove, true );
                                        this.removeEventListener('mousemove', Utils.popupMove, true );
                                        this.style.cursor = "pointer";
                                    };
                                }
                            }

                            if ( !me.myHeader ) {
                                Fxt.setCmp(me.myMC + "Header").style.cssText += 'display:none;';
                            }
                        },
                    },
                    {
                        ftype : "span",
                        id : this.myMC + "HeaderTitle",
                        text : '',
                        cls : 'headbarTitle',
                        renderTo : this.myMC + "Header",
                        afterrender: function () {
                            if ( Fxt.getCmp(me.myMC + "HeaderTitle") ) {
                                Fxt.setCmp(me.myMC + "HeaderTitle").style.cssText += 'position:absolute; width:150px; top:30%; left:5px;';
                                Fxt.setText(me.myMC + "HeaderTitle" , me.myTitle);
                                Fxt.setCmp(me.myMC + "HeaderTitle").style.cssText += 'width:unset!important;';
                            }
                        },
                    },
                    {
                        ftype : "input",
                        id : this.myMC + "HeaderCloseBtn",
                        cls : 'closeBtn',
                        renderTo : this.myMC + "Header",
                        afterrender: function () {
                            Fxt.setCmp(me.myMC +"HeaderCloseBtn").type = "button";
                            Fxt.setCmp(me.myMC +'HeaderCloseBtn').style.cssText += 'position:absolute; width:30px; height:24px; top:3px; right: 5px;';
                            Fxt.setCmp(me.myMC +"HeaderCloseBtn").value = String.fromCharCode(0xf00d) + "" ;

                            Fxt.setCmp(me.myMC +"HeaderCloseBtn").onclick = function() {
                                this.myMC = this.id.replace("HeaderCloseBtn","");
                                //Fxt.logger( "this.myMC " + this.myMC );

                                if ( this.myMC.indexOf("av_") !== -1 || this.myMC.indexOf("pm_") !== -1 ) {
                                    //Fxt.logger( "AV Detected " );
                                    window[this.myMC].closeHandler(this.myMC);
                                }
                                else {
                                    this.closeHandler = eval(this.myMC.replace(this.myMC,"_root." + this.myMC + '.closeHandler') );
                                    //Fxt.logger( "me.closeHandler " + this.closeHandler );
                                    setTimeout( this.closeHandler, 100, this.closeHandler);
                                }
                            };

                            if ( !me.myCloseable ) {
                                Fxt.setCmp(me.myMC +'HeaderCloseBtn').style.cssText += 'display:none;'
                            }
                        },
                    },
                    {
                        ftype : "input",
                        id : this.myMC + "HeaderToggleBtn",
                        cls : 'headerToggleBtn',
                        renderTo : this.myMC + "Header",
                        afterrender: function () {
                            Fxt.setCmp(me.myMC +"HeaderToggleBtn").type = "button";
                            Fxt.setCmp(me.myMC +'HeaderToggleBtn').style.cssText += 'position:absolute; width:30px; height:24px; top:3px; right: 55px;';
                            Fxt.setCmp(me.myMC +"HeaderToggleBtn").value = String.fromCharCode(0xf106) + "" ;

                            Fxt.setCmp(me.myMC +"HeaderToggleBtn").onclick = function() {
                                let curID = this.id.replace("HeaderToggleBtn","");
                                _root.curElObj = curID + 'Holder';
                                _root.curwidth = Fxt.setCmp(_root.curElObj).getBoundingClientRect().width;
                                _root.curheight = Fxt.setCmp(_root.curElObj).getBoundingClientRect().height;
                                let toggleCollapse = eval("_root." + curID + '.toggleCollapse' );
                                 toggleCollapse(_root.curElObj,_root.curwidth,_root.curheight);
                            };

                            if ( !me.myCloseable ) {
                                Fxt.setCmp(me.myMC +'HeaderCloseBtn').style.cssText += 'display:none;'
                            }

                            if ( !me.collapsable ) {
                                Fxt.setCmp(me.myMC +'HeaderToggleBtn').style.cssText += 'display:none;'
                            }
                            else {
                                if ( !me.myCloseable ) {
                                    Fxt.setCmp(me.myMC +'HeaderToggleBtn').style.cssText += 'right: 5px;';
                                }
                                else {
                                    Fxt.setCmp(me.myMC +'HeaderToggleBtn').style.cssText += 'right: 40px;';
                                }
                            }

                        },
                    },
                    {
                        ftype : "div",
                        id : this.myMC + "Container",
                        text : '',
                        renderTo : this.myMC + "Holder",
                        cls : 'mcContainer',
                        style : "position:absolute;",
                    }
                ],
            });
        }
        catch (e) {
            Fxt.logger("fxtWin init catch e = " + e );
        }
    };
    this.setSize = function( w, h ) {
        try {
          //  Fxt.logger("fxtWin setSize this.myMC = " + this.myMC );
            this.myW = w;
            this.myH = h;
            Fxt.setCmp(this.myMC + "Holder").style.cssText += "width:" + this.myW + "px; height:" + this.myH + "px!important;";
        }
        catch (e) {
            //Fxt.logger("setSize catch this.myMC = " + this.myMC  );
        }
    };
    this.setPosition = function( x, y ) {
        try {
            //Fxt.logger("fxtWin setPosition this.myMC = " + this.myMC );
            this.myX = x;
            this.myY = y;
            Fxt.setCmp(this.myMC + "Holder").style.cssText += "left:" + this.myX + "px; top:" + this.myY + "px;";
        }
        catch (e) {
            //Fxt.logger("setPosition catch this.myMC = " + this.myMC)
        }
    };

    this.toggleCollapse = function(MC ,w ,h ) {
        try {
            if ( h > 0 ) {
                _root.lastcurheight = h;
            }
            let curID = MC.replace("Holder","");
            let curIDCol = curID;
            Fxt.setCmp(MC).addEventListener("transitionend", me.toggleCollapseDone, MC);
            me.collapsed = eval(curIDCol.replace(curIDCol,"_root." + curID + '.collapsed') );

            if ( !me.collapsed ) {
                me.collapsed = true;
                Fxt.setCmp(MC).style.cssText += "width:" + w + "px; height:0px!important;";
                Fxt.setCmp(curID + "HeaderToggleBtn").value = String.fromCharCode(0xf107) + "";

                Fxt.setCmp(curID + "Container").style.cssText += "overflow:hidden";
            }
            else {
                me.collapsed = false;
                Fxt.setCmp(MC).style.cssText += "width:" + w + "px; height:" + _root.lastcurheight + "px!important;";
                Fxt.setCmp(curID + "HeaderToggleBtn").value = String.fromCharCode(0xf106) + "";
                Fxt.setCmp(curID + "Container").style.cssText += "overflow:visible";
            }

            if ( curID === 'videos_mc') {
                _root.videos_mc.collapsed =  me.collapsed;
            }
            if ( curID === 'users_mc') {
                _root.users_mc.collapsed =  me.collapsed;
            }

            Fxt.setCmp("users_mcContainer").style.cssText += 'overflow: hidden;';

            UIView.checkSizes('toggleCollapse');
            setTimeout(UIView.checkSizes,1000);
        }
        catch (e) {
            Fxt.logger("toggleCollapse catch e = " + e );
        }
    };
    this.toggleCollapseDone = function (MC) {
        UIView.checkSizes('toggleCollapseDone');
    }
};