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
        public Jugador Maquina = new Jugador();
        public Acomulado acomulado = new Acomulado();



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
                juego.Jugador1.Estrategia = "x";
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
            acomulado.Columna = "";
            var consultaJuego =
                listaJuegos.Where(lj => lj.IdPartida == idPartida).FirstOrDefault();
            consultaJuego.Tablero[camposTablero.Columna, camposTablero.PosFila] = camposTablero;
            if (consultaJuego.Maquina == false)
            {
                if (consultaJuego.Jugador1.FinTurno == true)
                {
                    consultaJuego.Jugador1.FinTurno = false;
                    consultaJuego.Jugador2.FinTurno = true;
                }
                else
                {
                    consultaJuego.Jugador1.FinTurno = true;
                    consultaJuego.Jugador2.FinTurno = false;
                }
                return camposTablero;
            }
            else
            {
                Random rango = new Random();
                int fila = 0;
                int columna = 0;
                acomulado.DiagonalDerecha = "";
                acomulado.Diagonalizquierda = "";
                //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

                for (var i = 0; i < 3; i++)
                {
                    //    if (consultaJuego.Jugador1.FinTurno == true)
                    //    {
                    if (consultaJuego.Tablero[i, i] != null)
                        acomulado.DiagonalDerecha += consultaJuego.Tablero[i, i].Valor;

                    if (consultaJuego.Tablero[2 - i, i] != null)
                        acomulado.Diagonalizquierda += consultaJuego.Tablero[2 - i, i].Valor;
                    for (var j = 0; j < 3; j++)
                    {
                        if (consultaJuego.Tablero[i, j] != null && consultaJuego.EstadoJuego != "Gano")
                            acomulado.Fila += consultaJuego.Tablero[i, j].Valor;

                        if (consultaJuego.Tablero[j, i] != null && consultaJuego.EstadoJuego != "Gano")
                            acomulado.Columna += consultaJuego.Tablero[j, i].Valor;



                        if (acomulado.Fila == "xxx" || acomulado.Columna == "xxx")
                        {
                            consultaJuego.EstadoJuego = "Gano";
                            consultaJuego.Mensaje = consultaJuego.Jugador1.Nombre;

                        }

                        //valida si hay triqui en la columna o filas por el jugador 2
                        else if (acomulado.Fila == "ooo" || acomulado.Columna == "ooo")
                        {
                            consultaJuego.EstadoJuego = "Gano";
                            consultaJuego.Mensaje = consultaJuego.Jugador2.Nombre;

                        }

                        else
                        {

                            acomulado.Fila = "";
                            acomulado.Columna = "";
                        }

                    }


                }


                //valida si hay triqui en la diagonal por el jugador 1
                if (acomulado.DiagonalDerecha == "xxx" || acomulado.Diagonalizquierda == "xxx")
                {
                    consultaJuego.EstadoJuego = "Gano";
                    consultaJuego.Mensaje = consultaJuego.Jugador1.Nombre;
                }

                //valida si hay triqui en la diagonal por el jugador 2
                else if (acomulado.DiagonalDerecha == "ooo" || acomulado.Diagonalizquierda == "ooo")
                {
                    consultaJuego.EstadoJuego = "Gano";
                    consultaJuego.Mensaje = consultaJuego.Jugador2.Nombre;
                }

                ///////////////////////////////////////////////////////////////////////////////////////////////////////////
                acomulado.DiagonalDerecha = "";
                acomulado.Diagonalizquierda = "";
                acomulado.Fila = "";
                acomulado.Columna = "";

                if (consultaJuego.EstadoJuego != "Gano")
                {
                    for (var i = 0; i < 3; i++)
                    {
                        if (consultaJuego.Jugador1.FinTurno == true)
                        {
                            if (consultaJuego.Tablero[i, i] != null)
                                acomulado.DiagonalDerecha += consultaJuego.Tablero[i, i].Valor;

                            if (consultaJuego.Tablero[2 - i, i] != null)
                                acomulado.Diagonalizquierda += consultaJuego.Tablero[2 - i, i].Valor;
                        }

                        //recorre la columna y filas
                        for (var j = 0; j < 3; j++)
                        {
                            if (consultaJuego.Tablero[i, j] != null)
                                acomulado.Fila += consultaJuego.Tablero[i, j].Valor;

                            if (consultaJuego.Tablero[j, i] != null)
                                acomulado.Columna += consultaJuego.Tablero[j, i].Valor;


                            if (acomulado.Fila == "xx" || acomulado.Fila == "oo")
                                for (var k = 0; k < 3; k++)
                                {
                                    if (consultaJuego.Tablero[i, k] == null && consultaJuego.Jugador1.FinTurno != false)
                                    {
                                        consultaJuego.Jugador1.FinTurno = false;
                                        consultaJuego.Tablero[i, k] = new CamposTablero();
                                        consultaJuego.Tablero[i, k].Valor = "o";
                                    }
                                }
                            else if (acomulado.Columna == "xx" || acomulado.Columna == "oo")
                                for (var k = 0; k < 3; k++)
                                {
                                    if (consultaJuego.Tablero[k, i] == null && consultaJuego.Jugador1.FinTurno != false)
                                    {
                                        consultaJuego.Jugador1.FinTurno = false;
                                        consultaJuego.Tablero[k, i] = new CamposTablero();
                                        consultaJuego.Tablero[k, i].Valor = "o";
                                    }
                                }


                        }

                        acomulado.Fila = "";
                        acomulado.Columna = "";
                    }

                    if (acomulado.DiagonalDerecha == "xx" || acomulado.DiagonalDerecha == "oo")
                        for (var k = 0; k < 3; k++)
                        {
                            if (consultaJuego.Tablero[k, k] == null && consultaJuego.Jugador1.FinTurno != false)
                            {
                                consultaJuego.Jugador1.FinTurno = false;
                                consultaJuego.Tablero[k, k] = new CamposTablero();
                                consultaJuego.Tablero[k, k].Valor = "o";
                            }
                        }
                    else if (acomulado.Diagonalizquierda == "xx" || acomulado.Diagonalizquierda == "oo")
                        for (var k = 0; k < 3; k++)
                        {
                            if (consultaJuego.Tablero[2 - k, k] == null && consultaJuego.Jugador1.FinTurno != false)
                            {
                                consultaJuego.Jugador1.FinTurno = false;
                                consultaJuego.Tablero[2 - k, k] = new CamposTablero();
                                consultaJuego.Tablero[2 - k, k].Valor = "o";
                            }
                        }


                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////


                    if (consultaJuego.Tablero[1, 1] == null)
                    {
                        consultaJuego.Tablero[1, 1] = new CamposTablero();
                        consultaJuego.Tablero[1, 1].Valor = "o";
                        consultaJuego.Jugador1.FinTurno = false;
                    }
                    else
                    {
                        while (consultaJuego.Jugador1.FinTurno == true)
                        {
                            fila = rango.Next(0, 3);
                            columna = rango.Next(0, 3);
                            if (consultaJuego.Tablero[fila, columna] == null && consultaJuego.Jugador1.FinTurno == true)
                            {
                                consultaJuego.Tablero[fila, columna] = new CamposTablero();
                                consultaJuego.Tablero[fila, columna].Valor = "o";
                                consultaJuego.Jugador1.FinTurno = false;
                            }
                        }
                    }
                }

            }

            consultaJuego.Jugador1.FinTurno = true;
            return camposTablero;
        }

        // Post: api/Triqui/CrearPartida
        /// <summary>
        /// activa la maquina para poder jugar 
        /// </summary>
        /// <param name="jugador"></param>
        /// <returns></returns>
        [Route("api/Triqui/activarMaquina/{idPartida}")]
        public dynamic PostActivarMaquinar([FromBody] bool maquina, int idPartida)
        {
            idJugador++;
            var consultaJuego =
                             listaJuegos.Where(lj => lj.IdPartida == idPartida).FirstOrDefault();
            consultaJuego.Maquina = maquina;
            consultaJuego.Jugador1.FinTurno = true;
            consultaJuego.Jugador2 = new Jugador()
            {
                Nombre = "maquina",
                IdJugador = idJugador,
                Estrategia = "o",
                FinTurno = false

            };


            return consultaJuego;
        }

        public void RealizarJugadaMaquina()
        {



        }

    }
}




