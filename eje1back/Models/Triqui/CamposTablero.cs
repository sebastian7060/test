using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace eje1back.Models.Triqui
{
    public class CamposFila 
    {
        public int PosFila { get; set; }
        public int Columna { get; set; }
        public string Valor { get; set; }
        public string Alerta { get; set; }
        public string Canvas { get; set; }

    }
    public class CamposColumna
    {
        public int Columna { get; set; }
        public List<CamposFila> Fila { get; set; }
    }
}