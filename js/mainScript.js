'use strict'

var error = "ERROR"

function calcPhrase() {
    var massife = document
        .getElementById("calcPhrase_in")
        .value
        .match(/\d+(\.\d+)?|([+\-*\/=])/g)

    var result

    check(massife)

    var operations = {
        "+" : function (x, y) {
            return x + y
        },

        "-" : function (x, y) {
            return x - y
        },

        "*" : function (x, y) {
            return x * y
        },

        "/" : function (x, y) {
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
        temp

    try {
        pattern = document.getElementById("input_two").value
        //g - global search
        //i - register
        //m - multilines
        regexp = /[^\s.?,;:!]+/gim
        massif = pattern.match(regexp);
        begin = massif[0]
        alert(begin)
        var begin2 = regexp.exec(pattern)
        alert(begin2)
        result = pattern

        if (massif == null) {
            document.getElementById("die").value = result
        }


        for (var i = 0; i < begin.length; i++) {
            var searchChar = new RegExp(begin[i], "i")
            temp = 0
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
        throw new Error()
    }
}

function datetimeParse() {

    var date = new Date(document.getElementById("datetime_in").value)
    var pattern = document.getElementById("pattern").value
    var result

    pattern = pattern.replace(/yyyy/g, date.getFullYear())
    pattern = pattern.replace(/yy/g, date.getFullYear() % 100 >= 10 ?
        date.getFullYear() % 100 : "0" + date.getFullYear() % 100)
    pattern = pattern.replace(/MMMM/g, date.toLocaleString("ru", { month: "long"} ))
    pattern = pattern.replace(/MMM/g, date.toLocaleString("ru", { month: "short" }))
    pattern = pattern.replace(/MM/g, date.getMonth() + 1 >= 10 ? date.getMonth() + 1 : "0" + (date.getMonth() + 1))
    pattern = pattern.replace(/M/g, date.getMonth() + 1)
    pattern = pattern.replace(/dd/g, date.getDate() >= 10 ? date.getDate() : "0" + date.getDate())
    pattern = pattern.replace(/d/g, date.getDate())
    pattern = pattern.replace(/HH/g, date.getHours() >= 10 ? date.getHours() : "0" + date.getHours())
    pattern = pattern.replace(/H/g, date.getHours())
    pattern = pattern.replace(/hh/g, getHours(date.getHours(), true))
    pattern = pattern.replace(/h/g, getHours(date.getHours(), false))
    pattern = pattern.replace(/mm/g, date.getMinutes() >= 10 ? date.getMinutes() : "0" + date.getMinutes())
    pattern = pattern.replace(/m/g, date.getMinutes())
    pattern = pattern.replace(/ss/g, date.getSeconds() >= 10 ? date.getSeconds() : "0" + date.getSeconds())
    pattern = pattern.replace(/s/g, date.getSeconds())

    document.getElementById("datetime_out").value = pattern
}

function check(massife){
    if (massife.filter(
        function (x) {
            return x === "="
        }).length !== 1 && massife[massife.lastIndex] !== "=") {
        document.getElementById("calcPhrase_out").value = error
        throw new Error()
    }
    for (let i = 0; i < massife.length; i++) {
        if (i % 2 === 0 && isNaN(massife[i])) {
            document.getElementById("calcPhrase_out").value = error
            throw new Error()
        }
        if (i % 2 === 1 && !isNaN(massife[i])) {
            document.getElementById("calcPhrase_out").value = error
            throw new Error()
        }
    }
    return true
}

function getHours(hours, zero) {
    if (hours >= 0 && hours <= 9) {
        return zero ? "0" + hours : hours
    }
    if (hours >= 10 && hours <= 12) {
        return hours
    }
    if (hours >= 13 && hours <= 21) {
        return zero ? "0" + hours % 12 : hours % 12
    }
    if (hours >= 22 && hours < 24) {
        return hours % 12 !== 0 ? hours % 12 : "00"
    }
}