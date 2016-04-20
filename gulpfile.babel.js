'use strict';

import gulp from 'gulp';
import fs from 'fs';
import del from 'del';

fs.readdirSync('gulp-tasks').forEach(function(file) {
	require('./gulp-tasks/' + file);
});

gulp.task('clean',() => {
	return del(['tmp', 'dist']);
});

gulp.task('default', gulp.series('clean', gulp.parallel(['server:default','client:default'])));
gulp.task('dist', gulp.series('clean', gulp.parallel(['server:dist','client:dist'])));
