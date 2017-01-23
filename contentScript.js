chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(request.words);
    if(request.parse ){
      var words = request.words;
      //grab all stories
      var entries =  document.querySelectorAll("[class^='athing']");

      var entryParent = null;

      for(let i = 0; i < entries.length; i++){
        entryParent = entries[i].parentNode;
        
        for(let n = 0; n < words.length; n++){
          let thisWord = words[n].toLowerCase();
          let thisText = entries[i].textContent.toLowerCase();
          if(thisText.indexOf(thisWord) > -1 && thisWord.length > 1){
            //removing story and metadata row below it
            entryParent.removeChild(entries[i].nextSibling);
            entryParent.removeChild(entries[i]);
            break;
          }
        }
        
      }
    }
      
  });