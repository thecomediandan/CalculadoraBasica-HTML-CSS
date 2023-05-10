"use strict";
class OperacionBasica {
  constructor(operacion) {
    this.operacionEntrada = operacion + "";
    this.resultado = 0;
  }

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

  encontrarPrimerosOperandos(op) {
    let operacion = op + "";
    let ultimoOperando = {
      suma: 0,
      resta: 0,
      prod: 0,
      div: 0,
    };

    ultimoOperando.suma = operacion.indexOf('+');
    ultimoOperando.resta = operacion.indexOf("-");
    ultimoOperando.prod = operacion.indexOf("*");
    ultimoOperando.div = operacion.indexOf("/");

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

  // * Retorna el signo(indice del ultimo signo), nombre del signo y el numero en cadena sea negativo o positivo sin signo
  extraerUltimoNumero(op) {
    let operacion = op + "";
    let objOp = this.encontrarUltimosOperandos(operacion);
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
      if( operandosOrdenados[i] > 0 ) {
        indice = operandosOrdenados[i];
        break detetected_index;
      }
    }

    let nombreSigno = this.identificadorOperando( objOp, indice );
    if(indice < 0) { indice = operacion.length }

    let numero = operacion.substring(0, indice);

    return [indice, numero];
  }

  resolverSumaResta(operacion) {

    let op = operacion + "";
    console.log(op);
    let [signo_2, nombreSigno_2, numero_2] = this.extraerUltimoNumero(op);
    //console.log(signo_2 + " " + nombreSigno_2 + " " + numero_2);
    op = op.substring(0, signo_2);
    //console.log(op);
    let resultado = 0;
    nombreSigno_2 == "suma"
      ? (resultado = parseFloat(numero_2))
      : (resultado = -parseFloat(numero_2));
    //console.log(resultado);
    while (op.length > 0) {
      let [signo_1, nombreSigno_1, numero_1] = this.extraerUltimoNumero(op);
      //console.log(signo_1 + " " + nombreSigno_1 + " " + numero_1);
      op = op.substring(0, signo_1);
      //console.log(op);
      nombreSigno_1 == "suma"
        ? (resultado = parseFloat(numero_1) + resultado)
        : (resultado = -parseFloat(numero_1) + resultado);
      //console.log(resultado);
    }
    //console.log(resultado);
    return resultado;

  }

  hayProdDiv( operacion ) {
    
    let op = operacion + '';
    let flag_1 = false;

    if ( ( op.includes( '/' ) ) || ( op.includes( '*' ) ) ) {
      
      flag_1 = true;

    }

    return flag_1;

  }

  resolverProdDiv(operacion) {

    let op = operacion + '';

    while ( this.hayProdDiv( op ) ) {

      let punteroProd = op.lastIndexOf( '*' );
      let punteroDiv = op.lastIndexOf( '/' );
      let resultado = 0;
      let bloque_1 = '';
      let bloque_2 = '';

      if ( punteroProd > punteroDiv ) {
        // Condicion para multiplicar
        bloque_1 = op.substring( 0, punteroProd );
        bloque_2 = op.substring( punteroProd + 1 );
        console.log(bloque_1+ " ----------- "+bloque_2)
        let [signo_1, nombreSigno_1, numero_1] = this.extraerUltimoNumero(bloque_1);
        console.log('Datos numero 1 bloque prod ' + signo_1 + ' ' + nombreSigno_1 + ' ' + numero_1);
        let [indice_2, numero_2] = this.extraerPrimerNumero(bloque_2);
        console.log('Datos numero 2 bloque prod ' + indice_2 + " " + numero_2);
        if ( nombreSigno_1 != 'resta' ) {
          numero_1 = parseFloat(numero_1);
        }else {
          numero_1 = - parseFloat(numero_1);
        }
        if (signo_1 == 0) {
          bloque_1 = bloque_1.substring( 0, signo_1 );
        } else {
          bloque_1 = bloque_1.substring( 0, signo_1 + 1 );
        }
        

        numero_2 = parseFloat( numero_2 );
        bloque_2 = bloque_2.substring( indice_2 );
        console.log('Datos bloq-1-2 bloque prod ' + bloque_1 + ' ' +bloque_2);
        resultado = numero_1 * numero_2;
        console.log("numero 1-2 " + numero_1 + " " + numero_2 + " " + resultado)
        if (resultado < 0) {
          if ((bloque_1.substring(bloque_1.length - 1, bloque_1.length) == '+')||(bloque_1.substring(bloque_1.length - 1, bloque_1.length) == '-')) {
            op = bloque_1.substring(0, bloque_1.length - 1) + resultado + bloque_2 + '';
          }else {
            op = bloque_1 + resultado + bloque_2 + '';
          }
        }else {
          op = bloque_1 + resultado + bloque_2 + '';
        }
        console.log("concat " + op)

      }else {
        // Condicion para dividir
        bloque_1 = op.substring( 0, punteroDiv );
        bloque_2 = op.substring( punteroDiv + 1 );
        console.log(bloque_1+ " ----------- "+bloque_2)
        let [signo_1, nombreSigno_1, numero_1] = this.extraerUltimoNumero(bloque_1);
        console.log('Datos numero 1 bloque div ' + signo_1 + ' ' + nombreSigno_1 + ' ' + numero_1);
        let [indice_2, numero_2] = this.extraerPrimerNumero(bloque_2);
        console.log('Datos numero 2 bloque div ' + indice_2 + " " + numero_2);
        if ( nombreSigno_1 != 'resta' ) {
          numero_1 = parseFloat(numero_1);
        } else{
          numero_1 = - parseFloat(numero_1);
        }
        if (signo_1 == 0) {
          bloque_1 = bloque_1.substring( 0, signo_1 );
        } else {
          bloque_1 = bloque_1.substring( 0, signo_1 + 1 );
        }

        numero_2 = parseFloat( numero_2 );
        bloque_2 = bloque_2.substring( indice_2 );
        console.log('Datos bloq-1-2 bloque div ' + bloque_1 + ' ' +bloque_2);
        resultado = numero_1 / numero_2;
        console.log("numero 1-2 " + numero_1 + " " + numero_2 + " " + resultado)
        if (resultado < 0) {
          if ((bloque_1.substring(bloque_1.length - 1, bloque_1.length) == '+')||(bloque_1.substring(bloque_1.length - 1, bloque_1.length) == '-')) {
            op = bloque_1.substring(0, bloque_1.length - 1) + resultado + bloque_2 + '';
          }else {
            op = bloque_1 + resultado + bloque_2 + '';
          }
        }else {
          op = bloque_1 + resultado + bloque_2 + '';
        }
        console.log("concat " + op)

      }

    }

    return op;
  }


}

let op = new OperacionBasica("1.5+1.5");

console.log(op.resolverProdDiv('-2+4*3-3/3+1/-2'));
// let a = -1;
// if (!a.isNaN) {
//     console.log('Es un número');
// }
