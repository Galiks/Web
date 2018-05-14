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
btnThr.addEventListener('click', function () {
    outputThr.innerHTML = (inputThr.value);
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
    str = str.replace(/dd/g, NumTwoDig(this.getDate()));
    str = str.replace(/d/g, this.getDate());
    str = str.replace(/HH/g, NumTwoDig(this.getHours()));
    str = str.replace(/H/g, this.getHours());
    str = str.replace(/hh/g, NumTwoDig(Math.floor(this.getHours() / 2)));
    str = str.replace(/h/g, Math.floor(this.getHours() / 2));
    str = str.replace(/mm/g, NumTwoDig(this.getMinutes()));
    str = str.replace(/m/g, this.getMinutes());
    str = str.replace(/ss/g, NumTwoDig(this.getSeconds()));
    str = str.replace(/s/g, this.getSeconds());
    if (str.indexOf("MMMM") != -1 | str.indexOf("MMM") != -1) {
        str = str.replace(/MMMM/g, Months[this.getMonth()]);
        str = str.replace(/MMM/g, Months[this.getMonth()].substr(0, 3));
    }
    else {
        str = str.replace(/MM[\s\W]/g, NumTwoDig(this.getMonth() + 1) + " ");
        str = str.replace(/M[\s\W]/g, this.getMonth() + 1 + " ");
    }
    return str;
}