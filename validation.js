'use strict';

function _numParentesis( operacion ) {

  let op = operacion + '';
  let _regla1 = new RegExp(/[\(]/, 'g');
  let _regla2 = new RegExp(/[\)]/, 'g');

  let num_parentesis_A = [];
  let num_parentesis_B = [];

  let i;
  while(i=_regla1.exec(op)) {
    num_parentesis_A.push(i['index']);
    //console.log(i);
  }
  console.log('Cantidad de \'(\' : ' + num_parentesis_A.length);

  let j;
  while(j=_regla2.exec(op)) {
    num_parentesis_B.push(j['index']);
    //console.log(j);
  }
  console.log('Cantidad de \')\' : ' + num_parentesis_B.length);

  return [num_parentesis_A.length,num_parentesis_B.length];
}

//console.log(_numParentesis('(ghfyg(dftgh()'));

export function _validacion_parentesis( operacion ) {

  let op = operacion + '';

  if (op == '') {
    return '(';
  }

  if (op.endsWith('.')) {
    return op;
  }

  if (op.endsWith('+') || op.endsWith('-') || op.endsWith('/') || op.endsWith('*') || op.endsWith('(')) {
    return op + '(';
  }

  let nums = _numParentesis(op);
  if (nums[0] - nums[1] > 0) {
    return op + ')';
  }else {
    return op + '*(';
  }

}

export function _validacion_masmenos( operacion, masmenos ) {
  let op = operacion + '';
  let op_aux = op.substring(op.length - 2, op.length); 
 
  if(op_aux == masmenos) {
    return op.substring(0, op.length - 2);
  }

  if (op.endsWith('.')) {
    return op;
  }

  if (op.endsWith('%') || op.endsWith(')')) {
    return op + '*' + masmenos;
  }

  if (op.endsWith('+') || op.endsWith('-') || op.endsWith('/') || op.endsWith('*') || op.endsWith('(')) {
    return op + masmenos;
  }

  let indice_min = 0;
  op.lastIndexOf('(-') < 0 ? indice_min = 0: indice_min = op.lastIndexOf('(-') + 2;
  let num_de_prueba = op.substring(indice_min, op.length);
  let operandos = [0,0,0,0,0]; // ? 0: '+', 1: '-', 2: '*', 3: '/', 4: '('

  operandos[0] = op.lastIndexOf('+');
  operandos[1] = op.lastIndexOf('-');
  operandos[2] = op.lastIndexOf('*');
  operandos[3] = op.lastIndexOf('/');
  operandos[4] = op.lastIndexOf('(');
  console.log(operandos)
  operandos.sort((a, b) => a - b);
  console.log(operandos)
  let bloque = op.substring(0, operandos[4] + 1);
  let num = op.substring(operandos[4] + 1, op.length);
  console.log('bloque: '+bloque)
  console.log('num prueba: '+num_de_prueba)
  console.log('num: '+num)
  if (indice_min == 0) {
    return bloque + '(-' + num;
  }

  if (bloque.substring(bloque.length - 2, bloque.length) == '(-') {
    return bloque.substring(0, bloque.length - 2) + num;
  } else {
    return bloque + '(-' + num;
  }
  return op;
}

export function _validacion_porcentaje( operacion, porcentaje ) {
  let op = operacion + '';

  if (op == '') {
    return '';
  }
  if (op.endsWith('+') || op.endsWith('-') || op.endsWith('/') || op.endsWith('*') || op.endsWith('(') || op.endsWith('.') || op.endsWith('%')) {
    return op;
  }
  
  return op + porcentaje;
}

export function _validacion_punto( operacion, punto ) {
  let op = operacion + '';

  if (op == '') {
    return '';
  }
  if (op.endsWith('+') || op.endsWith('-') || op.endsWith('/') || op.endsWith('*') || op.endsWith('(') || op.endsWith('.') || op.endsWith('%')) {
    return op;
  }

  let num_de_prueba = op.substring(op.lastIndexOf('.') + 1, op.length);

  if (op != num_de_prueba) {
    if (!num_de_prueba.includes('+') && !num_de_prueba.includes('-') &&!num_de_prueba.includes('/') && !num_de_prueba.includes('*') ) {
      return op;
    }
  }
  
  return op + punto;
}

export function _validacion_operandos( operacion, operando ) {
  let op = operacion + '';

  if (op == '') {
    return '';
  }

  if (op.endsWith('(') && operando == '-') {
    return op + operando;
  }

  if (op.endsWith('+') || op.endsWith('-') || op.endsWith('/') || op.endsWith('*') || op.endsWith('(') || op.endsWith('.')) {
    return op;
  }

  return op + operando;
}

export function _validacion_nums( operacion, num ) {
  let op = operacion + '';
  let sub_op = op.substring(0, op.length - 1);

  if (op == '0') {
    return `${num}`;
  }
  if (op.endsWith('0')) {
    if (sub_op.endsWith('+') || sub_op.endsWith('-') || sub_op.endsWith('/') || sub_op.endsWith('*') || sub_op.endsWith('(')) {
      return sub_op + num;
    }
  }
  if (op.endsWith('%')) {
    return op;
  }

  return op + num;
}

export function _validacion_0( operacion ) {
  let op = operacion + '';
  if (op == '') {
    return '0';
  }
  if (op == '0') {
    return '';
  }
  if (op.endsWith('0')) {
    let sub_op = op.substring(0, op.length - 1);
    if (sub_op.endsWith('+') || sub_op.endsWith('-') || sub_op.endsWith('/') || sub_op.endsWith('*') || sub_op.endsWith('(')) {
      return '';
    }
  }
  if (op.endsWith('%')) {
    return op;
  }

  return '0';
}