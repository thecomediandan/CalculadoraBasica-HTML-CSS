"use strict";
class OperacionBasica {
  constructor(operacion) {
    this.operacionEntrada = operacion + "";
    this.resultado = 0;
  }
  // * Este método nos ayuda a encontrar la ultima posición de un operando por medio del índice del String de la operación dada.
  encontrarUltimosOperandos(op) {
    let operacion = op + "";
    let ultimoOperando = {
      suma: 0,
      resta: 0,
      prod: 0,
      div: 0,
    };

    ultimoOperando.suma = operacion.lastIndexOf("+");
    ultimoOperando.resta = operacion.lastIndexOf("-");
    ultimoOperando.prod = operacion.lastIndexOf("*");
    ultimoOperando.div = operacion.lastIndexOf("/");

    return ultimoOperando;
  }

  // * Este método nos ayuda a encontrar la primera posición de un operando por medio del índice del String de la operación dada.
  encontrarPrimerosOperandos(op) {
    let operacion = op + "";
    let ultimoOperando = {
      suma: 0,
      resta: 0,
      prod: 0,
      div: 0,
    };

    ultimoOperando.suma = operacion.indexOf("+");
    ultimoOperando.resta = operacion.indexOf("-");
    ultimoOperando.prod = operacion.indexOf("*");
    ultimoOperando.div = operacion.indexOf("/");

    return ultimoOperando;
  }

  // * Este método nos ayuda a identificar el nombre del operando por su indice
  identificadorOperando(objOperandos, operando) {
    let op = operando;
    let objOp = objOperandos;
    if (op < 0) {
      op = "suma"; // Si no encuentra ningun signo, será 'suma' por defecto
    } else {
      if (objOp.suma == operando) op = "suma";
      if (objOp.resta == operando) op = "resta";
      if (objOp.prod == operando) op = "prod";
      if (objOp.div == operando) op = "div";
    }

    return op;
  }

  // * Retorna el signo (indice del ultimo signo), nombre del signo y el numero en cadena sea negativo o positivo sin signo.
  extraerUltimoNumero(op) {
    let operacion = op + "";
    let objOp = this.encontrarUltimosOperandos(operacion);
    let operandos = [objOp.suma, objOp.resta, objOp.prod, objOp.div];

    // ? Con sort y esa funcion ordenamos ascendentemente el arreglo de numeros, por comparacion, dos elementos cualquiera de la lista se comparan (a,b), la funcion retorna un valor numérico generalmente se resta los valores del parámetro como valor (a-b), este resultado se analiza y de acuerdo a el se ordena la lista. si el valor es menor que cero 'a' lleva un indice menor a 'b', si el valor es mayor a cero 'b' lleva un índice menor a 'a', si es igual a cero las posiciones se mantienen.
    let operandosOrdenados = operandos.sort(function (a, b) {
      return a - b;
    });

    let signo = operandosOrdenados[operandosOrdenados.length - 1];
    let nombreSigno = this.identificadorOperando(objOp, signo);
    let numero = operacion.substring(signo + 1);

    if (signo < 0) signo = 0;

    return [signo, nombreSigno, numero];
  }

