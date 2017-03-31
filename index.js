/*
 *@description: math-calc
 *@author: lore-w metro-cpu@hotmail.com
 *@time: 2017/03/16
 */

"use strict";

let postcss = require('postcss'),
    _ = require('lodash');

module.exports = postcss.plugin('mathCalc', function mathCalc(options) {

    return function(css) {

        function errMessage(decl, message) {

            throw decl.error(message, { plugin: 'math-calc' });
        }

        let expReg = /[-+.]?[\d.]+[A-Z%]{0,3}\s*[-+*/]\s*[-+.]?[\d.]+[A-Z%]{0,3}/gi,
            expFirstReg = /[-+.]?[\d.]+[A-Z%]{0,3}\s*[-+*/]\s*[-+.]?[\d.]+[A-Z%]{0,3}/i,
            unitReg = /[A-Z%]{1,3}/gi;

        css.walkRules(function(rule) {

            rule.walkDecls(function(decl, i) {

                let matchArr = decl.value.match(expReg),
                    declValue,
                    unitArr,
                    exp;

                // length < 200 排除base64等其它情况
                if (!_.isNull(matchArr) && decl.value.length < 200) {

                    declValue = decl.value;

                    _.forEach(matchArr, function(val, index) {

                        if (val.indexOf('++') > 0 || val.indexOf('--') > 0) {

                            errMessage(decl, 'SYNTAX ERROR');

                            return;
                        }

                        unitArr = _.uniq(val.match(unitReg));

                        if (unitArr.length > 1) {

                            errMessage(decl, 'UNIT ERROR');

                            return;
                        }

                        exp = val.replace(unitReg, '');

                        try {

                            declValue = declValue.replace(expFirstReg, eval(exp) + unitArr[0]);
                        }
                        catch (err) {

                            errMessage(decl, 'SYNTAX ERROR');

                            return;
                        }
                    });
                    decl.value = declValue;
                }
            });
        });
    }
});