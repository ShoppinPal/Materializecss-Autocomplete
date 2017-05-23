module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        /**
         * Todo : implement html min and image min
         */

        clean: {
            dist: ['dist'],
            lib: ['demo/client/lib']
        },
        jshint: {
            files: [
                'Gruntfile.js',
                'src/js/*.js'
            ],
            options: {
                jshintrc: true
            }
        },
        compass: {
            dist: {
                options: {
                    sassDir: 'src/scss',
                    cssDir: 'src/css',
                }
            }
        },
        concat: {
            options: {
                banner: '/* <%= pkg.name %> - v<%= pkg.version %> - ' +
                '<%= grunt.template.today("yyyy-mm-dd") %> */'
            },
            dist: {
                src: ['src/js/autocomplete.js', 'src/js/autocomplete.directive.js', 'src/js/autocomplete.controller.js'],
                dest: 'dist/js/<%= pkg.name %>.js'
            }
        },
        uglify: {
            options: {
                sourceMap: true,
                beautify: true,
                banner: '/* <%= pkg.name %> - v<%= pkg.version %> - ' +
                '<%= grunt.template.today("yyyy-mm-dd") %> */'
            },
            jsminify: {
                src: ['dist/js/<%= pkg.name %>.js'],
                dest: 'dist/js/<%= pkg.name %>.min.js'
            }
        },
        copy: {
            html: {
                expand: true,
                cwd: 'src/views/',
                src: ['**'],
                dest: 'dist/views/',
            },
            css: {

                src: 'src/css/*.css',
                dest: 'dist/css/<%= pkg.name %>.css'
            },
            lib: {
                expand: true,
                cwd: 'dist/',
                src: ['**'],
                dest: 'demo/client/lib/',
            },
        },
        cssmin: {
            cssminify: {
                src: 'dist/css/<%= pkg.name %>.css',
                dest: 'dist/css/<%= pkg.name %>.min.css'
            }
        },
        watch: {
            dist: {
                files: ['Gruntfile.js', 'src/js/*.js', 'src/scss/*.scss', 'src/views/*.html'],
                tasks: ['clean', 'jshint', 'compass', 'concat', 'uglify', 'copy:html', 'copy:css', 'cssmin', 'copy:lib']
            }
        }

    });
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('default', ['clean', 'jshint', 'compass', 'concat', 'uglify', 'copy:html', 'copy:css', 'cssmin', 'copy:lib', 'watch']);
};


