// JavaScript source code
var app = angular.module("Juego");
app.controller('TriquiOnlineController', function ($scope, $http, $timeout) {
    //declaracion de variables y objeros
    $scope.numeroPosiciones = 3;
    $scope.fila = 0;
    $scope.TipoBloqueo = { Juego: false, Nombres: true, Mensaje: false, Mensaje1: false };

    //Es el juego que se va a realizar en la partida
    $scope.Juego;
    $scope.miJuego;
    $scope.posicionTablero;

    /*
     * inicia las funciones para comensar el juego
     */
    $scope.init = function () {
        $scope.TipoBloqueo.Nombres = true;
        $scope.TipoBloqueo.Juego = false;
        $scope.TipoBloqueo.Mensaje = false;
        $scope.Juego = $scope.crearPartida();
        $scope.crearTablero();
    }

    /*
     * crea la partida para el juego 
     */
    $scope.crearPartida = function () {

        // retorno del objeto $scope.juego
        return {
            Idpartida: 0,
            Tablero: [],
            EstadoJuego: "",
            Mensaje: "",
            Turno: "x",
            Jugador: angular.copy($scope.crearJugador("", "x", 0)),
            Jugador1: angular.copy($scope.crearJugador("", "x", 0)),
            Jugador2: angular.copy($scope.crearJugador("", "o", 0)),
            Acumulado: {}
        };

    }

    /*
     * Crea los jugadores para el juego piedra papel o tijera
     * @param {any} nombre
     * @param {any} estrategia
     */
    $scope.crearJugador = function (Nombre, Estrategia, Puntos) {

        // retorno del objeto $scope.jugador
        return {
            IdJugador: 0,
            Nombre: Nombre,
            Estrategia: Estrategia,
            Puntos: 0,
            FinTurno: true
        };
    }

    /*
     * crear tablero de juego
     */
    $scope.crearTablero = function () {
        //limpiar variables
        $scope.Juego.Tablero = [];
        //crea campos vertical
        for (var i = 0; i < $scope.numeroPosiciones; i++) {
            var Columna = { Columna: i, Fila: [] };
            $scope.Juego.Tablero.push(Columna);
            //crea campos horizontales 
            for (var j = 0; j < $scope.numeroPosiciones; j++)
                Columna.Fila.push({ PosFila: j, Columna: i, Valor: "", Alerta: "", Canvas: "fila" + j + "_colmna" + i });
        }
    }

    /**
     * Obtiene en que lugar se va digujar la linea del triqui
     */
    $scope.dibujarLinea = function (Celda, DireccionLinea) {

        //Obtengo la etiqueta
        var etiqueta = document.getElementById(Celda.Canvas);

        //Entro a las propiedades del canvas
        var Canvas = etiqueta.getContext("2d");

        //Triqui diagonal derecha
        if (DireccionLinea == "diagonalDerecha") {
            Canvas.moveTo(0, 100);
            Canvas.lineTo(250, 0);
        }

        //Triqui fila diagonalizquierda
        else if (DireccionLinea == "diagonalizquierda") {
            Canvas.moveTo(0, 0);
            Canvas.lineTo(250, 100);
        }

        //Triqui fila
        else if (DireccionLinea == "fila") {
            Canvas.moveTo(0, 50);
            Canvas.lineTo(11110, 100);
        }

        //Triqui columna
        else if (DireccionLinea == "columna") {
            Canvas.moveTo(0, -50000);
            Canvas.lineTo(135, 100);;
        }

        //Dibuja la línea
        Canvas.stroke();
        Celda = 0;
    }

    /*
     * marca la casilla donde hay juego 
     */
    $scope.marcarJuego = function (y) {
        $scope.recargarJugadores();
        $scope.posicionTablero = { PosFila: 0, Columna: 0, Valor: "", Alerta: "", Canvas: "" };
        // valida si tiene valor a la seccion del  tablero
        if ($scope.Juego.Jugador.FinTurno)
            if (y.Valor == "") {

                // valida si otro jugador ya gano si no  cambia el trurno
                if ($scope.Juego.EstadoJuego == "Gano") {
                    y.Valor = "";

                }
                else {

                    ////

                    $http({
                        url: 'http://localhost:62384/api/Triqui/realizarJugada/' + $scope.Juego.Idpartida,
                        method: 'POST',
                        data: y,
                    }).
                        then(
                            function (dataResult) {

                                $scope.Juego.Tablero[dataResult.data.PosFila].Fila[dataResult.data.Columna].Valor = dataResult.data.Valor;
                                console.log("envio jugador satisfactoria", dataResult.data);

                                var c = document.getElementById(dataResult.data.Canvas);
                                var Canvas = c.getContext("2d");
                                Canvas.font = "150px  Comic Sans MS";
                                Canvas.fillStyle = "#00d8a6";
                                Canvas.fillText(dataResult.data.Valor, 90, 90);
                                $scope.recargarJugadores();

                            },
                            function (error) {
                                console.log("error envio jugador ", error);
                            })

                    // da valor a la casilla 
                    y.Valor = $scope.Juego.Jugador.Estrategia;

                    //$scope.validarTriqui();
                    //$scope.desbloquear();

                }
            }
    }

    $scope.marcarCanvas = function () {
        //texto de canvas
        console.log($scope.posicionTablero);
        for (var i = 0; i < $scope.numeroPosiciones; i++) {

            for (var j = 0; j < $scope.numeroPosiciones; j++) {
                console.log($scope.posicionTablero[i]);
                if ($scope.posicionTablero[i][j] != null) {
                    var c = document.getElementById($scope.posicionTablero[i][j].Canvas);
                    var Canvas = c.getContext("2d");
                    Canvas.font = "150px  Comic Sans MS";
                    Canvas.fillStyle = "#00d8a6";
                    Canvas.fillText($scope.posicionTablero[i][j].Valor, 90, 90);

                }
            }
        }
    }


    /*
     * limpia el juego para volver a jugar 
     */
    $scope.limpiarJuego = function () {
        $scope.fila = 0;
        $scope.Juego.EstadoJuego = "";
        $scope.Juego.Mensaje = "";
        $scope.crearTablero();
        $scope.sumarPuntos();
    }


    /*
     * crea el jugador 
     */
    $scope.crearJugadorback = function () {

        $http({
            url: 'http://localhost:62384/api/Triqui/Crearjugador/',
            method: 'POST',
            data: $scope.Juego.Jugador,
        }).
            then(
                function (dataResult) {
                    $scope.Juego.Idpartida = dataResult.data.IdPartida;
                    $scope.Juego.Jugador1 = dataResult.data.Jugador1;
                    $scope.Juego.Jugador2 = dataResult.data.Jugador2;
                    if (dataResult.data && dataResult.data.Jugador1 && dataResult.data.Jugador1.IdJugador && dataResult.data.Jugador2 == null) {
                        $scope.Juego.Jugador = dataResult.data.Jugador1;
                    }
                    else {
                        $scope.Juego.Jugador = dataResult.data.Jugador2;


                    }

                    $scope.recargarJugadores();
                    var a = 0;


                },
                function (error) {
                    console.log("error envio jugador ", error);
                })
    }
    $scope.buscarJugador = function () {

        $timeout(function () {

            console.log($scope.Juego.Jugador1.Nombre);
            $scope.recargarJugadores();

        }, 2000);
    }

    /*
     *recarga los datos de bak cada determidado tiempo
     */
    $scope.recargarJugadores = function () {
        $http({
            method: "GET",
            url: "http://localhost:62384/api/Triqui/Consultar/" + $scope.Juego.Idpartida,
        }).then(
            function (dataResult) {
                console.log(dataResult.data.Tablero);
                $scope.posicionTablero = dataResult.data.Tablero;

                if ($scope.Juego.Jugador.IdJugador == dataResult.data.Jugador1.IdJugador) {
                    $scope.Juego.Jugador = dataResult.data.Jugador1;
                    $scope.Juego.Jugador2 = dataResult.data.Jugador2;
                    $scope.Juego.Jugador1 = dataResult.data.Jugador1;

                }
                else if ($scope.Juego.Jugador.IdJugador == dataResult.data.Jugador2.IdJugador) {
                    $scope.Juego.Jugador = dataResult.data.Jugador2;
                    $scope.Juego.Jugador1 = dataResult.data.Jugador1;
                    $scope.Juego.Jugador2 = dataResult.data.Jugador2;

                }
                if ($scope.Juego.Jugador.FinTurno == false)
                    $scope.buscarJugador();
                else {

                    $scope.marcarCanvas()
                }





            },
            function (error) {
                console.log("error actualizar  envio juego ");
            });
    }

    //$scope.consultarTurno = function () {
    //    $http({
    //        method: "GET",
    //        url: "http://localhost:62384/api/Triqui/Consultar/" + $scope.Juego.Idpartida,
    //    }).then(
    //        function (dataResult) {
    //            $scope.posicionTablero = dataResult.data.Tablero;
    //        },
    //        function (error) {
    //            console.log("error actualizar  envio juego ");
    //        });
    //}


    $scope.init();
}); 