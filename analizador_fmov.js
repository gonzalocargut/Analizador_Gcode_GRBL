/**
 * @author Gonzalo
 */
	function distAcel(velIni, velFin, aceleracion) {
		var deltaVel = velFin - velIni;
		return (deltaVel * deltaVel / (2 * aceleracion));
	}
	function analizarRuta() {

		for (var k = 0; k < rutaMov.length; k++) {
			//console.log(k);
			var sigMov = k + 1 < rutaMov.length ? rutaMov[k + 1].unitMov : componentesXYZ(0, 0, 0);
			//dado que se usan vectores unitarios, se deberia dividir por 1 dos veces...
			rutaMov[k].CosAlfa = prodPunto(sigMov, rutaMov[k].unitMov);
			rutaMov[k].AnguloSigMov = Math.acos(rutaMov[k].CosAlfa) * (180 / Math.PI);

			//si el angulo al siguiente movimiento es menor a 90°, se calcula la velocidad "reutilizada", sino sera 0
			if (rutaMov[k].CosAlfa > 0) {
				rutaMov[k].VelFinal = rutaMov[k].CosAlfa * rutaMov[k + 1].VelMax;
			} else {
				rutaMov[k].VelFinal = 0;
			}

			// calculo de tiempo

			var VelIniMov = k == 0 ? 0 : rutaMov[k - 1].VelFinal;

			rutaMov[k].D1 = distAcel(VelIniMov, rutaMov[k].VelMax, rutaMov[k].Aceleracion);
			rutaMov[k].D2 = distAcel(rutaMov[k].VelMax, rutaMov[k].VelFinal, rutaMov[k].Aceleracion);
			rutaMov[k].D3 = rutaMov[k].Distancia - rutaMov[k].D1 - rutaMov[k].D2;
			//console.log("D1: " + D1 + " D2: " + D2 + " D3: " + D3 + " Dt: " + rutaMov[k].Distancia);

			if (rutaMov[k].D1 > rutaMov[k].Distancia && rutaMov[k].VelFinal != 0) {
				rutaMov[k].CasoMov = 1;
				resultados.CasosMov.tipo1++;
				//
				//        +
				//       /|
				//      / |
				//     /  |
				//    +   |
				//    |   |
				//   -------> tiempo
				//    Vi  Vf
				//
				//distancia insuficiente para acelerar a la velocidad final
				rutaMov[k].VelFinal = Math.sqrt(2 * rutaMov[k].Aceleracion * rutaMov[k].Distancia);
				rutaMov[k].Tiempo = Math.abs(rutaMov[k].VelFinal - VelIniMov) / rutaMov[k].Aceleracion;
				//console.log("rutaMov[x].VelFinal: " + rutaMov[k].VelFinal + " rutaMov[x].Tiempo: " + rutaMov[k].Tiempo);
				resultados.TiempoTotal = resultados.TiempoTotal + rutaMov[k].Tiempo * constTiempo;
				continue;
			}

			rutaMov[k].T1 = (rutaMov[k].VelMax - VelIniMov) / rutaMov[k].Aceleracion;
			rutaMov[k].T2 = (rutaMov[k].VelMax - rutaMov[k].VelFinal) / rutaMov[k].Aceleracion;
			rutaMov[k].T3 = rutaMov[k].D3 / rutaMov[k].VelMax;

			if ((rutaMov[k].D1 + rutaMov[k].D2) > rutaMov[k].Distancia) {

				//distancia insuficiente para acelerar a la velocidad maxima, pero se puede intentar acercar
				//if (rutaMov[k].D1 > rutaMov[k].Distancia && igualFlotante(VelIniMov, 0) && igualFlotante(rutaMov[k].VelFinal, 0)) {
				if (igualFlotante(VelIniMov, rutaMov[k].VelFinal)) {
					//
					//       +
					//      / \
					//     /   \
					//    +     +
					//    |     |
					//   ---------> tiempo
					//    Vi    Vf
					//
					resultados.CasosMov.tipo2_1++;
					rutaMov[k].Tiempo = 2 * (Math.sqrt((rutaMov[k].Distancia * rutaMov[k].Aceleracion) + VelIniMov * VelIniMov) - VelIniMov) / rutaMov[k].Aceleracion;
					rutaMov[k].CasoMov = 2.1;
					//console.log("Vel ini: " + VelIniMov);
					//console.log(rutaMov[k]);
				} else {
					//
					//       +
					//      / \
					//     /   +
					//    +    |
					//    |    |
					//   --------> tiempo
					//    Vi    Vf
					//
					resultados.CasosMov.tipo2++;
					rutaMov[k].Tiempo = rutaMov[k].T1 + rutaMov[k].T2 + rutaMov[k].T3;
					rutaMov[k].CasoMov = 2;
				}
				// + rutaMov[k].T3 * rutaMov[k].T3 * rutaMov[k].Aceleracion/4;
			} else {
				rutaMov[k].CasoMov = 3;
				resultados.CasosMov.tipo3++;
				//
				//        +---+  Vmax
				//       /     \
				//      /       \
				//     /         +
				//    +          |
				//    |          |
				//   -------------> tiempo
				//    Vi        Vf
				//
				rutaMov[k].Tiempo = rutaMov[k].T1 + rutaMov[k].T2 + rutaMov[k].T3;
			}

			resultados.TiempoTotal = resultados.TiempoTotal + rutaMov[k].Tiempo * constTiempo;
			//console.log("T1: " + T1 + " T2: " + T2 + " T3: " + T3 + " rutaMov[x].Tiempo: " + rutaMov[k].Tiempo);

		}

		console.log(rutaMov);
	}