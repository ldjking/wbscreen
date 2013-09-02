module.exports = function(grunt) {
grunt.initConfig({
        pkg : grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: 'src/<%= pkg.name %>.js',
                dest: 'build/<%= pkg.name %>.min.js'
            }
        },
        concat: {
            css: {
                src: ['src/style/lib/*.css'],
                dest: 'build/style/basic.css'
            },
            js: {
                src: 'src/js/lib/*.js',
                dest: 'src/js/base.min.js'
            }
        },
        cssmin: {
            css: {
                src: 'build/style/base.css',
                dest: 'build/style/base.min.css'
            }
        },
        jade: {
            release: {
                options: {
                    data: {
                        debug: false
                    },
                    compiler: 'compiler',
                    pretty: true
                },
                files: {
                    "view/test.html": "view/test.jade"
                }
            }
        },
        less: {
            production: {
                options: {
					paths:["src/style/less"],
                    yuicompress: true
                },
                files: {
                    "src/style/result.css": "src/style/source.less"
                }
            }
        },
		watch: {
		  scripts: {
			files: ['src/style/*.*'],
			tasks: ['foo'],
			options: {
			  spawn: false,
			  debounceDelay: 250,
			  dateFormat: function(time) {
				  grunt.log.writeln('The watch finished in ' + time + 'ms at' + (new Date()).toString());
				  grunt.log.writeln('Waiting for more changes...');
					}
				}
			}
		}
    });
        
    //载入插件
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-css');
    grunt.loadNpmTasks('grunt-contrib-jade');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    //默认任务
     grunt.registerTask('default', ['uglify' ,'concat', 'cssmin', 'jade', 'less']);
	 
	 grunt.registerTask('foo', 'My "foo" task.', function() {
		 console.log("my task log +++++++++++++++");
		 console.log(arguments.length);
		 console.log({a:10,b:100});
	  // Enqueue "bar" and "baz" tasks, to run after "foo" finishes, in-order.
	 	console.log("my task log  --------------");
	});
	
	grunt.event.on('watch', function(action, filepath, target) {
	  grunt.log.writeln(target + ': ' + filepath + ' has ' + action);
	});

};