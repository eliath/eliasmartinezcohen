module.exports = function(grunt) {
	
	// var SRC  = '~/Sites/eliasmartinezcohen/src',
	var DEST = '../www',
		BANNER = ['/*',
					'┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓',
					'┃										┃',
					'┃ Copyright 2015 Elías Martínez Cohen	┃',
					'┃										┃',
					'┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛',
					'*/',''].join('\n');
	
	require('load-grunt-tasks')(grunt);

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		clean: {
			//cleans all files in detination i.e. make clean
			build: {
				src: [DEST+'/font', DEST+'/js', DEST+'/css'],
				options: {force: true}
			},
			
			//deletes copied, uncompressed js
			scripts: {
				src: ['../www/js/*'],
				options: {force: true}
			}
		},


		copy: {
			main: {
				files: [{
					expand: true, 
					src: ['font','img'],
					dest: DEST
				}]
			},
			scripts: {
				expand: true,
				src: ['js/*'],
				dest: DEST
			}
		},
		
		uglify: {
			options: {
				banner: BANNER,
				mangle: false,
				preserveComments: false,
				compress: {
					drop_console: true
				}
			},
			all: {
				files: {
					'../www/js/_site.min.js': ['js/_site.js'],
					'../www/js/_desktop.min.js': ['js/_desktop.js'],
					'../www/js/_mobile.min.js': ['js/_mobile.js'],
				}
			}
		},

        jshint: {
            options: {
                jshintrc: true,
            },
            all: ['Gruntfile.js', 'js/*.js'],
            grunt: ['Gruntfile.js']
        },

        compass: {
            compile: {
                options: {
                    config: 'config.rb',
                }
            }
        },

        jade: {
            compile: {
                options: {
                    client: false,
                    pretty: true
                },
                files: [{
					expand: true,
					cwd: 'jade',
					ext: '.html',
					src: '*.jade',
					dest: '../www'
                }]
            }
        },

        watch: {
			jade: {
				files: ['jade/*.jade'],
				tasks: ['jade']
			},

            css: {
                files: ['scss/*.scss'],
                tasks: ['compass']
            },

            js: {
                files: ['js/*.js', '!js/*.min.js'],
                tasks: ['jshint:all', 'copy:scripts']
            }
        }


	});

	grunt.registerTask('default', ['jade', 'compass', 'jshint:all', 'copy:scripts']);
	
	
	grunt.registerTask(
		'build',
		'Compiles all files for deployment.',
		['clean:build', 'jade', 'compass', 'jshint:all', 'uglify']
	);
};