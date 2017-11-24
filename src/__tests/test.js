'use strict';

var data = require('..');

test('data size', () => {
    expect(data.elements.length).toBe(118);
    expect(data.groups.length).toBeGreaterThan(50);
});


test('getElementsObject', () => {
    var elementsObject = data.getElementsObject();
    expect(Object.keys(elementsObject).length).toBe(118);
});
