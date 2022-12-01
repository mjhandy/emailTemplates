module.exports = function (grunt) {
  
  

  // Load all grunt tasks matching the ['grunt-*', '@*/grunt-*'] patterns
  require("load-grunt-tasks")(grunt);

  grunt.initConfig({

    sass: {      
      dev:{
        options: {                       // Target options
          style: 'expanded'
        },
        files: {                         // Dictionary of files
          'templates/main.css': 'scss/main.scss',       // 'destination': 'source'
        }
      }
    },
    includes:{
      build:{
        cwd: 'templates',
        src: [
          'css/main.css',
          '*.html'
        ],
        dest: 'emails',
        options: {
          flatten: true
        }
      
      }
    },

    watch:{
      sass: {
        files: ['scss/**/**.scss'],
        tasks: ['sass:dev', 'includes:build']
      },
    }
    


  });


  grunt.registerTask('dev', [
    'sass:dev',
    'includes:build',
    'watch:sass'
  ]);

};
