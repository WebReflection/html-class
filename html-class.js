var htmlClass = (function (info) {'use strict';
  // (C) Andrea Giammarchi - @WebReflection - MIT Style
  var
    catchClass = /^[A-Z]+[a-z]/,
    filterBy = function (re) {
      var arr = [], tag;
      for (tag in register) {
        if (re.test(tag)) arr.push(tag);
      }
      return arr;
    },
    add = function (Class, tag) {
      tag = tag.toLowerCase();
      if (!(tag in register)) {
        register[Class] = (register[Class] || []).concat(tag);
        register[tag] = (register[tag.toUpperCase()] = Class);
      }
    },
    register = (Object.create || Object)(null),
    htmlClass = {},
    i, section, tags, Class
  ;
  for (section in info) {
    for (Class in info[section]) {
      tags = info[section][Class];
      register[Class] = tags;
      for (i = 0; i < tags.length; i++) {
        register[tags[i].toLowerCase()] =
        register[tags[i].toUpperCase()] = Class;
      }
    }
  }
  htmlClass.get = function get(tagOrClass) {
    return typeof tagOrClass === 'string' ?
      (register[tagOrClass] || (catchClass.test(tagOrClass) ? 'unknown' : 'HTMLUnknownElement')) :
      filterBy(tagOrClass);
  };
  htmlClass.set = function set(tag, Class) {
    return (catchClass.test(tag) ?
      add(tag, Class) :
      add(Class, tag)
    ), htmlClass;
  };
  return htmlClass;
}(/* require:info.json */));

try { module.exports = htmlClass; } catch(meh) {}
