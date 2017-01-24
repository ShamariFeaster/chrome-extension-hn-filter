chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if(request.parse ){
      var words = request.words;
      var entries =  document.querySelectorAll("[class^='athing']");

      var entryParent = null;

      for(let i = 0; i < entries.length; i++){
        entryParent = entries[i].parentNode;
        
        for(let n = 0; n < words.length; n++){
          let thisWord = words[n].toLowerCase();
          let thisText = entries[i].textContent.toLowerCase();
          if(thisText.indexOf(thisWord) > -1 && thisWord.length > 1){
            console.log('removing ' + thisText + ' keyword:' + thisWord);
            entryParent.removeChild(entries[i].nextSibling);
            entryParent.removeChild(entries[i]);
            break;
          }
        }
        
      }
    }
      
  });