## math-calc

math-calc is a simpleset and fast postcss plugin allows you write `+` `-` `*` `/` in your css


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

### Input
```css
#demo {
    width: 100px    + 100px;
    height: 200px * 2;
    border: 2 / 2px solid #fafafa;
    margin: 10px +2px 3 * 2px 4px / 2 20px - 10px;
}
```
### Output
```css
#demo {
    width: 200px;
    height: 400px;
    border: 1px solid #fafafa;
    margin: 12px 6px 2px 10px;
}
```

## LICENSE

MIT.