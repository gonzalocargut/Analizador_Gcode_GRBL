# Analizador Gcode GRBL
Analizador Gcode para GRBL, se calculan varios datos y se presentan para su revisión, implementado en HTML y JavaScript, probado en Google Chrome y Edge. Se hizo en plataforma web para permitir su fácil ejecución en cualquier entorno, además me era más fácil programar en JavaScript que usar otro lenguaje y plataforma.

El objetivo de la solución es obtener un cálculo del tiempo que un Gcode tardara en ejecutarse en una máquina para planear los tiempos y programar el uso de la máquina. El principal motivo fue que frese un archivo creyendo que tardaba unas 4 horas y termino tomando 10... En otro aspecto, al tener la distancia G1 (que debería ser cuando la maquina está tomando acción con su herramienta (fresadora, laser o lo que sea)), se puede estimar el desgaste de la herramienta.

El analizador obtiene los siguientes datos:
- Tiempo de ejecución: tiempo que usara la maquina con firmware GRBL para ejecutar el archivo completamente
- Distancia recorrida Total
- Distancia recorrida en G0
- Distancia recorrida en G1
- Tipos de movimiento (resultado del análisis vectorial de cada movimiento, indica el modelo matemático de cálculo de los parámetros anteriores)
- Tiempo de Calculo: indica el tiempo que tardo en ejecutarse el analizador

Abra el archivo “analizador_grbl.html” con su navegador, seleccione el archivo que quiera analizar y haga clic en “Analizar”, además se deben cargar los parámetros de velocidad máxima y aceleración de su maquina para obtener resultados adecuados.

Nota: este analizador es solo compatible con GRBL, con movimientos G0 y G1, otros movimientos serán ignorados, ver la consola del navegador (Comando Inspeccionar de Chrome) para saber cuáles fueron descartados.

Nota 2: se observa que cuando un archivo tiene muchos movimientos de tipo 1, 2 y 2.1 el analizador tiende a calcular alrededor de un 3-6% más de tiempo que el que una maquina tarda realmente en ejecutar el código, es posible que se tengan problemas en el modelado matemático de esos movimientos (todos cortos), o bien que GRBL no respete los parámetros de aceleración u otros en esos casos. Cuando se tienen primordialmente movimientos de tipo 3, el cálculo es bastante exacto (unos pocos segundos de diferencia). Los resultados de distancia no se ven afectados por el tipo de movimiento, dado que es inherente al código G.

## Cualquier aporte a mejorar el modelado matemático o experiencia de usuario en la gráfica se agradece.