  // * Retorna un numero en cadena, si es positivo solo el número y si es negativo con su signo negativo
  extraerPrimerNumero(op) {
    let operacion = op + "";
    let objOp = this.encontrarPrimerosOperandos(operacion);
    let operandos = [objOp.suma, objOp.resta, objOp.prod, objOp.div];

    let operandosOrdenados = operandos.sort(function (a, b) {
      return a - b;
    });

    let indice = -1;
    detetected_index: for (const i in operandosOrdenados) {
      if (operandosOrdenados[i] > 0) {
        indice = operandosOrdenados[i];
        break detetected_index;
      }
    }

    if (indice < 0) {
      indice = operacion.length;
    }

    let numero = operacion.substring(0, indice);

    return [indice, numero];
  }
  // * Retorna un valor númerico resultante del tipo float, que opera todas las sumas o restas de la operacion.
  // ! Para usar este método, el parametro debe estar limpio de otro tipo de operaciones ajenas a la suma o division.
  resolverSumaResta(operacion) {
    let op = operacion + "";
    let resultado = 0;
    // ? Para operar las sumas y restas, usamos el metodo extraerUltimoNumero porque operamos del final al inicio de la cadena de la operacion entrante.
    let [signo_2, nombreSigno_2, numero_2] = this.extraerUltimoNumero(op);
    op = op.substring(0, signo_2);
    // ? Tratamos a los números de acuerdo a su signo. En este caso necesitamos un valor para luego ir iterando y acumulando los resultados.
    nombreSigno_2 == "suma"
      ? (resultado = parseFloat(numero_2))
      : (resultado = -parseFloat(numero_2));

    while (op.length > 0) {
      let [signo_1, nombreSigno_1, numero_1] = this.extraerUltimoNumero(op);
      op = op.substring(0, signo_1);

      nombreSigno_1 == "suma"
        ? (resultado = parseFloat(numero_1) + resultado)
        : (resultado = -parseFloat(numero_1) + resultado);
    }
    return resultado;
  }

  // * Retorna un booleano, de la comprobación de la existencia de operandos de division o multiplicacion.
  hayProdDiv(operacion) {
    let op = operacion + "";
    let flag_1 = false;

    if (op.includes("/") || op.includes("*")) {
      flag_1 = true;
    }

    return flag_1;
  }

  // * flag => true = prod, false = div con esto indicamos que operacion queremos resolver dentro de la cadena, retorna una operacion en string formateado con la ultimna operacion div o prod (indice en el puntero) indicada en los parametros
  operarProdDiv(operacion, puntero, flag) {
    let op = operacion + "";
    let resultado = 0;
    // ? Dividimos la operacion en 2 partes a través del puntero (indice de div o prod)
    let bloque_1 = op.substring(0, puntero);
    let bloque_2 = op.substring(puntero + 1);
    
    let [signo_1, nombreSigno_1, numero_1] = this.extraerUltimoNumero(bloque_1);
    let [indice_2, numero_2] = this.extraerPrimerNumero(bloque_2);
    // ? Si el numero es negativo le tenemos que restar, ya que no nos lo devuelven con signo.
    if (nombreSigno_1 != "resta") {
      numero_1 = parseFloat(numero_1);
    } else {
      numero_1 = -parseFloat(numero_1);
    }
    // ? Si el operando es prod o div lo tomamos como parte del bloque
    if (nombreSigno_1 == "prod" || nombreSigno_1 == "div") {
      bloque_1 = bloque_1.substring(0, signo_1 + 1);
    } else {
      bloque_1 = bloque_1.substring(0, signo_1);
    }
    // ? Formateamos el otor bloque ya que el indice proporcionado para obtener el numero 2, es percisamente donde termina el numero y lo quitamos del bloque
    numero_2 = parseFloat(numero_2);
    bloque_2 = bloque_2.substring(indice_2);
    // ? Uso de la bandera para operar prod o div
    flag
      ? (resultado = numero_1 * numero_2)
      : (resultado = numero_1 / numero_2);
    // ? Tratamos los bloques de acuerdo al resultado positivo ya que eliminamos todo rastro de los signos + y - que terminan en el bloque 1
    if (resultado > 0) {
      if (
        !(
          bloque_1.substring(bloque_1.length - 1, bloque_1.length) == "/" ||
          bloque_1.substring(bloque_1.length - 1, bloque_1.length) == "*" ||
          bloque_1.substring(bloque_1.length - 1, bloque_1.length) == ""
        )
      ) {
        bloque_1 = bloque_1 + "+";
      }
    }
    // ? No formateamos con '-' porque el número 1 ya fue tratado con signo negativo si lo requirio.
    op = bloque_1 + resultado + bloque_2 + "";

    return op;
  }
  // * Retorna una operacion en string formateado sin operaciones de div o prod, pero si hay operandos de suma resta esta las ignora.
  resolverProdDiv(operacion) {
    let op = operacion + "";
    console.log(op);
    while (this.hayProdDiv(op)) {
      let punteroProd = op.lastIndexOf("*");
      let punteroDiv = op.lastIndexOf("/");

      if (punteroProd > punteroDiv) {
        op = this.operarProdDiv(op, punteroProd, true);
      } else {
        op = this.operarProdDiv(op, punteroDiv, false);
      }
    }
    return op;
  }

