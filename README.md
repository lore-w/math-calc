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
    width: 100px+100px;
    width: 100px + 100px;
    width: 100px   +        100px;

    height: 100px - 100.0px;
    height: 100px - 50;
    height: -10px - -50;
    height: -10px - -50px;

    border: 1 * 2px solid #fafafa;
    border: 1px * 2px solid #fafafa;

    margin: 1/1px 2.1 / 10px 10px / -2 1px     /2px;

    background: 100% / 2;
}
```
### Output
```css
#demo {
    width: 200px;
    width: 200px;
    width: 200px;

    height: 0px;
    height: 50px;
    height: 40px;
    height: 40px;

    border: 2px solid #fafafa;
    border: 2px solid #fafafa;

    margin: 1px 0.21px -5px 0.5px;

    background: 50%;
}
```

## TIPS
Please use this plugin after variable plugin

## LICENSE

MIT.