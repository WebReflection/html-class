//remove:
var htmlClass = require('../index.js');
//:remove

var info = {
  specials: {
    'Anchor': 'a',
    'DList': 'dl',
    'OList': 'ol',
    'Paragraph': 'p',
    'TableCaption': 'caption',
    'TableCell': 'td',
    'TableCol': 'colgroup',
    'TableRow': 'tr',
    'TableSection': 'tbody',
    'UList': 'ul'
  },
  elements: [
    '',
    'Anchor',
    'Area',
    'Audio',
    'BR',
    'Base',
    'Body',
    'Button',
    'Canvas',
    'Content',
    'DList',
    'DataList',
    'Details',
    'Dialog',
    'Directory',
    'Div',
    'Embed',
    'FieldSet',
    'Font',
    'Form',
    'Frame',
    'FrameSet',
    'HR',
    'Head',
    'Heading',
    'Html',
    'IFrame',
    'Image',
    'Input',
    'Keygen',
    'LI',
    'Label',
    'Legend',
    'Link',
    'Map',
    'Marquee',
    'Media',
    'Menu',
    'Meta',
    'Meter',
    'Mod',
    'OList',
    'Object',
    'OptGroup',
    'Option',
    'Output',
    'Paragraph',
    'Param',
    'Picture',
    'Pre',
    'Progress',
    'Quote',
    'Script',
    'Select',
    'Shadow',
    'Source',
    'Span',
    'Style',
    'TableCaption',
    'TableCell',
    'TableCol',
    'Table',
    'TableRow',
    'TableSection',
    'Template',
    'TextArea',
    'Title',
    'Track',
    'UList',
    'Unknown',
    'Video'
  ],
  containers: [
    'AllCollection',
    'Collection',
    'Document',
    'FormControlsCollection',
    'OptionsCollection'
  ],
  extras: [
    'DocumentFragment'
  ]
};

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
            htmlClass.get(Class) === info.specials[info.elements[i]] ||
            Class === 'HTMLElement'
          ) && (
            htmlClass.get(info.elements[i].toLowerCase()) === Class ||
            htmlClass.get(info.specials[info.elements[i]]) === Class ||
            Class === 'HTMLElement'
          )
        );
      }
    }
  }, {
    name: 'containers',
    test: function () {
      for (var Class, i = 0; i < info.containers.length; i++) {
        Class = 'HTML' + info.containers[i];
        wru.assert(
          Class,
          (
            htmlClass.get(Class) === info.containers[i].toLowerCase() ||
            htmlClass.get(Class) === info.specials[info.containers[i]]
          ) && (
            htmlClass.get(info.containers[i].toLowerCase()) === Class ||
            htmlClass.get(info.specials[info.containers[i]]) === Class
          )
        );
      }
    }
  }, {
    name: 'extras',
    test: function () {
      function toExtra(name) {
        return '#' + name.replace(/([a-z])([A-Z])/g, function ($0, $1, $2) {
          return $1 + '-' + $2;
        }).toLowerCase();
      }
      for (var Class, i = 0; i < info.extras.length; i++) {
        Class = info.extras[i];
        wru.assert(
          Class,
          (
            htmlClass.get(Class) === toExtra(info.extras[i]) ||
            htmlClass.get(Class) === info.specials[info.extras[i]]
          ) && (
            htmlClass.get(toExtra(info.extras[i])) === Class ||
            htmlClass.get(info.specials[info.extras[i]]) === Class
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
        htmlClass.get('MyElement') === 'my-el'
      );
      htmlClass.set('MyOther', 'my-other');
      wru.assert(
        'Class, tag',
        htmlClass.get('my-other') === 'MyOther' &&
        htmlClass.get('MyOther') === 'my-other'
      );
    }
  }, {
    name: 'unknown',
    test: function () {
      wru.assert(htmlClass.get('Shenanigans') === 'unknown');
      wru.assert(htmlClass.get('shena-nigans') === 'Unknown');
    }
  }, {
    name: 'defaults',
    test: function () {
      wru.assert(htmlClass.get('i') === 'HTMLElement');
      wru.assert(htmlClass.get('ruby') === 'HTMLElement');
      wru.assert(htmlClass.get('em') === 'HTMLElement');
      wru.assert(htmlClass.get('HTMLElement') === 'element');
      wru.assert(htmlClass.get('element') === 'HTMLElement');
    }
  }, {
    name: 'no overwrite',
    test: function () {
      htmlClass.set('a', 'WhatEver');
      wru.assert(
        'tag, Class',
        htmlClass.get('a') === 'HTMLAnchorElement' &&
        htmlClass.get('MyElement') === 'my-el' &&
        htmlClass.get('HTMLAnchorElement') === 'a'
      );
      htmlClass.set('WhatEverElse', 'div');
      wru.assert(
        'tag, Class',
        htmlClass.get('div') === 'HTMLDivElement' &&
        htmlClass.get('WhatEverElse') === 'unknown' &&
        htmlClass.get('HTMLDivElement') === 'div'
      );
    }
  }, {
    name: 'no custom overwrite',
    test: function () {
      htmlClass.set('my-el', 'WhatEver');
      wru.assert(
        'tag, Class',
        htmlClass.get('my-el') === 'MyElement' &&
        htmlClass.get('MyElement') === 'my-el'
      );
    }
  }
]);