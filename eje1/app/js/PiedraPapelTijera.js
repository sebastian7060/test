
var app = angular.module("Juego");
app.controller('JuegodePiedraPapeloTijeraExtendidoController', function ($scope) {
    //declaracion de variables
    $scope.resutado = "";
    $scope.bloqueos = [{ imagene1: false, imagene2: false  }]


    // almacena los  datos jugadores para poderlos usar en la funcion jugar
    $scope.jugadores = [
        { nombre1: "", estrategia1: "", imagen1: "" },
        { nombre2: "", estrategia2: "", imagen2: "" }
    ];

    // datos de las opciones de juego
    $scope.estrategia = [
        { nombre: "Roca", imagen: "..//imagenes/Roca.png" },
        { nombre: "Papel", imagen: "..//imagenes/Papel.png" },
        { nombre: "Tijera", imagen: "..//imagenes/Tigera.png" },
        { nombre: "Lagarto", imagen: "..//imagenes/Lagarto.png" },
        { nombre: "Spock", imagen: "..//imagenes/Spock.png" }

    ];
    /* 
     * Muestra los resultados del juego según la estrategia de los jugadores  */
    $scope.jugar = function () {
        if ($scope.jugadores.estrategia1 == $scope.jugadores.estrategia2)
            $scope.resutado = "Es un empate.  ";
        else if ($scope.jugadores.estrategia1 == "Roca" && $scope.jugadores.estrategia2 == "Papel")
            $scope.resutado = " Gana " + $scope.jugadores.nombre2 + " porque papel envuelve roca";

        else if ($scope.jugadores.estrategia1 == "Roca" && $scope.jugadores.estrategia2 == "Tijera")
            $scope.resutado = " Gana " + $scope.jugadores.nombre1 + " porque roca destruye a tijeras ";

        else if ($scope.jugadores.estrategia1 == "Roca" && $scope.jugadores.estrategia2 == "Lagarto")
            $scope.resutado = " Gana " + $scope.jugadores.nombre1 + ". Roca aplasta a Lagarto ";

        else if ($scope.jugadores.estrategia1 == "Roca" && $scope.jugadores.estrategia2 == "Spock")
            $scope.resutado = " Gana " + $scope.jugadores.nombre2 + " porque Spock vaporiza Roca";

        else if ($scope.jugadores.estrategia1 == "Papel" && $scope.jugadores.estrategia2 == "Roca")
            $scope.resutado = " Gana " + $scope.jugadores.nombre1 + "porque papel envuelve roca ";

        else if ($scope.jugadores.estrategia1 == "Papel" && $scope.jugadores.estrategia2 == "Tijera")
            $scope.resutado = " Gana " + $scope.jugadores.nombre2 + " porque tijeras corta papel ";

        else if ($scope.jugadores.estrategia1 == "Papel" && $scope.jugadores.estrategia2 == "Lagarto")
            $scope.resutado = " Gana " + $scope.jugadores.nombre1 + " porque  Lagarto come papel";

        else if ($scope.jugadores.estrategia1 == "Papel" && $scope.jugadores.estrategia2 == "Spock")
            $scope.resutado = " Gana " + $scope.jugadores.nombre1 + " por que  Papel refuta a Spock ";

        else if ($scope.jugadores.estrategia1 == "Tijera" && $scope.jugadores.estrategia2 == "Roca")
            $scope.resutado = " Gana " + $scope.jugadores.nombre2 + " porque roca destruye a tijeras ";

        else if ($scope.jugadores.estrategia1 == "Tijera" && $scope.jugadores.estrategia2 == "Papel")
            $scope.resutado = " Gana " + $scope.jugadores.nombre1 + " porque tijeras corta papel   ";

        else if ($scope.jugadores.estrategia1 == "Tijera" && $scope.jugadores.estrategia2 == "Lagarto")
            $scope.resutado = " Gana " + $scope.jugadores.nombre1 + " porque Tijeras decapita a Lagarto ";

        else if ($scope.jugadores.estrategia1 == "Tijera" && $scope.jugadores.estrategia2 == "Spock")
            $scope.resutado = " Gana " + $scope.jugadores.nombre2 + " porque Spock rompe tijeras";

        else if ($scope.jugadores.estrategia1 == "Lagarto" && $scope.jugadores.estrategia2 == "Roca")
            $scope.resutado = " Gana " + $scope.jugadores.nombre2 + " Roca aplasta a Lagarto ";

        else if ($scope.jugadores.estrategia1 == "Lagarto" && $scope.jugadores.estrategia2 == "Papel")
            $scope.resutado = " Gana " + $scope.jugadores.nombre2 + " porque  Lagarto come papel";

        else if ($scope.jugadores.estrategia1 == "Lagarto" && $scope.jugadores.estrategia2 == "Tijera")
            $scope.resutado = " Gana " + $scope.jugadores.nombre2 + " porque Tijeras decapita a Lagarto ";

        else if ($scope.jugadores.estrategia1 == "Lagarto" && $scope.jugadores.estrategia2 == "Spock")
            $scope.resutado = " Gana " + $scope.jugadores.nombre1 + " porque  Lagarto envenena Spock";

        else if ($scope.jugadores.estrategia1 == "Spock" && $scope.jugadores.estrategia2 == "Roca")
            $scope.resutado = " Gana " + $scope.jugadores.nombre1 + " porque Spock vaporiza Roca ";

        else if ($scope.jugadores.estrategia1 == "Spock" && $scope.jugadores.estrategia2 == "Papel")
            $scope.resutado = " Gana " + $scope.jugadores.nombre2 + "  por que  Papel refuta a Spock";

        else if ($scope.jugadores.estrategia1 == "Spock" && $scope.jugadores.estrategia2 == "Tijera")
            $scope.resutado = " Gana " + $scope.jugadores.nombre1 + " porque Spock rompe tijeras ";

        else if ($scope.jugadores.estrategia1 == "Spock" && $scope.jugadores.estrategia2 == "Lagarto")
            $scope.resutado = " Gana " + $scope.jugadores.nombre2 + " porque  Lagarto envenena Spock";
        else
            $scope.resutado = "error ";
    }

    $scope.limpiar = function () {
        $scope.bloqueos.imagene1 = false;
        $scope.bloqueos.imagene2 = false;
        $scope.resutado = "";
        $scope.jugadores.estrategia1 = "";
        $scope.jugadores.estrategia2 = "";
        $scope.jugadores.nombre1 = "";
        $scope.jugadores.nombre2 = "";
    }
    $scope.mostrarImagenEstrategia1 = function () {
        $scope.bloqueos.imagene1 = true; 
    }
    $scope.mostrarImagenEstrategia2 = function () {
        $scope.bloqueos.imagene2 = true;
    }
});
