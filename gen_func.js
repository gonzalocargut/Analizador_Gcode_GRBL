/**
 * @author Gonzalo
 */
//por error de comparacion debido a problemas de representacion
function igualFlotante(a, b) {
	if (Math.abs(a - b) < 1e-12) {
		return 1;
	} else {
		return 0;
	}
}

function menorIgual(a, b) {
	return a < b || igualFlotante(a, b);
}

	function secondsToString(seconds) {
		var hour = Math.floor(seconds / 3600);
		var hourSt = "";
		hourSt = (hour < 10) ? '0' + hour : hour;
		var minute = Math.floor((seconds / 60) % 60);
		var minutiSt = "";
		minutiSt = (minute < 10) ? '0' + minute : minute;
		var second = seconds % 60;
		var secondSt = "";
		secondSt = (second < 10) ? '0' + parseFloat(second).toFixed(0) : parseFloat(second).toFixed(0);
		if (hour > 0) {
			return hourSt + ':' + minutiSt + ':' + secondSt;
		} else {
			if (minute > 0) {
				return minutiSt + ':' + secondSt;
			} else {
				return secondSt;
			}
		}
	}