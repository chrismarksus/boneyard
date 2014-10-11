module.exports = function(grunt) {
    grunt.initConfig({
      sass: {
        dev: {
          options: {
            style: 'expanded'
          },
          files: {
            'boneyard.css': 'boneyard.sass'
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
          src: ['boneyard.css']
        }
      },
      cssmin: {
        css:{
            src: 'boneyard.css',
            dest: 'boneyard.min.css'
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
