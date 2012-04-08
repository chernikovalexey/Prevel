#Prevel Observer Extension

This documentation will be only useful if you used __[Prevel Observer Extension](https://github.com/chernikovalexey/Prevel/blob/master/Extensions/Observer.js)__
which is available as an addition to Prevel.

To use it, you can simply attach it as the additional script to to your page or re-build Prevel locally on your computer.

__Example of attaching:__

```html
<script type="text/javascript" src="path/to/your/js/prevel-min.js"></script>
<script type="text/javascript" src="path/to/your/js/prevel-ext-observer.js"></script>

<!-- Your scripts attached here... -->
```

Where __prevel-ext-dom.js__ is the file contains [this code](https://github.com/chernikovalexey/Prevel/blob/master/Extensions/Observer.js).

__How to re-build Prevel:__

Firstable, you need Node.js. Just follow the [Builder Readme](https://github.com/chernikovalexey/Prevel/blob/master/Builder/README.md).

So:

```
node Build.js 1.2.9 * observer
```

Will contain all [Source files](https://github.com/chernikovalexey/Prevel/blob/master/Sources) and [Extensions/Observer.js](https://github.com/chernikovalexey/Prevel/blob/master/Extensions/Observer.js).

---

Generally, it is the well-known implementation of observer pattern.

---

###pl.Observer(fns)

Constructor. Use `new` to declate it. `fns` is the function, which is going to be fired later. Also `fns` can be an array of such functions.

```javascript
var someHandler = function() {
  console.log(arguments);
};

var obs = new pl.Observer(someHandler);
```

---

###pl.Observer().subscribe(fn)

Adds `fn` to the to-fire list.

---

###pl.Observer().unsubscribe(fn)

Removes `fn` from the to-fire list.

---

###pl.Observer().publish(context, args)

Fires all functions, which in the current to-fire list.

`context` is the object, which will be passed as `this` to each function.
`args` is the array of arguments, which will be passed to each function.

---

###pl.Observer().has(fn)

Checks whether there is `fn` in the current to-fire list.

---

###pl.Observer().clean()

Removes all functions from the to-fire list. Thereby, on the next publish nothing will happen (if you haven't published something).

```javascript
var someHandler = function() {
  console.log(arguments);
};

var obs = new pl.Observer(someHandler);
obs.clean();
```