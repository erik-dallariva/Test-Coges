class Test {
    constructor(testFormId, resultManager) {
        // Ottengo il riferimento al form HTML tramite l'ID
        this.form = document.getElementById(testFormId);
        this.resultManager = resultManager;
        this.materia = '';
        this.currentIndex = 0;
        this.score = 0;
        this.username = '';

        // Controllo se ho ottenuto il form e in caso contrario stampo un messaggio d'errore
        if (!this.form) {
            console.error("Form non trovato!");
            return;
        }

        // Ottengo i riferimenti agli elementi del form
        this.answers = this.form.querySelectorAll('.answer');
        this.nextBtn = this.form.querySelector('#btninvio');
        this.progressBar = this.form.querySelector('#progressbar');

        // Faccio scomparire il form
        this.form.style.display = 'none';

        // Quando clicco una risposta gli viene aggiunta la classe selected per selezionarlo
        this.answers.forEach(btn => {
            btn.addEventListener('click', () => {
                btn.classList.toggle('selected');
            });
        });

        // Quando premo il pulsante passo alla prossima domanda o form
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => this.handleNext());
        } else {
            console.error("Bottone 'Prosegui' non trovato!");
        }
    }

    // Funzione per ottenere le risposte selezionate
    getSelectedAnswers() {
        const selected = this.form.querySelectorAll('.answer.selected');
        const selectedValues = Array.from(selected).map(btn => btn.value);
        console.log("Risposte selezionate:", selectedValues);
        return selectedValues;
    }

    // Funzione per gestire il passaggio alla prossima domanda
    handleNext() {
        const selected = this.getSelectedAnswers();
        // Controllo se l'utente ha selezionato una risposta prima di proseguire altrimenti stampo un messaggio a schermo
        if (selected.length === 0) {
            alert("Seleziona almeno una risposta!");
            return;
        }

        const currentQuestion = this.questions[this.currentIndex];
        const correctAnswers = currentQuestion.correct;

        // Controlla se le risposte selezionate sono uguali a quelle corrette
        const isCorrect =
            selected.length === correctAnswers.length &&
            selected.every(ans => correctAnswers.includes(ans));

        // Controllo per segnare il punto in caso di risposta corretta
        if (isCorrect) {
            this.score++;
            console.log("Risposta corretta!");
        } else {
            console.log("Risposta errata.");
        }

        this.currentIndex++; //aggiorno indice per le domande

        // Aggiorno la progressbar
        const progress = Math.min(
            (this.currentIndex / this.questions.length) * 100,
            100
        );
        this.progressBar.value = progress;

        // Mostra la prossima domanda o termina
        if (this.currentIndex < this.questions.length) {
            this.showQuestion(this.currentIndex);
        } else {
            this.endTest();
        }
    }

    // Funzione per mostrare una domanda
    showQuestion(index) {
        const q = this.questions[index];
        if (!q) return;

        // Ottengo i riferimenti agli elementi del form per modificarli
        const questionElement = document.getElementById('question');
        const Formtitle = document.getElementById('titolo');
        const buttons = [
            document.getElementById('btn1'),
            document.getElementById('btn2'),
            document.getElementById('btn3'),
            document.getElementById('btn4')
        ];

        Formtitle.innerHTML = `${this.materia} - Domanda ${index + 1} di ${this.questions.length}`; // Modifico il titolo
        questionElement.innerHTML = q.q; // Modifico la domanda

        // Cambio il contenuto dei pulsanti in base alla domanda visualizzata
        buttons.forEach((btn, i) => {
            if (q.options[i]) {
                btn.style.display = 'inline-block';
                btn.value = q.options[i];
                btn.textContent = q.options[i];
                btn.classList.remove('selected');
            } else {
                btn.style.display = 'none';
            }
        });
    }

    // Funzione per avviare il test (chiamato da Login.js)
    startTest(name, subject) {
        if (!this.form) return; // Controllo se ottengo il form

        this.username = name;
        this.materia = subject;
        this.form.style.display = 'block';
        this.currentIndex = 0;
        this.score = 0;
        this.progressBar.value = 0;

        // Controllo per stampare le domdande con le relative risposte in basa alla materia selezionata dall'utente
        if (this.materia === "Matematica") {
            this.questions = [
                { q: "Qual è il risultato di 2 × 0?", options: ["0", "1", "2", "3"], correct: ["0"] },
                { q: "Quale somma da 5 come risultato?", options: ["4+3", "2+3", "3+2", "1+2"], correct: ["2+3", "3+2"] },
                { q: "Quanto fa 21 ÷ 3?", options: ["5", "6", "7", "8"], correct: ["7"] },
            ];
        } else if (this.materia === "Geografia") {
            this.questions = [
                { q: "Qual è la capitale d’Italia?", options: ["Milano", "Roma", "Napoli", "Torino"], correct: ["Roma"] },
                { q: "In quale continente si trova il Brasile?", options: ["Europa", "Asia", "America del Sud", "Africa"], correct: ["America del Sud"] },
                { q: "Quali sono le città inglesi?", options: ["Manchester", "Milano", "Londra", "Bordeaux"], correct: ["Manchester", "Londra"] }
            ];
        } else if (this.materia === "Storia") {
            this.questions = [
                { q: "Quali tra questi animali erano usati dagli antichi Egizi?", options: ["Gatto", "Leone", "Cane", "Cavallo"], correct: ["Gatto", "Cane"] },
                { q: "In che anno è caduto l’Impero Romano d’Occidente?", options: ["476 d.C.", "1492", "800 d.C.", "1453"], correct: ["476 d.C."] },
                { q: "Chi ha scoperto l’America?", options: ["Cristoforo Colombo", "Leonardo da Vinci", "Galileo Galilei", "Marco Polo"], correct: ["Cristoforo Colombo"] }
            ];
        }

        this.showQuestion(this.currentIndex); // Chiamata alla funzione showQuestion
        console.log(`▶️ Test avviato per ${name} su ${subject}`);
    }

    // Funzione che termina il test e passa al form successivo per stampare i risultati
    endTest() {
        this.form.style.display = 'none';
        this.progressBar.style.display = 'none';
        if (this.resultManager) {
            this.resultManager.showResult(this.username, this.score, this.questions.length, this.materia);
        }
    }
}