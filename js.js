import {_operacion_parentesis as fun_p} from './basic_operation.js';
import {_validacion_parentesis as fun_parentesis,_validacion_masmenos as fun_masmenos,_validacion_porcentaje as fun_porcentaje,_validacion_punto as fun_punto,_validacion_operandos as fun_ope, _validacion_nums as fun_nums,_validacion_0 as fun_btn0} from './validation.js';
//import {_operacion_parentesis as fun_p} from './operacion_general.js';
"use strict";
// * Encontrando elementos
var input = document.querySelector(".operacion-calculadora");
var output = document.querySelector(".solucion-calculadora");
// * Botones numéricos
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
// * Botones de operaciones
var btn_sum = document.querySelector(".btn-sum");
var btn_men = document.querySelector(".btn-men");
var btn_prod = document.querySelector(".btn-prod");
var btn_div = document.querySelector(".btn-div");
// * Botones de control
var btn_punto = document.querySelector(".btn-punto");
var btn_masmenos = document.querySelector(".btn-masmenos");
var btn_porcentaje = document.querySelector(".btn-porcentaje");
var btn_parentesis = document.querySelector(".btn-parentesis");
var btn_clear = document.querySelector(".btn-C");
var btn_borrar = document.querySelector(".btn-borrar");
var btn_igual = document.querySelector(".btn-igual");
// * Botones de opciones
var btn_historial = document.querySelector(".btn-historial");
// var btn_conversor = document.querySelector(".btn-conversor");
// var btn_avanzado = document.querySelector(".btn-avanzado");

// * Funciones


// * Eventos

// ? Numeros
btn_1.addEventListener('click', () => {
    input.value = fun_nums(input.value, '1');
});
btn_2.addEventListener('click', () => {
    input.value = fun_nums(input.value, '2');
});
btn_3.addEventListener('click', () => {
    input.value = fun_nums(input.value, '3');
});
btn_4.addEventListener('click', () => {
    input.value = fun_nums(input.value, '4');
});
btn_5.addEventListener('click', () => {
    input.value = fun_nums(input.value, '5');
});
btn_6.addEventListener('click', () => {
    input.value = fun_nums(input.value, '6');
});
btn_7.addEventListener('click', () => {
    input.value = fun_nums(input.value, '7');
});
btn_8.addEventListener('click', () => {
    input.value = fun_nums(input.value, '8');
});
btn_9.addEventListener('click', () => {
    input.value = fun_nums(input.value, '9');
});
btn_0.addEventListener('click', () => {
    input.value += fun_btn0(input.value);
});

// ? Operaciones básicas
btn_sum.addEventListener('click', () => {
    input.value = fun_ope(input.value, '+');
});
btn_men.addEventListener('click', () => {
    input.value = fun_ope(input.value, '-');
});
btn_prod.addEventListener('click', () => {
    input.value = fun_ope(input.value, '*');
});
btn_div.addEventListener('click', () => {
    input.value = fun_ope(input.value, '/');
});

// ? Operaciones de solucion
btn_punto.addEventListener('click', () => {
    input.value = fun_punto(input.value, '.');
});
btn_masmenos.addEventListener('click', () => {
    input.value = fun_masmenos(input.value, '(-');
});
btn_porcentaje.addEventListener('click', () => {
    input.value = fun_porcentaje(input.value, '%');
});
btn_parentesis.addEventListener('click', () => {
    input.value = fun_parentesis(input.value);
});
btn_clear.addEventListener('click', () => {
    input.value = '';
    output.textContent = '';
});
btn_borrar.addEventListener('click', () => {
    let new_value = input.value + '';
    input.value = new_value.substring(0,new_value.length - 1);
});
btn_igual.addEventListener('click', () => {
    let exp = input.value + '';
    if (exp != '') {
        //let myOperation = new ob(exp);
        // output.textContent = eval(exp);
        output.textContent = fun_p(exp);
    }
});

