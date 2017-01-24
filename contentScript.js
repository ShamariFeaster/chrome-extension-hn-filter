//has access to HN DOM
//does the dirty work of finding/deleting links

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {

    if(request.parse ){
      
      var wordlist = request.wordlist;
      var entries =  document.querySelectorAll("[class^='athing']");

      var entryParent = null;

      for(let i = 0; i < entries.length; i++){
        entryParent = entries[i].parentNode;
        
        //I'd love to see this replaced by regex, volunteers anyone?
        for(let n = 0; n < wordlist.length; n++){
          let thisWord = wordlist[n].toLowerCase();
          let thisText = entries[i].textContent.toLowerCase();
          
          if(thisText.indexOf(thisWord) > -1 && thisWord.length > 1){
            console.log('removing ' + thisText + ' keyword:' + thisWord);
            entryParent.removeChild(entries[i].nextSibling); //remove metadata link (karma, author, etc)
            entryParent.removeChild(entries[i]);            //remove actual link
            break;
          }
        }
        
      }
    }
      
  });