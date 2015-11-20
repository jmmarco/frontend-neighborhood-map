module.exports = function(grunt) {

    // Project configuration
    grunt.initConfig({
      concat: {
        js: {
          src: ['src/js/app.js',
          'src/bower_components/bootstrap/dist/js/bootstrap.min.js',
          'src/bower_components/jquery/dist/jquery.min.js',
          'src/bower_components/knockout/dist/knockout.js'],
          dest: 'dist/js/app.js',
        },
        css: {
            src: ['src/css/style.css','src/bower_components/bootstrap/dist/css/bootstrap.min.css',
            'src/bower_components/font-awesome/css/font-awesome.min.css'],
            dest: 'dist/css/styles.css'
        }
      },
    });


    grunt.loadNpmTasks('grunt-contrib-concat');
};
