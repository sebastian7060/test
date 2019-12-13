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
        static int idJugador = 0;
        static int idPartida = 0;
        Juego juego = new Juego();

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
            idJugador++;
            jugador.IdJugador = idJugador;
            if (partidaDisponible == null)
            {
                idPartida++;
                juego.IdPartida = idPartida;
                juego.Jugador1 = jugador;
                juego.EnCurso = true;
                juego.Jugador1.FinTurno = false;
                //le da las dimenciones al tablero 
                juego.Tablero = new string[3, 3];
                listaJuegos.Add(juego);
                return juego;
            }
            else
            {
                partidaDisponible.Jugador2 = jugador;
                partidaDisponible.Jugador2.Estrategia = "O";
                partidaDisponible.Jugador2.FinTurno = true;
                return partidaDisponible;
            }
            
        }

        /// <summary>
        ///  CONSULTA TODO EL JUEGO
        /// </summary>
        /// <returns></returns>
        [Route("api/Triqui/Consultar/{idPartida}")]
        public dynamic GetConsultarTodoElJuego(int idPartida)
        {
            var consultaJuego =
                 listaJuegos.Where(lj => lj.IdPartida == idPartida).FirstOrDefault();
            return consultaJuego;
        }




    }
}




