module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        sass: {
            dev: {
                options: {
                    style: 'expanded'
                },
                files: {
                    'dist/boneyard.css': 'boneyard.sass'
                }
            }
        },
        watch: {
            all: {
                files: 'boneyard.sass',
                tasks: ['sass:dev', 'csslint:dev']
            }
        },
        csslint: {
            dev: {
                options: {
                    import: false,
                    "box-sizing": false,
                    "regex-selectors": false,
                    "universal-selector": false,
                    "unqualified-attributes": false
                },
                src: ['dist/boneyard.css']
            }
        },
        cssmin: {
            css:{
                src: 'dist/boneyard.css',
                dest: 'dist/boneyard.min.css',
                banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
            }
        },
        stylestats: {
            src: ['dist/boneyard.css'],
            options: {
                size: true,
                gzippedSize: false,
                simplicity: true,
                rules: true,
                selectors: true,
                lowestCohesion: true,
                lowestCohesionSelector: true,
                totalUniqueFontSizes: true,
                uniqueFontSize: false,
                totalUniqueColors: true,
                uniqueColor: false,
                idSelectors: true,
                universalSelectors: true,
                importantKeywords: false,
                mediaQueries: true,
                propertiesCount: 5
            }
        },
        styledocco: {
            dist: {
                options: {
                    name: 'Boneyard.css',
                    preprocessor: 'sass'
                },
                files: {
                    'docs/': 'boneyard.sass'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-csslint');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-stylestats');
    grunt.loadNpmTasks('grunt-styledocco');

    /**
     * Default task
     * Run `grunt` on the command line
     */
    grunt.registerTask('default', [
        'sass:dev',
        'styledocco:dist',
        'watch'
    ]);
    grunt.registerTask('dist', [
        'sass:dev',
        'cssmin:css',
        'stylestats',
        'styledocco:dist'
    ]);
    grunt.registerTask('doc', [
        'styledocco:dist',
    ]);
};
