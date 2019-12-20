// JavaScript source code
var app = angular.module("Juego");
app.controller('TriquiOnlineController', function ($scope, $http, $timeout) {

    //declaracion de variables y objeros
   
    $scope.fila = 0;
    $scope.numeroPosiciones = 3;
    $scope.TipoBloqueo = { Juego: false, Nombres: true, Mensaje: false, Mensaje1: false };
    $scope.tiempo = { BuscarJugador: 30, Turno: 30 }
    //Es el juego que se va a realizar en la partida
    $scope.Juego;

    /*
     * inicia las funciones para comensar el juego
     */
    $scope.init = function () {
        $scope.limpiarJugador = angular.copy($scope.crearJugador("", "x", 0));
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
            Acumulado: {},
            Maquina:false
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
     * recorre las pocisiones del tablero para ver si hay triqui
     * */
    $scope.validarTriqui = function () {

        ////limpiar variables
        $scope.Juego.Acumulado = { Fila: "", Columna: "", DiagonalDerecha: "", Diagonalizquierda: "" };

        //recorrido en diagonales y saltos de columna
        for (var i = 0; i < 3; i++) {

            $scope.fila = 0;
            $scope.Juego.Acumulado.DiagonalDerecha += $scope.Juego.Tablero[i].Fila[i].Valor;
            $scope.Juego.Acumulado.Diagonalizquierda += $scope.Juego.Tablero[2 - i].Fila[i].Valor;

            //recorre la column
            for (var j = 0; j < 3; j++) {
                $scope.Juego.Acumulado.Fila += $scope.Juego.Tablero[i].Fila[j].Valor;
                $scope.Juego.Acumulado.Columna += $scope.Juego.Tablero[j].Fila[i].Valor;

            }

            //valida si hay triqui en la columna o filas por el jugador 1
            if ($scope.Juego.Acumulado.Fila == "xxx" || $scope.Juego.Acumulado.Columna == "xxx") {
                $scope.Juego.EstadoJuego = "Gano";
                $scope.Juego.Mensaje = $scope.Juego.Jugador1.Nombre;
                $scope.fila = i;
            }

            //valida si hay triqui en la columna o filas por el jugador 2
            else if ($scope.Juego.Acumulado.Fila == "ooo" || $scope.Juego.Acumulado.Columna == "ooo") {
                $scope.Juego.EstadoJuego = "Gano";
                $scope.Juego.Mensaje = $scope.Juego.Jugador2.Nombre;
                $scope.fila = i;
            }
            else {

                $scope.Juego.Acumulado.Fila = "";
                $scope.Juego.Acumulado.Columna = "";
            }

            // dibuja la linea fila
            if ($scope.Juego.Acumulado.Fila == "xxx" || $scope.Juego.Acumulado.Fila == "ooo")
                for (var b = 0; b < $scope.Juego.Tablero.length; b++)
                    $scope.dibujarLinea($scope.Juego.Tablero[$scope.fila].Fila[b], "fila");

            // dibuja la linea columna
            if ($scope.Juego.Acumulado.Columna == "xxx" || $scope.Juego.Acumulado.Columna == "ooo")
                for (var b = 0; b < $scope.Juego.Tablero.length; b++)
                    $scope.dibujarLinea($scope.Juego.Tablero[b].Fila[$scope.fila], "columna");
        }

        //valida si hay triqui en la diagonal por el jugador 1
        if ($scope.Juego.Acumulado.DiagonalDerecha == "xxx" || $scope.Juego.Acumulado.Diagonalizquierda == "xxx") {
            $scope.Juego.EstadoJuego = "Gano";
            $scope.Juego.Mensaje = $scope.Juego.Jugador1.Nombre;
        }

        //valida si hay triqui en la diagonal por el jugador 2
        else if ($scope.Juego.Acumulado.DiagonalDerecha == "ooo" || $scope.Juego.Acumulado.Diagonalizquierda == "ooo") {
            $scope.Juego.EstadoJuego = "Gano";
            $scope.Juego.Mensaje = $scope.Juego.Jugador2.Nombre;
        }

        // dibuja la linea diagonal derecha
        if ($scope.Juego.Acumulado.Diagonalizquierda == "xxx" || $scope.Juego.Acumulado.Diagonalizquierda == "ooo")
            for (var i = 0; i < $scope.Juego.Tablero.length; i++)
                $scope.dibujarLinea($scope.Juego.Tablero[($scope.Juego.Tablero.length - 1) - i].Fila[i], "diagonalDerecha");

        // dibuja la linea diagonal izquierda
        else if ($scope.Juego.Acumulado.DiagonalDerecha == "ooo" || $scope.Juego.Acumulado.DiagonalDerecha == "xxx")
            for (var i = 0; i < $scope.Juego.Tablero.length; i++)
                $scope.dibujarLinea($scope.Juego.Tablero[i].Fila[i], "diagonalizquierda");
    }

    /*
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

        //Dibuja la l�nea
        Canvas.stroke();
        Celda = 0;
    }

    /*
     * marca la casilla canvas con la estrategia
     */
    $scope.marcarCanvas = function () {

        //texto de canvas
        for (var i = 0; i < $scope.numeroPosiciones; i++) {
            for (var j = 0; j < $scope.numeroPosiciones; j++) {
                var c = document.getElementById($scope.Juego.Tablero[j].Fila[i].Canvas);
                var Canvas = c.getContext("2d");
                Canvas.font = "150px  Comic Sans MS";
                Canvas.fillStyle = "#00d8a6";
                Canvas.fillText($scope.Juego.Tablero[j].Fila[i].Valor, 90, 90);
            }
        }
        $scope.validarTriqui();
    }

    /*
     * limpia el juego para volver a jugar 
     */
    $scope.limpiarJuego = function () {
        $scope.limpiarJugador = $scope.Juego.Jugador;
        console.log("---"+$scope.limpiarJugador);
        $scope.fila = 0;
        $scope.crearPartida();
        $scope.Juego.Jugador = $scope.limpiarJugador;
        $scope.crearJugadorback();
        $scope.recargarJugadores();

    }

    /*
     * asigna un tiempo para repetir una funcion cada sierto tiempo
     */
    $scope.asignarTiempo = function () {
        //if()
        $timeout(function () {
            if ($scope.tiempo.BuscarJugador > 0 && $scope.Juego.Jugador2 == null)
                $scope.tiempo.BuscarJugador = $scope.tiempo.BuscarJugador - 1;
            if ($scope.Juego.Jugador2 != null && $scope.Juego.Jugador1 != null && $scope.tiempo.BuscarJugador > 0) {
                $scope.tiempo.Turno = $scope.tiempo.Turno - 1;
                if ($scope.tiempo.Turno < 0)
                    $scope.tiempo.BuscarJugador = $scope.tiempo.BuscarJugador - 1;

            }
            if ($scope.tiempo.BuscarJugador == 0) {

                if ($scope.Juego.Jugador2 != null) {
                    $scope.Juego.EstadoJuego = "Gano";
                    $scope.Juego.Mensaje = $scope.Juego.Jugador.Nombre;
                }
                else if ($scope.Juego.Jugador2 == null) {
                   
                   
                }
            }

            $scope.recargarJugadores();
        }, 2000);
    }

    /*
     * marca la casilla donde hay juego 
     */
    $scope.marcarJuego = function (y) {
        $scope.recargarJugadores();
      
        // valida si tiene valor a la seccion del  tablero
        if ($scope.Juego.Jugador.FinTurno == true && $scope.JugadaRealizada == false)
            $scope.JugadaRealizada = true;
            if (y.Valor == "" && $scope.Juego.EstadoJuego != "Gano") {
                // da valor a la casilla 
                y.Valor = $scope.Juego.Jugador.Estrategia;
                $scope.validarTriqui();
                var c = document.getElementById(y.Canvas);
                var Canvas = c.getContext("2d");
                Canvas.font = "150px  Comic Sans MS";
                Canvas.fillStyle = "#00d8a6";
                Canvas.fillText(y.Valor, 90, 90);
                $http({
                    url: 'http://localhost:62384/api/Triqui/realizarJugada/' + $scope.Juego.Idpartida ,
                    method: 'POST',
                    data: y,
                }).
                    then(
                    function (dataResult) {
                      
                            $scope.recargarJugadores();
                            $scope.tiempo.Turno = 30;
                          
                            console.log("---",dataResult);
                        },
                        function (error) {
                            console.log("error envio jugador ", error);
                    })

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
                },
                function (error) {
                    console.log("error envio jugador ", error);
                })
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
                for (var i = 0; i < $scope.numeroPosiciones; i++) {
                    for (var j = 0; j < $scope.numeroPosiciones; j++) {
                        if (dataResult.data.Tablero[i][j] != null)
                            $scope.Juego.Tablero[i].Fila[j].Valor = dataResult.data.Tablero[i][j].Valor;
                    }
                }

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

                //if ($scope.Juego.Jugador.FinTurno == true)
                //    $scope.JugadaRealizada == false;

                if ($scope.Juego.Jugador.FinTurno == false)
                    $scope.asignarTiempo();

                else {
                    $scope.marcarCanvas()
                }
            },

            function (error) {
                console.log("error actualizar  envio juego ");
            });
    }

    /*
     * envia id del juego para crear el 2 jugador de forma de maquina 
     */
    $scope.activarMaquina= function () {
        console.log($scope.Juego.Maquina);
        $scope.Juego.Maquina = true; 
        // valida si tiene valor a la seccion del  tablero
        //if ($scope.Juego.Jugador.FinTurno==)
                $http({

                    url: 'http://localhost:62384/api/Triqui/activarMaquina/' + $scope.Juego.Idpartida,
                    method: 'POST',
                    data:  $scope.Juego.Maquina ,
                }).
                    then(
                    function (dataResult) {
                        console.log(dataResult);
                        $scope.recargarJugadores();
                        },
                        function (error) {
                            console.log("error envio jugador ", error);
                        })
            
    }



    $scope.init();
}); 