// JavaScript source code
var app = angular.module("Juego");
app.controller('SumaDeArreglosController', function ($scope) {

    //Declaracion de variables
    $scope.numeroCampos = 0;
    $scope.arreglos = [];
    $scope.bloqueos = [{ respuestas: false, barra: false }]

    /*
     * Crea el numero de campos para ingresar los datos
     */
    $scope.crearRegistros = function () {
        //limpiar variables
        $scope.arreglos = [];

        //evalua si el numero de campos es mayor que 0 para habilitar el juego
        if ($scope.numeroCampos == 0 || !$scope.numeroCampos) $scope.bloqueos.respuestas = false;
        else $scope.bloqueos.respuestas = true;

        //crea el numero de campos
        for (var i = 1; i <= $scope.numeroCampos; i++) {
            $scope.arreglos.push({ pos: i, valor1: 0, valor2: 0, total: 0, total1: 0, mensaje: "", mensaje2: "", barra: false });
        }
    }

    /*
     * Asigna valores aleatorios a los valores de los arreglos
     */
    $scope.asignarValoresAleatorios = function () {

        //recorre el arreglo y le asigna valores aleatrorioas
        for (var i = 0; i < $scope.numeroCampos; i++) {
            $scope.arreglos[i].valor1 = Math.floor(Math.random() * 100);
            $scope.arreglos[i].valor2 = Math.floor(Math.random() * 100);
        }

        // envio a otras funciones
        $scope.sumar();
        $scope.validarValorCampos();
    }

    /*
     * Suma los valores de los arreglos para poderlos usar en las barras dinamicas y en el total del arreglo 
     */
    $scope.sumar = function () {
        // recorre el arreglo y suma sus valores
        for (var i = 0; i < $scope.numeroCampos; i++) {
            $scope.arreglos[i].total1 = Math.abs($scope.arreglos[i].valor1 + $scope.arreglos[i].valor2);
            $scope.arreglos[i].total = $scope.arreglos[i].total1 / 2;
            $scope.validarValorCampos
        }
    }


    /*
     * valida si el valor ingresado al input esta entre los parametros
     */
    $scope.validarValorCampos = function () {
        $scope.bloqueos.barra = true;

        //recorre y evalua si el valor cumple con las especoficasiones 
        for (var i = 0; i < $scope.numeroCampos; i++) {

            if (isNaN($scope.arreglos[i].valor1) || isNaN($scope.arreglos[i].valor2)) {
                $scope.arreglos[i].barra = false;

                if (isNaN($scope.arreglos[i].valor1)) {
                   
                    $scope.arreglos[i].mensaje = "El valor ingresado es incorrecto";
                }
                if (isNaN($scope.arreglos[i].valor2)) {
                   
                    $scope.arreglos[i].mensaje2 = "El valor ingresado es incorrecto";
                }
            }

            else if ($scope.arreglos[i].valor1 < -100 || $scope.arreglos[i].valor1 > 100 || $scope.arreglos[i].valor2 < -100 || $scope.arreglos[i].valor2 > 100) {
                $scope.arreglos[i].barra = false;
                if ($scope.arreglos[i].valor1 < -100 || $scope.arreglos[i].valor1 > 100) {
                    $scope.arreglos[i].mensaje = "Ingrese valores Entre -100 y 100";

                }
                if ($scope.arreglos[i].valor2 < -100 || $scope.arreglos[i].valor2 > 100) {
                 
                    $scope.arreglos[i].mensaje2 = "Ingrese valores Entre -100 y 100";
                }
            }
            else {
                $scope.arreglos[i].mensaje2 = "";
                $scope.arreglos[i].mensaje = "";
                $scope.arreglos[i].barra = true;
                $scope.sumar();
            }
        }

    }
});
