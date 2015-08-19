#!/usr/bin/env node

var program = require('commander'),
    path = require('path'),
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

var dir = __dirname
var oneLvlUpDir = dir.replace('/bin', '')
art.Figlet.fontPath = oneLvlUpDir + "/node_modules/figlet/fonts/";

/* Logo */
art.font('JSONtoGEOJSON', 'Isometric3', 'red', function(rendered) {
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
            console.log("TRY THE EXPLICIT PATH, i.e.: /Volumes/hardDisk / Users / JohnDoe / data / test_data.json ");
            console.log(e);

        }


    });

});




/*==========  Module Info  ==========*/
program
    .version('1.1.0')
    .description('initialize project configuration');

program.on('--help', function() {
    console.log('  This is a pointless converter, just provide, when asked, the explicit paths to the files to convert:');
    console.log('');
    console.log('$ Q: Which is the file to convert? A:  <path-to-json>');
    console.log('$ Q: Where should the geojson be saved? A: <path-to-geojson> ');
    console.log('');
});



program.parse(process.argv);