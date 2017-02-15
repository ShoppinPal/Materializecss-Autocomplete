module.exports = function (grunt) {

          grunt.initConfig({
            pkg: grunt.file.readJSON('package.json'),
            
            copy: {
              html: { 
                src: 'demo/client/autocomplete/views/profile.html',
                dest: 'autocomplete/views/profile.html',
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
                  'autocomplete/css/autocomplete.min.css': ['Demo/client/css/*.css']
                }
              }
            },
            // Tasks
            jshint: {
              files: [
                'Gruntfile.js',
                'Demo/client/*.js'
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
                src: ['Demo/client/dist/*.js'],
                dest: 'autocomplete/autocomplete.min.js'
              },

            },
            watch: { // Compile everything into one task with Watch Plugin
              css: {
                files: 'Demo/client/scss/*.scss',

                tasks: ['sass']
              },
              js: {
                files: 'Demo/client/**/*.js',
                tasks: ['uglify']
              },

              cssmin:{
                files :['Demo/client/css/*.css'],
                tasks:['cssmin']
              },
              compass: {
                files: [
                  'Demo/client/scss/*.scss',
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


