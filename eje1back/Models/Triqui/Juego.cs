using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace eje1back.Models.Triqui
{

    public class Juego
    {


        public Array Tablero { get; set; }
        public string EstadoJuego { get; set; }
        public string Turno { get; set; }
        public Jugador Jugador1 { get; set; }
        public Jugador Jugador2 { get; set; }
        public object Acumulado { get; set; }
        public string Mensaje { get; set; }

        internal void add(Juego j)
        {
            throw new NotImplementedException();
        }
    }

}