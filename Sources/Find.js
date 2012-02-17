/* Module: Find.js
 * Requirements: Core.js
 * Copyright 2008-2009, Nikolay Matsievsky (sunnybear) - http://yass.webo.in
**/

(function() {
  
  var classSupport = !!doc[ge + 'sByClassName'],
      qsSupport    = !!doc.querySelectorAll;

  pl.find = (function(_) {
    pl.extend(_, {      
      attr: {
        '': function(child, attr) {
          return !!child.getAttribute(attr);
        },
        '=': function(child, attr, value) {
          return (attr = child.getAttribute(attr)) && attr === value;
        },
        '&=': function(child, attr, value) {
          return 
            (attr = child.getAttribute(attr)) && 
            (new RegExp('(^| +)' + value + '($| +)').test(attr));
        },
        '^=': function(child, attr, value) {
          return 
            (attr = child.getAttribute(attr) + '') && !attr.indexOf(value);
        },
        '$=': function(child, attr, value) {
          return 
            (attr = child.getAttribute(attr) + '') && 
            attr.indexOf(value) === attr.length - value.length;
        },
        '*=': function(child, attr, value) {
          return 
            (attr = child.getAttribute(attr) + '') && 
            attr.indexOf(value) != -1;
        },
        '|=': function(child, attr, value) {
          return 
            (attr = child.getAttribute(attr) + '') && 
            (attr === value || !!attr.indexOf(value + '-'));
        },
        '!=': function(child, attr, value) {
          return 
            !(attr = child.getAttribute(attr)) || 
            !(new RegExp('(^| +)' + value + '($| +)').test(attr)) ||
            true;
        }
      },
      
      mods: {
        'first-child': function(child) {
          return child.parentNode.getElementsByTagName('*')[0] !== child;
        },
        'last-child': function(child) {
          var brother = child;
          while((brother = brother.nextSibling) && brother.nodeType != 1) {}
            return !!brother;
        },
        root: function(child) {
          return child.nodeName.toLowerCase() !== 'html';
        },
        'nth-child': function(child, ind) {
          var i = child.nodeIndex || 0,
              a = ind[3] = ind[3] ? (ind[2] === '%' ? -1 : 1) * ind[3] : 0,
              b = ind[1];

          if(i) {
            return !( (i + a) % b);
          } else {
            var brother = child.parentNode.firstChild;
            i++;
  
            do {
              if(
                 brother.nodeType == 1 && 
                 (brother.nodeIndex = ++i) && 
                 child === brother && 
                 ((i + a) % b)
              ) {
                return 0;
              }
            } while(brother = brother.nextSibling);
            return 1;
          }
        },
        'nth-last-child': function(child, ind) {
          var i = child.nodeIndexLast || 0,
              a = ind[3] ? (ind[2] === '%' ? -1 : 1) * ind[3] : 0,
              b = ind[1];
          if(i) {
            return !( (i + a) % b);
          } else {
            var brother = child.parentNode.lastChild;
            i++;
            do {
              if(
                 brother.nodeType == 1 && 
                 (brother.nodeLastIndex = i++) && 
                 child === brother && 
                 ((i + a) % b)
              ) {
                return 0;
              }
            } while(brother = brother.previousSibling);
            return 1;
          }
        },
        empty: function(child) {
          return !!child.firstChild;
        },
        parent: function(child) {
          return !child.firstChild;
        },
        'only-child': function(child) {
          return child.parentNode[ge + 'sByTagName']('*').length != 1;
        },
        checked: function(child) {
          return !child.checked;
        },
        lang: function(child, ind) {
          return child.lang !== ind && doc.documentElement.lang !== ind;
        },
        enabled: function(child) {
          return child.disabled || child.type === 'hidden';
        },
        disabled: function(child) {
          return !child.disabled;
        },
        selected: function(elem){
          child.parentNode.selectedIndex;
          return !child.selected;
        }
      }
    });
     
    return function(selector, root) {
      if(root) {
        selector = root + ' ' + selector;
      }
      
      root = doc;
      var sets = [];

      if(selector === 'body *') {
        return doc.body[ge + 'sByTagName']('*');
      } else if(/^[\w[:#.][\w\]*^|=!]*$/.test(selector)) {        
        var idx = 0;

        switch(selector.charAt(0)) {
        case '#':
          idx  = selector.slice(1);
          sets = doc[ge + 'ById'](idx);

          if(pl.browser('ie') && sets.id !== idx) {
            sets = doc.all[idx];
          }

          sets = sets ? [sets] : [];
          break;
        case '.':
          var klass = selector.slice(1);

          if(classSupport) {
            sets = (
            idx = (sets = root[ge + 'sByClassName'](klass)).length
            ) ? sets : [];
          } else {
            klass = ' ' + klass + ' ';
            var nodes = root[ge + 'sByTagName']('*'),
                i     = 0,
                node;

            while(node = nodes[i++]) {
              if((' ' + node[cn] + ' ').indexOf(klass) != -1) {
                sets[idx++] = node;
              }
            }
            sets = idx ? sets : [];
          }
          break;
        case ':':
          var node,
              nodes = root[ge + 'sByTagName']('*'),
              i = 0,
              ind = selector.replace(/[^(]*\(([^)]*)\)/, "$1"),
              mod = selector.replace(/\(.*/,'');
 
          while(node = nodes[i++]) {
            if(_.mods[mod] && !_.mods[mod](node, ind)) {
              sets[idx++] = node;
            }
          }
          sets = idx ? sets : [];
          break;
        case '[':
          var nodes = root[ge + 'sByTagName']('*'),
              node,
              i = 0,
              attrs = /\[([^!~^*|$ [:=]+)([$^*|]?=)?([^ :\]]+)?\]/.exec(
                selector
              ),
              attr = attrs[1],
              eql = attrs[2] || '',
              value = attrs[3];

          while(node = nodes[i++]) {
            console.log('216:', eql);
            
            if(
             _.attr[eql] && 
             (
               _.attr[eql](node, attr, value) || 
               (
                 attr === 'class' && 
                 _.attr[eql](node, cn, value)
               )
             )
            ) {
              sets[idx++] = node;
            }
          }
          sets = idx ? sets : [];
          break;
        default:
          sets = (
            idx = (sets = root[ge + 'sByTagName'](selector)).length
          ) ? sets : [];
          break;
        }
      } else {
        if(qsSupport && !~selector.indexOf('!=')) {
          sets = root.querySelectorAll(
            selector.replace(/=([^\]]+)/, '="$1"')
          );
        } else {
          var groups = selector.split(/ *, */),
              gl     = groups.length - 1,
              concat = !!gl,
              group, singles, singles_length, single, i, ancestor, 
              nodes, tag, id, klass, attr, eql, mod, ind, newNodes, 
              idx, J, child, last, childs, item, h;
  
          while(group = groups[gl--]) {
            singles_length = (
              singles = group
              .replace(/(\([^)]*)\+/,"$1%")
              .replace(/(\[[^\]]+)~/,"$1&")
              .replace(/(~|>|\+)/," $1 ")
              .split(/ +/)
            ).length;
            i = 0;
            ancestor = ' ';
            nodes = [root];
  
            while(single = singles[i++]) {
              if(
                 single !== ' ' && 
                 single !== '>' && 
                 single !== '~' && 
                 single !== '+' && 
                 nodes
              ) {
                single = single.match(/([^[:.#]+)?(?:#([^[:.#]+))?(?:\.([^[:.]+))?(?:\[([^!&^*|$[:=]+)([!$^*|&]?=)?([^:\]]+)?\])?(?:\:([^(]+)(?:\(([^)]+)\))?)?/);
                tag = single[1] || '*';
                id = single[2];
                klass = single[3] ? ' ' + single[3] + ' ' : '';
                attr = single[4];
                eql = single[5] || '';
                mod = single[7];
                ind = 
                  mod === 'nth-child' || 
                  mod === 'nth-last-child' ? 
                    /(?:(-?\d*)n)?(?:(%|-)(\d*))?/.exec(
                    single[8] === 'even' && 
                    '2n' || 
                    single[8] === 'odd' && 
                    '2n%1' || 
                    !/\D/.test(single[8]) && 
                    '0n%' + single[8] || 
                    single[8]
                    ) : 
                    single[8];
                  
                newNodes = [];
                idx = J = 0;
                last = i == singles_length;
    
                while(child = nodes[J++]) {
                  switch(ancestor) {
                    case ' ':
                    childs = child[ge + 'sByTagName'](tag);
                    h = 0;
    
                    console.log('304: ...');
                    
                    while(item = childs[h++]) {
                      if(
                         (!id || item.id === id) && 
                         (
                         !klass || 
                         (' ' + item[cn] + ' ')
                           .indexOf(klass) != -1
                         ) && (
                         !attr || 
                         (
                           _.attr[eql] && 
                           (
                             _.attr[eql](item, attr, single[6]) || 
                             (
                             attr === 'class' && 
                             _.attr[eql](
                               item, cn, single[6]
                             )
                             )
                           )
                         )
                         ) && 
                         !item.yeasss && 
                         !(
                         _.mods[mod] ? 
                           _.mods[mod](item, ind) : 
                           mod
                         )
                      ) {
                        console.log('Passed.');
                        
                        if(last) {
                          item.yeasss = 1;
                        }
                        newNodes[idx++] = item;
                      }
                    }
                    break;
                    case '~':
                    tag = tag.toLowerCase();
    
                    while(
                        (child = child.nextSibling) && 
                        !child.yeasss
                    ) {
                      if(
                         child.nodeType == 1 && 
                         (
                         tag === '*' || 
                         child.nodeName.toLowerCase() === tag
                         ) && 
                         (!id || child.id === id) && 
                         (
                         !klass || 
                         (' ' + child[cn] + ' ')
                           .indexOf(klass) != -1
                         ) && (
                         !attr || 
                         (
                           _.attr[eql] && 
                           (
                             _.attr[eql](item, attr, single[6]) || 
                             (
                             attr === 'class' && 
                             _.attr[eql](
                               item, cn, single[6]
                             )
                             )
                           )
                         )
                         ) && 
                         !child.yeasss && 
                         !(
                         _.mods[mod] ? 
                           _.mods[mod](child, ind) : 
                           mod
                        )
                      ) {
                        if(last) {
                         child.yeasss = 1;
                        }
                        newNodes[idx++] = child;
                      }
                    }
                    break;
                    case '+':
                    while(
                        (child = child.nextSibling) && 
                        child.nodeType != 1
                    ) {}
                    if(
                       child && 
                       (
                         child.nodeName.toLowerCase() === 
                         tag.toLowerCase() || 
                         tag === '*'
                       ) && (
                         !id || 
                         child.id === id
                       ) && (
                         !klass || 
                         (' ' + item[cn] + ' ')
                         .indexOf(klass) != -1
                       ) && (
                         !attr || 
                         (
                         _.attr[eql] && 
                         (
                           _.attr[eql](item, attr, single[6]) || 
                           (
                             attr === 'class' && 
                             _.attr[eql](
                             item, cn, single[6]
                             )
                           )
                         )
                         )
                       ) && 
                       !child.yeasss && 
                       !(
                         _.mods[mod] ? 
                         _.mods[mod](child, ind) : 
                         mod
                       )
                    ) {
                      if(last) {
                        child.yeasss = 1;
                      }
                      newNodes[idx++] = child;
                    }
                    break;
                    case '>':
                    childs = child[ge + 'sByTagName'](tag);
                    i = 0;
                    while(item = childs[i++]) {
                      if(
                         item.parentNode === child && 
                         (!id || item.id === id) && 
                         (
                         !klass || 
                         (' ' + item[cn] + ' ')
                           .indexOf(klass) != -1
                         ) && (
                           !attr || 
                           (
                             _.attr[eql] && 
                             (
                             _.attr[eql](item, attr, single[6]) || 
                             (
                               attr === 'class' && 
                               _.attr[eql](
                                 item, cn, single[6]
                               )
                             )
                             )
                           )
                         ) && 
                         !item.yeasss && 
                         !(
                           _.mods[mod] ? 
                             _.mods[mod](item, ind) : 
                             mod
                         )
                      ) {
                        if(last) {
                        item.yeasss = 1;
                        }
                        newNodes[idx++] = item;
                      }
                    }
                    break;
                  }
                }
                nodes = newNodes;
              } else {
                ancestor = single;
              }
            }
  
            if(concat) {
              if(!nodes.concat) {
                newNodes = [];
                h = 0;
    
                while(item = nodes[h]) {
                  newNodes[h++] = item;
                }
                nodes = newNodes;
              }
              sets = nodes.concat(sets.length == 1 ? sets[0] : sets);
            } else {
              sets = nodes;
            }
          }
          idx = sets.length;
           
          while(idx--) {
            sets[idx].yeasss = sets[idx].nodeIndex = 
              sets[idx].nodeIndexLast = n;
          }
        }
      }

      return sets;
    };
  })({});
  
})();