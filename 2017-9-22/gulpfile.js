let gulp=require('gulp'),
	minicss=require('gulp-clean-css'),
	minihtml=require('gulp-minify-html'),
	uglify=require('gulp-uglify'),
	minimage=require('gulp-imagemin'),
	rename=require('gulp-rename'),
	spritesmith=require('gulp.spritesmith'),
	buffer=require('vinyl-buffer');

gulp.task('css',function(){
	return gulp.src('src/score.css').pipe(minicss()).pipe(gulp。.dest('./build'));
});

gulp.task('html',function(){
	return gulp.src('src/score.html').pipe(minihtml()).pipe(gulp.dest('./build'));
});

gulp.task('js',function(){
	return gulp.src('src/score.js').pipe(uglify()).pipe(gulp.dest('./build'));
});


gulp.task('img',function(){
	return gulp.src('./img/*.png').pipe(minimage()).pipe(rename({suffix:'.min'})).pipe(gulp.dest('./img'));
});

gulp.task('sprite',function(){
	return gulp.src('./img/*.png').pipe(spritesmith({imgName:'logo.png',cssName:'logo.css'})).pipe(buffer()).pipe(gulp.dest('./build'));
})

gulp.task('default',['css','html','js'],function(){});