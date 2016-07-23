module.exports = function(grunt) {
    // Project configuration.
    grunt.initConfig({
        node_optimize: {
            dist: {
                options: {
                    ignore: [
                    ]
                },
                files: {
                    'dist/server.js': 'server.js'
                }
            }
        },

        uglify: {
            options: {
                //添加banner
                banner: '/*! author:liweihai weiyoushijie <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },    
            release: {// 合并压缩a.js和b.js
                files: {
                    'dist/server.js':['dist/server.js']
                }
            }       
        },
        
        jshint: {
            files: ['routes/*.js', 'models/*.js', 'channels/*.js', 'platforms/leancloud/*.js', 'platforms/standalone/*.js'],
            options: {
                globals: {
                    exports: true
                }
            }
        },
        
       shell: {
            options: {
                stderr: false
            },
            multiple: {
                command: [
                    'egret publish public/headline --version bin-release',
                    'egret publish public/headline --runtime native --version bin-release',
                ].join('&&')
            }
        }, 

        clean: {
            build: {    
                src: ["dist"]    
            }
        },
        
        copy: {
            main: {
                files: [
                    {expand: true, cwd: './', src: ['app.conf'], dest: 'dist/', filter: 'isFile'},
                    {expand: true, cwd: './', src: ['package.json'], dest: 'dist/', filter: 'isFile'},

                    {expand: true, cwd: 'views/', src: ['**'], dest: 'dist/views/'},
                    {expand: true, cwd: 'public/', src: ['css/**', 'font/**','images/**','img/**','javascripts/**','js/**','stylesheets/**', '*.*'], dest: 'dist/public/'},
                    
                    {expand: true, cwd: 'public/headline/bin-release/', src: ['**'], dest: 'dist/public/headline/bin-release/'},
                    {expand: true, cwd: 'public/headline/resource/art/', src: ['head.png', 'headF.png', 'headM.png', 'icon.jpg'], dest: 'dist/public/headline/resource/art/'},
                ],
            },
        },        
    });
  
    grunt.loadNpmTasks('grunt-node-optimize');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-uglify');    
    grunt.loadNpmTasks('grunt-shell');
    
    // Default task(s).
    grunt.registerTask('default', ['clean', 'shell', 'node_optimize', 'uglify', 'copy']);
};
