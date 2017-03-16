/*
 *@description: math-calc
 *@author: lore-w metro-cpu@hotmail.com
 *@time: 2017/03/16
 */

"use strict";

let postcss = require('postcss'),
    gutil = require('gulp-util'),
    _ = require('lodash');

module.exports = postcss.plugin('mathCalc', function mathCalc(options) {

    return function(css) {

        function isUnitEq (v1, v2) {

            return v1 === v2;
        }

        function unitRepeat (v1, v2) {

            return v1 && v2;
        }

        function setValueUnit (val, unit) {

            return val === 0 ? 0 : val + unit;
        }

        function errMessage(message) {

            throw new gutil.PluginError("math-calc", message);
            return;
        }

        let regExp = /\d+[a-zA-Z]+\s*[-+*/%]\s*\d+[a-zA-Z]*/gi,
            regFirstExp = /\d+[a-zA-Z]+\s*[-+*/%]\s*\d+[a-zA-Z]*/i,
            regOperator = /[-+*/%]/,
            reg = /(\d+)([a-zA-Z]*)/;

        css.walkRules(function(rule) {

            rule.walkDecls(function(decl, i) {

                let matchArr = decl.value.match(regExp),
                    declValue,
                    operator,
                    value,
                    valueL,
                    valueR,
                    unit,
                    unitL,
                    unitR

                if (!_.isNull(matchArr)) {

                    declValue = decl.value;

                    _.forEach(matchArr, function(val, index) {

                        operator = val.match(regOperator)[0];
                        value = val.split(operator);
                        valueL = _.trim(value[0]).match(reg)[1] * 1;
                        valueR = _.trim(value[1]).match(reg)[1] * 1;
                        unitL = _.trim(value[0]).match(reg)[2];
                        unitR = _.trim(value[1]).match(reg)[2];
                        unit = unitL || unitR;

                        switch (operator) {

                            case '+':
                                if (!isUnitEq(unitL, unitR)) {
                                    errMessage('The unit is not the same');
                                } else {
                                    declValue = declValue.replace(regFirstExp, setValueUnit(valueL + valueR, unit));
                                }
                                break;
                            case '-':
                                if (!isUnitEq(unitL, unitR)) {
                                    errMessage('The unit is not the same');
                                } else {
                                    declValue = declValue.replace(regFirstExp, setValueUnit(valueL - valueR, unit));
                                }
                                break;
                            case '*':
                                if (unitRepeat(unitL, unitR)) {
                                    errMessage('Unit error');
                                } else {
                                    declValue = declValue.replace(regFirstExp, setValueUnit(valueL * valueR, unit));
                                }
                                break;
                            case '/':
                                if (unitRepeat(unitL, unitR)) {

                                    errMessage('Unit error');
                                } else if (valueR === 0) {

                                    errMessage('Zero divisor');
                                } else {

                                    declValue = declValue.replace(regFirstExp, setValueUnit(_.round(valueL / valueR, 3), unit));
                                }
                                break;
                            case '%':
                                if (unitRepeat(unitL, unitR)) {
                                    errMessage('Unit error');
                                } else {
                                    declValue = declValue.replace(regFirstExp, setValueUnit(valueL % valueR, unit));
                                }
                                break;
                        }
                    });
                    decl.value = declValue;
                }
            });
        });
    }
});