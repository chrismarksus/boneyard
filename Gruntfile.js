module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        sass: {
            dev: {
                options: {
                    style: 'expanded',
                    banner: '/*\n <%= pkg.name %> was compiled on <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
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
                options: {
                    banner: '/*\n <%= pkg.name %> was minified on <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
                },
                src: 'dist/boneyard.css',
                dest: 'dist/boneyard.min.css'
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
        },
        git_deploy: {
            deploy: {
                options: {
                    url: 'https://github.com/chrismarksus/boneyard.git',
                    message: 'Auto deploy style guide'
                },
                src: 'docs'
            },
        }
    });

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-csslint');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-stylestats');
    grunt.loadNpmTasks('grunt-styledocco');
    grunt.loadNpmTasks('grunt-git-deploy');

    /**
     * Default task
     * Run `grunt` on the command line
     */
    grunt.registerTask('default', 'Compile the sass to css and the style guide, then watch for changes to boneyard.sass', [
        'sass:dev',
        'styledocco:dist',
        'watch'
    ]);
    grunt.registerTask('dist', 'Compile Sass to css, minifiy css, print stats for css, and complie the style guide', [
        'sass:dev',
        'cssmin:css',
        'stylestats',
        'styledocco:dist'
    ]);
    grunt.registerTask('deploy', 'Compile style guide and push it to github pages', [
        'styledocco:dist',
        'git_deploy:deploy'
    ]);
    grunt.registerTask('doc', 'Complie the style guide', [
        'styledocco:dist'
    ]);
};
