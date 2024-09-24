let inputs = document.querySelectorAll("input");
let button = document.querySelector("button");
let fehler = {
    "vorname_nachname": [],
    "benutzername": [],
    "email": [],
    "passwort": [],
    "passwort_wiederholen": []
};

button.addEventListener("click", (e) => {
    e.preventDefault();
});

inputs.forEach((element) => {
    element.addEventListener("change", e => {
        let aktuellerEingabe = e.target;
        let inputValue = aktuellerEingabe.value;
        let inputName = aktuellerEingabe.getAttribute("name");

        fehler[inputName] = []; // Reset grešaka za trenutni input

        if(inputValue.length > 4){
            switch(inputName){
                case "vorname_nachname":
                    let validation = inputValue.trim();
                    validation = validation.split(" ");
                    if(validation.length < 2){
                        fehler[inputName].push("Sie müssen sowohl Vorname als auch Nachname eingeben");
                    }
                break;

                case "email":
                    if(!validateEmail(inputValue)) {
                        fehler[inputName].push("Ungültige E-Mail-Adresse.");
                    }
                break;
                
                case "passwort_wiederholen":
                    let passwort = document.querySelector('input[name="passwort"]').value;
                    if(inputValue !== passwort){
                        fehler[inputName].push("Passwörter stimmen nicht überein.");
                    } 
                break;   
            }
        } else {
            fehler[inputName].push("Feld darf nicht weniger als 5 Zeichen enthalten.");
        }
        fehlerEinfugen();
    });
});

const fehlerEinfugen = () => {
    // Uklanjanje grešaka za sve inpute
    document.querySelectorAll("ul").forEach(ul => ul.remove());

    // Dodavanje grešaka za sve inpute
    for (let key of Object.keys(fehler)){
        let input = document.querySelector(`input[name="${key}"]`);
        let parentElement = input.parentElement;
        
        if (fehler[key].length > 0) {
            let errorsElement = document.createElement("ul");
            parentElement.appendChild(errorsElement);

            fehler[key].forEach(fehler => {
                let li = document.createElement("li");
                li.innerText = fehler;
                errorsElement.appendChild(li);
            });
        }
    }
}

const validateEmail = email => {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
}
