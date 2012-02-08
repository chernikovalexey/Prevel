###Prevel Library

It's a lightweight (approximately 5 Kb) JavaScript library with strong functionality. 
All the methods which can be useful in all kinds of development are attending in 
Prevel (such as interaction with DOM, Ajax, some common methods). 
If something is missed, you always can write your module using `pl.extend` method. 
Furthermore, it's completely cross-browser and oriented not only on modern browsers. 

Convenient builder allows you assembling final file with only necessary modules and extensions.
By default, any files from `./Extensions` aren't considered what reduces common Prevel size. 

You can include them as well while building:

`node Build.js 1.2 * *`

(It will assemble final file with all modules (`./Sources`) and extensions (`./Extensions`)).

---
__Supported browsers:__

* Internet Explorer 6+
* Opera 9.0+
* Mozilla Firefox 1.5+
* Google Chrome
* Safari 3.1+
* Opera Mini/Mobile
* Mobile Safari
* Firefox for Mobile
* Android Browser

---

__Documentation__: [Docs](/chernikovalexey/Prevel/tree/master/Docs)

__Full version__ for developers: [Prevel-full.js](/chernikovalexey/Prevel/blob/master/prevel-full.js)

__Minified version__ for production: [Prevel-min.js](/chernikovalexey/Prevel/blob/master/prevel-min.js)

__Extensions__ if the basic functionality seems meager to you: [Extensions](/chernikovalexey/Prevel/blob/master/Extensions)

---

Licensed under the __GNU LGPL__, __MIT License__.