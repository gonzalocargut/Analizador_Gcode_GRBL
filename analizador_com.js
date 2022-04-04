/**
 * @author Gonzalo
 */
	function analizarComando(linea) {
		if (linea.startsWith("(", 0) == 1 || linea == "" || linea.startsWith(";", 0) == 1) {
			return;
		}
		var elemento = linea.split(" ");

		var numeroComando = parseFloat(elemento[0].substring(1));
		var letraComando = elemento[0].charAt(0);
		switch(letraComando) {
		case "G":
			switch(numeroComando) {
			case 21:
				console.log("Comandos en mm");
				break;
			case 90:
				console.log("Posicionamiento Absoluto");
				break;
			case 94:
				console.log("F en mm/min");
				break;
			case 0:
				//movimeinto rapido
				// console.log("Comando G0");
				var comando = descArgs(elemento);
				var vectorMov = vectorPuntos(estadoMaquina.Pos, comando.Pos);
				var distancia = modulo(vectorMov);
				estadoMaquina = comando;
				if (distancia != 0) {
					var unitarioMov = vectorUnitario(vectorMov);
					var velocidad = limitarVector(unitarioMov, VelMax);
					var aceleracion = limitarVector(unitarioMov, AcelMax);
					rutaMov.push(movimiento(unitarioMov, distancia, velocidad, aceleracion, elemento[0]));
					resultados.DistanciaTotal = resultados.DistanciaTotal + distancia;
					resultados.DistanciaG0 = resultados.DistanciaG0 + distancia;
				}
				break;
			case 1:
				//movimiento controlado por Feed
				var comando = descArgs(elemento);

				var vectorMov = vectorPuntos(estadoMaquina.Pos, comando.Pos);
				var distancia = modulo(vectorMov);
				estadoMaquina = comando;
				if (distancia != 0) {
					var unitarioMov = vectorUnitario(vectorMov);
					var velocidad = limitarVector(unitarioMov, VelMax);
					if (velocidad > comando.Feed) {
						velocidad = comando.Feed;
					}
					var aceleracion = limitarVector(unitarioMov, AcelMax);
					rutaMov.push(movimiento(unitarioMov, distancia, velocidad, aceleracion, elemento[0]));
					resultados.DistanciaTotal = resultados.DistanciaTotal + distancia;
					resultados.DistanciaG1 = resultados.DistanciaG1 + distancia;
				}
				break;

			case undefined:
				console.log("Comando undefined");
				break;
			default:
				console.log("Numero comando G desconocido: " + linea);
			}
			break;
		case "M":
			switch(numeroComando) {
			case 0:
				console.log("Pausa, se asume que no se dejo pasar tiempo");
				break;
			case 3:
				var comando = descArgs(elemento);
				console.log("Encender Spindle Sentido Directo a " + comando.Speed + "RPM");
				break;
			case 4:
				var comando = descArgs(elemento);
				console.log("Encender Spindle Sentido Inverso a " + comando.Speed + "RPM");
				break;
			case 5:
				console.log("Apagar Spindle");
				break;
			default:
				console.log("Numero comando M desconocido: " + linea);
			}
			break;
		default:
			console.log("Comando desconocido: " + linea);
		}
	}
	
function descArg(datoProceso, arg) {
		var numero = parseFloat(arg.substring(1));
		switch(arg.charAt(0)) {
		case "X":
			datoProceso.Pos.X = numero;
			break;
		case "Y":
			datoProceso.Pos.Y = numero;
			break;
		case "Z":
			datoProceso.Pos.Z = numero;
			break;
		case "F":
			datoProceso.Feed = numero;
			break;
		case "S":
			datoProceso.Speed = numero;
			break;
		}
		return datoProceso;
	}

	function descArgs(args) {
		var destino = puntoFeed(estadoMaquina.Pos.X, estadoMaquina.Pos.Y, estadoMaquina.Pos.Z, estadoMaquina.Feed, estadoMaquina.Speed);
		for (var i = 1; i < args.length; i++) {
			destino = descArg(destino, args[i]);
		}
		return destino;
	}