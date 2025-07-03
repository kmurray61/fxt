/*
 * Supports FxtAlert and other Components Positioning and Sizing
 * @author Ken Murray
 * @email fb3@virtualjam.net
 * @site https://virtualjam.net
 * @createdate 2/15/19
 * @updatedate 7/2/25
 * @version 3.2.02
 */
var _root = _root || {};
var ua = navigator.userAgent.toLowerCase(),
    isAndroid = /android/.test(ua),
    isiOs = /(iphone|ipod|ipad)/.test(ua),
    isChrome = navigator.userAgent.toLowerCase().indexOf("chrome") !== -1;

var Utils = {
    popupMove: function (e) {
        try {
            if (_root.curDragObj != null) {
                _root.top = e.clientY || e.targetTouches[0].pageY;
                _root.left = e.clientX - parseFloat(Fxt.setCmp(_root.curDragObj).offsetWidth / 2) || e.targetTouches[0].pageX - parseFloat(Fxt.setCmp(_root.curDragObj).offsetWidth / 2);
                if (Fxt.setCmp(_root.curDragObj) != null) {
                    Fxt.setCmp(_root.curDragObj).style.cssText += 'position:absolute; top:' + _root.top + 'px!important; left:' + _root.left + 'px!important;';
                }
            }
        }
        catch (e) {
            _root.curDragObj = null;
        }
    },
    setZ : function (comp) {
        try {
            _root.curZindex = Utils.highZ("", "Infinity");
            _root.curZindex = ( parseFloat( _root.curZindex ) + 10000 );

            if ( Fxt.getCmp(comp) ) {
                Fxt.setCmp(comp).style.cssText += 'z-index:'+_root.curZindex+'!important;';
            }
        }
        catch(e) {
            Fxt.logger("Utils setZ catch error = " + e.toString() );
        }
    },
    /* finds the highest z-index (zIndex) on the page */
    highZ : function (parent, limit) {
        try {
            limit = limit || Infinity;
            parent = parent || document.body;
            let who, temp, max = 1, A = [], i = 0;
            let children = parent.childNodes, length = children.length;

            while ( i < length ) {
                who = children[i++];
                if ( who.nodeType !== 1 )
                    continue;

                if ( Utils.deepCss( who, "position" ) !== "static" ) {
                    temp = Utils.deepCss(who,"z-index");
                    if ( temp.toString() === "auto" ) {
                        temp = Utils.highZ(who);
                    }
                    else {
                        temp = parseInt(temp, 10) || 0;
                    }
                }
                else {
                    temp = Utils.highZ(who);
                }
                if ( temp > max && temp <= limit ) {
                    max = temp;
                }
            }
            return max;
        }
        catch(e) {
            Fxt.logger("Utils highZ catch error = " + e.toString() );
        }
    },
    deepCss : function (who, css) {
        try {
            let sty, val, dv = document.defaultView || window;
            if ( who.nodeType === 1 ) {
                sty = css.replace(/\-([a-z])/g, function(a, b) {
                    return b.toUpperCase();
                });
                val = who.style[sty];
                if ( !val ) {
                    if( who.currentStyle ) {
                        val = who.currentStyle[sty];
                    }
                    else if ( dv.getComputedStyle ) {
                        val = dv.getComputedStyle( who, "" ).getPropertyValue(css);
                    }
                }
            }
            return val || "";
        }
        catch(e) {
            Fxt.logger("Utils deepCss catch error = " + e.toString() );
        }
    },
}
showCompToolTip = ( curHoverMsg, curHoverComp )=> {
    try {
        if ( !_root.mobileBrowser ) {
            _root.sysToolTip = Fxt.setCmp('sysToolTip');
            _root.sysToolTip_label = Fxt.setCmp('sysToolTip_label');
            _root.sysToolTip_label.innerHTML = curHoverMsg;

            _root.sysToolTip.style.cssText += 'display:block;';

            let toolTip = _root.sysToolTip.getBoundingClientRect();
            let rect = Fxt.setCmp(curHoverComp).getBoundingClientRect();

            if ( rect.left <= 23) {
                rect.left = 23;
            }
            if ( rect.left >= parseFloat( _root.myWidth ) - 23) {
                rect.left = parseFloat( _root.myWidth ) - 23;
            }
            let myLeft = rect.left + parseFloat( rect.width / 2 ) - parseFloat( toolTip.width / 2 )
            let myTop = parseFloat(rect.top - parseFloat(toolTip.height + 5 ));
            _root.sysToolTip.style.cssText += "left:" + myLeft + "px; top:" + myTop + "px;";
            Utils.setZ('sysToolTip');

            Fxt.tween(_root.sysToolTip,
                0,    1,
                0,0,
                0,0,
                100,
                'ease-in',
                1 );
        }
    }
    catch ( e ) {
        Fxt.logger( "showCompToolTip catch e = " + e.toString() );
    }
}
hideCompToolTip = ()=> {
    try {
        _root.sysToolTip = Fxt.setCmp('sysToolTip');
        _root.sysToolTip.style.cssText += 'display:none;';
        _root.sysToolTip_label = Fxt.setCmp('sysToolTip_label');
        _root.sysToolTip_label.innerHTML = '';
    }
    catch(e) {
        Fxt.logger("hideCompToolTip catch error = " + e.toString() );
    }
}
