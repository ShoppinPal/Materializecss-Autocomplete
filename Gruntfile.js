// Load Grunt
module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // Tasks
    jshint: {
      files: [
        'Gruntfile.js',
        'client/*.js'
      ],
      options: {
        jshintrc: true
      }
    },
    sass: { // Begin Sass Plugin
      dist: {
        options: {
          sourcemap: 'none'
        },
        files: [{
          expand: true,
          cwd: 'client',
          src: ['scss/*.scss'],
          dest: 'client/css',
          ext: '.css'
        }]
      }
    },
    uglify: { // Begin JS Uglify Plugin
      build: {
        src: ['*.js'],
        dest: 'client/js/minjs/minify.js'
      }
    },
    compass: {
      dist: {
        options: {
          sassDir: 'client/scss',
          cssDir: 'client/css',
          environment: 'production'
        }
      }
    },
    watch: { // Compile everything into one task with Watch Plugin
      css: {
        files: 'client/scss/*.scss',

        tasks: ['sass']
      },
      js: {
        files: 'client/js/*.js',
        tasks: ['uglify']
      },
      compass: {
        files: [
          'client/scss/*.scss',
        ],
        tasks: ['compass']
      },
      jshint: {
        files: [
          'Gruntfile.js',
          'client/*.js',
        ],
        tasks: ['jshint'],
        options: {
          reload: true
        }
      }
    }


  });
  // Load Grunt plugins
// Load Grunt plugins
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  // Register Grunt tasks
  grunt.registerTask('default', ['sass','uglify','compass','jshint','watch']);
};






