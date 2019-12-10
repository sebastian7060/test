using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using eje1back.Models.Triqui;

namespace eje1back.Controllers
{

    public class TriquiController : ApiController
    {
        /// <summary>
        /// crear dimenciones del tablero
        /// </summary>
        /// <param name="h"></param>
        /// <returns></returns>
        // Post: api/Triqui/CrearPartida

        //[Route("api/Triqui/CrearPartida")]
        //public dynamic Post([FromBody] int h)
        //{

            //var juego = new Juego();
            //var columna = new CamposColumna();

            //for (var i = 0; i < 3; i++)
            //{
            //    for (var j = 0; j < 3; j++)
            //    {
            //        columna.Columna = i;
            //        columna.Fila.Add(new CamposFila
            //        {
            //            PosFila = 1,
            //            Columna = i,
            //            Valor = "",
            //            Alerta = "",
            //            Canvas = "fila" + j + "_colmna" + i

            //        });
            //    }

            //    juego.Tablero.Add(columna);
            //}

        //    return h;
        //}

        //[Route("api/Triqui/ValidarTriqui")]
        //public dynamic Post([FromBody] string fd)
        //{
        //    var juego = new Juego();
        //    int fila = 0;
        //    string dibujarLinea;
        //    //juego.Acumulado =
        //    for (var i = 0; i < 3; i++)
        //    {
        //        fila = 0;
        //        juego.Acumulado.DiagonalDerecha += juego.Tablero[i].Fila[i].Valor;
        //        juego.Acumulado.Diagonalizquierda += juego.Tablero[2 - i].Fila[i].Valor;

        //        for (var j = 0; j < 3; j++)
        //        {
        //            juego.Acumulado.Fila += juego.Tablero[i].Fila[j].Valor;
        //            juego.Acumulado.Columna += juego.Tablero[j].Fila[i].Valor;

        //        }

        //        //valida si hay triqui en la columna o filas por el jugador 1
        //        if (juego.Acumulado.Fila == "xxx" || juego.Acumulado.Columna == "xxx")
        //        {
        //            juego.EstadoJuego = "Gano";
        //            juego.Mensaje = juego.Jugador1.Nombre;
        //            fila = i;
        //        }

        //        //valida si hay triqui en la columna o filas por el jugador 2
        //        else if (juego.Acumulado.Fila == "ooo" || juego.Acumulado.Columna == "ooo")
        //        {
        //            juego.EstadoJuego = "Gano";
        //            juego.Mensaje = juego.Jugador2.Nombre;
        //            fila = i;
        //        }
        //        else
        //        {

        //            juego.Acumulado.Fila = "";
        //            juego.Acumulado.Columna = "";
        //        }
        //// dibuja la linea fila
        //if (juego.Acumulado.Fila == "xxx" || juego.Acumulado.Fila == "ooo")
        //    for (var b = 0; b < 3; b++)
        //dibujarLinea(juego.Tablero[fila].Fila[b], "fila");

        //// dibuja la linea columna
        //if (juego.Acumulado.Columna == "xxx" || juego.Acumulado.Columna == "ooo")
        //    for (var b = 0; b < 3; b++)
        //dibujarLinea(juego.Tablero[b].Fila[fila], "columna");


        //    }

        //}
        // GET: api/Triqui/5


        public string Get(int id)
        {

            return "value";
        }

        // POST: api/Triqui

        //[Route("api/Triqui/CrearPartida/{mesaje}")]
        //public dynamic Post(string mensaje)
        //{

        //    return "HOLA" ;

        //}

        // PUT: api/Triqui/5

        //public void Put(int id, [FromBody]string value)
        //{

        //}

        //// DELETE: api/Triqui/5
        //public void Delete(int id)
        //{

        //}



    }
}


//var colSeleccionada = juego.Tablero.Where(c => c.Columna == col).FirstOrDefault();

//var filSeleccionada = colSeleccionada.Fila.Where(f => f.PosFila == fil).FirstOrDefault();