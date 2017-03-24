module.exports = function(grunt){


	grunt.initConfig({
		uglify: {
			my_target: {
				files: {
					'dist/js/script.js' : ['_/components/js/*.js']
				} //files
			} //my_target
		}, //uglify

		compass: {
			dev: {
				options:{
					config: 'config.rb'
				} //options
			} //dev
		}, //compass

		jade: {
			compile: {
				options: {
					pretty: true
				},
				files: [{
					expand: true,
					cwd: '',
					src: '_/components/jade/*.jade',
					dest: 'dist/',
					flatten: true,
					ext: '.html'
				}]
			}
		}, //jade

		express: {
			all: {
				options: {
					port: 8081,
					hostname: "0.0.0.0",
					bases: ["dist"],
					livereload: true
				}
			}
		},
		open: {
			all: {
				path: 'http://localhost:8081'
			}
		},

		watch: {
			compass: {
				files: ['_/components/sass/**/*.sass'],
				tasks: ['compass:dev'],
			},
			
			jade: {
				files: ['_/components/**/*.jade'],
				tasks: ['jade'],
			},

			sass: {
				files: ['_/components/sass/**/*.sass'],
				tasks: ['compass:dev']
			}, //sass
			
			livereload: {
				files: ['dist/stylesheets/*.css', 'dist/javascript/*.js', 'dist/*.html'],
				options: {
					livereload: true
				}
			}

		} //watch
	}) //initConfig

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-jade');
	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-express');
	grunt.loadNpmTasks('grunt-open');
	
	grunt.registerTask('server', ['express', 'open', 'watch']);

	grunt.registerTask('default', ['compass', 'jade', 'concat', 'livereload']);
} //exports