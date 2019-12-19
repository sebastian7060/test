using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace eje1back.Models.Triqui
{
    public class Juego
    {
        public Nullable<int> IdPartida { get; set; }
        public CamposTablero[,] Tablero { get; set; }
        public Nullable <bool> EnCurso { get; set; }
        public string EstadoJuego { get; set; }
        public string Turno { get; set; }
        public Jugador Jugador1 { get; set; }
        public Jugador Jugador2 { get; set; }
        public Acomulado Acumulado { get; set; }
        public string Mensaje { get; set; }
        public bool Maquina { get; set; }
    }

}