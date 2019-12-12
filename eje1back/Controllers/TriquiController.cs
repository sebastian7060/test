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
        // declarcion de  variables
        static List<Juego> listaJuegos = new List<Juego>();
        static int id = 0;
        Juego juego = new Juego();


        /// <summary>
        ///  CONSULTA TODO EL JUEGO
        /// </summary>
        /// <returns></returns>

        [Route("api/Triqui/Consultar")]
        public dynamic Get()
        {
            return juego;
        }

        // Post: api/Triqui/CrearPartida
        /// <summary>
        /// crear los jugadores Y le asigna si es jugador1 o jugador2 
        /// </summary>
        /// <param name="jugador"></param>
        /// <returns></returns>
        [Route("api/Triqui/CrearJugador")]
        public dynamic PostCrearJugador([FromBody] Jugador jugador)
        {
            var partidaDisponible =
                listaJuegos.Find(l => l.EnCurso == true && l.Jugador2 == null && l.EstadoJuego != "GANO");
           id++;
            jugador.Id = id;
            if (partidaDisponible == null)
            {
                juego.Jugador1 = jugador;
                juego.EnCurso = true;
                //le da las dimenciones al tablero 
                juego.Tablero = new string[3, 3];
                listaJuegos.Add(juego);
            }
            else
            {
                partidaDisponible.Jugador2 = jugador;
                partidaDisponible.Jugador2.Estrategia = "O";
            }
            return listaJuegos;
        }





    }
}


//var colSeleccionada = juego.Tablero.Where(c => c.Columna == col).FirstOrDefault();

//var filSeleccionada = colSeleccionada.Fila.Where(f => f.PosFila == fil).FirstOrDefault();