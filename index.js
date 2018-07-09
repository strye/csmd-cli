#!/usr/bin/env node
var program = require('commander');
var chalk = require('chalk');
var csmdConv = require("csmd-converter")

var parseVars = {
	commentOn: false,
	dialogOn: false,
	pageNum: 0,
	panelNum: 0,
	dialogNum: 0
}
var outputStream;
var previousLine = "";

var jsonRep = {
	metaData: {},
	pages: [],
	characters: [],
	text: []
};


// csmd script.md -t docx -o issue1.docx
// csmd Issue1.md -t docx -o Issue1.docx -c 'Will Strye' -m s
// csmd script.md -t docxt -o issue1.docx

// csmd <file> -t pdf -o issue1.pdf
// csmd script.md -t pdf -o issue1.pdf
// csmd paper.md -t pdf -o paper.pdf -c 'Will Strye' -m s

program
	.arguments('<file>')
	.option('-t, --convertiontype <convertiontype>', 'The format to convert to', 'pdf')
	.option('-o, --outputpath <outputpath>', 'The file name and path to output to', './script.pdf')
	.option('-m, --mode <mode>', 'The special purpose of the file. f=full a=artist l=letterer s=script', 's')
	.option('-c, --creator <creator>', 'The file creator. Name used for file metadata.', 'Anonymous')
	.action(function(file) {
		//console.log('convertion type: %s output path: %s file: %s', program.convertiontype, program.outputpath, file);
		var options = {
			type: program.convertiontype, 
			outputFile: program.outputpath,
			mode: program.mode, 
			creator: program.creator
		}
		
		//console.log(options)
		csmdConv.Processor(file, options)
		
	})
	.parse(process.argv);

