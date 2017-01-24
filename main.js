const DEBOUNCE_MS = 1000;

var rule1 = {
  conditions: [
    new chrome.declarativeContent.PageStateMatcher({
      pageUrl: { hostEquals: 'news.ycombinator.com', schemes: ['https'] }
    })
  ],
  actions: [ new chrome.declarativeContent.ShowPageAction()]
};

chrome.runtime.onInstalled.addListener(function(details) {
  console.log('installed');
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([rule1]);
  });
});

chrome.webNavigation.onDOMContentLoaded.addListener(function(){

  var words = window.localStorage['filterWords'];
  var words = words.split(', ');
  //delay b/c race conditions with contentScript listener binding
  setTimeout(function(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      console.log(tabs);
      chrome.tabs.sendMessage(tabs[0].id, {"parse" : true, "wordlist" : words});
    });
  }, DEBOUNCE_MS);

},{url: [{hostSuffix: 'news.ycombinator.com'}]});

//yeah it's a global, don't judge me
var lastPress = null;

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {

    if(request.keyup){
      lastPress = new Date().getTime();

      setTimeout(function(){

        //debounce input from popup
        //xor instead of subtraction
        if( !(lastPress ^ this.frozenLp) ){
          var words = window.localStorage['filterWords'];
          var words = words.split(', ');
          //sendMessage to contentScript.js
          chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {"parse" : true, "wordlist" : words});
          });

        }

      }.bind({frozenLp : lastPress}), DEBOUNCE_MS);
    }

  });
