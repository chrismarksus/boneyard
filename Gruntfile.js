module.exports = function(grunt) {
    grunt.initConfig({
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
            import: false
          },
          src: ['dist/boneyard.css']
        }
      },
      cssmin: {
        css:{
            src: 'dist/boneyard.css',
            dest: 'dist/boneyard.min.css'
        }
      }
    });

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-csslint');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    /**
     * Default task
     * Run `grunt` on the command line
     */
    grunt.registerTask('default', [
      'sass:dev',
      'watch'
    ]);
    grunt.registerTask('dist', [
      'sass:dev',
      'cssmin:css'
    ]);
};
