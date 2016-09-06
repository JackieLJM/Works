module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: ''
            },
            build: {
                src: '.js',
                dest: '.min.js'
            }
        },
        watch:{

        },
        sass:{

        },
        modernizr:{

        }
    });


    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-modernizr');

    grunt.registerTask('default',['uglify','watch','sass','modernizr']);
    grunt.registerTask('uglify',['uglify']);   
    grunt.registerTask('watch', ['watch']);

};
