// JavaScript source code
var app = angular.module("Juego");
app.controller('TriquiController', function ($scope) {
    //declaracion de variables y objeros
    $scope.jugador = {
        nombre: "",
        estrategia: 0,
        puntos: 0,
        mensaje: ""
    };
    $scope.bloqueo = [{ juego: false, nombres: true, mensaje: false }];



    //Es el juego que se va a realizar en la partida
    $scope.juego;

    /*
     * inicia las funciones para comensar el juego
     */
    $scope.init = function () {
        $scope.bloqueo.nombres = true;
        $scope.bloqueo.juego = false;
        $scope.bloqueo.mensaje = false;
        $scope.juego = $scope.crearPartida();
        $scope.crearTablero();
    }

    /*
     * crea la partida para el juego 
     */
    $scope.crearPartida = function () {

        // retorno del objeto $scope.juego
        return {
            tablero: [],
            estadoJuego: "",
            Turno: "x",
            jugador1: angular.copy($scope.crearJugador("", "x")),
            jugador2: angular.copy($scope.crearJugador("", "o")),
            acumulado: { fila: "", columna: "", diagonal1: "", diagonal2: "" }
        };
    }

    /*
     * Crea los jugadores para el juego piedra papel o tijera
     * @param {any} nombre
     * @param {any} estrategia
     */
    $scope.crearJugador = function (nombre, estrategia) {

        // retorno del objeto $scope.jugador
        return {
            nombre: nombre,
            estrategia: estrategia,
            puntos: 0,
            mensaje: "",
        };
    }

    /*
     * crear tablero de juego
     */
    $scope.crearTablero = function () {

        //limpiar variables
        $scope.juego.tablero = [];

        //crea campos vertical
        for (var i = 0; i < 3; i++) {
            var columnas = { columna: i, Fila: [] };
            $scope.juego.tablero.push(columnas);

            //crea campos orisontales 
            for (var j = 0; j < 3; j++)
                columnas.Fila.push({ posFila: j, columnas: i, valor: "", alerta: "", canvas: "fila" + j + "_colmna" + i });
        }
    }

    /*
     * recorre el tablero para verificar si hay triqui
     */
    $scope.validarTriqui = function () {

        ////limpiar variables
        $scope.juego.acumulado = { fila: "", columna: "", diagonal1: "", diagonal2: "" };

        //recorrido en diagonales y saltos de columna
        for (var i = 0; i < 3; i++) {
            $scope.juego.acumulado.diagonal1 += $scope.juego.tablero[i].Fila[i].valor;
            $scope.juego.acumulado.diagonal2 += $scope.juego.tablero[2 - i].Fila[i].valor;

            //recorre la columna
            for (var j = 0; j < 3; j++) {
                $scope.juego.acumulado.fila += $scope.juego.tablero[i].Fila[j].valor;
                $scope.juego.acumulado.columna += $scope.juego.tablero[j].Fila[i].valor;
            }

            //valida si hay triqui en la columna
            if ($scope.juego.acumulado.fila == "xxx" || $scope.juego.acumulado.columna == "xxx")
                $scope.juego.estadoJuego = $scope.juego.jugador1.nombre;

            else if ($scope.juego.acumulado.fila == "ooo" || $scope.juego.acumulado.columna == "ooo")
                $scope.juego.estadoJuego = $scope.juego.jugador2.nombre;

            else {
                $scope.juego.acumulado.fila = "";
                $scope.juego.acumulado.columna = "";
            }
        }

        //valida si hay triqui en la diagonal
        if ($scope.juego.acumulado.diagonal1 == "xxx" || $scope.juego.acumulado.diagonal2 == "xxx")
            $scope.juego.estadoJuego = $scope.juego.jugador1.nombre;

        else if ($scope.juego.acumulado.diagonal1 == "ooo" || $scope.juego.acumulado.diagonal2 == "ooo")
            $scope.juego.estadoJuego = $scope.juego.jugador2.nombre;

        $scope.sumarPuntos();

    }


    /*
     * cambia el turno para que el otro jugador pueda jugar y le da valor a la seccion del  tablero
     */
    $scope.asignarTurno = function (y) {

        // valida si tiene valor a la seccion del  tablero
        if (y.valor == "") {

            // valida si otro jugador ya gano si no  cambia el trurno
            if ($scope.juego.estadoJuego)
                y.valor = "";

            else {
                console.log(y.canvas);
                var c = document.getElementById(y.canvas);
                var ctx = c.getContext("2d");
                ctx.font = "150px Arial";
                ctx.fillText($scope.juego.Turno, 90, 90);
                ctx.moveTo(90, 0);
                ctx.lineTo(200, 10);
                ctx.stroke();


                y.valor = $scope.juego.Turno;
                $scope.validarTriqui();
                $scope.desbloquear();

                if ($scope.juego.Turno == "x")
                    $scope.juego.Turno = "o";

                else if ($scope.juego.Turno == "o")
                    $scope.juego.Turno = "x";

            }
        }

    }

    /*
     * limpia el juego para volver a jugar 
     */
    $scope.limpiarJuego = function () {
        console.log("juan");
        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 3; j++) {
                $scope.juego.tablero[i].Fila[j].valor = "";
                $scope.juego.tablero[i].Fila[j].canvas = "5";

            }
        }
    }
    /*
     * suma un punto a un jugador cuando aga triqui
     */
    $scope.sumarPuntos = function () {

        if ($scope.juego.estadoJuego == $scope.juego.jugador1.nombre)
            $scope.juego.jugador1.puntos = $scope.juego.jugador1.puntos + 1;

        else if ($scope.juego.estadoJuego == $scope.juego.jugador2.nombre)
            $scope.juego.jugador2.puntos = $scope.juego.jugador2.puntos + 1;
    }

    /*
     * bloquea y desbloquea el juego seguen el caso 
     */
    $scope.desbloquear = function () {
        if ($scope.juego.jugador2.nombre && $scope.juego.jugador1.nombre) {
            $scope.bloqueo.nombres = false;
            $scope.bloqueo.juego = true;
            $scope.bloqueo.mensaje = false;
        }

        else
            $scope.bloqueo.mensaje = true;

        if ($scope.juego.estadoJuego) {
            $scope.juego.estadoJuego = " Gano " + $scope.juego.estadoJuego;
            var c = document.getElementById("myCanvas");
            var ctx = c.getContext("2d");
            ctx.moveTo(0, 0);
            ctx.lineTo(200, 100);


        }

        else
            var a = 0;
        for (var i = 0; i < 3; i++)
            for (var j = 0; j < 3; j++)
                if ($scope.juego.tablero[i].Fila[j].valor != "") {
                    a = a + 1;
                    if (a == 9)
                        $scope.juego.estadoJuego = " Es un empate";
                }



    }


    $scope.init();
});