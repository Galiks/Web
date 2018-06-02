'use strict';

var btnOne = document.getElementById('task_one_button'),
    btnTwo = document.getElementById('task_two_button'),
    btnThr = document.getElementById('task_third_button'),
    inputOne = document.getElementById('task_one_input'),
    inputTwo = document.getElementById('task_two_input'),
    inputThr = document.getElementById('task_third_input'),
    outputOne = document.getElementById('task_one_output'),
    outputTwo = document.getElementById('task_two_output'),
    outputThr = document.getElementById('task_third_output');

btnOne.addEventListener('click', function () {
    outputOne.innerHTML = calculator(inputOne.value);
});
btnTwo.addEventListener('click', function () {
    outputTwo.innerHTML = deleteRepeat(inputTwo.value);
});

function calculator(str) {
    var massif,
        result,
        err = "Что-то не так";

    str = str.replace(/[^-+*/.\d=]/g, '').replace(/(\d-)+?/g, "$1 ");

    if (!str.length)
        return err;

    massif = str.match(/(-?\d+(\.\d+)?|[-+/*])(?=.*=)/g);
    /*Выбираем отрицательные/положительные целые или дробные числа,
        или оператор. Возращаем массив из всех совпадений*/

    if (!massif)
        return err;

    result = +massif[0];
    for (var i = 0; (2 * i + 1) < massif.length; i++) {
        try {//Отлавливаем ошибку, если были введены некорректные данные
            //Последовательно вычисляем выражение из строки
            result = doCalculator(result, massif[2 * i + 1], +massif[(i + 1) * 2]);
            if (isNaN(result)) throw new SyntaxError("Ошибка в вычислении");
        } catch (e) {
            console.log(e.name + ': ' + e.message);
            return err;
        }
    }

    return result.toFixed(2);

    function doCalculator(a, operator, b) {
        switch (operator) {
            case "+":
                a += b;
                break;
            case "-":
                a -= b;
                break;
            case "*":
                a *= b;
                break;
            case "/":
                a /= b;
                break;
        }
        return a;
    }
};

function deleteRepeat(str) {
    var err = "Что-то не так",
        massif;

    if (!str)
        return err;

    massif = str.match(/[^\s.?,;:!=]+/gi);//Разбиваем строку на отдельные слова

    if (!massif)
        return str;//Т.к в случае, если совпадений не было, match возвращает null, то проверяем на наличие совпадений

    var start = massif[0],
        state = false,
        regexp;

    for (var i = 0; i < start.length; i++) {//Берем символ из первого слова
        for (var j = 1; j < massif.length; j++) {//и пробегаемся по всем словам
            if (!~massif[j].indexOf(start.charAt(i))) {//Если нет совпадения
                state = false;//возвращаем false
                break;// и прекращаем дальнейший поиск в словах
            }
            state = true;//вернем true, если символ присутствует в каждом слове
        };

        if (!state) continue;

        regexp = new RegExp(start.charAt(i), 'gi');
        str = str.replace(regexp, '');//Удаляем символ, присутствующий в каждом слове
    }
    return str;
};

Date.prototype.format = function workWithDate(str) {
    var Months = ["January", "February", "Мarch", "April", "Мay", "June", "July", "August", "September", "October", "November", "December"];
    str = str.replace(/yyyy/g, this.getUTCFullYear());
    str = str.replace(/yy/g, this.getUTCFullYear() % 100);
    str = str.replace(/dd/g, secondZero(this.getDate()));
    str = str.replace(/d/g, this.getDate());
    str = str.replace(/HH/g, secondZero(this.getHours()));
    str = str.replace(/H/g, this.getHours());
    str = str.replace(/hh/g, secondZero(Math.floor(this.getHours() / 2)));
    str = str.replace(/h/g, Math.floor(this.getHours() / 2));
    str = str.replace(/mm/g, secondZero(this.getMinutes()));
    str = str.replace(/m/g, this.getMinutes());
    str = str.replace(/ss/g, secondZero(this.getSeconds()));
    str = str.replace(/s/g, this.getSeconds());
    if (str.indexOf("MMMM") !== -1 | str.indexOf("MMM") != -1) {
        str = str.replace(/MMMM/g, Months[this.getMonth()]);
        str = str.replace(/MMM/g, Months[this.getMonth()].substr(0, 3));
    }
    else {
        str = str.replace(/MM[\s\W]/g, secondZero(this.getMonth() + 1) + " ");
        str = str.replace(/M[\s\W]/g, this.getMonth() + 1 + " ");
    }
    return str;
}

function test() {
    var year = document.getElementById("year").value
    var month = document.getElementById("month").value
    var day = document.getElementById("day").value
    var hour = document.getElementById("hour").value
    var minute = document.getElementById("minute").value
    var second = document.getElementById("second").value
    var mask = document.getElementById("mask").value

    const months = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"]


    var masks =
        {
            yy : year.substring(year.length/2,year.length),
            yyyy : year,
            M : month[1],
            MM : month,
            MMM : new Date(year,day,month).toString().split(' ')[1],
            MMMM : months[new Date(year,day,month).getMonth()] ,
            d : day[1],
            dd : day,
            H : new Date(year + "-" + month + "-" + day + " " + hour + ":" + minute  + " PM").getHours()%10,
            HH: new Date(year + "-" + month + "-" + day + " " + hour + ":" + minute  + " PM").getHours(),
            h : new Date(year + "-" + month + "-" + day + " " + hour + ":" + minute  + " AM").getHours()%10 ,
            hh :new Date(year + "-" + month + "-" + day + " " + hour + ":" + minute  + " AM").getHours() ,
            m : minute[1],
            mm : minute,
            s : second[1],
            ss : second
        }

    var result = mask
    result = result.replace(/yyyy/g,masks.yyyy)
    result = result.replace(/yy/g,masks.yy)
    result = result.replace(/MMMM/g,masks.MMMM)
    result = result.replace(/MMM/g,masks.MMM)
    result = result.replace(/MM/g,masks.MM)
    result = result.replace(/M/g,masks.M)
    result = result.replace(/dd/g,masks.dd)
    result = result.replace(/d/g,masks.d)
    result = result.replace(/HH/g,masks.HH)
    result = result.replace(/H/g,masks.H)
    result = result.replace(/hh/g,masks.hh)
    result = result.replace(/h/g,masks.h)
    result = result.replace(/mm/g,masks.mm)
    result = result.replace(/m/g,masks.m)
    result = result.replace(/ss/g,masks.ss)
    result = result.replace(/s/g,masks.s)

    alert(result)
}

function datetimeParse() {
    var now = new Date(document.forms["third"].elements["data"].value)
    alert(now.format(document.forms["third"].elements["mask"].value))
    alert(now)
}

Date.prototype.format = function (str) {
    var Months = ["January", "February", "Мar", "April", "Мay", "June", "July", "August", "September", "October", "November", "December"]

    str = str.replace(/yyyy/g, this.getUTCFullYear())
    str = str.replace(/yy/g, this.getUTCFullYear() % 100)
    str = str.replace("dd", secondZero(this.getDate()))
    str = str.replace("d", this.getDate())
    str = str.replace(/HH/g, secondZero(this.getHours()))
    str = str.replace(/H/g, this.getHours())
    str = str.replace(/hh/g, secondZero(Math.floor(this.getHours() / 2)))
    str = str.replace(/h/g, Math.floor(this.getHours() / 2))
    str = str.replace(/mm/g, secondZero(this.getMinutes()))
    str = str.replace(/m/g, this.getMinutes())
    str = str.replace("ss", secondZero(this.getSeconds()))
    str = str.replace("s", this.getSeconds())

    if (str.indexOf("MMMMM") != -1 | str.indexOf("MMM") != -1) {
        str = str.replace(/MMMM/g, Months[this.getMonth()])
        str = str.replace(/MMM/g, Months[this.getMonth()].substr(0, 3))
    }

    str = str.replace(/MM[\s\W]/g, secondZero(this.getMonth() + 1) + " ")
    str = str.replace(/M[\s\W]/g, this.getMonth() + 1 + " ")

    alert(str)
}

function getHourWithZero(hours, zero) {
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

function secondTry3Task() {

    var testing;

    var date = new Date(document.getElementById("datetime_in").value);
    var pattern = document.getElementById("pattern").value; //^(h)|(h)$| (h)
    var result = pattern.match(/[y]{2,4}|[m]{1,2}|[M]{1,4}|[h]{1,2}|[d]{1,2}|[s]{1,2}|[H]{1,2}/g);
///[y]{2,4}|[M]{1,4}|[d]{1,2}|[H]{1,2}|[h]{1,2}|[m]{1,2}|[s]{1,2}/g
///[y]{2,4}|[M]{1,4}|[d]{1,2}|[H]{1,2}|^(h{1,2})|(h{1,2})$| (h{1,2})|[m]{1,2}|[s]{1,2}/g

    if (result.length > 0) {
        for (let i = 0; i < result.length; i++) {
            // alert(result[i])
            pattern = findAndReplace(result[i], pattern, date)
        }
    }
    else {
        document.getElementById("datetime_out").value = error
    }


    function findAndReplace(value, pattern, date) {
        switch (value) {
            case 'yyyy':
                return pattern.replace(/yyyy/g, date.getFullYear());
            case 'yy':
                return pattern.replace(/yy/g, date.getFullYear() % 100 >= 10 ? date.getFullYear() % 100 : "0" + date.getFullYear() % 100);
            case 'MMMM':
                return pattern.replace(/MMMM/g, date.toLocaleString("en", {month: "long"}));
            case 'MMM':
                return pattern.replace(/MMM/g, date.toLocaleString("en", {month: "short"}));
            case 'MM':
                return pattern.replace(/MM/g, date.getMonth() + 1 >= 10 ? date.getMonth() + 1 : "0" + (date.getMonth() + 1));
            case 'M':
                return pattern.replace(/M/g, date.getMonth() + 1);
            case "dd":
                return pattern.replace(/dd/g, date.getDate() >= 10 ? date.getDate() : "0" + date.getDate());
            case "d":
                return pattern.replace(/d/g, date.getDate());
            case "HH":
                return pattern.replace(/HH/g, date.getHours() >= 10 ? date.getHours() : "0" + date.getHours());
            case "H":
                return pattern.replace(/H/g, date.getHours());
            case "hh":
                return pattern.replace(/hh/g, getHourWithZero(date.getHours(), true));
            case "h":
                return pattern.replace(/h/g, getHourWithZero(date.getHours(), false));
            case "mm":
                return pattern.replace(/mm/g, date.getMinutes() >= 10 ? date.getMinutes() : "0" + date.getMinutes());
            case "m":
                return pattern.replace(/m/g, date.getMinutes());
            case "ss":
                return pattern.replace(/ss/g, date.getSeconds() >= 10 ? date.getSeconds() : "0" + date.getSeconds());
            case "s":
                return pattern.replace(/s/g, date.getSeconds());
            default:
                return pattern
        }
    }

    document.getElementById("datetime_out").value = pattern
}