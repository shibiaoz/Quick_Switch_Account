// first method to judge is to show or to hide 
// remember to set permisissons declarativeContent
// chrome.runtime.onInstalled.addListener(function() {
// 	  // Replace all rules ...
//   chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
//     // With a new rule ...
//     chrome.declarativeContent.onPageChanged.addRules([
//       {
//         // That fires when a page's URL contains a 'g' ...
//         conditions: [
//           new chrome.declarativeContent.PageStateMatcher({
//             pageUrl: { urlContains: 'baidu' },
//           })
//         ],
//         // And shows the extension's page action.
//         actions: [ new chrome.declarativeContent.ShowPageAction() ]
//       }
//     ]);
//   });
// });

// second method 
// to set permisissons tabs
function checkForValidUrl( tabId,  changeInfo,  tab) {
    tab.url.indexOf("baidu.com") > -1 && chrome.pageAction.show(tabId);
}
chrome.tabs.onUpdated.addListener(checkForValidUrl);

//var tabsArr = [];
//var id = '';
// chrome.runtime.onMessage.addListener(function(request, sender, sendRequest){
// 	console.log('================后台接受消息 =============');
// 	console.dir(request.error);
// 	console.log(sender);
// 	id = sender && sender.id;
// 	chrome.runtime.sendMessage({cmd:'mycmd'});
// 	// if(tabsArr.indexOf(id) >-1 ){
// 	// 	return;
// 	// }
// 	// sender && sender['id'] && tabsArr.push(sender['id']);
// 	// console.log(tabsArr,'id数组');
// 	// if(tabsArr.length >1 ){
// 	// 	sendToContent(tabsArr[0]);
// 	// }
// });

// send message from background to content script
//chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {  chrome.tabs.sendMessage(tabs[0].id, {cmd: "mycmd"}, function(response) {    console.log(response);  }); });
//console.log(tabsArr,"==array==");
// chrome.tabs.sendMessage(tabsArr[0].id,{cmd:'mycmd'},function  (response) {
// 		console.log(response);
// });
// chrome.tabs.query({
// 	active: true,
// 	currentWindow: true
// },function  (tabs) {
// 	chrome.tabs.sendMessage(tabsArr[0].id,{cmd:'mycmd'},function  (response) {
// 		console.log(response);
// 	});
// })

//chrome.runtime.sendMessage({error:"我要发给content script 的js获取文章信息失败."});

// chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {        
//     if (tab.url.indexOf("baidu") > -1) {             
//         chrome.pageAction.show(tabId);  
//     }  
// });  
function  sendToContent (id) {
	chrome.tabs.sendMessage(tabsArr[0],{cmd:'mycmd'},function  (response) {
		console.log(response);
	});
}


