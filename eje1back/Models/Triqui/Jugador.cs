using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace eje1back.Models.Triqui
{
    public class Jugador
    {
        public Nullable<int> Id { get; set; }
        public string Nombre { get; set; }
        public string Estrategia { get; set; }
        public int Fila { get; set; }
        public int columna { get; set; }
        public Nullable<int>Puntos { get; set; }
       
    }
}