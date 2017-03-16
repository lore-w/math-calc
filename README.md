## Postcss-math-calc

### Usage

#### Gulp
```js
var gulp = require('gulp');
var postcss = require('postcss');
var calc = require('math-calc');

gulp.task('css', function() {
  var processors = [calc];
  return gulp.src('./src/*.css')
    .pipe(postcss(processors))
    .pipe(gulp.dest('./dest'));
});
```

### Example
+ `width: 2px + 3px` 对
+ `width: 2px+3px` 对
+ `width: 2px     +3px` 对
+ `width: 2px+3` 错
+ `width: 2px*3` 对
+ `width: 2px*3px` 错
+ `width: 2px/3` 对
+ `width: 2px%3` 对
+ ()//TODO

### Tips
如果css中定义了变量，确保使用改模块前已经有其他模块对变量进行转换

## LICENSE

MIT.