var htmlClass = (function (info) {'use strict';
  // (C) Andrea Giammarchi - @WebReflection - MIT Style
  var
    catchClass = /^[A-Z]+[a-z]/,
    catchCamel = /([a-z])([A-Z])/g,
    toHyphenCase = function ($0, $1, $2) {
      return $1 + '-' + $2;
    },
    assignTag = function (Class, tag) {
      arr = [].concat(tag);
      while (arr.length) {
        tag = arr.pop();
        register[Class] = tag;
        register[tag] = register[tag.toUpperCase()] = Class;
      }
    },
    filterBy = function (re) {
      arr = [];
      for (tag in register) {
        if (re.test(tag)) arr.push(tag);
      }
      return arr.splice(0, arr.length);
    },
    specials = info.specials,
    register = (Object.create || Object)(null),
    htmlClass = {},
    arr, i, length, list, tag
  ;
  for (list = info.containers, i = 0, length = list.length; i < length; i++) {
    tag = list[i];
    assignTag(
      'HTML' + tag,
      specials.hasOwnProperty(tag) ?
        specials[tag] : tag.toLowerCase()
    );
  }
  for (list = info.defaults, i = 0, length = list.length; i < length; i++) {
    tag = list[i];
    register[tag] = register[tag.toUpperCase()] = 'HTMLElement';
  }
  for (list = info.elements, i = 0, length = list.length; i < length; i++) {
    tag = list[i];
    assignTag(
      'HTML' + tag + 'Element',
      specials.hasOwnProperty(tag) ?
        specials[tag] : tag.toLowerCase()
    );
  }
  for (list = info.extras, i = 0, length = list.length; i < length; i++) {
    tag = list[i];
    assignTag(
      tag,
      specials.hasOwnProperty(tag) ?
        specials[tag] :
        ('#' + tag.replace(catchCamel, toHyphenCase).toLowerCase())
    );
  }
  htmlClass.get = function (tagOrClass) {
    return typeof tagOrClass === 'string' ?
      (register[tagOrClass] || (catchClass.test(tagOrClass) ? 'unknown' : 'HTMLUnknownElement')) :
      filterBy(tagOrClass);
  };
  htmlClass.set = function (tag, Class) {
    if (!(tag in register || Class in register)) {
      if (catchClass.test(tag)) {
        register[tag] = Class;
        register[Class] = (register[Class.toLowerCase()] = tag);
      } else {
        register[Class] = tag;
        register[tag] = (register[tag.toLowerCase()] = Class);
      }
      register[tag] = Class;
      register[Class] = tag;
    }
    return htmlClass;
  };
  return htmlClass;
}({
  containers: [
    'AllCollection',
    'Collection',
    'Document',
    'FormControlsCollection',
    'OptionsCollection'
  ],
  defaults: [
    'abbr',
    'address',
    'article',
    'aside',
    'b',
    'bdi',
    'bdo',
    'cite',
    'code',
    'dd',
    'dfn',
    'dt',
    'em',
    'figcaption',
    'figure',
    'footer',
    'header',
    'hgroup',
    'i',
    'kbd',
    'main',
    'mark',
    'nav',
    'rp',
    'rt',
    'rtc',
    'ruby',
    's',
    'samp',
    'small',
    'sub',
    'sup',
    'strong',
    'time',
    'u',
    'var',
    'wbr'
  ],
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
  extras: [
    'DocumentFragment'
  ],
  specials: {
    '': 'element',
    'Anchor': 'a',
    'DList': 'dl',
    'Heading': [
      'h1',
      'h2',
      'h3',
      'h4',
      'h5',
      'h6'
    ],
    'Mod': [
      'del',
      'ins'
    ],
    'OList': 'ol',
    'Paragraph': 'p',
    'TableCaption': 'caption',
    'TableCell': 'td',
    'TableCol': 'colgroup',
    'TableRow': 'tr',
    'TableSection': 'tbody',
    'UList': 'ul'
  }
}));

try { module.exports = htmlClass; } catch(meh) {}
