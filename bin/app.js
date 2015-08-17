#!/usr/bin/env node

var program = require('commander'),
    inquirer = require("inquirer"),
    GeoJSON = require('geojson'),
    figlet = require('figlet'),
    art = require('ascii-art'),
    fs = require('fs');


/*==========  Module Core  ==========*/

/* Questions Array*/
var questions = [{
    name: 'jsonPath',
    message: 'Gimmie the soon-to-be-converted JSON path (I like explicit paths better)',

}, {
    name: 'gejsonPath',
    message: 'Tell me where you want me to save your GeoJSON (again, go for the explicit)',

}];

art.Figlet.fontPath = './node_modules/figlet/fonts/';

/* Logo */
art.font('POINTLESS', 'Isometric3', 'red', function(rendered) {
    console.log(' * ---------------------------------------------------------------------------------------------------------------- * ');
    console.log(rendered);
});
art.font('A silly conversion tool', 'Doom', 'cyan', function(rendered) {
    console.log(rendered);
    console.log(' * ---------------------------------------------------------------------------------------------------------------- * ');

    /* Questions Prompt */
    // inquirer has to stay within font callback or the title will be displayed before the questions
    inquirer.prompt(questions, function(answers) {

        try {
            var data = require(answers.jsonPath);

            var parsed = GeoJSON.parse(data.elements, {
                Point: ['lat', 'lng']
            });

            fs.writeFile(answers.gejsonPath, JSON.stringify(parsed), function(err) {
                if (err) return console.log(err);
                console.log('***************CONVERSION DONE!*******************');
            });
        } catch (e) {
            console.log("TRY THE EXPLICIT PATH, i.e.: /Volumes/hardDisk/Users/JohnDoe/data/test_data.json");
            console.log(e);

        }


    });

});




/*==========  Module Info  ==========*/
program
    .version('0.0.1')
    .description('initialize project configuration');

program.on('--help', function() {
    console.log('  Examples:');
    console.log('');
    console.log('    $ json2geojson <path-to-json> <path-to-geojson>');
    console.log('');
});



program.parse(process.argv);