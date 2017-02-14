module.exports = function (grunt) {

          grunt.initConfig({
            pkg: grunt.file.readJSON('package.json'),
            
            copy: {
              html: {
              
                src: 'demo/client/autocomplete/views/autocomplete.html',
                dest: 'autocomplete/views/autocomplete.html',
              },
              css:{
                src: 'demo/client/css/autocomplete.css',
                dest:'autocomplete/css/autocomplete.css'
              },
              js:{
                  src:'demo/client/dist/autocomplete.concat.js',
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
                  'autocomplete/css/autocomplete.min.css': ['demo/client/css/*.css']
                }
              }
            },
            // Tasks
            jshint: {
              files: [
                'Gruntfile.js',
                'demo/client/*.js'
              ],
              options: {
                jshintrc: true
              }
            },
           
            uglify: { 
                options: {
                  sourceMap: true,
                  sourceMapName: 'autocomplete/aautocomplete.min.map'
                },
                js: {
                src: ['demo/client/dist/*.js'],
                dest: 'autocomplete/autocomplete.min.js'
              },

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
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-copy');
  
  grunt.registerTask('default', ['copy','cssmin','uglify','jshint','watch']);
};






