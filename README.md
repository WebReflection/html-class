# html-class [![build status](https://secure.travis-ci.org/WebReflection/html-class.svg)](http://travis-ci.org/WebReflection/html-class)
A basic utility to retrieve DOM nodes names from their constructors and vice-versa.


## API
Right now this module has two methods: `htmlClass.get(...)` and `htmlClass.set(...)`.

The purpose of this API is to maintain in a single module all relations between HTML constructors and relative nodes.
This module is **environment agnostic** and it does not require any DOM understand from the engine.


### htmlClass.get(...)
The `.get(...)` method has 3 overloads. Following their description.


#### htmlClass.get(nodeName:string):string
Given a generic DOM node name, it returns its constructor name.
```js
const htmlClass = require('html-class');

// for known elements
// logs: 'HTMLAnchorElement'
htmlClass.get('a');

// unknown elements, empty string
// logs: ''
htmlClass.get('not-registered');
```


#### htmlClass.get(Class:string):Array
Given a generic DOM Class name, it returns a collection of elements that inherits form that prototype.
```js
const htmlClass = require('html-class');

// for known constructors
// logs: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']
htmlClass.get('HTMLHeadingElement');

// logs: ['button']
htmlClass.get('HTMLButtonElement');


// unknown constructors, empty Array
// logs: []
htmlClass.get('NotRegistered');
```

#### htmlClass.get(re:RegExp):Array
Given a generic regular expression, it returns a collection of elements or constructors that matched such test.
```js
// returns ['HTMLButtonElement']
htmlClass.get(/^HTMLButton/);

// returns all known/registered custom elements
// ['my-el', 'x-form', 'some-data']
htmlClass.get(/^[a-z]+-/);
```


### htmlClass.set(...)
The `.set(...)` method has 2 overloads. Following their description.


#### htmlClass.set(nodeName:string, Class:string):htmlClass
If not previously registered, adds `nodeName` to the list and associate it with the `Class`.
```js
// register a generic custom element
htmlClass.set('my-custom-element', 'MyCustomElement');

// logs: 'MyCustomElement'
htmlClass.get('my-custom-element');
// logs: ['my-custom-element']
htmlClass.get('MyCustomElement');

// if repeated, nothing happens
htmlClass.set('my-custom-element', 'MyOtherElement');

// if another component wasn't registered though
// it will be added to the generic constructor list
htmlClass.set('my-other-element', 'MyCustomElement');

// logs: ['my-custom-element', 'my-other-element']
htmlClass.get('MyCustomElement');

```


#### htmlClass.set(Class:string, nodeName:string):htmlClass
Does exactly the same thing `htmlClass.set(nodeName, Class)` does, assuming by specs constructors are [PascalCase](https://en.wikipedia.org/wiki/PascalCase) and node names are either fully lower or upper case.



## Compatibility
The code is compatible with every JavaScript engine, old or new, either via browser or server.
