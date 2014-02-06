module.exports = function(grunt) {

    grunt.initConfig({
        concat: {
            options: {},
            target: {
                src: ["src/class.js", "src/array.js", "src/string.js"],
                dest: 'steroids.js',
            },
        },
        uglify: {
            options: {
                mangle: true,
                compress: true,
                report: "gzip",
            },
            traget: {
                files: {
                    "steroids.min.js": ["steroids.js"]
                }
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default', ['concat', 'uglify']);
};