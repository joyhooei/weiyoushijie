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
                    'dist/server.optimized.js': 'server.js'
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
        
        watch: {
            files: ['<%= jshint.files %>'],
            tasks: ['jshint']
        }        
    });
  
    grunt.loadNpmTasks('grunt-node-optimize');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    
    // Default task(s).
    grunt.registerTask('default', ['node_optimize', 'jshint']);
};
