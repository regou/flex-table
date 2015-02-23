/* gulpfile.js */

// Load some modules which are installed through NPM.
var gulp = require('gulp');
var browserify = require('browserify');  // Bundles JS.

var reactify = require('reactify');  // Transforms React JSX to JS.
var source = require('vinyl-source-stream');
var chalk = require('chalk');

// Define some paths.
var paths = {
    app_js: ['./js/index.js'],
    js: ['./js/**/*.js*']
};



// Our JS task. It will Browserify our code and compile React JSX files.
gulp.task('js', function() {
    // Browserify/bundle the JS.
    browserify({
        entries:paths.app_js,
        debug:true
    })
        .transform(reactify)
        .bundle()
        .on('error', function(err){
                  console.log(chalk.red(err.toString()));
                  this.end();
        })
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('./compiles/'));
});

// Rerun tasks whenever a file changes.
gulp.task('watch', function() {
    gulp.watch(paths.js, ['js']);
});

// The default task (called when we run `gulp` from cli)
gulp.task('default', ['watch', 'js']);