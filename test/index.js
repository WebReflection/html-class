//remove:
var htmlClass = require('../index.js');
var info = require('../info.json');
//:remove

wru.test([
  {
    name: 'base',
    test: function () {
      wru.assert(typeof htmlClass.get === 'function');
      wru.assert(typeof htmlClass.set === 'function'); 
    }
  }, {
    name: 'elements',
    test: function () {
      for (var Class, i = 0; i < info.elements.length; i++) {
        Class = 'HTML' + info.elements[i] + 'Element';
        wru.assert(
          Class,
          (
            htmlClass.get(Class) === info.elements[i].toLowerCase() ||
            htmlClass.get(Class) === info.specials[info.elements[i]][0] ||
            Class === 'HTMLElement'
          ) && (
            htmlClass.get(info.elements[i].toLowerCase()) === Class ||
            htmlClass.get(info.specials[info.elements[i]][0]) === Class ||
            Class === 'HTMLElement'
          )
        );
      }
    }
  }, {
    name: 'set custom element',
    test: function () {
      htmlClass.set('my-el', 'MyElement');
      wru.assert(
        'tag, Class',
        htmlClass.get('my-el') === 'MyElement' &&
        htmlClass.get('MyElement')[0] === 'my-el'
      );
      htmlClass.set('MyOther', 'my-other');
      wru.assert(
        'Class, tag',
        htmlClass.get('my-other') === 'MyOther' &&
        htmlClass.get('MyOther')[0] === 'my-other'
      );
    }
  }, {
    name: 'unknown',
    test: function () {
      wru.assert(htmlClass.get('Shenanigans')[0] === undefined);
      wru.assert(htmlClass.get('shena-nigans') === '');
    }
  }, {
    name: 'defaults',
    test: function () {
      wru.assert(htmlClass.get('i') === 'HTMLElement');
      wru.assert(htmlClass.get('ruby') === 'HTMLElement');
      wru.assert(htmlClass.get('em') === 'HTMLElement');
      wru.assert(htmlClass.get('HTMLElement')[0] === 'element');
      wru.assert(htmlClass.get('element') === 'HTMLElement');
    }
  }, {
    name: 'no overwrite',
    test: function () {
      htmlClass.set('a', 'WhatEver');
      wru.assert(
        'tag, Class',
        htmlClass.get('a') === 'HTMLAnchorElement' &&
        htmlClass.get('WhatEver')[0] === undefined &&
        htmlClass.get('HTMLAnchorElement')[0] === 'a'
      );
      htmlClass.set('WhatEverElse', 'a');
      wru.assert(
        'tag, Class',
        htmlClass.get('a') === 'HTMLAnchorElement' &&
        htmlClass.get('WhatEverElse')[0] === undefined &&
        htmlClass.get('HTMLAnchorElement')[0] === 'a'
      );
    }
  }, {
    name: 'no custom overwrite',
    test: function () {
      htmlClass.set('my-el', 'WhatEver');
      wru.assert(
        'tag, Class',
        htmlClass.get('my-el') === 'MyElement' &&
        htmlClass.get('MyElement')[0] === 'my-el'
      );
    }
  }, {
    name: 'filter',
    test: function () {
      wru.assert(
        htmlClass.get(/^HTMLButton/).length === 1 &&
        htmlClass.get(/^HTMLButton/)[0] === 'HTMLButtonElement'
      );
    }
  }
]);