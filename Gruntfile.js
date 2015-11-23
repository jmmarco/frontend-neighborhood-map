module.exports = function(grunt) {

    // Project configuration
    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        // Copy image structure
        copy: {
            main: {
                src: 'images/*',
                dest: 'dist/',
            },
        },

        // Minify HTML
        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: {
                    'dist/index.html': 'index.html',
                }
            }
        },

        // Minify CSS
        cssmin: {
            options: {
                shorthandCompacting: false,
                roundingPrecision: -1
            },
            target: {
                files: {
                    'dist/css/style.css': ['css/style.css']
                }
            }
        },

        // Uglify JS
        uglify: {
            my_target: {
                files: {
                    'dist/js/app.js': ['js/app.js']
                }
            }
        },

        // Concatenate files
        concat: {
            js: {
                src: ['src/js/app.js',
                    'node_modules/bootstrap/dist/js/bootstrap.min.js',
                    'node_modules/jquery/dist/jquery.min.js',
                    'node_modules/knockout/build/output/knockout-latest.js'
                ],
                dest: 'dist/js/app.min.js',
            },
            css: {
                src: ['src/css/style.css', 'node_modules/bootstrap/dist/css/bootstrap.min.css',
                    'node_modules/font-awesome/css/font-awesome.min.css'
                ],
                dest: 'dist/css/styles.css'
            }
        },

        // Cocat Bower Components
        bower_concat: {
            all: {
                dest: 'build/_bower.js',
                cssDest: 'build/_bower.css',
                exclude: [
                    'jquery',
                    'modernizr'
                ],
                dependencies: {
                    'underscore': 'jquery',
                    'backbone': 'underscore',
                    'jquery-mousewheel': 'jquery'
                },
                bowerOptions: {
                    relative: false
                }
            }
        },


        // Bower Simple Install
        "bower-install-simple": {
            options: {
                color: true,
                directory: "dist/bower_components"
            },
            "prod": {
                options: {
                    production: true
                }
            },
            "dev": {
                options: {
                    production: false
                }
            }
        },

        // Watch files for changes
        watch: {
            js: {
                files: ['src/js/*.js'],
                tasks: ['concat']
            },
            css: {
                files: ['src/css/*.css'],
                tasks: ['concat']
            },
        },

        // Launch web server
        connect: {
            options: {
                keepalive: true,
                port: 8000,
                hostname: 'localhost',
                open: 'index.html'
            },
            livereload: {
                options: {
                    open: {
                        target: 'http://localhost:8000/dist/'
                    }
                }
            }
        }

    });

    // Load each task
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks("grunt-bower-install-simple");
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');

    // Default tasks
    grunt.registerTask('default', ['copy', 'htmlmin', 'cssmin', 'uglify', 'bower-install-simple', 'connect']);
};
