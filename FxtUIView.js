/**
 * Supports Supports FxtAlert and other Components Positioning and Sizing
 * @author Ken Murray
 * @email fb3@virtualjam.net
 * @site https://virtualjam.net
 * @createdate 2/15/19
 * @updatedate 7/3/25
 * @version 3.2.02
 */

var _root = _root || {};
var UIView = {
    checkSizes: function(caller) {
        _root.myWidth = UIView.getWidth();
        _root.myHeight = UIView.getHeight();

        //Fxt.logger( "checkSizes _root.myWidth = " + _root.myWidth );
        //Fxt.logger( "checkSizes _root.myHeight = " + _root.myHeight );

        _root.mobileBrowser = !!(_root.myWidth < 800 && _root.myHeight > 300
            || _root.myHeight < 500 && _root.myWidth > 300);

        _root.isLandscape = !(_root.myWidth < 500 && _root.myHeight > 300);

        if (_root.mobileBrowser && _root.isLandscape ) {
            _root.myHeight = _root.myWidth - 150;
        }
        let alertPrompt = Fxt.setCmp('alertWin_mcHolder');
        if ( alertPrompt ) {
            _root.compWidth = alertPrompt.style.width.replace("px", "");
            _root.compHeight = alertPrompt.style.height.replace("px", "");
            alertPrompt.style.cssText += 'left:'+ ( parseFloat( _root.myWidth ) / 2 - ( parseFloat( _root.compWidth ) / 2 ) - 5 )  +'px!important; top:'+ ( parseFloat( _root.myHeight ) / 2 - ( parseFloat( _root.compHeight ) / 2 ) ) +'px!important;';
        }
    },
    getWidth : function () {
        let doc = document;
        let w = window;
        let docEl = (doc.compatMode && doc.compatMode === 'CSS1Compat')? doc.documentElement: doc.body;
        let width = docEl.clientWidth;

        if ( w.innerWidth && width > w.innerWidth ) {
            width = w.innerWidth;
        }
        return width;
    },

    getHeight : function () {
        let doc = document;
        let w = window;
        let docEl = (doc.compatMode && doc.compatMode === 'CSS1Compat')? doc.documentElement: doc.body;
        let height = docEl.clientHeight;

        if ( w.innerHeight && height > w.innerHeight ) {
            height = w.innerHeight;
        }
        return height;
    },
}

window.onresize = UIView.checkSizes;