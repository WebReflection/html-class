var htmlClass = (function (info) {'use strict';
  // (C) Andrea Giammarchi - @WebReflection - MIT Style
  var
    catchClass = /^[A-Z]+[a-z]/,
    catchCamel = /([a-z])([A-Z])/g,
    specials = info.specials,
    register = (Object.create || Object)(null),
    i, klass, length, list, tag
  ;
  for (list = info.containers, i = 0, length = list.length; i < length; i++) {
    tag = list[i];
    klass = 'HTML' + tag;
    tag = specials.hasOwnProperty(tag) ?
      specials[tag] : tag.toLowerCase();
    register[klass] = tag;
    register[tag] = register[tag.toUpperCase()] = klass;
  }
  for (list = info.defaults, i = 0, length = list.length; i < length; i++) {
    tag = list[i];
    register[tag] = register[tag.toUpperCase()] = 'HTMLElement';
  }
  for (list = info.elements, i = 0, length = list.length; i < length; i++) {
    tag = list[i];
    klass = 'HTML' + tag + 'Element';
    tag = specials.hasOwnProperty(tag) ?
      specials[tag] : tag.toLowerCase();
    register[klass] = tag;
    register[tag] = register[tag.toUpperCase()] = klass;
  }
  for (list = info.extras, i = 0, length = list.length; i < length; i++) {
    klass = list[i];
    tag = specials.hasOwnProperty(tag) ?
      specials[tag] :
      ('#' + klass.replace(catchCamel, toHyphenCase).toLowerCase());
    register[klass] = tag;
    register[tag] = register[tag.toUpperCase()] = klass;
  }
  function toHyphenCase($0, $1, $2) {
    return $1 + '-' + $2;
  }
  function htmlClass(tagOrClass) {
    return register[tagOrClass] ||
          (catchClass.test(tagOrClass) ? 'unknown' : 'Unknown');
  }
  htmlClass.get = htmlClass;
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
    'em',
    'i',
    'ruby',
    'strong'
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

try { module.exports = {get: htmlClass.get, set: htmlClass.set}; } catch(meh) {}
