/**
 * @author Gonzalo
 */
function componentesXYZ(x, y, z) {
	return {
		X : x,
		Y : y,
		Z : z
	};
}

function vectorPuntos(origen, destino) {
	return componentesXYZ(destino.X - origen.X, destino.Y - origen.Y, destino.Z - origen.Z);
}

function modulo(vector) {
	var vectorX = Math.pow(vector.X, 2);
	var vectorY = Math.pow(vector.Y, 2);
	var vectorZ = Math.pow(vector.Z, 2);
	return Math.sqrt(vectorX + vectorY + vectorZ);
}

function vectorUnitario(vector) {
	var moduloVector = modulo(vector);
	var unitario = componentesXYZ(vector.X / moduloVector, vector.Y / moduloVector, vector.Z / moduloVector);
	return unitario;
}

// function limitarVector(vector, limite) {
// var gananciaX = Math.abs(vector.X / limite.X);
// // console.log(gananciaX);
// if (gananciaX != 0) {
// var limitePorX = componentesXYZ(vector.X / gananciaX, vector.Y / gananciaX, vector.Z / gananciaX);
// // imprimirVector(limitePorX, "limitePorX");
// if (menorIgual(Math.abs(limitePorX.X), limite.X) && menorIgual(Math.abs(limitePorX.Y), limite.Y) && menorIgual(Math.abs(limitePorX.Z), limite.Z)) {
// return limitePorX;
// }
// }
//
// var gananciaY = Math.abs(vector.Y / limite.Y);
// if (gananciaY != 0) {
// var limitePorY = componentesXYZ(vector.X / gananciaY, vector.Y / gananciaY, vector.Z / gananciaY);
// if (menorIgual(Math.abs(limitePorY.X), limite.X) && menorIgual(Math.abs(limitePorY.Y), limite.Y) && menorIgual(Math.abs(limitePorY.Z), limite.Z)) {
// return limitePorY;
// }
// }
// var gananciaZ = Math.abs(vector.Z / limite.Z);
// if (gananciaZ != 0) {
// var limitePorZ = componentesXYZ(vector.X / gananciaZ, vector.Y / gananciaZ, vector.Z / gananciaZ);
// if (menorIgual(Math.abs(limitePorZ.X), limite.X) && menorIgual(Math.abs(limitePorZ.Y), limite.Y) && menorIgual(Math.abs(limitePorZ.Z), limite.Z)) {
// return limitePorZ;
// }
// }
// return componentesXYZ(0, 0, 0);
// }

//base extraida del codigo fuente de GRBL
function limitarVector(vector, limite) {
	var moduloLimite = 1.0e+38;
	if (vector.X != 0) {
		moduloLimite = Math.min(moduloLimite, Math.abs(limite.X / vector.X));
	}
	if (vector.Y != 0) {
		moduloLimite = Math.min(moduloLimite, Math.abs(limite.Y / vector.Y));
	}
	if (vector.Z != 0) {
		moduloLimite = Math.min(moduloLimite, Math.abs(limite.Z / vector.Z));
	}
	return moduloLimite;
}

// function imprimirVector(vector, nombre) {
// console.log(nombre + " | X: " + vector.X + " Y: " + vector.Y + " Z: " + vector.Z);
// }

// function proyeccionVector(unitU, modU, unitV, modV) {
// // var prodPunt=(unitU.X*unitV.X+unitU.Y*unitV.Y+unitU.Z*unitV.Z)*modU*modV;
// // return prodPunt/modV;
// var prodPuntUnit = (unitU.X * unitV.X + unitU.Y * unitV.Y + unitU.Z * unitV.Z);
// return {
// proyeccion : prodPuntUnit * modU
// };
// }

function prodPunto(U, V) {
	return (U.X * V.X + U.Y * V.Y + U.Z * V.Z);
}

// function anguloVectores(unitU, modU, unitV, modV) {
// var cosAlfa = prodPunto(unitU,unitV);
// //var cosAlfa = (unitU.X * unitV.X + unitU.Y * unitV.Y + unitU.Z * unitV.Z);
// var anguloRad = Math.acos(cosAlfa);
// var anguloDeg = anguloRad * (180 / Math.PI)
// console.log("cosAlfa: " + cosAlfa + " anguloRad: " + anguloRad + " anguloDeg: " + anguloDeg);
// return anguloRad;
// }