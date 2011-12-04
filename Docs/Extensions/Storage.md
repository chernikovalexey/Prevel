#Prevel Storage Extension

This will be only useful if you use __[Prevel Storage Extension](https://github.com/chernikovalexey/Prevel/blob/master/Extensions/Storage.js)__
which is available as an addition to Prevel.

__Example of attaching:__

```html
<script type="text/javascript" src="path/to/your/js/prevel-min.js"></script>
<script type="text/javascript" src="path/to/your/js/prevel-ext-storage.js"></script>

<!-- Your scripts attached here... -->
```

Where __prevel-ext-storage.js__ is file contains [this code](https://github.com/chernikovalexey/Prevel/blob/master/Extensions/Storage.js).

###pl.storage.cookie.set(name, val, options)

Sets a value equals to `val` of cookie `name`. Returns a link to `pl.storage.cookie`.

Options (`options`):
* expires - (number or date) when cookie will be expired
* path - (string) cookie path
* domain - (string) domain on which cookie will be available
* secure - (boolean) secure connection or not

__Example:__

```javascript
pl.storage.cookie
  .set('test1', 'some val', {expires: 86400})
  .set('test2', 'some val2', {expires: 86400, path: '/', domain: 'localhost', secure: false})
  .set('test3', 'some val3', {expires: 600});
```

---

###pl.storage.cookie(name)

Returns a value of `name`.

__Example:__

```javascript
pl.storage.cookie.set('test', 'some val', {expires: 86400}); // At first, set

alert(pl.storage.cookie('test')); // => some val
```

---

###pl.storage.ls.set(name, val)

Sets a value equals to `val` of Local Storage `name`. If Local Storage is still unavailable, it will
create a long-term cookie with the following name: `'ls_' + name`, and value equals to `val`. Returns a link
to `pl.storage.ls`.

__Example:__

```javascript
pl.storage.ls
  .set('test4', 'some val4')
  .set('test5', 'some val5')
  .set('test6', 'some val6');
```

---

###pl.storage.ls(name)

Returns a value of Local Storage `name`. If Local Storage is still unavailable will return
a value of cookie `'ls_' + name` created if you used `pl.storage.ls.set` previously.

__Example:__

```javascript
pl.storage.ls.set('test', 'some val');

alert(pl.storage.ls('test')); // => some val4
```

---

###pl.storage.session.set(name, val)

Sets a value equals to `val` of Session Storage `name`. If Session Storage is still 
unavailable, it creates a short-term (for one day) cookie with the following name:
`'ss_' + name`, and value equals to `val`. Returns a link to `pl.storage.session`.

__Example:__

```javascript
pl.storage.session
  .set('test7, 'some val7')
  .set('test8', 'some val8')
  .set('test9', 'some val9');
```

---

###pl.storage.session(name)

Returns a value of Session Storage `name`. If Session Storage is still unavailable, it will return
a value of cookie `'ss_' + name` created if you used `pl.storage.session.set` previously.

__Example:__

```javascript
pl.storage.session.set('test, 'some val');

alert(pl.storage.session('test')); // => some val
```