  // * Metodo definitivo para la resolucion de una operacion.
  resolverOperacion() {
    this.resultado = this.resolverSumaResta(
      this.resolverProdDiv(this.operacionEntrada)
    );
    return this.resultado;
  }
}

// let op = new OperacionBasica("100+20*2-1000/3.5-6/-6");
// console.log(op.resolverOperacion());
// let a = -1;
// if (!a.isNaN) {
//     console.log('Es un número');
// }

function _eliminaPorcentaje(operacion) {

  let op = operacion + '';
  let _regla1 = new RegExp(/[0-9\.]+%/, 'g');

  // console.log(_regla1.exec(op)['index']);
  // console.log(_regla1.lastIndex);
  let index_i = _regla1.exec(op)['index'];
  let index_f = _regla1.lastIndex;

  let bloque_1 = op.substring(0, index_i);
  let bloque_2 = op.substring(index_f, op.length);

  let num = parseFloat(op.substring(index_i, index_f - 1)) / 100;

  return _unirNumero(bloque_1, num) + bloque_2 + '';
}
//console.log(_eliminaPorcentaje('123%-67+78%'));
function _indiceBloqueCompleto(operacion) {

  let op = operacion + '';
  let _regla1 = new RegExp(/\([0-9\-\+\*\/\.%]+\)/, 'g');

   //console.log(_regla1.exec(op['index']));
   //console.log(_regla1.lastIndex);

  return [_regla1.exec(op)['index'],_regla1.lastIndex];
}
//console.log(_indiceBloqueCompleto('(89+(4-5)'));

function _indiceBloqueInicial(operacion) {

  let op = operacion + '';
  let _regla1 = new RegExp(/\([0-9\-\+\*\/\.%]+/, 'g');

  // console.log(_regla1.exec(op));
  // console.log(_regla1.lastIndex);

  return [_regla1.exec(op)['index'],_regla1.lastIndex];
}
//console.log(_indiceBloqueInicial('asdf(2*12/765+345-78%'));

function _unirNumero(bloque, num) {
  let op = bloque + '';
  if (num >= 0) {
    return bloque + num;
  }else {
    if (op.endsWith('+')) {
      return op.substring(0, op.length - 1) + num;
    }
    if (op.endsWith('-')) {
      if (op.length == 1) {
        return op.substring(0, op.length - 1) + `${(-1)*num}`;
      }
      if (op.substring(op.length - 2, op.length - 1) == '(') {
        return op.substring(0, op.length - 1) + `${(-1)*num}`;
      }
      return op.substring(0, op.length - 1) + `+${(-1)*num}`;
    }
  }
  return bloque + num;
}
//console.log(_unirNumero('', -23))

export function _operacion_parentesis(operacion) {
  let op = operacion + '';
  while(op.includes('(')) {
    let op_i, op_f;
    let sub_op;
    let res;
    if (op.includes('(') && op.includes(')')) {
      let indices = _indiceBloqueCompleto(op);
      op_i = indices[0]; op_f = indices[1];
      sub_op = op.substring(op_i + 1, op_f - 1);
    }else {
      let indices = _indiceBloqueInicial(op);
      op_i = indices[0]; op_f = indices[1];
      sub_op = op.substring(op_i + 1, op_f);
    }
    while(sub_op.includes('%')) {
      sub_op = _eliminaPorcentaje(sub_op);
    }
    let operacion_basica = new OperacionBasica(sub_op);
    res = operacion_basica.resolverOperacion();
    op = _unirNumero(op.substring(0, op_i), res) + op.substring(op_f, op.length);
  }
  let operacion_basica_final = new OperacionBasica(op)
  return operacion_basica_final.resolverOperacion();
}

// console.log(_operacion_parentesis('(((((20-1000/(150-50))-10'));