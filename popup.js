document.addEventListener('DOMContentLoaded', function () {
  var input = document.getElementById('filter-words');
  //reinstate saved words
  input.value = window.localStorage['filterWords'];
  
  document.getElementById('filter-words')
    .addEventListener('keyup', function(e){
      window.localStorage['filterWords'] = input.value;
      //send keys to main.js, maybe should send to contentScript?
      chrome.runtime.sendMessage({down: true});
    });
});

