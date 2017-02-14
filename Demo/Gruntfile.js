module.exports = function (grunt) {

          grunt.initConfig({
            pkg: grunt.file.readJSON('package.json'),
            
            concat: {
              js: {
                src: ['client/autocomplete/autocomplete.js','client/autocomplete/autocomplete.controller.js','autocomplete.directive.js'],
                dest: 'client/dist/autocomplete.concat.js',
              }
            },
            copy: {
              html: {
              
                src: 'client/autocomplete/views/autocomplete.html',
                dest: 'autocomplete/views/autocomplete.html',
              },
              css:{
                src: 'client/css/autocomplete.css',
                dest:'autocomplete/css/autocomplete.css'
              },
              js:{
                  src:'client/dist/autocomplete.concat.js',
                  dest:'autocomplete/autocomplete.js'
              }
            },
            cssmin:{
              options: {
                shorthandCompacting: false,
                roundingPrecision: -1
              },
              target: {
                files: {
                  'autocomplete/css/autocomplete.min.css': ['client/css/*.css']
                }
              }
            },
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
            uglify: { 
                options: {
                  sourceMap: true,
                  sourceMapName: 'autocomplete/aautocomplete.min.map'
                },
                js: {
                src: ['client/dist/*.js'],
                dest: 'autocomplete/autocomplete.min.js'
              },

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
                files: 'client/**/*.js',
                tasks: ['uglify']
              },

              cssmin:{
                files :['client/css/*.css'],
                tasks:['cssmin']
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
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-express-server');
  
  grunt.registerTask('default', ['copy','cssmin','concat','sass','uglify','compass','jshint','watch']);
};






