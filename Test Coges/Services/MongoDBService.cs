using MongoDB.Driver;
using Test_Coges.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Test_Coges.Services
{
    public class MongoDBService
    {
        private readonly IMongoCollection<Verifica> _resultsCollection; // Collezione di MongoDB

        // Costruttore dove passo la stringa di connessione e il nome del DB
        public MongoDBService(string connectionString, string databaseName)
        {
            var client = new MongoClient(connectionString); // Tenta la connessione al DB
            var database = client.GetDatabase(databaseName); // Accede al DB
            _resultsCollection = database.GetCollection<Verifica>("results"); // Ottiene la tabella results
        }

        // Funzione per aggiungere dati al DB
        public async Task AddResultAsync(Verifica result)
        {
            await _resultsCollection.InsertOneAsync(result);
        }

        // Funzione per leggere i dati del DB
        public async Task<List<Verifica>> GetAllResultsAsync()
        {
            return await _resultsCollection.Find(_ => true).ToListAsync();
        }
    }
}