/**
 * @author Gonzalo
 */
	var inicioCalc = 0;
	//resultado en segundos min->seg
	var constTiempo = 60;
	var estadoMaquina = puntoFeed(0, 0, 0, 0, 0);
	var VelMax = componentesXYZ(750, 750, 100);
	var AcelMax = componentesXYZ(20 * 60 * 60, 20 * 60 * 60, 20 * 60 * 60);
	var resultados = resultadosTipo();

	var rutaMov = [];
