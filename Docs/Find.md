#Prevel Framework Find

---

###pl.find(selector, root)

Prevel uses YASS v0.3.9 as CSS query selector because of it's lightweight and speed.

__Supported queries:__

* class selectors (e.g., `.example`).

* node type selectors like `span` or `div`

* descendant selectors (i.e. `div p a`)

* `>` child element selectors

* `~`, the immediately preceeded-by sibling selector

* `+`, the preceeded-by sibling selector

* `#id` style ID selectors

* `*` universal selector

* attribute queries:
  * `[type=checkbox]` attribute value exact match
  * `[title]` attribute presence selector
  * `[rel~=nofollow` attribute value list item match
  * `[class^=block]` attribute start match
  * `[class$=hidden]` attribute end match
  * `[alt*=image]` attribute substring match
  * `[alt!=image]` attribute value list item negative match

* `:first-child`, `:last-child` positional selectors

* `:empty` content empty selector

* `:root` selector for HTML element

* `:checked` pseudo selector for checked checkboxes or radio buttons

* `:nth-child(3)` style positional calculations

* `:nth-child(even)`, `:nth-child(odd)`, `:nth-child(2n+1)` positional selectors

__Examples:__

  ```javascript
  pl.find('a.link');
  pl.find('.link span');
  pl.find('.sp sp');
  pl.find('p');
  pl.find('#p');
  pl.find('#p .link');
  pl.find('#p #sp1');
  pl.find('p#p');
  pl.find('p a');
  pl.find('.link');
  pl.find('input[type=checkbox]');
  pl.find('input[type!=radio]');
  pl.find('input[type^=check]');
    pl.find('input[type$=box]');
    pl.find('input[type*=ck]');
    pl.find('h1:first-child');
    pl.find('p:nth-child(2n+1)');
  pl.find('body>div');
  pl.find('h1+p');
  pl.find('ul~ol');
  ```