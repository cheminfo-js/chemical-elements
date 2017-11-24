'use strict';

var data = require('..');

test('data size', () => {
    expect(data.elements.length).toBe(118);
    expect(data.groups.length).toBeGreaterThan(50);
});

