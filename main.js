//start: 1:52PM 1/23
//done:  6:31PM 1/23

var csReq = new chrome.declarativeContent.RequestContentScript();
csReq.js = ['contentScript.js'];

var rule1 = {
conditions: [
  new chrome.declarativeContent.PageStateMatcher({
    pageUrl: { hostEquals: 'news.ycombinator.com', schemes: ['https'] }
  })
],
actions: [ new chrome.declarativeContent.ShowPageAction(),
          csReq]
};

chrome.runtime.onInstalled.addListener(function(details) {
  console.log('installed');
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([rule1]);
  });
});
  
  
chrome.webNavigation.onDOMContentLoaded.addListener(function(){

  var words = window.localStorage['filterWords'];
  var words = words.split(',');
  //delay b/c race conditions with contentScript listener binding
  setTimeout(function(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      console.log(tabs);
      chrome.tabs.sendMessage(tabs[0].id, {"parse" : true, "words" : words});
    });
  },500);
  
  
  
},{url: [{hostSuffix: 'news.ycombinator.com'}]});
var lastPress = null;

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    
    
    if(request.down){
      lastPress = new Date().getTime();
      
      setTimeout(function(){
        //debounce input from popup
        if(lastPress - this.frozenLp == 0){
          var words = window.localStorage['filterWords'];
          var words = words.split(',');
          chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            
            chrome.tabs.sendMessage(tabs[0].id, {"parse" : true, "words" : words});
          });
        }
      }.bind({frozenLp : lastPress}),500);
    }
      
  });