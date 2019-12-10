// JavaScript source code
var app = angular.module("Juego");
app.controller('TriquiOnlineController', function ($scope, $http) {

    //$http({
    //    url: 'http://localhost:62384/api/Triqui/CrearPartida/'+"holas",

    //    method: 'POST',
    //    data: { Nombre: "hola jajaja"}

    //}).then(function (dataResult) {

    //    console.log("envio juego satisfactoria", dataResult);
    //}, function (error) {
    //    console.log("error envio juego ");

    //});


    // Simple GET request example

    //$http({
    //    url: 'http://localhost:62384/api/Triqui/',
    //    method: "POST",

    //}).then(function (response) {

    //    console.log(response);
    //}
    //);









    //declaracion de variables y objeros
    $scope.nuemeroPosiciones = 3;
    $scope.fila = 0;
    $scope.TipoBloqueo = { Juego: false, Nombres: true, Mensaje: false, Mensaje1: false };

    //Es el juego que se va a realizar en la partida
    $scope.Juego;


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
            Tablero: [],
            EstadoJuego: "",
            Mensaje: "",
            Turno: "x",
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

            //crea campos orisontales 
            for (var j = 0; j < $scope.nuemeroPosiciones; j++)
                Columna.Fila.push({ PosFila: j, Columna: i, Valor: "", Alerta: "", Canvas: "fila" + j + "_colmna" + i });
        }


    }



    /*
     * recorre el tablero para verificar si hay triqui
     */
    $scope.validarTriqui = function () {

        //    $http({
        //        method: 'Post',
        //        url: 'http://localhost:62384/api/Triqui/CrearPartida',
        //        data: 1,
        //    }).then(function (dataResult) {
        //        console.log("conexion satisfactoria", dataResult);
        //    }, function (error) {
        //        console.log("error de conexión");

        //    });
        ////limpiar variables
        $scope.Juego.Acumulado = { Fila: "", Columna: "", DiagonalDerecha: "", Diagonalizquierda: "" };

        //recorrido en diagonales y saltos de columna
        for (var i = 0; i < $scope.nuemeroPosiciones; i++) {

            $scope.fila = 0;
            $scope.Juego.Acumulado.DiagonalDerecha += $scope.Juego.Tablero[i].Fila[i].Valor;
            $scope.Juego.Acumulado.Diagonalizquierda += $scope.Juego.Tablero[2 - i].Fila[i].Valor;

            //recorre la column
            for (var j = 0; j < $scope.nuemeroPosiciones; j++) {
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

        $scope.sumarPuntos();

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

        // valida si tiene valor a la seccion del  tablero
        if (y.Valor == "") {

            // valida si otro jugador ya gano si no  cambia el trurno
            if ($scope.Juego.EstadoJuego == "Gano")
                y.Valor = "";

            else {
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
                $scope.desbloquear();
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

        if ($scope.Juego.Mensaje == $scope.Juego.Jugador1.Nombre)
            $scope.Juego.Jugador1.Puntos = $scope.Juego.Jugador1.Puntos + 1;

        else if ($scope.Juego.Mensaje == $scope.Juego.Jugador2.Nombre)
            $scope.Juego.Jugador2.Puntos = $scope.Juego.Jugador2.Puntos + 1;


    }


    /*
     * bloquea y desbloquea el juego seguen el caso 
     */
    $scope.desbloquear = function () {
        if ($scope.Juego.Jugador2.Nombre && $scope.Juego.Jugador1.Nombre) {
            if ($scope.Juego.Jugador2.Nombre == $scope.Juego.Jugador1.Nombre) {
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


    $scope.init();
}); 