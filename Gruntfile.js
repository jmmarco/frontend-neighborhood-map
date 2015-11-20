module.exports = function(grunt) {

    // Project configuration
    grunt.initConfig({
      concat: {
        basic: {
          src: ['src/js/app.js'],
          dest: 'dist/js/app.js',
        },
        extras: {
          src: ['src/bower_components/bootstrap/dist/js/bootstrap.min.js',
          'src/bower_components/jquery/dist/jquery.min.js',
          'src/bower_components/knockout/dist/knockout.js'],
          dest: 'dist/js/scripts.js',
        },
      },
    });


    grunt.loadNpmTasks('grunt-contrib-concat');
};
