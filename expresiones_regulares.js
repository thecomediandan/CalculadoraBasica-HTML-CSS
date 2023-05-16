"use strict";

// * Funciones de validaciones

// ? Expresiones regulares.
let  a = /ab*c/; // Definicion de una expresion regular, que no cambiará
let exp = new RegExp('ab*c'); // Definicionde una expresion regular que pude cambiar, debido a que recibe una cadena como expresion regular al cual podemos cambiar.
// Para testear valores con nuestras reglas podemos usar test que retorna valores booleanos, true si encuentra coincidencias y false si no.
console.log(a.test());
console.log(exp.test('cbbabbbbcdebc'));

function escapeRegExp(string) {
    // ? g es un indicador global de busqueda coincidente
    return string.replace(/[.*+\-?^${}()|[\]\\]/g,'\\$&'); // $& significa toda cadena coincidente
}
console.log(escapeRegExp('hola, estamos buscando. A un amigo [fantasma]?'));
// Resultado: hola, estamos buscando\. A un amigo \[fantasma\]\?

// ? Las expresiones regulares se utilizan con los métodos RegExp test() y exec() y con los métodos de String, match(), replace(), search() y split(). 
/*
exec()	Ejecuta una búsqueda por una coincidencia en una cadena. Devuelve un arreglo de información o null en una discrepancia.

test()	Prueba una coincidencia en una cadena. Devuelve true o false.

match()	Devuelve un arreglo que contiene todas las coincidencias, incluidos los grupos de captura, o null si no se encuentra ninguna coincidencia.

matchAll()	Devuelve un iterador que contiene todas las coincidencias, incluidos los grupos de captura.

search()	Prueba una coincidencia en una cadena. Devuelve el índice de la coincidencia, o -1 si la búsqueda falla.

replace()	Ejecuta una búsqueda por una coincidencia en una cadena y reemplaza la subcadena coincidente con una subcadena de reemplazo.

replaceAll()   Ejecuta una búsqueda de todas las coincidencias en una cadena y reemplaza las subcadenas coincidentes con una subcadena de reemplazo.

split()	Utiliza una expresión regular o una cadena fija para dividir una cadena en un arreglo de subcadenas.
 */

// * exec nos devueleve información en un arreglo de la primera coincidencia que encuentre en la cadena.
var myRe = /d(b+)d/g; // ? Sin parentesis no se guarda la informacion en la salida[ 'dbbd', index: 1, input: 'cdbbdbsbz', groups: undefined ]
var myArray = myRe.exec('cdbbdbsbz');
// ? var myArray = /d(b+)d/g.exec('cdbbdbsbz'); // Otra manera mas rapida de utilizar la expresion regular.
console.log(myArray);
// Resultado: [ 'dbbd', 'bb', index: 1, input: 'cdbbdbsbz', groups: undefined ]

// * match nos devuelve un arreglo de todas las coincidencias en la cadena.
console.log('cdbbdbsbzcdbbdbsbz'.match(/d(b+)d/g));
// Resultado: [ 'dbbd', 'dbbd' ]

// * lastIndex usado en la expresion regular  nos devuelve el ultimo indice de la coincidencia encontrada dentro de la cadena a la cual esta aplicada.
var myRe = /d(b+)d/g;
var myArray = myRe.exec('cdbbdbsbz');
console.log('El valor de lastIndex es ' + myRe.lastIndex);
// "El valor de lastIndex es 5"
console.log('El valor de lastIndex es ' + /d(b+)d/g.lastIndex);
// "El valor de lastIndex es 0" // 0 porque se trata de otro objeto de expresión regular.

// ? Busqueda avanzada de banderas.
// ? Las expresiones regulares tienen seis indicadores opcionales que permiten funciones como la búsqueda global y que no distinga entre mayúsculas y minúsculas. Estos indicadores se pueden usar por separado o juntos en cualquier orden y se incluyen como parte de la expresión regular.
/**
g	Búsqueda global.	RegExp.prototype.global (en-US)

i	Búsqueda que no distingue entre mayúsculas y minúsculas.	RegExp.prototype.ignoreCase

m	Búsqueda multilínea.	RegExp.prototype.multiline (en-US)

s	Permite que el . coincida con caracteres de nueva línea.	RegExp.prototype.dotAll (en-US)

u	"unicode"; tratar un patrón como una secuencia de puntos de código Unicode.	RegExp.prototype.unicode (en-US)

y	Realiza una búsqueda "pegajosa" que coincida a partir de la posición actual en la cadena de destino. Consulta sticky (en-US).	RegExp.prototype.sticky (en-US)
 */
// ! Existen 2 maneras de establecer banderas en una expresion regular
// ! var re = /patrón/banderas;
// ! var re = new RegExp('patrón', 'banderas');
// ! Una vez establecidas las banderas estas no pueden quitarse despues.


// ? '\w' es para cualquier caracter excepto el vacio seguido de un espacio (\s)
// * var re = /\w+\s/g;
var re = new RegExp('\\w+\\s', 'g'); // Esta es otra manera de crear una expresion regular, pero como el parametro es una cadena para poder utilizar las funciones especiales debemos utilizar doble '\\' para poder utilizarlo y salir del nivel de cadena, y el otro parametro es el indicador.
var str = 'fee fi fo fum';
var myArray = str.match(re);
console.log(myArray);
// ["fee ", "fi ", "fo "]

// ? cosas que se pueden hacer con la manera de crear una expresion regular de la forma: ( var re = new RegExp('\\w+\\s', 'g'); ), es que podemos iterar las busquedas con la bandera o indicador 'g', esto obviamente con el propio metodo de la expresion regular 'exec', esto por ejemplo no podriamos hacerlo con el metodo 'match' que recibe como parametro a la expresion regular y trabaja desde el string y no desde la expresion regular.
var xArray; while(xArray = re.exec(str)) console.log(xArray);
// produce:
// ["fee ", index: 0, input: "fee fi fo fum"]
// ["fi ", index: 4, input: "fee fi fo fum"]
// ["fo ", index: 7, input: "fee fi fo fum"]

var re = /(?:\d{3}|\(\d{3}\))([-\/\.])\d{3}\1\d{4}/;
// * var re = /(\d{3}|\(\d{3}\))[-\/\.]\d{3}[-\/\.]\d{4}/; // El código anterior podría interpretarse de esta forma, la diferencia es que el anterior tiene algunas configuraciones adicionales. Como por ejemplo '(?: )' este tipo de apertura genera un grupo que no se recordara, '\d' que como el '\w' puede introducirse cualquier caracter, '\d' permite solo digitos acompañado de '{3}' que indica cuantos numeros exactamente se esperan, '|' simboliza 'o' y siempre debe estar en una agrupación para que pueda compararse sin problemas, '\(' y '\)' son parantesis tomados como parte de la busqueda y no como agrupacion, '()' agrupamos para que se pueda recordar, '[]' generamos caracteres opcionales, '\/' y '\.' tomamos '/' y '.' como parte de la busqueda y no como palabras reservadas de las expresiones regulares, '\1' es copiar la agrupación '1' de todo el filtro, el conteo empieza por 0, en este caso copiamos la agrupacion '([-\/\.])' y ambas deben cumplirse de la misma forma, es decir si se selecciona '-' en el primeron en el segundo deberia ser '-' para que tome por positiva la busqueda.
function testInfo(phoneInput) {
  var OK = re.exec(phoneInput);
  if (!OK) {
    console.error(phoneInput + ' isn\'t a phone number with area code!');
  } else {
    console.log('Gracias, tu número de teléfono es ' + OK[0]);}
}

testInfo('123/123/1234');