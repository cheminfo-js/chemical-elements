'use strict';

const Papa = require('papaparse');
const fs = require('fs');

var names = Papa.parse(fs.readFileSync(__dirname + '/names.tsv') + '', {header: true}).data;

var elements = JSON.parse(fs.readFileSync(__dirname + '/isotopes.json'));


for (var i = 0; i < elements.length; i++) {
    let element = elements[i];
    let name = names[i];
    if (element.symbol !== name.symbol) {
        console.log('Symbol inconsistency:', i + 1, element.symbol, name.symbol);
        element.symbol = name.symbol;
    }
    element.name = name.name;

    let massFromIsotopes = getMass(element);
    // need to decide which element mass to give, we calculate it ourself
    element.mass = (massFromIsotopes) ? massFromIsotopes : null;
}

fs.writeFileSync(__dirname + '/../fullElements.js', 'module.exports=' + JSON.stringify(elements));

// we remove all the unstable isotopes
elements.forEach((e) => {
    e.isotopes = e.isotopes.filter((i) => i.abundance > 0);
});
fs.writeFileSync(__dirname + '/../elements.js', 'module.exports=' + JSON.stringify(elements));


var groups = Papa.parse(fs.readFileSync(__dirname + '/groups.tsv') + '', {header: true}).data;
// we will create an object for the elements
for (let group of groups) {
    let mf = group.mf;
    let parts = mf.split(/(?=[A-Z+-])/);
    group.elements = parts.map(part => ({
        symbol: part.replace(/[0-9]+/, ''),
        number: Number(part.replace(/[^0-9]/g, '') || 1)
    }));
}

fs.writeFileSync(__dirname + '/../groups.js', 'module.exports=' + JSON.stringify(groups));


function getMass(element) {
    var stable = element.isotopes.filter((a) => a.abundance > 0);
    var mass = 0;
    stable.forEach(a => mass += a.abundance * a.mass);
    return mass;
}
