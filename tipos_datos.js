/**
 * @author Gonzalo
 */
	function resultadosTipo() {
		return {
			DistanciaTotal : 0,
			DistanciaG0 : 0,
			DistanciaG1 : 0,
			TiempoTotal : 0,
			CasosMov : {
				tipo1 : 0,
				tipo2 : 0,
				tipo2_1 : 0,
				tipo3 : 0
			}
		};
	}

	function puntoFeed(x, y, z, f, s) {
		return {
			Pos : componentesXYZ(x, y, z),
			Feed : f,
			Speed : s
		}
	}

	function movimiento(vectorUMov, Dis, Vel, Acel, tipo) {
		return {
			unitMov : vectorUMov,
			Distancia : Dis,
			VelMax : Vel,
			VelFinal : 0,
			Aceleracion : Acel,
			Tiempo : 0,
			CosAlfa : 0,
			AnguloSigMov : 0,
			D1 : 0,
			D2 : 0,
			D3 : 0,
			T1 : 0,
			T2 : 0,
			T3 : 0,
			CasoMov : 0,
			TipoMov : tipo
		}
	}