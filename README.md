# chrome-extension-hn-filter

[Get it from Chrome Webstore](https://chrome.google.com/webstore/detail/hn-keyword-filter/ooablmjjcdbdjhhjkaffpbjnanonjgnm?hl=en-US&gl=US)
[HN Discussion](https://news.ycombinator.com/item?id=13467611)

HN's gotten markedly more political in recent months. 
There are plenty of places to finger-argue on the net, 
so I made this extension that allows you to create a list of keywords.
Links with those keywords in the title are removed before you see them.
You can also use this to filter out stories about a language you aren't interested in like "C++",
 for example.

Instructions:

1. When you're on HN, you'll see the little YCombinator logo enable. 
2. Click it and type create a comma-separated list of words into the textarea. 

You keywords are persisted across popup opens and browser sessions via localStorage.

Those words are used to filter out unwanted stories. The filtration happens on page load and when the list is changed.
The removed stories are printed to the console.

This is 2 hours worth of work, so it's not exactly a masterpiece. Feel free to fork or contribute. 
