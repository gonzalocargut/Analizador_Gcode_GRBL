/**
 * @author Gonzalo
 */

	function analizar() {
		inicioCalc = window.performance.now();

		var input = document.getElementById("archivoAAnalizar");
		var file = input.files[0];
		if (file == undefined) {
			alert("Seleccione un Archivo");
			return;
		}
		//console.log(file);
		var reader = new FileReader();
		reader.readAsText(file);

		rutaMov = [];

		reader.onload = function() {
			analizarArchivo(reader.result);
		};

		reader.onerror = function() {
			console.log(reader.error);
		};
	}

	function analizarArchivo(datos) {

		resultados = resultadosTipo();
		estadoMaquina = puntoFeed(0, 0, 0, 0, 0);

		VelMax.X = parseInt(document.getElementById("velMaxX").value);
		VelMax.Y = parseInt(document.getElementById("velMaxY").value);
		VelMax.Z = parseInt(document.getElementById("velMaxZ").value);
		console.log(VelMax);

		//en mm/min2
		AcelMax.X = parseInt(document.getElementById("acelMaxX").value) * 60 * 60;
		//en mm/min2
		AcelMax.Y = parseInt(document.getElementById("acelMaxY").value) * 60 * 60;
		//en mm/min2
		AcelMax.Z = parseInt(document.getElementById("acelMaxZ").value) * 60 * 60;

		console.log(AcelMax);

		var filas = datos.split("\n");
		for (var nFila = 0; nFila < filas.length; nFila++) {
			//filas[nFila] = filas[nFila].replace('\r', '');
			// console.log(filas[nFila]);
			filas[nFila] = filas[nFila].trim();
			filas[nFila] = filas[nFila].toUpperCase();
			// console.log("\n");
			analizarComando(filas[nFila]);
		}
		//console.log(rutaMov);
		analizarRuta();
		console.log(resultados);
		console.log(secondsToString(resultados.TiempoTotal));

		document.getElementById("resutadoTiempoTotal").innerHTML = resultados.TiempoTotal.toFixed(2);
		document.getElementById("resutadoTiempoTotalHHMMSS").innerHTML = secondsToString(resultados.TiempoTotal.toFixed(2));
		document.getElementById("DistanciaTotal").innerHTML = resultados.DistanciaTotal.toFixed(2);
		document.getElementById("DistanciaG0").innerHTML = resultados.DistanciaG0.toFixed(2);
		document.getElementById("DistanciaG1").innerHTML = resultados.DistanciaG1.toFixed(2);
		document.getElementById("CasosMov.tipo1").innerHTML = resultados.CasosMov.tipo1.toFixed(0);
		document.getElementById("CasosMov.tipo2").innerHTML = resultados.CasosMov.tipo2.toFixed(0);
		document.getElementById("CasosMov.tipo2_1").innerHTML = resultados.CasosMov.tipo2_1.toFixed(0);
		document.getElementById("CasosMov.tipo3").innerHTML = resultados.CasosMov.tipo3.toFixed(0);
		var finCalc = window.performance.now();
		document.getElementById("TiempoCalc").innerHTML = parseFloat(finCalc - inicioCalc).toFixed(2);
	}