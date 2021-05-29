// Find the Number ver. 1.0, Mariosnb 2020
// V5.2.3 Final project: Find the number, CS3.1: Introduction to web development with HTML5, CSS3, Javascript (https://mathesis.cup.gr/)
// V5.2.3 Τελική εργασία: Μάντεψε τον αριθμό, ΗΥ3.1 Εισαγωγή στην ανάπτυξη ιστοσελίδων με HTML5, CSS3, Javascript (https://mathesis.cup.gr/)

// Τα ερωτήματα 2 έως 7 θα απαντηθούν στο αρχείο αυτό
const newGuess = document.querySelector("#new-guess");
const message = document.querySelector("#message");
const lowHigh = document.querySelector("#low-high");
const checkButton = document.querySelector("#check");
const restartButton = document.querySelector("#restart");

// 2. να ορίσετε τους σχετικούς χειριστές συμβάντων
let previousGuesses = [];
let theGuess;
let newValue;
let gameStatus;

window.onload = newRandom();
newGuess.focus();

newGuess.value = "";
restartButton.style.display = "none";

checkButton.addEventListener("click", checkGuess);
restartButton.addEventListener("click", restart);
newGuess.addEventListener("keyup", checkKey);

function newRandom(){
/* 3. συνάρτηση που βρίσκει ένα τυχαίο αριθμό μεταξύ 1 και 100 
 και τον εκχωρεί στη μεταβλητή theGuess */
 theGuess = Math.floor(Math.random() * 100 + 1);
}

function checkKey(e){
/* 4. συνάρτηση που όταν ο χρήστης πατήσει <<enter>> 
 να καλεί τη συνάρτηση που αποτελεί τον κεντρικό ελεγκτή του παιχνιδιού.
 */
if (e.code === "Enter") {checkGuess();}
}

function checkGuess(){
/* 5. Να ορίσετε συνάρτηση checkGuess η οποία καλείται είτε όταν ο χρήστης πατήσει <<enter>>
στο πεδίο "new-guess" είτε όταν πατήσει το πλήκτρο "check", η οποία είναι ο κεντρικός ελεγκτής,
καλεί τη συνάρτηση processGuess (η οποία αποφαίνεται για την ορθότητα του αριθμού) και κάνει
τις κατάλληλες ενέργειες για να μην μπορεί να εισάγει ο χρήστης νέο αριθμό ή να ανασταλεί η
λειτουργία του <<enter>>, εμφάνιση του πλήκτρου 'restart' και την εξαφάνιση του πλήκτρου 'check'
σε περίπτωση ολοκλήρωσης του παιχνιδιού. */
processGuess(newValue);

if (gameStatus==="win")
{
  restartButton.style.display = "initial";
  checkButton.style.display = "none";
  newGuess.disabled = true;
}
else if(gameStatus==="lost")
{
  restartButton.style.display = "initial";
  checkButton.style.display = "none";
  newGuess.disabled = true;
}
}

function processGuess(newValue){
 /* 6.  Να ορίσετε συνάρτηση processGuess(newValue) η οποία καλείται από τη συνάρτηση checkGuess,
 περιέχει τη λογική του παιχνιδιού, ελέγχει αν η τιμή του χρήστη είναι σωστή, ή αν το παιχνίδι έχει
 τελειώσει χωρίς ο χρήστης να έχει βρει τον αριθμό, και επιστρέφει αντίστοιχα την τιμή "win", ή "lost",
 δημιουργεί και εμφανίζει τα κατάλληλα μηνύματα, αλλάζοντας το χρώμα του στοιχείου μηνυμάτων.
 Όλα τα μηνύματα του προγράμματος εμανίζονται από την processGuess().
 Σε περίπτωση που το παιχνίδι δεν έχει ακόμα τελειώσει, η συνάρτηση μπορεί είτε να μην επιστρέφει κάποια ιδιαίτερη τιμή,
 είτε να επιστρέφει κάποια τιμή της επιλογής σας */
 
 newValue = parseInt(newGuess.value);
 previousGuesses.push(newValue);
 newGuess.value= "";
 newGuess.focus();
 
 if (!isNaN(newValue))
 {
   if(previousGuesses.length<10)
   {
     messages();
    }
    else if(newValue===theGuess)  // Last check
    {
      messages();
    }
    else
    {
      message.innerHTML = "Τέλος παιχνιδιού, έχασες!";
      lowHigh.innerHTML = "Προηγούμενες προσπάθειες: " + previousGuesses.join(' ');
      return gameStatus = "lost";
    }
  }
  else
  {
    message.style.backgroundColor = "var(--msg-wrong-color)";
    message.style.border = "0.1em solid #b30000";
    message.innerHTML = "Δώσε αριθμό!";
    previousGuesses.pop();
  }
  
  function messages()
  {
    lowHigh.innerHTML = "Προηγούμενες προσπάθειες: " + previousGuesses.join(' ');
    if(newValue>theGuess)
    {
      message.style.backgroundColor = "var(--msg-wrong-color)";
      message.style.border = "0.1em solid #b30000";
      message.innerHTML = "Λάθος, το ξεπέρασες";
    }
    else if (newValue<theGuess)
    {
      message.style.backgroundColor = "var(--msg-wrong-color)";
      message.style.border = "0.1em solid #b30000";
      message.innerHTML = "Λάθος, είσαι πιο χαμηλά";
    }
    else
    {
      message.style.backgroundColor = "var(--msg-win-color)";
      message.style.border = "0.1em solid #006622";
      message.innerHTML = "Μπράβο το βρήκες!";
      return gameStatus = "win";
    }
    return gameStatus = "game in process";
  }
}

function restart(){
/* 7. Να ορίσετε συνάρτηση restart η οποία καλείται όταν ο χρήστης πατήσει το πλήκτρο 
'restart' και επανεκινεί τη διαδικασία */
previousGuesses = [];
message.innerHTML = "";
message.style.border = "none";
lowHigh.innerHTML = "";
checkButton.style.display = "initial";
restartButton.style.display = "none";
newGuess.disabled = false;
location.reload(); 
}