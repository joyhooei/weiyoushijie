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
                    'dist/server.min.js': 'server.js'
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
            target: {
                command: [
                    './public/headline/egret publish',
                    './public/headline/egret publish --runtime native'
                ]
            }
        },        
        
        copy: {
            main: {
                files: [
                    {expand: true, src: ['./app.conf'], dest: '../wysj/app.conf'},
                    {expand: true, src: ['./package.json'], dest: '../wysj/package.json'},

                    {expand: true, src: ['./dist/server.min.js'], dest: '../wysj/server.js'},
                    {expand: true, src: ['./views/**'], dest: '../wysj/views/'},
                    {expand: true, src: ['./public/css/**', './public/font/**','./public/images/**','./public/img/**','./public/javascripts/**','./public/js/**','./public/stylesheets/**', './public/*.*'], dest: '../wysj/public/'},
                    
                    {expand: true, src: ['./public/headline/bin-release/*'], dest: '../wysj/public/headline/bin-release/'},
                ],
            },
        },        
    });
  
    grunt.loadNpmTasks('grunt-node-optimize');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-shell');
    
    // Default task(s).
    grunt.registerTask('default', ['copy', 'node_optimize', 'shell', 'jshint']);
};
