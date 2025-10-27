class Result {
    constructor(resultFormId) {
        // Ottengo il riferimento al form HTML tramite l'ID
        this.form = document.getElementById(resultFormId);
        // Ottengo i riferimenti agli elementi del form
        this.title = this.form.querySelector('#resultTitle');
        this.text = this.form.querySelector('#resultText');
    }

    // Funzione per stampare gli esiti ottenuti
    showResult(userName, score, total, materia) {
        this.username = userName;
        this.score = score;
        this.total = total;
        this.materia = materia;
        // Mostra il form dei risultati
        this.form.style.display = 'block';

        // Modifica direttamente il contenuto degli elementi
        this.title.textContent = `Thank You, ${userName}!`;
        this.text.textContent = `Hai risposto correttamente a ${score} su ${total} domande.`;

        this.sendResult(); // Chiamo la funzione sendReulst()
    }

    // Funzione per inviare i risultati al server via POST
    async sendResult() {
        // Stampo dei messaggi per capire se arrivo a questo punto
        console.log("Sono dentro SendResult");
        console.log(`Nome: ${this.username}  Score: ${this.score}  Materia: ${this.materia}`);
        // Controllo se i dati che dovrei inviare al DB non siano vuoti altrimenti stampo un messaggio
        if (!this.username || this.score == null || !this.materia) {
            console.error("Nessun risultato da inviare");
            return;
        }

        // Creo un oggetto JS per l'invio di dati in formto JSON
        const payload = {
            nome: this.username,
            materia: this.materia,
            score: Number(this.score)
        };

        console.log(JSON.stringify(payload)); // Stampo i dati

        // Tentativo di connessione al DB
        try {
            const response = await fetch('https://localhost:7261/api/result/add', {
                method: 'POST', // Invio dati al server
                headers: {
                    'Content-Type': 'application/json' // Richiesta tipo JSON
                },
                body: JSON.stringify(payload) // Invio dei dati tramite stringa JSON
            });

            // Controllo la risposta e stampo il risultato sia positivo che negativo
            if (response.ok) {
                console.log('Risultato salvato correttamente:', payload);
                const text = await response.text();
            } else {
                console.error('Errore nel salvataggio del risultato:', response.statusText);
            }
        } catch (error) { // Gestione di altri errori
            console.error('Errore di connessione al server:', error);
        }
    }
}
