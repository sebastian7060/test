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
        /// crea la partida para los jugadores
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
                juego.Tablero = new CamposTablero[3, 3];
                listaJuegos.Add(juego);
                return juego;
            }
            else
            {
                partidaDisponible.Jugador2 = jugador;
                partidaDisponible.Jugador2.Estrategia = "o";
                partidaDisponible.Jugador2.FinTurno = true;
                return partidaDisponible;
            }
        }

        /// <summary>
        /// consulta la informacion de los juagdores de una partida espesifica
        /// </summary>
        /// <param name="idPartida"></param>
        /// <returns></returns>
        [Route("api/Triqui/Consultar/{idPartida}")]
        public dynamic GetConsultarJugadores(int idPartida)
        {
            var consultaJuego =
                 listaJuegos.Where(lj => lj.IdPartida == idPartida).FirstOrDefault();
            return consultaJuego;
        }

        /// <summary>
        /// trae el campo marcado por el jugador 
        /// </summary>
        /// <param name="camposTablero"></param>
        /// <returns></returns>
        [Route("api/Triqui/realizarJugada/{idPartida}")]
        public dynamic PostConsultarTodoElJuego
            ([FromBody] CamposTablero camposTablero)
        {
            var consultaJuego =
                 listaJuegos.Where(lj => lj.IdPartida == idPartida).FirstOrDefault();
            consultaJuego.Tablero[camposTablero.Columna, camposTablero.PosFila] = camposTablero;
            if (consultaJuego.Jugador1.FinTurno == true)
            {
                consultaJuego.Jugador1.FinTurno = false;
                consultaJuego.Jugador2.FinTurno = true;
            }
            else
            {
                consultaJuego.Jugador1.FinTurno = true;
                consultaJuego.Jugador2.FinTurno =  false;
            }

            return camposTablero;
        }



    }
}




