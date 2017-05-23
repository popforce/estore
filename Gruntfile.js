/* jshint node:true */
module.exports = function( grunt ){
	'use strict';

	grunt.initConfig({

		// Setting folder templates.
		dirs: {
			js: 'js',
			css: 'sass'
		},

		// JavaScript linting with JSHint.
		jshint: {
			options: {
				jshintrc: '.jshintrc'
			},
			all: [
				'Gruntfile.js',
				'<%= dirs.js %>/*.js',
				'!<%= dirs.js %>/*.min.js',
				'!<%= dirs.js %>/html5shiv.js',
				'!<%= dirs.js %>/jquery.bxslider.js'
			]
		},

		// Minify all .js files.
		uglify: {
			options: {
				// Preserve comments that start with a bang.
				preserveComments: /^!/
			},
			dist: {
				files: [{
					expand: true,
					cwd: '<%= dirs.js %>/',
					src: [
						'*.js',
						'!*.min.js'
					],
					dest: '<%= dirs.js %>/',
					ext: '.min.js'
				}]
			}
		},

		// Compile all .scss files.
		sass: {
			options: {
				sourceMap: false,
				includePaths: require( 'node-bourbon' ).includePaths
			},
			compile: {
				files: [{
					expand: true,
					cwd: '<%= dirs.css %>/',
					src: ['*.scss'],
					dest: '',
					ext: '.css'
				}]
			}
		},

		// Watch changes for assets.
		watch: {
			css: {
				files: [
					'<%= dirs.css %>/*.scss',
					'<%= dirs.css %>/**/*.scss'
				],
				tasks: ['sass']
			},
			js: {
				files: [
					'<%= dirs.js %>/*.js',
					'!<%= dirs.js %>/*.min.js'
				],
				tasks: ['jshint', 'uglify']
			}
		},

		// Generate POT files.
		makepot: {
			dist: {
				options: {
					type: 'wp-theme',
					domainPath: 'languages',
					potFilename: 'estore.pot',
					potHeaders: {
						'report-msgid-bugs-to': 'themegrill@gmail.com',
						'language-team': 'ThemeGrill <themegrill@gmail.com>'
					}
				}
			}
		},

		// Check textdomain errors.
		checktextdomain: {
			options: {
				text_domain: 'estore',
				keywords: [
					'__:1,2d',
					'_e:1,2d',
					'_x:1,2c,3d',
					'esc_html__:1,2d',
					'esc_html_e:1,2d',
					'esc_html_x:1,2c,3d',
					'esc_attr__:1,2d',
					'esc_attr_e:1,2d',
					'esc_attr_x:1,2c,3d',
					'_ex:1,2c,3d',
					'_n:1,2,4d',
					'_nx:1,2,4c,5d',
					'_n_noop:1,2,3d',
					'_nx_noop:1,2,3c,4d'
				]
			},
			files: {
				src: [
					'**/*.php',
					'!node_modules/**'
				],
				expand: true
			}
		},

		// Compress files and folders.
		compress: {
			options: {
				archive: 'estore.zip'
			},
			files: {
				src: [
					'**',
					'!.*',
					'!*.md',
					'!*.zip',
					'!.*/**',
					'!Gruntfile.js',
					'!package.json',
					'!node_modules/**'
				],
				dest: 'estore',
				expand: true
			}
		},

		// Copy
		copy: {
			superfish: {
				files: [{
					cwd: 'bower_components/superfish/dist/js',  // set working folder / root to copy
					src: ['**/*.js', '!hoverIntent.js', '!jquery.js', '!supersubs.js'],           // copy all files and subfolders
					dest: 'js/',    // destination folder
					expand: true           // required when using cwd
				}]
			},
			bxsliderjs: {
				files: [{
					cwd: 'bower_components/bxslider-4/dist/',  // set working folder / root to copy
					src: ['**/*.js', '!vendor/*.js'],           // copy all files and subfolders
					dest: 'js/',    // destination folder
					expand: true           // required when using cwd
				}]
			},
			bxslidercss: {
				files: [{
					cwd: 'bower_components/bxslider-4/dist',  // set working folder / root to copy
					src: '**/*.css',           // copy all files and subfolders
					dest: 'js/',    // destination folder
					expand: true           // required when using cwd
				}]
			},
			facss: {
				files: [{
					cwd: 'bower_components/font-awesome/css',  // set working folder / root to copy
					src: '**/*.css',           // copy all files and subfolders
					dest: 'font-awesome/css/',    // destination folder
					expand: true           // required when using cwd
				}]
			},
			fafonts: {
				files: [{
					cwd: 'bower_components/font-awesome/fonts',  // set working folder / root to copy
					src: '**/*',           // copy all files and subfolders
					dest: 'font-awesome/fonts/',    // destination folder
					expand: true           // required when using cwd
				}]
			},
		},
		bower: {
			update: {
				//just run 'grunt bower:install' and you'll see files from your Bower packages in lib directory
			}
		}
	});

	// Load NPM tasks to be used here
	grunt.loadNpmTasks( 'grunt-sass' );
	grunt.loadNpmTasks( 'grunt-wp-i18n' );
	grunt.loadNpmTasks( 'grunt-glotpress' );
	grunt.loadNpmTasks( 'grunt-checktextdomain' );
	grunt.loadNpmTasks( 'grunt-contrib-jshint' );
	grunt.loadNpmTasks( 'grunt-contrib-uglify' );
	grunt.loadNpmTasks( 'grunt-contrib-cssmin' );
	grunt.loadNpmTasks( 'grunt-contrib-watch' );
	grunt.loadNpmTasks( 'grunt-contrib-compress' );
	grunt.loadNpmTasks( 'grunt-contrib-copy' );
	grunt.loadNpmTasks( 'grunt-bower-task' );

	// Register tasks
	grunt.registerTask( 'default', [
		'css',
		'jshint',
		'uglify'
	]);

	grunt.registerTask( 'css', [
		'sass'
	]);

	grunt.registerTask( 'update', [
		'bower',
		'copy',
	]);

	grunt.registerTask( 'dev', [
		'default',
		'makepot'
	]);

	grunt.registerTask( 'zip', [
		'dev',
		'compress'
	]);
};
