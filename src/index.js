'use strict';

var Wikidata=require('wikidata-sdk');
var request = require('superagent');

function compileIsotopes() {

    var CRLF='\r\n';
    var url=Wikidata.sparqlQuery(
        'PREFIX wd: <http://www.wikidata.org/entity/>'+CRLF+
        'PREFIX wdt: <http://www.wikidata.org/prop/direct/>'+CRLF+
        'SELECT ?isotope ?isotopeLabel ?atomicNumber ?halfLife ?halfLife_unitLabel ?decaysToLabel ?decaysModeLabel ?decaysProportion WHERE {'+CRLF+
        'FILTER(?atomicNumber = 17) .'+CRLF+
        '?isotopeOfElement wdt:P279 wd:Q25276 .'+CRLF+
        '?isotopeK wdt:P279  ?isotopeOfElement .'+CRLF+
        '?isotope wdt:P1086 ?atomicNumber .'+CRLF+

        '?isotope p:P2114 ?halfLife_statement .'+CRLF+
        '?halfLife_statement ps:P2114 ?halfLife .'+CRLF+
        '?halfLife_statement psv:P2114/wikibase:quantityUnit ?halfLife_unit .'+CRLF+
        'OPTIONAL { ?halfLife_statement pq:P817 ?halfLife_unit .}'+CRLF+

        '?isotope p:P816 ?decaysTo_statement .'+CRLF+
        '?decaysTo_statement ps:P816 ?decaysTo .'+CRLF+
        'OPTIONAL { ?decaysTo_statement pq:P817 ?decaysMode .}'+CRLF+
        'OPTIONAL { ?decaysTo_statement pq:P1107 ?decaysProportion .}'+CRLF+

        'SERVICE wikibase:label {'+CRLF+
        'bd:serviceParam wikibase:language "en" .'+CRLF+
        '}'+CRLF+
        '}'+CRLF+
        'ORDER BY ASC(?atomicNumber)'+CRLF+
        'LIMIT 10'+CRLF
    );

    request.get(url).then(
        function(result) {
            var data=JSON.parse(result.text).results.bindings;
            
            console.log(data);
        }
    ).catch(function(error) {
        console.log(error);
    })





//http://physics.nist.gov/cgi-bin/Compositions/stand_alone.pl?ele=&ascii=ascii2&isotype=all

    return true;
};

compileIsotopes();