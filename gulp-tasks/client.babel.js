'use strict';

import gulp from 'gulp';
import eslint from 'gulp-eslint';
import inject from 'gulp-inject';
import useref from 'gulp-useref';
import uglify from 'gulp-uglify';
import cleanCss from 'gulp-clean-css';
import templateCache from 'gulp-angular-templatecache';
import angularFilesort from 'gulp-angular-filesort';
import ngAnnotate from 'gulp-ng-annotate';
import filter from 'gulp-filter';
import rev from 'gulp-rev';
import revReplace from 'gulp-rev-replace';
import gulpIf from 'gulp-if';
import browserSync from 'browser-sync';
import proxy from 'http-proxy-middleware';
import os from 'os';

gulp.task('client:lint', () => {
	return gulp.src(['client/app/**/.js'])
		.pipe(eslint())
		.pipe(eslint.format())
		.pipe(eslint.failAfterError());
});

gulp.task('client:lint-dev', () => {
	return gulp.src(['client/app/**/.js'])
		.pipe(eslint())
		.pipe(eslint.format());
});

gulp.task('client:template', () => {
	return gulp.src(['client/app/**/*.html'])
		.pipe(templateCache('app.tpl.js', {
			root: 'app',
			module: 'appTemplates',
			standalone: true
		}))
		.pipe(gulp.dest('.tmp/'));
});

gulp.task('client:inject', () => {
	return gulp.src('client/index.html')
		.pipe(inject(gulp.src(['client/**/*.js', '.tmp/*.tpl.js'])
			.pipe(angularFilesort()), {
				ignorePath: ['client', '.tmp'],
				addRootSlash: false
			}))
		.pipe(gulp.dest('.tmp/'));
});

gulp.task('client:serve', (cb) => {
	let proxyServer = proxy('/api', {
		target: 'http://localhost:3002'
	});

	browserSync.instance = browserSync.init({
		startPath: '/',
		server: {
			baseDir: ['.tmp/', 'client'],
			middleware: [proxyServer],
			routes: {
				'/bower_components': 'bower_components'
			}
		},
		browser: (os.platform() === 'linux' ? ['google-chrome'] : ['google chrome'])
	}, cb)
});

gulp.task('client:watch', () => {
	gulp.watch('client/*.html', gulp.series(['client:inject'], browserSync.reload));
	gulp.watch('client/app/**/*.html', gulp.series(['client:template', 'client:inject'], browserSync.reload));
	gulp.watch(['client/app/*.js', 'client/app/**/*.js'], gulp.series(['client:lint-dev', 'client:inject'], browserSync.reload));
	gulp.watch('client/**/*.css', browserSync.reload);
});

gulp.task('client:build', () => {
	let jsFilter = filter('**/*.js', {
		restore: true
	});
	let cssFilter = filter('**/*.css', {
		restore: true
	});
	return gulp.src('.tmp/index.html')
		.pipe(useref())
		.pipe(jsFilter)
		.pipe(ngAnnotate())
		.pipe(uglify())
		.pipe(jsFilter.restore)
		.pipe(cssFilter)
		.pipe(cleanCss())
		.pipe(cssFilter.restore)
		.pipe(gulpIf('*.js', rev()))
		.pipe(gulpIf('*css', rev()))
		.pipe(revReplace())
		.pipe(gulp.dest('dist/public'));
})

gulp.task('client:copy-fonts-dist', gulp.parallel([
	function copyBootsrapFonts() {
		return gulp.src('bower_components/bootstrap/dist/fonts/*')
			.pipe(gulp.dest('dist/public/fonts'));
	}
]));

gulp.task('client:default', gulp.series(['client:lint-dev', 'client:template', 'client:inject', 'client:serve', 'client:watch']));
gulp.task('client:dist', gulp.series(['client:lint', 'client:template', 'client:inject', 'client:copy-fonts-dist', 'client:build']));
