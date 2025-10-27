class Login {
    constructor(loginid,testid) {
        // Ottengo il riferimento al form HTML tramite l'ID
        this.form = document.getElementById(loginid);
        this.test = testid;
        console.log(`Login: ${loginid} e Test: ${testid}`); //stampo un messaggio

        // Ottengo i riferimenti agli elementi del form
        this.Nome = document.getElementById('txtbox');
        this.Materia = document.getElementById('cmbbox');
        this.Bottone = document.getElementById('btn');

        // Controllo se ho ottenuto il form altrimenti stampo un errore
        if (!this.form) {
            console.error(`Form non trovato con ID: ${loginid}`);
            return; // Interrompe l'esecuzione se il form non esiste
        }

        // Collego il pulsante al metodo handleStart e stampo un messaggio in base all'esito
        if (this.Bottone) {
            // Quando l'utente clicca, chiama this.handleStart()
            this.Bottone.addEventListener('click', () => this.InputLogin());
            console.log(`Login Manager inizializzato per ID: ${loginid}`);
        } else {
            console.error(`Pulsante 'btn' non trovato.`);
        }
    }

    // Funzione per ottenere i valori inseriti dall'utente
    InputLogin() {
        let name = '';
        let subject = '';

        // Controllo se l'utente inserisce il nome
        if (this.Nome) {
            name = this.Nome.value; //associo valore inserito a name
        }

        // Controllo se l'utente inserisce la materia
        if (this.Materia) {
            subject = this.Materia.value;  //associo valore inserito a subject
        }
        // Chiama la funzione validate()
        if (this.validate(name, subject)) {
            console.log(`Dati validi! Inizio Test per ${name} su ${subject}`);

            // Nascondo il form di Login
            this.form.style.display = 'none';
            
            // Mi collego alla funzione startTest sul form Test
            if (this.test && typeof this.test.startTest === 'function') {
                this.test.startTest(name, subject);
                console.log("Form del test mostrato.");
            } else {
                console.log("Form del test non mostrato per un errore.");
            }
        }
    }

    // Controlli per verificare che i dati inseriti dall'utente siano corretti
    validate(name, subject) {
        // Controllo che abbia effettivamente inserito il nome
        if (!name || name.trim() === '') {
            alert("Per favore, inserisci il tuo nome.");
            return false;
        }
        // Controllo che abbia effettivamente scelto una materia
        if (subject === 'Scegli la tematica...' || !subject || subject === '') {
            alert("Per favore, scegli una tematica valida.");
            return false;
        }
        return true;
    }
}