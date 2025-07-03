/**
 * FXT Button Component
 * @author Ken Murray
 * @email fb3@virtualjam.net
 * @site https://virtualjam.net
 * @createdate 2/15/19
 * @updatedate 7/2/25
 * @version 3.2.02
 *
*/

/*
     USage * Create Button as Button
    _root.sendBtn = new fxtButton('sendBtn',
    'button',
    '100%',
    '33px',
    'font-size:26px!important;max-width:44px;',
    'sendBtnHolder',
    'Send Message',
    null,
    'fa fa-paper-plane',
    'margin-left:-2px;margin-top:2px;',
    'ChatMC.sendMessageHandler()', 'button');
    _root.sendBtn.init();
 */

/**
     USage * Create Input as Button
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
     'ChatMC.smilieBtnHandler()', 'button smilie-btn');
     _root.smilieBtn.init();
 */

var fxtButton = function ( id, comp, w, h, style, holder, tooltip, text, icon, iconstyle, handler, cls ) {
    this.id = id;
    me = this;
    this.myMC = id;
    this.myComp = comp;
    this.myHolder = holder;
    this.myW = w;
    this.myH = h;
    this.myStyle = style;
    this.myTooltip = tooltip;
    this.myTxt = text;
    this.myIco = icon;
    this.myIcoStyle = iconstyle;
    this.myHandler =  handler;
    this.cls = cls;

    this.getID = function () {
        return this.id;
    };

    this.setID = function (id) {
        this.id = id;
        this.myMC = id;
    };

    this.init = function(){
        try {
            Fxt.create(this.myComp, {
                id : this.myMC,
                tooltip : this.myTooltip,
                handler : this.myHandler,
                renderTo : this.myHolder,
                class : this.cls,
                style : 'display: flex !important;flex-direction: row !important; align-content: center !important;align-items: center !important;justify-content: center;flex-wrap: wrap;',
                afterrender: function () {
                    if ( Fxt.getCmp(me.myMC) ) {
                        Fxt.setCmp(me.myMC).style.cssText += 'width:'+me.myW+'; height:'+me.myH+'; cursor:pointer;border:solid 1px #CCCCCC; border-radius:4px; color:#FFFFFF;';
                        if ( isiOs === true ) {
                            Fxt.setCmp(me.myMC).style.cssText += 'padding: 10px 8px 10px!important;';
                        }
                    }
                    Fxt.setCmp(me.myMC).onmouseover = function() {
                        //this.style.cssText += 'background: linear-gradient(to bottom, #CCCCCC 0%, #f1f1f1 50%, #f1f1f1 51%, #CCCCCC 100%) !important;';
                        showCompToolTip( "" + Fxt.setCmp(this.id).getAttribute('tooltip') , this.id );
                    };

                    Fxt.setCmp(me.myMC).onmouseout = function() {
                        //this.style.cssText += 'background: linear-gradient(to bottom, #f1f1f1 0%, #CCCCCC 50%, #CCCCCC 51%, #f1f1f1 100%) !important;';
                        hideCompToolTip();
                    };

                    if ( me.myStyle != null ) {
                        Fxt.setCmp(me.myMC).style.cssText += me.myStyle;
                    }

                    if ( me.myComp === 'button' ) {
                        if ( me.myTxt != null && me.myIco != null ) {
                            Fxt.setCmp(me.myMC).style.cssText += 'font-size:22px;font-family: "FontAwesome" !important;';
                            Fxt.setCmp(me.myMC).innerHTML = me.myTxt + '&nbsp;<i style=' + me.myIcoStyle + '" class="' + me.myIco +'"></i>';
                        }
                        else {
                            if ( me.myTxt != null ) {
                                Fxt.setCmp(me.myMC).innerHTML = me.myTxt;
                            }
                            if ( me.myIco != null ) {
                                Fxt.setCmp(me.myMC).style.cssText += 'font-size:22px;font-family: "FontAwesome" !important;';
                                Fxt.setCmp(me.myMC).innerHTML = '<i style=' + me.myIcoStyle + '" class="' + me.myIco +'"></i>';
                            }
                        }
                    }

                    else if ( me.myComp === 'input' ) {
                        Fxt.setCmp(me.myMC).type = "button";
                        if ( me.myTxt != null && me.myIco != null ) {
                            Fxt.setCmp(me.myMC).style.cssText += 'font-size:22px;font-family: "FontAwesome" !important;';
                            Fxt.setCmp(me.myMC).value = me.myTxt + '&nbsp;' + String.fromCharCode( me.myIco ) + '';
                        }
                        else {
                            if ( me.myTxt != null ) {
                                Fxt.setCmp(me.myMC).value = me.myTxt;
                            }
                            if ( me.myIco != null ) {
                                Fxt.setCmp(me.myMC).style.cssText += 'font-size:22px;font-family: "FontAwesome" !important;';
                                Fxt.setCmp(me.myMC).value = String.fromCharCode(me.myIco) + "" ;
                            }
                        }
                    }

                    Fxt.setCmp(me.myMC).onclick = function(e) {
                        this.handler = eval( Fxt.setCmp(this.id).getAttribute('handler') );
                        setTimeout( this.handler, 100);
                    };
                },
            });
        }
        catch ( e ) {
            Fxt.logger("fxtButton init catch e = " + e );
        }
    }
}