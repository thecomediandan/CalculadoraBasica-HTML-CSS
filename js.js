"use strict";
// Encontrando elementos
var input = document.querySelector(".operacion-calculadora");
var output = document.querySelector(".solucion-calculadora");
// Botones numéricos
var btn_0 = document.querySelector(".btn-0");
var btn_1 = document.querySelector(".btn-1");
var btn_2 = document.querySelector(".btn-2");
var btn_3 = document.querySelector(".btn-3");
var btn_4 = document.querySelector(".btn-4");
var btn_5 = document.querySelector(".btn-5");
var btn_6 = document.querySelector(".btn-6");
var btn_7 = document.querySelector(".btn-7");
var btn_8 = document.querySelector(".btn-8");
var btn_9 = document.querySelector(".btn-9");
// Botones de operaciones
var btn_sum = document.querySelector(".btn-sum");
var btn_men = document.querySelector(".btn-men");
var btn_prod = document.querySelector(".btn-prod");
var btn_div = document.querySelector(".btn-div");
// Botones de control
var btn_punto = document.querySelector(".btn-punto");
var btn_masmenos = document.querySelector(".btn-masmenos");
var btn_porcentaje = document.querySelector(".btn-porcentaje");
var btn_parentesis = document.querySelector(".btn-parentesis");
var btn_clear = document.querySelector(".btn-C");
var btn_borrar = document.querySelector(".btn-borrar");
var btn_igual = document.querySelector(".btn-igual");
// Botones de opciones
var btn_historial = document.querySelector(".btn-historial");
var btn_conversor = document.querySelector(".btn-conversor");
var btn_avanzado = document.querySelector(".btn-avanzado");

// Funciones

var flag_1 = false;
// Eventos
btn_1.addEventListener('click', () => {
    input.value += '1';
    flag_1 = true;
});
btn_2.addEventListener('click', () => {
    input.value += '2';
    flag_1 = true;
});
btn_3.addEventListener('click', () => {
    input.value += '3';
    flag_1 = true;
});
btn_4.addEventListener('click', () => {
    input.value += '4';
    flag_1 = true;
});
btn_5.addEventListener('click', () => {
    input.value += '5';
    flag_1 = true;
});
btn_6.addEventListener('click', () => {
    input.value += '6';
    flag_1 = true;
});
btn_7.addEventListener('click', () => {
    input.value += '7';
    flag_1 = true;
});
btn_8.addEventListener('click', () => {
    input.value += '8';
    flag_1 = true;
});
btn_9.addEventListener('click', () => {
    input.value += '9';
    flag_1 = true;
});
btn_0.addEventListener('click', () => {
    input.value += '0';
});


btn_sum.addEventListener('click', () => {
    if (flag_1) {
        input.value += '+';
        flag_1 = false;
    }
});
btn_men.addEventListener('click', () => {
    if (flag_1) {
        input.value += '-';
        flag_1 = false;
    }
});
btn_prod.addEventListener('click', () => {
    if (flag_1) {
        input.value += '*';
        flag_1 = false;
    }
});
btn_div.addEventListener('click', () => {
    if (flag_1) {
        input.value += '/';
        flag_1 = false;
    }
});


btn_clear.addEventListener('click', () => {
    input.value = '';
    output.textContent = '0';
});
btn_borrar.addEventListener('click', () => {
    let new_value = input.value + '';
    input.value = new_value.substring(0,new_value.length - 1);
});
btn_igual.addEventListener('click', () => {
    let exp = input.value + '';
    output.textContent = eval(exp);
});

