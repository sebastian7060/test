// JavaScript source code
var app = angular.module("Juego");
app.controller('SumaMiniMaxController', function ($scope) {
    $scope.numeroDatos
    //declaración de variables
    $scope.camposArreglo = 0;
    $scope.arreglo = [];
    $scope.respuesta = [{ suma: 0, mayor: 0, menor: 0 }]
    $scope.bloqueos = [{ respuestas: false, arreglo: false, arreglo: false }]

    /*
     * Crea el número de campos para ingresar los datos
     */
    $scope.crearcampos = function () {

        //valida para mostrar el juego
        if ($scope.camposArreglo == 0 || !$scope.camposArreglo) {
            $scope.bloqueos.arreglo =false;
            $scope.bloqueos.respuestas = false;
        }
        else {
            $scope.bloqueos.arreglo = true;
            $scope.bloqueos.boton = true;
            $scope.bloqueos.respuestas = false;
        }

        //limpia los valores de la variables 
        $scope.respuesta.mayor = -10000000;
        $scope.respuesta.menor = 10000000;
        $scope.arreglo = [];
        console.log($scope.camposArreglo);

        //crea campos para ingresar valores a los datos
        for (var i = 1; i <= $scope.camposArreglo; i++)
            $scope.arreglo.push({ pos: i, valor: 0, mensaje: "", mensaje2: "", resultado: 0,alerta:""});


    }
    /*
     * crea el mensaje para la respuesta de la suma del arreglo
     */
    $scope.crearMensaje = function () {

        // limpia las variables para generar otro texto 
        for (var i = 0; i < $scope.arreglo.length; i++) {
            $scope.arreglo[i].mensaje = "";
            $scope.arreglo[i].mensaje2 = "";
        }

        //válida para bloquear los campos
        $scope.bloqueos.arreglo = true;
        $scope.bloqueos.boton = true;
        $scope.bloqueos.respuestas = true;


        // crea los mensajes para imprimir las sumas
        for (var i = 0; i < $scope.arreglo.length; i++) {
            $scope.arreglo[i].mensaje += $scope.arreglo[i].valor + ", tenemos ";

            for (var j = 0; j < $scope.arreglo.length; j++) {
                if (i) $scope.arreglo[i].mensaje2 += $scope.arreglo[j].valor + " , ";
                if (j != i) $scope.arreglo[i].mensaje += $scope.arreglo[j].valor + " + ";

            }
        }


        // elimina la ultima , o + de los textos
        for (var i = 0; i < $scope.arreglo.length; i++) {
            $scope.arreglo[i].mensaje = $scope.arreglo[i].mensaje.substr(0, $scope.arreglo[i].mensaje.length - 2);
            $scope.arreglo[i].mensaje2 = $scope.arreglo[i].mensaje2.substr(0, $scope.arreglo[i].mensaje2.length - 2);
        }
    }


    /*
     * sumar  los datos
     */
    $scope.sumarDatos = function () {

        //limpar variables
        $scope.respuesta.suma = 0;
        $scope.respuesta.mayor = -1000000;
        $scope.respuesta.menor = 10000000;

        //suma los datos de 

        for (var i = 1; i <= $scope.camposArreglo; i++) {
            $scope.respuesta.suma = $scope.respuesta.suma + $scope.arreglo[i - 1].valor;
        }

        for (var i = 1; i <= $scope.camposArreglo; i++) {
            $scope.arreglo[i - 1].resultado = $scope.respuesta.suma - $scope.arreglo[i - 1].valor;
            // valida las sumas para saber el mayor o el menor
            if ($scope.arreglo[i - 1].resultado > $scope.respuesta.mayor) $scope.respuesta.mayor = $scope.arreglo[i - 1].resultado;
            if ($scope.respuesta.menor > $scope.arreglo[i - 1].resultado) $scope.respuesta.menor = $scope.arreglo[i - 1].resultado;
        }

        // ejecuta la funcion 
        $scope.crearMensaje();

    }


    /*
     *  asigna valores alatorios a los valores de el arreglo
     */
    $scope.asignarValoresAleatorios = function () {

        for (var i = 1; i <= $scope.camposArreglo; i++) {
            $scope.arreglo[i - 1].valor = Math.floor(Math.random() * 99);
        }
        // ejecuta la funcion 
        $scope.sumarDatos();
    }

    $scope.editarValores = function () {

        //válida para bloquear los campos
        $scope.bloqueos.arreglo = true;
        $scope.bloqueos.boton = true;
        $scope.bloqueos.respuestas = true;



    }


    $scope.validarValorCampos = function () {

        //rrecorre campos verticales
        for (var i = 0; i < $scope.camposArreglo; i++) {
            //rrecorre campos horisontales para validarlos


                if (isNaN($scope.arreglo[i].valor)) {
                    $scope.arreglo[i].alerta = "El valor ingresado es incorrecto";
                    
                }
                else
                    $scope.arreglo[i].alerta = "";

        }

        $scope.sumarDatos();
    }



});