'use strict';

var error = "ERROR";

function calcPhrase() {
    var massife = document
        .getElementById("calcPhrase_in")
        .value
        .match(/\d+(\.\d+)?|([+\-*\/=])/g);

    var result;

    check(massife);

    var operations = {
        "+": function (x, y) {
            return x + y
        },

        "-": function (x, y) {
            return x - y
        },

        "*": function (x, y) {
            return x * y
        },

        "/": function (x, y) {
            return y !== 0 ? x / y : 0
        }
    };

    result = massife[0];
    for (var i = 1; i + 2 < massife.length; i += 2) {
        result = operations[massife[i]](Number(result), Number(massife[i + 1]))
    }

    document.getElementById("calcPhrase_out").value = result
}


function duplicateIsEvil() {

    var pattern,
        regexp,
        massif,
        result,
        begin,
        temp;

    try {
        pattern = document.getElementById("input_two").value;
        //g - global search
        //i - register
        //m - multilines
        regexp = /[^\s.?,;:!]+/gim;
        massif = pattern.match(regexp);
        begin = massif[0];
        alert(begin);
        var begin2 = regexp.exec(pattern);
        alert(begin2);
        result = pattern;

        if (massif == null) {
            document.getElementById("die").value = result
        }


        for (var i = 0; i < begin.length; i++) {
            var searchChar = new RegExp(begin[i], "i");
            temp = 0;
            for (var j = 0; j < massif.length; j++) {
                if (searchChar.test(massif[j])) {
                    temp++
                }
            }
            if (temp === massif.length) {
                result = result.replace(new RegExp(begin[i], "gi"), "")
            }
        }
        document.getElementById("die").value = result
    }
    catch {
        document.getElementById("die").value = error
    }
}

function datetimeParse() {

    const formatDate = (date, pattern, locale = undefined) => {
        String.prototype.addZero = function () {
            return this.padStart(2, '0')
        }

        const ReworkMonth = newValue => {
            return (match, offset, string) => {
                const isAlone = (string.slice(offset - 1, offset) !== 'M' && string.slice(offset + match.length, offset + match.length + 1) !== 'M')
                return isAlone ? newValue : match
            }
        }

        return pattern
            .replace(/y{5,}/g, 'yyyy')
            .replace(/yyyy/g, date.getFullYear())
            .replace(/yy/g, date.getFullYear().toString().slice(2))
            .replace(/d{3,}/g, 'dd')
            .replace(/dd/g, date.getDate().toString().addZero())
            .replace(/d/g, date.getDate())
            .replace(/H{3,}/g, 'HH')
            .replace(/HH/g, date.getHours().toString().addZero())
            .replace(/H/g, date.getHours())
            .replace(/h{3,}/g, 'hh')
            .replace(/hh/g, ((date.getHours() % 12) || 12).toString().addZero())
            .replace(/h/g, ((date.getHours() % 12) || 12).toString())
            .replace(/m{3,}/g, 'mm')
            .replace(/mm/g, date.getMinutes().toString().addZero())
            .replace(/m/g, date.getMinutes())
            .replace(/s{3,}/g, 'ss')
            .replace(/ss/g, date.getSeconds().toString().addZero())
            .replace(/s/g, date.getSeconds())
            .replace(/M{5,}/g, 'MMMM')
            .replace(/MM/g, ReworkMonth((date.getMonth() + 1).toString().addZero()))
            .replace(/M/g, ReworkMonth((date.getMonth() + 1)))
            .replace(/MMMM/g, date.toLocaleString(locale, {month: 'long'}))
            .replace(/MMM/g, date.toLocaleString(locale, {month: 'short'}))
    };

    Date.prototype.format = function (pattern, locale = undefined) {
        return formatDate(this, pattern, locale)
    }

    if (!isEmpty(document.getElementById("datetime_in").value) || !isEmpty(document.getElementById("pattern").value)) {
        document.getElementById("datetime_out").value = ((new Date(document.getElementById("datetime_in").value)).format(document.getElementById("pattern").value, 'en'))
    }
    else {
        document.getElementById("datetime_out").value = "DATE OR MASK IS EMPTY"
    }
}

//1 task
function check(massife) {
    if (massife.filter(
            function (x) {
                return x === "="
            }).length !== 1 && massife[massife.lastIndex] !== "=") {
        document.getElementById("calcPhrase_out").value = error
    }
    for (let i = 0; i < massife.length; i++) {
        if (i % 2 === 0 && isNaN(massife[i])) {
            document.getElementById("calcPhrase_out").value = error
        }
        if (i % 2 === 1 && !isNaN(massife[i])) {
            document.getElementById("calcPhrase_out").value = error
        }
    }
    return true
}

//3 task
function isEmpty(str) {
    if (str.trim() === '') {
        return true
    }
    return false
}