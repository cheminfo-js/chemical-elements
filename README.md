# chemical-elements

  [![NPM version][npm-image]][npm-url]
  [![build status][travis-image]][travis-url]
  [![David deps][david-image]][david-url]
  [![npm download][download-image]][download-url]

JSON containing information about chemical element, isotopes and groups.

## Installation

```
$ npm install chemical-elements
```

```
var {elements, groups} = require('chemical-elements');
```

You may also retrieve the elements as an object that allows a faster lookup
```
var elements = require('chemical-elements').getElementsObject();
```

## License

  [MIT](./LICENSE)

[npm-image]: https://img.shields.io/npm/v/cheminfo-isotope-data.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/cheminfo-isotope-data
[travis-image]: https://img.shields.io/travis/cheminfo-js/isotope-data/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/cheminfo-js/isotope-data
[david-image]: https://img.shields.io/david/cheminfo-js/isotope-data.svg?style=flat-square
[david-url]: https://david-dm.org/cheminfo-js/isotope-data
[download-image]: https://img.shields.io/npm/dm/cheminfo-isotope-data.svg?style=flat-square
[download-url]: https://www.npmjs.com/package/cheminfo-isotope-data
