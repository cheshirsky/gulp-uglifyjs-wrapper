# gulp-uglifyjs-wrapper

> Tiny uglify-js wrapper for gulp.


## Install

```
$ npm install --save-dev gulp-uglifyjs-wrapper
```


## Usage

```js
var gulp = require('gulp');
var uglifyWrapper = require('gulp-uglifyjs-wrapper');

gulp.task('default', function () {
    return gulp.src('src/file.ext')
        .pipe(uglifyWrapper({
            mangle: false,
            output: {
                comments: /.*/g
            },
            outSourceMap: "main.js.map"
        }))
        .pipe(gulp.dest('dist'));
});
```


## API

You can also pass any uglify options [listed here](https://github.com/mishoo/UglifyJS2#usage) to modify UglifyJS's behavior.

## License

MIT © [Ilya MIkhailov](https://github.com/cheshirsky)
