//has access to HN DOM
//does the dirty work of finding/deleting links

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {

    if(request.parse ){

      var wordlist = request.wordlist;
      var entries =  document.querySelectorAll("[class^='athing']");

      var entryParent = null;

      var re = new RegExp('(' + wordlist.join('|') + ')', 'gi');

      for(let i = 0; i < entries.length; i++){
        //was accidentally deleting comments too. could be a feature though, right?
        //unintended consequence and/or serendipity?
        if(entries[i].getAttribute('class').indexOf('comtr') > -1) continue;

        entryParent = entries[i].parentNode;
        var thisText = entries[i].textContent;

        if(thisText.match(re)) {
          console.log('removing ' + thisText );
          entryParent.removeChild(entries[i].nextSibling); //remove metadata link (karma, author, etc)
          entryParent.removeChild(entries[i]);            //remove actual link
        }
      }
    }
  });
