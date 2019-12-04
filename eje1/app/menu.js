
var app = angular.module("Juego", ["ngRoute"]);

app.config(function ($routeProvider) {
    /*
    * Direcciones de enrutamiento de la pagina
    */
    $routeProvider
        //.when("/", {
        //    templateUrl: "PiedraPapelTijeraFinal.html",
        //    controller: "JuegodePiedraPapeloTijeraExtendidoController"
        //})
        .when("/piedraPapelTijera", {
            templateUrl: "html/PiedraPapelTijera.html",
            controller: "JuegodePiedraPapeloTijeraExtendidoController"
        })
        .when("/SumaDeArreglos", {
            templateUrl: "html/SumaDeArreglos.html",
            controller: "SumaDeArreglosController"

        })
        .when("/SumaMiniMax", {
            templateUrl: "html/SumaMiniMax.html",
            controller: "SumaMiniMaxController"
        })
        .when("/DiferenciaDiagonal", {
            templateUrl: "html/DiferenciaDiagonal.html",
            controller: "DiferenciaDiagonalController",
            
        })
        .when("/Triqui", {
            templateUrl: "html/Triqui.html",
            controller: "TriquiController",
    
        })
        .when("/TriquiOnline", {
            templateUrl: "html/TriquiOnline.html",
            controller: "TriquiOnlineController",

        })


}); 
