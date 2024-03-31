
const sass = require('node-sass');
const d = new Date();
let year = d.getFullYear();

module.exports = function (grunt) {
  
  

  // Load all grunt tasks matching the ['grunt-*', '@*/grunt-*'] patterns
  require("load-grunt-tasks")(grunt);

  grunt.initConfig({

    sass: {      
      dev:{
        options: {                          // Target options
          implementation: sass,
          style: 'expanded'
        },
        files: {                            // Dictionary of files
          'templates/main.css': 'scss/main.scss'
        }
      }
    },

    replace:{
      sections:{
        options:{
          patterns:[ 
            {
              match: 'year',
              replacement: year
            }
          ]
        },
        files:[
          {
            expand: true,
            flatten: true,
            src: [
              'templates/sections/header.html',
              'templates/sections/body.html',
              'templates/sections/footer.html',
            ],
            dest: 'templates/build'
          }
        ]
      },
      build:{
        options:{
          patterns:[
            {
              match: 'mainCSS',
              replacement: '<%= grunt.file.read("templates/main.css") %>'
            },
            {
              match: 'bodyCSS',
              replacement: '<%= grunt.file.read("scss/css/bodyCSS.css") %>'
            },
            {
              match: 'articleDiv',
              replacement: '<%= grunt.file.read("scss/css/articleDiv.css") %>'
            },
            {
              match: 'header',
              replacement: '<%= grunt.file.read("templates/build/header.html") %>'
            },
            {
              match: 'body',
              replacement: '<%= grunt.file.read("templates/build/body.html") %>'
            },
            {
              match: 'footer',
              replacement: '<%= grunt.file.read("templates/build/footer.html") %>'
            },            
          ]
        },
        files:[
          {
            expand: true,
            flatten: true,
            src: ['templates/email-template.html'],
            dest: 'emails'
          }          
        ]
      }
    },



    watch:{
      sass: {
        files: [
          'scss/**/**.scss',
          'scss/**/**.css',
          'templates/sections/*.html', 
          'templates/email-template.html'
        ],
        tasks: ['sass:dev', 'replace']
      },
    }
    


  });


  grunt.registerTask('dev', [
    'sass:dev',
    'replace',
    'watch:sass'
  ]);

};
