module.exports = function(grunt) {
	// configuration goes here
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		// concat: {
		// 	// concatinating files goes here
		// 	dist: {
		// 		src: [
		// 			'js/main.js',
		// 			'js/lib/*.js'
		// 		],
		// 		dest: 'js/build/production.js'
		// 	}
        //
		// },

		// uglify: {
		// 	// uglify files goes here
		//     my_target: {
		//     	files: {
		//         	'js/build/production.min.js': ['js/build/production.js']
		//       	}
		//     }
		// },

        sass: {
			dist: {
				files: {
					'public/assets/stylesheets/main.css' : 'public/assets/stylesheets/sass/main.scss'
				}
			}
		},

		watch: {
			// what to watch
			scripts: {
				files: ['public/assets/js/*.js'],
				options: {
					spawn: false
				},
			},
            css: {
				files: 'public/assets/stylesheets/sass/**/*.scss',
				tasks: ['sass']
			}
		}

	});
	// tell grunt we want to use these
	// grunt.loadNpmTasks('grunt-contrib-concat');
	// grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');


	grunt.registerTask('default', ['sass', 'watch']);
}
