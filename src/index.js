'use strict';

const elements = require('./elements.js');
const groups = require('./groups.js');

function getElementsObject() {
    var object = {};
    elements.forEach((e) => {
        object[e.symbol] = e;
    });
    return object;
}

function getGroupsObject() {
    var object = {};
    groups.forEach((e) => {
        object[e.symbol] = e;
    });
    return object;
}

module.exports = {
    elements,
    groups,
    getElementsObject,
    getGroupsObject
};
