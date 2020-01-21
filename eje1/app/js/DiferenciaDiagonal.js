// JavaScript source code
var app = angular.module("Juego");
app.controller('DiferenciaDiagonalController', function ($scope) {

    //declaracion de variables
    $scope.numeroPosiciones = 0;
    $scope.diagonal = [];
    $scope.suma = [{ izquierdaDerecha: 0, derechaIzquierda: 0, diferencia: 0, mesaje1: "", mesaje2: "" }];
    $scope.bloqueos = [{ respuestas: false, boton: false, diagonal: false, alerta: false }];
    $scope.mesaje = [{ derechaIzquierda: "", izquierdaDerecha: "" }];

    /*
     * crea los campos de la matriz 
     */
    $scope.crearDiagonal = function () {

        //vacía variables
        $scope.suma.izquierdaDerecha = 0;
        $scope.suma.derechaIzquierda = 0;
        $scope.suma.diferencia = 0;
        $scope.diagonal = [];

        //habilita o deshabilita el juego
        if ($scope.numeroPosiciones > 0) {
            $scope.bloqueos.diagonal = true;
            $scope.bloqueos.respuestas = false;
            $scope.bloqueos.alerta = false;
        }
        else
            $scope.bloqueos.diagonal = false;


        //crea campos verticales
        for (var i = 0; i < $scope.numeroPosiciones; i++) {

            var posy = { posy: i, x: [] }

            //crea campos horizontales y los campos para ingresar datos
            for (var j = 0; j < $scope.numeroPosiciones; j++)
                posy.x.push({ posx: j, posy: i, valor: 0, alerta: "" });
            $scope.diagonal.push(posy);
        }
    }

    /*
     * asigna valores aleatorios a la matriz
     */
    $scope.asignarValoresAleatorios = function () {
       //recorre campos verticales
        for (var i = 0; i < $scope.numeroPosiciones; i++) {
            //recorre campos horizontales y les asigna valores aleatorios
            for (var j = 0; j < $scope.numeroPosiciones; j++)
                $scope.diagonal[i].x[j].valor = Math.floor(Math.random() * 99);
        }
        $scope.validarValorCampos();


    }

    /*
     * suma los valores que hay en las diagonales izquierda a derecha, derecha a izquierda
     */
    $scope.sumarDiagonales = function () {
        $scope.crearMensaje();

        //vacía variables
        $scope.bloqueos.respuestas = true;
        $scope.bloqueos.alerta = false;
        $scope.suma.izquierdaDerecha = 0;
        $scope.suma.derechaIzquierda = 0;
        $scope.suma.diferencia = 0;

        //recorre el vector de izquierda a derecha diagonal mente y suma sus valores
        for (var i = 0; i < $scope.numeroPosiciones; i++)
            $scope.suma.izquierdaDerecha = $scope.suma.izquierdaDerecha + $scope.diagonal[i].x[i].valor;

        //recorre el vector de derecha a izquierda diagonal mente y suma sus valores
        for (var i = 0; i < $scope.numeroPosiciones; i++)
            $scope.suma.derechaIzquierda = $scope.suma.derechaIzquierda + $scope.diagonal[i].x[($scope.numeroPosiciones - 1) - i].valor;

       // suma la diferencia de las dos diagonales
        $scope.suma.diferencia = $scope.suma.izquierdaDerecha - $scope.suma.derechaIzquierda;
        $scope.suma.diferencia = Math.abs($scope.suma.diferencia);


    }


    $scope.validarValorCampos = function () {

        //recorre campos verticales
        for (var i = 0; i < $scope.numeroPosiciones; i++) {
           //recorre campos horizontales para validarlos
            for (var j = 0; j < $scope.numeroPosiciones; j++)


                if (isNaN($scope.diagonal[i].x[j].valor)) {
                    $scope.diagonal[i].x[j].alerta = "El valor ingresado es incorrecto";
                    $scope.bloqueos.respuestas = false;
                }
                else {
                    $scope.bloqueos.respuestas = true;
                    $scope.diagonal[i].x[j].alerta = "";
                    $scope.sumarDiagonales();

                }
        }

        $scope.sumarDiagonales();
    }

    $scope.crearMensaje = function () {

        // limpia las variables para generar otro texto 

        $scope.suma.mesaje1 = "";
        $scope.suma.mesaje2 = "";

        //crea mensaje pegando los valores del arreglo separándolos por +
        for (var i = 0; i < $scope.numeroPosiciones; i++) {
            $scope.suma.mesaje1 += $scope.diagonal[i].x[i].valor + " + ";
            $scope.suma.mesaje2 += $scope.diagonal[i].x[($scope.numeroPosiciones - 1) - i].valor + " + ";
        }

        // elimina EL ultimo +
        $scope.suma.mesaje1 = $scope.suma.mesaje1.substr(0, $scope.suma.mesaje1.length - 2);
        $scope.suma.mesaje2 = $scope.suma.mesaje2.substr(0, $scope.suma.mesaje2.length - 2);

    }
});