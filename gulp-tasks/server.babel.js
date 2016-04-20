'use strict';

import gulp from 'gulp';
import eslint from 'gulp-eslint';
import nodemon from 'gulp-nodemon';

gulp.task('server:lint', () => {
	return gulp.src(['server/app.js', 'server/src/**/*.js'])
		.pipe(eslint())
		.pipe(eslint.format())
		.pipe(eslint.failAfterError());
});
gulp.task('server:lint-dev', () => {
	return gulp.src(['server/app.js', 'server/src/**/*.js'])
		.pipe(eslint())
		.pipe(eslint.format());
});
gulp.task('server:build', () => {
	return gulp.src(['server/**/*', '!.jshintrc'], {
		base: './'
	})
		.pipe(gulp.dest('dist'));
});
gulp.task('server:serve', (cb) => {
	let called = false;
	return nodemon({
		script: 'server/app.js',
		nodeArgs: ['--debug'],
		watch: ['server/'],
		ext: 'js'
	})
		.on('start', () => {
			if (!called) {
				called = true;
				cb();
			}
		})
});
gulp.task('server:watch', () => {
	gulp.watch('server/**/*.js', gulp.series(['server:lint-dev']));
});

gulp.task('server:default', gulp.series(['server:lint-dev', 'server:serve', 'server:watch']));
gulp.task('server:dist', gulp.series(['server:lint', 'server:build']));
