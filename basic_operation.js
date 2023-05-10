"use strict";
class OperacionBasica {
  constructor(operacion) {
    this.operacionEntrada = operacion + "";
    this.resultado = 0;
  }

  encontrarOperando(op) {
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

  extraerNumero(op) {
    let operacion = op + "";
    let objOp = this.encontrarOperando(operacion);
    let operandos = [objOp.suma, objOp.resta, objOp.prod, objOp.div];
    // * Con sort y esa funcion ordenamos ascendentemente el arreglo de numeros, por comparacion, dos elementos cualquiera de la lista se comparan (a,b), la funcion retorna un valor numérico generalmente se resta los valores del parámetro como valor (a-b), este resultado se analiza y de acuerdo a el se ordena la lista. si el valor es menor que cero 'a' lleva un indice menor a 'b', si el valor es mayor a cero 'b' lleva un índice menor a 'a', si es igual a cero las posiciones se mantienen.
    let operandosOrdenados = operandos.sort(function (a, b) {
      return a - b;
    });

    let signo = operandosOrdenados[operandosOrdenados.length - 1];
    let nombreSigno = this.identificadorOperando(objOp, signo);
    let numero = operacion.substring(signo + 1);

    if (signo < 0) signo = 0;

    return [signo, nombreSigno, numero];
  }

  resolverSumaResta(operacion) {
    let op = operacion + "";
    console.log(op);
    let [signo_2, nombreSigno_2, numero_2] = this.extraerNumero(op);
    //console.log(signo_2 + " " + nombreSigno_2 + " " + numero_2);
    op = op.substring(0, signo_2);
    //console.log(op);
    let resultado = 0;
    nombreSigno_2 == "suma"
      ? (resultado = parseFloat(numero_2))
      : (resultado = -parseFloat(numero_2));
    //console.log(resultado);
    while (op.length > 0) {
      let [signo_1, nombreSigno_1, numero_1] = this.extraerNumero(op);
      //console.log(signo_1 + " " + nombreSigno_1 + " " + numero_1);
      op = op.substring(0, signo_1);
      //console.log(op);
      nombreSigno_1 == "suma"
        ? (resultado = parseFloat(numero_1) + resultado)
        : (resultado = -parseFloat(numero_1) + resultado);
      //console.log(resultado);
    }
    console.log(resultado);
    return resultado;
  }
}

let op = new OperacionBasica("2+3-4+5+100+200");
op.resolverSumaResta("-2-3-4-6-100");
// let a = -1;
// if (!a.isNaN) {
//     console.log('Es un número');
// }
