// JavaScript source code
var app = angular.module("Juego");
app.controller('TriquiOnlineController', function ($scope, $http, $timeout) {
    //declaracion de variables y objeros
    $scope.nuemeroPosiciones = 3;
    $scope.fila = 0;
    $scope.TipoBloqueo = { Juego: false, Nombres: true, Mensaje: false, Mensaje1: false };

    //Es el juego que se va a realizar en la partida
    $scope.Juego;
    $scope.miJuego;
    $scope.JuegoOponente;

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
            Puntos: 0
        };
    }

    /*
     * crear tablero de juego
     */
    $scope.crearTablero = function () {
        //limpiar variables
        $scope.Juego.Tablero = [];
        //crea campos vertical
        for (var i = 0; i < $scope.nuemeroPosiciones; i++) {
            var Columna = { Columna: i, Fila: [] };
            $scope.Juego.Tablero.push(Columna);
            //crea campos horizontales 
            for (var j = 0; j < $scope.nuemeroPosiciones; j++)
                Columna.Fila.push({ PosFila: j, Columna: i, Valor: "", Alerta: "", Canvas: "fila" + j + "_colmna" + i });
        }
    }

    /*
     * recorre el tablero para verificar si hay triqui
     */
    $scope.validarTriqui = function () {

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
     * cambia el turno para que el otro jugador pueda jugar y le da valor a la seccion del  tablero
     */
    $scope.asignarJuego = function () {

        // cambia el turno 
        if ($scope.Juego.Turno == "x")
            $scope.Juego.Turno = "o";

        else if ($scope.Juego.Turno == "o")
            $scope.Juego.Turno = "x";
    }

    /*
     * marca la casilla donde hay juego 
     */
    $scope.marcarJuego = function (y) {

        /////
        $scope.Juego.Jugador.Fila = y.Columna;
        $scope.Juego.Jugador.Columna = y.PosFila;

        //////

        // valida si tiene valor a la seccion del  tablero
        if (y.Valor == "") {

            // valida si otro jugador ya gano si no  cambia el trurno
            if ($scope.Juego.EstadoJuego == "Gano")
                y.Valor = "";

            else {

                ////

                $http({
                    url: 'http://localhost:62384/api/Triqui/realizarJugada/',
                    method: 'POST',
                    data: {
                        Fila: $scope.Jugador.Fila,
                        Columna: $scope.Jugador.Columna,
                        IdJugador: $scope.Jugador.IdJugador,
                        Estrategia: $scope.Jugador.Estrategia,
                        IdPartida: $scope.Jugador.Idpartida
                    },
                }).
                    then(
                        function (dataResult) {

                            console.log("envio jugador satisfactoria", dataResult);
                        },
                        function (error) {
                            console.log("error envio jugador ", error);
                        })
                ////


                //if ($scope.juego.jugador1.modoDeJuego == "dos jugadores") {
                //texto de canvas
                var c = document.getElementById(y.Canvas);
                var Canvas = c.getContext("2d");
                Canvas.font = "150px  Comic Sans MS";
                Canvas.fillStyle = "#00d8a6";
                Canvas.fillText($scope.Juego.Turno, 90, 90);

                // da valor a la casilla 
                y.Valor = $scope.Juego.Turno;

                $scope.validarTriqui();
                //$scope.desbloquear();
                $scope.asignarJuego();
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
     * suma puntos a un jugador cuando hay triqui
     */
    $scope.sumarPuntos = function () {
    }
    /*
     * bloquea y desbloquea el juego seguen el caso 
     */
    $scope.desbloquear = function () {
        console.log("losls");
        if ($scope.Juego.Jugador1.Nombre && $scope.Juego.Jugador1.Nombre) {
            if ($scope.Juego.Jugador1.Nombre == $scope.Juego.Jugador1.Nombre) {
                $scope.TipoBloqueo.Mensaje1 = true;
                $scope.TipoBloqueo.Mensaje = false;
            }
            else {
                $scope.TipoBloqueo.Mensaje1 = false;
                $scope.TipoBloqueo.Nombres = false;
                $scope.TipoBloqueo.Juego = true;
                $scope.TipoBloqueo.Mensaje = false;
            }
        }
        else {
            $scope.TipoBloqueo.Mensaje = true;
            $scope.TipoBloqueo.Mensaje1 = false;
        }
        if ($scope.Juego.EstadoJuego == "Gano")
            $scope.Juego.Mensaje = $scope.Juego.EstadoJuego + " " + $scope.Juego.Mensaje;

        else
            // valida si hay un empate
            var a = 0;
        for (var i = 0; i < $scope.nuemeroPosiciones; i++)
            for (var j = 0; j < $scope.nuemeroPosiciones; j++)
                if ($scope.Juego.Tablero[i].Fila[j].Valor != "") {
                    a = a + 1;
                    if (a == 9) {
                        $scope.Juego.EstadoJuego == "empate";
                        $scope.Juego.Mensaje = " Es un empate";
                    }
                }

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

                    if (dataResult.data && dataResult.data.Jugador1 && dataResult.data.Jugador1.IdJugador && dataResult.data.Jugador2 == null) {
                        $scope.Juego.Jugador = dataResult.data.Jugador1;

                        $scope.Juego.Jugador1 = dataResult.data.Jugador1;
                    }
                    else {
                        $scope.Juego.Jugador = dataResult.data.Jugador2;
                        $scope.Juego.Jugador2 = dataResult.data.Jugador2;
                    }

                    $scope.buscarJugador();

                    var a = 0;
                    $scope.Juego.Idpartida = dataResult.data.IdPartida;


                },
                function (error) {
                    console.log("error envio jugador ", error);
                })
    }
    $scope.buscarJugador = function () {


        $timeout(function () {
            //console.log($scope.Juego.Jugador.IdJugador, $scope.Juego.Jugador1.IdJugador && $scope.Juego.Jugador2 == null);
            //if ($scope.Juego.Jugador.IdJugador == $scope.Juego.Jugador1.IdJugador && $scope.Juego.Jugador2 == null)
            $scope.recargarDatosJugadoresBack();
        }, 2000);
    }
    /*
     *recarga los datos de bak cada determidado tiempo
     */
    $scope.recargarDatosJugadoresBack = function () {
        $http({
            method: "GET",
            url: "http://localhost:62384/api/Triqui/Consultar/" + $scope.Juego.Idpartida,
        }).then(
            function (dataResult) {
                if ($scope.Juego.Jugador.IdJugador == dataResult.data.Jugador1.IdJugador) {
                    $scope.Juego.Jugador2 = dataResult.data.Jugador2;
                    if ($scope.Juego.Jugador2 == null)
                        $scope.buscarJugador();
                }
                else if ($scope.Juego.Jugador.IdJugador == dataResult.data.Jugador2.IdJugador) {
                    $scope.Juego.Jugador1 = dataResult.data.Jugador1;
                    if ($scope.Juego.Jugador1.FinTurno == false)
                        $scope.buscarJugador();
                }


                //if ($scope.Juego.Jugador.Nombre == dataResult.data.Jugador1.Nombre)
                //    $scope.Juego.Jugador1.IdJugador = dataResult.data.Jugador1.Id;
                //else if ($scope.Juego.Jugador.Nombre == dataResult.data.Jugador2.Nombre)
                //    $scope.Juego.Jugador2.IdJugador = dataResult.data.Jugador2.Id;
                //console.log("error actualizar  envio juego ", dataResult);
            },
            function (error) {
                console.log("error actualizar  envio juego ");
            });
    }



    $scope.init();
}); 