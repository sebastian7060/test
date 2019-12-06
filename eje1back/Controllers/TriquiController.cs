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
       
        // GET: api/Triqui
        public dynamic Get()
        {
            var juego = new Juego();
            var jugador = new Jugador();

            juego.EstadoJuego = "";
            juego.Turno = "";
            juego.Jugador1 = jugador;
            juego.Jugador2 = jugador;
            juego.Mensaje = "";

            return juego;
        }

        // GET: api/Triqui/5
        /// <summary>
        /// 
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Triqui
        public void Post(Juego j)
        {
            var juego = new Juego();

            juego.add(j);
            

        }

        // PUT: api/Triqui/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Triqui/5
        public void Delete(int id)
        {
        }



    }
}

