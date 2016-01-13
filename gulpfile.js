var gulp = require("gulp");
var sass = require("gulp-sass");
var concat = require("gulp-concat");
var uglify = require('gulp-uglify');
var uglifycss = require('gulp-uglifycss');

gulp.task("sass", function() {
	gulp.src("./dev/*.scss")
		.pipe(sass().on('error', sass.logError))
		.pipe(concat("desk-menu.css"))
		.pipe(gulp.dest("./prod/"));
});

gulp.task("css", function() {
	gulp.src("./dev/*.scss")
		.pipe(sass().on('error', sass.logError))
		.pipe(concat("desk-menu.css"))
		.pipe(gulp.dest("./prod/"));

	gulp.src("./dev/*.scss")
		.pipe(sass().on('error', sass.logError))
		.pipe(concat("desk-menu.min.css"))
		.pipe(uglifycss({"max-line-len": 80}))
		.pipe(gulp.dest("./prod/"));
});
 
gulp.task('js', function() {
	gulp.src('./dev/*.js')
		.pipe(uglify())
		.pipe(concat("desk-menu.min.js"))
		.pipe(gulp.dest('./prod/'));

	gulp.src('./dev/*.js')
		.pipe(concat("desk-menu.js"))
		.pipe(gulp.dest('./prod/'));
});

gulp.task('sass:watch', function () {
	gulp.watch('./dev/*.scss', ['sass']);
});