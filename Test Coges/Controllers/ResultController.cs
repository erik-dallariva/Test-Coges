using Microsoft.AspNetCore.Mvc;
using Test_Coges.Models;
using Test_Coges.Services;
using System.Threading.Tasks;
using System.IO;

namespace Test_Coges.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ResultController : ControllerBase
    {
        private readonly MongoDBService _mongoService; // Variabile per accedere alle operazioni sul DB

        public ResultController()
        {
            _mongoService = new MongoDBService(
                "mongodb://localhost:27017", // Stringa di connessione
                "TestCogesDB" // Nome del DB
            );
        }

        [HttpPost("add")]
        // Funzione per inviare dati al DB
        public async Task<IActionResult> AddResult([FromBody] Verifica result)
        {
            if (result == null) // Controllo se il risultato è vuoto
            {
                Console.WriteLine("result è NULL — il JSON non è stato deserializzato"); // stampo messaggio per l'utente
                // Leggo il contenuto del body
                using (var reader = new StreamReader(Request.Body))
                {
                    var body = await reader.ReadToEndAsync();
                    Console.WriteLine("Body ricevuto:");
                    Console.WriteLine(body);
                }
                return BadRequest("Dati non validi"); // stampa il messaggio in caso di dati non corretti
            }

            Console.WriteLine($"Ricevuto: Nome={result.Nome}, Materia={result.Materia}, Score={result.Score}"); // Stampo i dati ricevuti

            await _mongoService.AddResultAsync(result); // Salvo i dati sul DB
            return Ok("Risultato salvato con successo!"); // Stampo un messaggio
        }
    }
}
