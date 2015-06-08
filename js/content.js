
var _nb = {}
_nb.isEmptyObject = function(obj) {
    for(var prop in obj){
        return false;
    }
    return true;
}
var __init = function () {
    chrome.storage.onChanged.addListener(function(changes, areaName) {
       
        if(changes.toLogin || changes.time){
            //增加用户引起的
             chrome.storage.local.get('toLogin', function(items) {
                if(!_nb.isEmptyObject(items) && !_nb.isEmptyObject(items['toLogin'])){
                    if(!_nb.isEmptyObject(items['toLogin']) && items['toLogin']['name']){
                        localStorage.setItem('_knight_user',items['toLogin']['name']);
                        localStorage.setItem('_knight_user_pwd',items['toLogin']['pwd']);
                        extensionInsertInto();
                    }
                }
            });
            return;
        }
       
    });
};
__init();
// Initialization of the popup (print initial information?)
// chrome.storage.local.get({keyName: 'defaultValue'}, function(items) {
//     // Do something with items.keyName
// });

function extensionInsertInto () {
	var  e = document.createElement("script");
    e.type = "text/javascript";
    //e.charset = 'GBK';
    e.src = chrome.extension.getURL('/js/'+'extensionInsertInto.js');
    document.head.appendChild(e);
}


