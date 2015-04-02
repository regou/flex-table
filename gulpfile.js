/* gulpfile.js */

// Load some modules which are installed through NPM.
var gulp = require('gulp');
var browserify = require('browserify');  // Bundles JS.

var source = require('vinyl-source-stream');
var chalk = require('chalk');
var notify = require("gulp-notify");



var babelify = require("babelify");

// Define some paths.
var paths = {
    app_js: ['./js/index.js'],
	independent:['./js/FlexTable-independent.js'],
    js: ['./js/**/*.js*']
};



// Our JS task. It will Browserify our code and compile React JSX files.
gulp.task('js', function() {
    // Browserify/bundle the JS.

    return browserify({ debug: true })
        .transform(babelify)
        .require(paths.app_js, { entry: true })
        .bundle()
        .on("error", function (err) {
            console.log(chalk.red(err.toString()));
            this.emit('end');
            notify({
                message: "Error: " + err.message,
                title: "Failed running browserify"
            })

        })
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('./compiles/'));

});

// Rerun tasks whenever a file changes.
gulp.task('watch', function() {
    return gulp.watch(paths.js, ['js']);
});

// The default task (called when we run `gulp` from cli)
gulp.task('default', ['watch', 'js']);

