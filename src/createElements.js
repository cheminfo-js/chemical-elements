const fetch = require('node-fetch');
const fs = require('fs');

 async function retrieve() {
    /*
    var response = await fetch('http://physics.nist.gov/cgi-bin/Compositions/stand_alone.pl?ele=&ascii=ascii2&isotype=all');
    var text = await response.text();
    fs.writeFileSync('./data.txt', text);
    */
    var text = String(fs.readFileSync('./data.txt'));

    var lines = text.split(/[\r\n]+/).filter( (a) => a.match(/^[a-zA-Z ]+= /));

    var elements=[];
    var element={};
    var fields={};
    var isotope;
    var number;
    for (var line of lines) {
        var label=line.replace(/ =.*/,'');
        var value=line.replace(/.*?= /,'').replace('&nbsp;','');
        switch(label) {
            case 'Atomic Number':
                number = Number(value);
                if (element.atomNumber !== number) {
                    element = {
                        atomNumber:number,
                        isotopes: []
                    };
                    elements.push(element);
                }
                isotope = {};
                element.isotopes.push(isotope);
            break;
            case 'Atomic Symbol':
                element.symbol=value.trim(" ");
            break;
            case 'Mass Number': 
                isotope.nominalMass=Number(value);
            break;
            case 'Relative Atomic Mass': 
                element.relativeMass=Number(value.replace(/\(.*/,''));
            break;
            case 'Isotopic Composition': 
                isotope.quantity=Number(value.replace(/\(.*/,''));
            break;
            case 'Standard Atomic Weight':
                if (value.match(/^[0-9]+/)) {
                    isotope.mass=Number(value.replace(/\(.*/,''));
                } else if (value.match(/^\[[0-9]+\]$/)) {
                    isotope.mass=Number(value.substring(1,value.length-2));
                } else if (value.startsWith("[")) {
                    let number1=Number(value.replace(/\[(.*),(.*)\]/,'$1'));
                    let number2=Number(value.replace(/\[(.*),(.*)\]/,'$2'));
                    let middle = (number1 + number2) / 2;
                    let length=(value.length-3)/2-1;
                    isotope.mass= Number(String(middle).substring(0,length));
                }
             
            break;
            case 'Notes':

            break; 
            
        }
        fields[label]=true;
    }

    elements.length
    elements.forEach( (a) => console.log(a.elements);)

    console.log(elements);
}

retrieve();