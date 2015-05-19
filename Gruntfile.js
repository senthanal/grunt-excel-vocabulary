'use strict';

module.exports = function (grunt) {
	grunt.initConfig({
		jshint: {
			all: [
				'Gruntfile.js',
				'tasks/*.js',
				'lib/*.js',
				'<%= nodeunit.tests %>'
			],
			options: {
				jshintrc: '.jshintrc'
			}
		},

		clean: [
			'.tmp'
		],

		excel_vocabulary: {
			convert: {
				expand: true,
				cwd: 'examples',
				dest: '.tmp',
				ext: '.json',
				src: [
					'**/*.xlsx'
				]
			},
			wgw:{
				options:{
					beautify : true,
					keepEveryRowInFile : true
				},
				files: [{
					expand: true,
					cwd: './examples',
					dest: './examples/locale',
					src: [
						'wgw_mobile_localizations.xlsx'
					],
					ext: '.json',
					extDot: 'last'
				}]
			}
		},

		nodeunit: {
			tests: [ 'tests/*.js' ]
		},

		watch: {
			files: [
				'lib/**/*',
				'tests/**/*',
				'tasks/**/*',
				'examples/**/*'
			],
			tasks: [
				'test'
			]
		}
	});

	grunt.registerTask('default', [
		'test',
		'watch'
	]);

	grunt.registerTask('test', [
		'jshint',
		'clean',
		'excel_vocabulary',
		'nodeunit'
	]);	
	
	grunt.registerTask('test_wgw', [
		'jshint',
		'clean',
		'excel_vocabulary:wgw',
		'nodeunit'
	]);

	grunt.loadTasks('tasks');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-nodeunit');
	grunt.loadNpmTasks('grunt-contrib-watch');
};
