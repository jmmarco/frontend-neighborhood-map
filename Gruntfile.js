module.exports = function(grunt) {

    // Project configuration
    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        // Minify HTML
        htmlmin: { // Task
            dist: { // Target
                options: { // Target options
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: { // Dictionary of files
                    'dist/index.html': 'src/index.html', // 'destination': 'source'
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
                    'dist/css/style.css': ['src/css/style.css']
                }
            }
        },

        // Uglify JS
        uglify: {
            my_target: {
                files: {
                    'dist/js/app.min.js': ['src/js/app.js']
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
            server: {
                options: {
                    keepalive: true,
                    port: 8000,
                    hostname: 'localhost',
                    open: 'dist/index.html'
                },
            }

        }

    });

    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');

    // Default tasks
    grunt.registerTask('default', ['htmlmin', 'cssmin', 'uglify', 'connect']);
};
