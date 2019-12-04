// JavaScript source code
var app = angular.module("Juego");
app.controller('TriquiOnlineController', function ($scope, $http) {



    // Simple GET request example:
    $http({
        method: 'GET',
        url: 'http://localhost:62384/api/Triqui'

    }).then(function (dataResult) {
        console.log("???", dataResult);
    }, function (error) {
        console.log("error, error");

    });



    //declaracion de variables y objeros
    $scope.valorPocison = [{ fila: 0, columna: 0 }]
    $scope.jugador = {
        nombre: "",
        estrategia: 0,
        puntos: 0,
        mensaje: ""
    };
    $scope.tipoBloqueo = [{ juego: false, nombres: true, mensaje: false, mensaje1: false }];

    $scope.tiposJuego = [
        { opcion: "dos jugadores" },
        { opcion: " maquina " }
    ];


    //Es el juego que se va a realizar en la partida
    $scope.juego;


    /*
     * inicia las funciones para comensar el juego
     */
    $scope.init = function () {
        $scope.tipoBloqueo.nombres = true;
        $scope.tipoBloqueo.juego = false;
        $scope.tipoBloqueo.mensaje = false;
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
            acumulado: { fila: "", columna: "", diagonalDerecha: "", diagonalizquierda: "" }
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
            modoDeJuego: ""
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
            var columna = { columna: i, Fila: [] };
            $scope.juego.tablero.push(columna);

            //crea campos orisontales 
            for (var j = 0; j < 3; j++)
                columna.Fila.push({ posFila: j, columna: i, valor: "", alerta: "", canvas: "fila" + j + "_colmna" + i });
        }
    }


    /*
     * recorre el tablero para verificar si hay triqui
     */
    $scope.validarTriqui = function () {

        ////limpiar variables
        $scope.juego.acumulado = { fila: "", columna: "", diagonalDerecha: "", diagonalizquierda: "" };

        //recorrido en diagonales y saltos de columna
        for (var i = 0; i < 3; i++) {
            $scope.valorPocison.fila = 0;
            $scope.valorPocison.columna = 0;
            $scope.juego.acumulado.diagonalDerecha += $scope.juego.tablero[i].Fila[i].valor;
            $scope.juego.acumulado.diagonalizquierda += $scope.juego.tablero[2 - i].Fila[i].valor;

            //recorre la columna
            for (var j = 0; j < 3; j++) {
                $scope.juego.acumulado.fila += $scope.juego.tablero[i].Fila[j].valor;
                $scope.juego.acumulado.columna += $scope.juego.tablero[j].Fila[i].valor;

            }

            //valida si hay triqui en la columna o filas por el jugador 1
            if ($scope.juego.acumulado.fila == "xxx" || $scope.juego.acumulado.columna == "xxx") {
                $scope.juego.estadoJuego = $scope.juego.jugador1.nombre;
                $scope.valorPocison.fila = i;
            }

            //valida si hay triqui en la columna o filas por el jugador 2
            else if ($scope.juego.acumulado.fila == "ooo" || $scope.juego.acumulado.columna == "ooo") {
                $scope.juego.estadoJuego = $scope.juego.jugador2.nombre;
                $scope.valorPocison.fila = i;
            }
            else {
                $scope.juego.acumulado.fila = "";
                $scope.juego.acumulado.columna = "";
            }


            // dibuja la linea fila
            if ($scope.juego.acumulado.fila == "xxx" || $scope.juego.acumulado.fila == "ooo")
                for (var b = 0; b < $scope.juego.tablero.length; b++)
                    $scope.dibujarLinea($scope.juego.tablero[$scope.valorPocison.fila].Fila[b], "fila");

            // dibuja la linea columna
            if ($scope.juego.acumulado.columna == "xxx" || $scope.juego.acumulado.columna == "ooo")
                for (var b = 0; b < $scope.juego.tablero.length; b++)
                    $scope.dibujarLinea($scope.juego.tablero[b].Fila[$scope.valorPocison.fila], "columna");

        }

        //valida si hay triqui en la diagonal por el jugador 1
        if ($scope.juego.acumulado.diagonalDerecha == "xxx" || $scope.juego.acumulado.diagonalizquierda == "xxx")
            $scope.juego.estadoJuego = $scope.juego.jugador1.nombre;

        //valida si hay triqui en la diagonal por el jugador 2
        else if ($scope.juego.acumulado.diagonalDerecha == "ooo" || $scope.juego.acumulado.diagonalizquierda == "ooo")
            $scope.juego.estadoJuego = $scope.juego.jugador2.nombre;


        // dibuja la linea diagonal derecha
        if ($scope.juego.acumulado.diagonalizquierda == "xxx" || $scope.juego.acumulado.diagonalizquierda == "ooo")
            for (var i = 0; i < $scope.juego.tablero.length; i++)
                $scope.dibujarLinea($scope.juego.tablero[($scope.juego.tablero.length - 1) - i].Fila[i], "diagonalDerecha");

        // dibuja la linea diagonal izquierda
        else if ($scope.juego.acumulado.diagonalDerecha == "ooo" || $scope.juego.acumulado.diagonalDerecha == "xxx")
            for (var i = 0; i < $scope.juego.tablero.length; i++)
                $scope.dibujarLinea($scope.juego.tablero[i].Fila[i], "diagonalizquierda");

        $scope.sumarPuntos();

    }


    /**
     * Obtiene en que lugar se va digujar la linea del triqui
     */
    $scope.dibujarLinea = function (celda, direccionLinea) {

        //Obtengo la etiqueta
        var etiqueta = document.getElementById(celda.canvas);

        //Entro a las propiedades del canvas
        var canvas = etiqueta.getContext("2d");

        //Triqui diagonal derecha
        if (direccionLinea == "diagonalDerecha") {
            canvas.moveTo(0, 100);
            canvas.lineTo(250, 0);
        }

        //Triqui fila diagonalizquierda
        else if (direccionLinea == "diagonalizquierda") {
            canvas.moveTo(0, 0);
            canvas.lineTo(250, 100);
        }

        //Triqui fila
        else if (direccionLinea == "fila") {
            canvas.moveTo(0, 50);
            canvas.lineTo(11110, 100);
        }

        //Triqui columna
        else if (direccionLinea == "columna") {
            canvas.moveTo(0, -50000);
            canvas.lineTo(135, 100);;
        }

        //Dibuja la línea
        canvas.stroke();
        celda = 0;
    }

    /*
     * cambia el turno para que el otro jugador pueda jugar y le da valor a la seccion del  tablero
     */
    $scope.asignarJuego = function () {

        // cambia el turno 
        if ($scope.juego.Turno == "x")
            $scope.juego.Turno = "o";

        else if ($scope.juego.Turno == "o")
            $scope.juego.Turno = "x";
    }

    /*
     * marca la casilla donde hay juego 
     */
    $scope.marcarJuego = function (y) {
        console.log("hola");
        // valida si tiene valor a la seccion del  tablero
        if (y.valor == "") {

            // valida si otro jugador ya gano si no  cambia el trurno
            if ($scope.juego.estadoJuego)
                y.valor = "";

            else {
                //if ($scope.juego.jugador1.modoDeJuego == "dos jugadores") {
                //texto de canvas
                var c = document.getElementById(y.canvas);
                var canvas = c.getContext("2d");
                canvas.font = "150px  Comic Sans MS";
                canvas.fillStyle = "#00d8a6";
                canvas.fillText($scope.juego.Turno, 90, 90);

                // da valor a la casilla 
                y.valor = $scope.juego.Turno;

                //llama las otras funciones 
                //$scope.validarTriqui();
                //$scope.desbloquear();
                //$scope.asignarJuego();

                //}

                //else if ($scope.juego.jugador1.modoDeJuego == " maquina ") {

                //    //texto de canvas
                //    var c = document.getElementById(y.canvas);
                //    var canvas = c.getContext("2d");
                //    canvas.font = "150px  Comic Sans MS";
                //    canvas.fillStyle = "#00d8a6";
                //    canvas.fillText($scope.juego.Turno, 90, 90);

                //    // da valor a la casilla 
                //    y.valor = $scope.juego.Turno;

                //    //llama las otras funciones 
                //    $scope.validarTriqui();
                //    $scope.desbloquear();
                //    $scope.asignarJuego();

                //    //texto de canvas
                //    var c = document.getElementById(a.canvas);
                //    var canvas = c.getContext("2d");
                //    canvas.font = "150px  Comic Sans MS";
                //    canvas.fillStyle = "#00d8a6";
                //    canvas.fillText($scope.juego.Turno, 90, 90);
                //    // da valor a la casilla 
                //    y.valor = $scope.juego.Turno;

                //    //llama las otras funciones 



                //}
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
        $scope.valorPocison.fila = 0;
        $scope.juego.estadoJuego = "";
        $scope.crearTablero();
    }


    /*
     * suma puntos a un jugador cuando hay triqui
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
            if ($scope.juego.jugador2.nombre == $scope.juego.jugador1.nombre) {
                $scope.tipoBloqueo.mensaje1 = true;
                $scope.tipoBloqueo.mensaje = false;
            }
            else {
                $scope.tipoBloqueo.mensaje1 = false;
                $scope.tipoBloqueo.nombres = false;
                $scope.tipoBloqueo.juego = true;
                $scope.tipoBloqueo.mensaje = false;
            }
        }
        else {
            $scope.tipoBloqueo.mensaje = true;
            $scope.tipoBloqueo.mensaje1 = false;
        }
        if ($scope.juego.estadoJuego)
            $scope.juego.estadoJuego = " Gano " + $scope.juego.estadoJuego;

        else
            // valida si hay un empate
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