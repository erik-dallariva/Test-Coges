using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Text.Json.Serialization;

namespace Test_Coges.Models
{
    public class Verifica
    {
        [BsonId] // Campo chiave primaria (MongoDB genera un ObjectId)
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        [JsonPropertyName("nome")]
        //Identifica durante la serializzazione/deserializzazione la proprietà nome
        public string Nome { get; set; }

        [JsonPropertyName("materia")]
        //Identifica durante la serializzazione/deserializzazione la proprietà materia
        public string Materia { get; set; }

        [JsonPropertyName("score")]
        //Identifica durante la serializzazione/deserializzazione la proprietà score
        public int Score { get; set; }
    }
}
