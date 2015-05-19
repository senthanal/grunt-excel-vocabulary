'use strict';

var path = require('path');
var pathResolve = require('path').resolve;
var currentDir = pathResolve(__dirname, '../');
var parse = require('./../lib/parse');

module.exports = function (grunt) {
	grunt.registerMultiTask('excel_vocabulary', function () {
		var options = this.options({
            root: currentDir,
            beautify: true,
			keepEveryRowInFile: false
		});
		this.files.forEach(function (f) {
			f.src.filter(function (filepath) {
				if (!grunt.file.exists(filepath)) {
					grunt.log.warn('Source file "' + filepath + '" not found.');
					return false;
				}

                return true;
			}).forEach(function (srcFilePath) {
				var resultJson = parse(path.resolve(options.root, srcFilePath), options);
				var resultJsonString;

				if(options.keepEveryRowInFile){
					for(var i in resultJson){
						var pathArr = f.dest.split("/");
						pathArr.pop();
						resultJsonString = JSON.stringify(resultJson[i], null, options.beautify ? 4 : null);
						grunt.file.write(pathArr.join("/") + "/" + i.toLowerCase() + ( f.ext || ".json"), resultJsonString);
						grunt.log.writeln('File "' + (pathArr.join("/") + "/" + i.toLowerCase() ) + '" created.');
					}
				}
				else{
					resultJsonString = JSON.stringify(resultJson, null, options.beautify ? 4 : null);
					grunt.file.write(f.dest, resultJsonString);
					grunt.log.writeln('File "' + f.dest + '" created.');
				}
			});
		});
	});
};
