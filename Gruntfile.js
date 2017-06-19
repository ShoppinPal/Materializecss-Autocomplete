module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        /**
         * Todo : implement html min and image min
         */

        clean: {
            options: {force: true},
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
        html2js: {
            options: {
                rename: function (moduleName) {
                    return "ac-templates";
                },
                base: 'material.autocomplete',
                module: 'material.autocomplete.templates',
                singleModule: true,
                useStrict: true,
                quoteChar: '\'',
                htmlmin: {
                    collapseBooleanAttributes: true,
                    collapseWhitespace: true,
                    removeAttributeQuotes: true,
                    removeComments: true,
                    removeEmptyAttributes: true,
                    removeRedundantAttributes: true,
                    removeScriptTypeAttributes: true,
                    removeStyleLinkTypeAttributes: true
                }
            },
            main: {
                src: ['src/views/template.html'],
                dest: 'src/js/autocomplete.template.js'
            }
        },
        concat: {
            options: {
                force: true,
                banner: '/* <%= pkg.name %> - v<%= pkg.version %> - ' +
                '<%= grunt.template.today("yyyy-mm-dd") %> */'
            },
            dist: {
                src: ['src/js/autocomplete.js', 'src/js/autocomplete.template.js', 'src/js/autocomplete.directive.js', 'src/js/autocomplete.controller.js'],
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
        run_node: {
            start: {
                options: {
                    cwd: 'demo',
                    detached: false
                },
                files: {src: ['demo/server/server.js']},
            }
        },
        watch: {
            dist: {
                files: ['Gruntfile.js', 'src/js/*.js', '!src/js/autocomplete.template.js', 'src/scss/*.scss', 'src/views/*.html'],
                tasks: ['clean', 'jshint', 'compass', 'html2js', 'concat', 'uglify', 'copy:css', 'cssmin', 'copy:lib']
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
    grunt.loadNpmTasks('grunt-html2js');
    grunt.loadNpmTasks('grunt-run-node');

    grunt.registerTask('default', [
        'clean',
        'jshint',
        'compass',
        'html2js',
        'concat',
        'uglify',
        'copy:css',
        'cssmin',
        'copy:lib',
        'run_node',
        'watch'
    ]);
};


