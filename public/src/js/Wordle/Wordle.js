class Wordle{
    constructor(name, password){
        this.data = new Fetch();
        this.name = name;
        this.password = password;
        this.rowIndex = 0;
        this.index = 0;
        this.wordArray = [];
        window.addEventListener("keydown", this.addInputs.bind(this));
        this.createWordle();
    }
    async createWordle(){
        const data = await this.data.fetch();
        this.getWord = Math.floor(Math.random() * data.wordlist.length);
        this.word = data.wordlist[this.getWord].word;

        this.body = document.querySelector("body");
        this.main = document.createElement("main");
        this.main.classList.add("main");
        this.body.appendChild(this.main);

        this.wordle = document.createElement("section");
        this.wordle.classList.add("wordle");
        this.main.appendChild(this.wordle);

        for(let i = 0; i < 6; i++){
            this.row = document.createElement("div");
            this.row.classList.add("wordle__row");
            this.wordle.appendChild(this.row);

            for(let i = 0; i < 5; i++){
                this.input = document.createElement("article");
                this.input.classList.add("wordle__row--input");
                this.row.appendChild(this.input);
            }
        }
        this.createKeyboard();
    }
    async createKeyboard(){
        const data = await this.data.fetch();
        this.keyboard = document.createElement("div");
        this.keyboard.classList.add("keyboard");
        this.wordle.appendChild(this.keyboard);

        for(let i = 0; i < data.letters.length; i++){
            this.key = document.createElement("button");
            this.key.classList = "keyboard__key keyboard__key--"+data.letters[i].letter.toLowerCase();
            this.key.innerText = data.letters[i].letter;
            this.keyboard.appendChild(this.key);
        }
    }
    addInputs(event){
        if(this.rowIndex > 5){
            return;
        }
        this.rowInput = document.getElementsByClassName("wordle__row")[this.rowIndex].children;
        if(event.code.substring(0, 3) === "Key"){
            if(this.rowInput.length >= this.index + 1){
                this.rowInput[this.index].classList.add("wordle__row--input-entered");
                this.rowInput[this.index].innerText = event.key;
                this.wordArray.push(event.key.toLowerCase());
                this.index++;
                return;
            }
        }
        else if(event.code === "Backspace"){
            if(this.index - 1 < 0){
                this.rowInput[this.index].innerText = "";
                this.rowInput[this.index].classList.remove("wordle__row--input-entered");
            }
            else{
                this.index--;
                this.rowInput[this.index].innerText = "";
                this.rowInput[this.index].classList.remove("wordle__row--input-entered");
                this.wordArray.pop();
            }
        }
        else if(event.code === "Enter"){
            this.checkGuess();
        }
    }
    checkGuess(){
        this.getInputs = document.getElementsByClassName("wordle__row")[this.rowIndex].children;
        this.splitWord = this.word.split("");
        if(this.index == 5){
            if(this.wordArray.join("") === this.word){
                let score = this.rowIndex;
                for(let i = 0; i < 5; i++){
                    if(this.word === "witch" || this.word === "coven" || this.word === "crone" || this.word === "along"){
                        this.addClass(this.getInputs[i], this.wordArray[i], "purple");  
                    }
                    else if(this.word === "satan"){
                        this.addClass(this.getInputs[i], this.wordArray[i], "red");

                    }
                    else if(this.word === "death"){
                        this.addClass(this.getInputs[i], this.wordArray[i], "black");
                    }
                    else{
                        this.addClass(this.getInputs[i], this.wordArray[i], "green");
                    }
                }
                setTimeout(() => {
                    this.guessed(true, score);
                }, 2200);
            }
            else{
                for(let i = 0; i < 5; i++){
                    if(this.wordArray[i] === this.splitWord[i]){
                        this.addClass(this.getInputs[i], this.wordArray[i], "green");
                        this.splitWord[i] = null;
                    }
                }
                for(let i = 0; i < 5; i++){
                    if(this.splitWord.includes(this.wordArray[i]) && this.wordArray[i] !== this.splitWord[i]){
                        if(this.getInputs[i].className === "wordle__row--input wordle__row--input-entered"){
                            this.addClass(this.getInputs[i], this.wordArray[i], "yellow");
                            this.splitWord[this.splitWord.indexOf(this.wordArray[i])] = null;
                        }
                    }
                    else{
                        if(this.getInputs[i].className === "wordle__row--input wordle__row--input-entered"){
                            this.addClass(this.getInputs[i], this.wordArray[i], "grey");
                        }
                    }
                }
                if(this.rowIndex >= 5){
                    setTimeout(() => {
                        let score = 6;
                        this.guessed(false, score);
                    }, 2200);
                }
                this.wordArray = [];
                this.index = 0;
                this.rowIndex++;  
            }
        }
        
    }
    addClass(input, letter, color){
        input.classList.add("wordle__row--input-"+color);
        setTimeout(() => {
            document.getElementsByClassName("keyboard__key--"+letter)[0].classList.add("keyboard__key--"+color);
        }, 2000);
    }
    guessed(boolean, score){
        this.win = 0;
        if(boolean == true){
            this.win = 1;
            this.rowIndex = 6;
            this.gotword(true);
        }
        else{
            this.rowIndex = 6;
            this.gotword(false);
        }
        console.log(score);
        this.score = 0;
        this.guess = "";
        switch(score){
            case 0:
                this.score = 50;
                this.guess = "one";
                break;
            case 1:
                this.score = 25;
                this.guess = "two";
                break;
            case 2:
                this.score = 20;
                this.guess = "three";
                break;
            case 3:
                this.score = 10;
                this.guess = "four";
                break;
            case 4:
                this.score = 5;
                this.guess = "five";
                break;
            case 5:
                this.score = 1;
                this.guess = "six";
                break;
            case 6:
                this.guess = "one";
                this.score = 0;
                break;
        }
        let url = "update.php?name="+this.name+"&password="+this.password+"&score="+this.score+"&win="+this.win+"&guess="+this.guess;
        fetch(url)
        .then((response) => {
        });
    }
    gotword(boolean){
        this.modal = document.createElement("div");
        this.modal.classList.add("modal");
        this.wordle.appendChild(this.modal);

        this.modalTitle = document.createElement("h3");
        this.modalTitle.classList.add("modal__title");
        if(boolean == true){
            this.modalTitle.innerText = "You won"
        }
        else{
            this.modalTitle.innerText = "The word was "+this.word;
        }
        this.modal.appendChild(this.modalTitle);

        this.buttons = document.createElement("span");
        this.buttons.classList.add("modal__buttons");
        this.modal.appendChild(this.buttons);

        this.refresh = document.createElement("button");
        this.refresh.classList.add("modal__buttons--refresh");
        this.buttons.appendChild(this.refresh);

        this.refreshLink = document.createElement("a");
        this.refreshLink.classList.add("modal__buttons--refresh-link");
        this.refreshLink.setAttribute("href", "http://localhost/wordletest/Wordle/public/");
        this.refreshLink.innerText = "Play as other";
        this.refresh.appendChild(this.refreshLink);

        this.replay = document.createElement("button");
        this.replay.classList.add("modal__buttons--replay");
        this.replay.innerText = "Play again";
        this.replay.onclick = () => {
            this.main.remove();
            console.log(this.name, this.password);
            this.newWordle = new Wordle(this.name, this.password);
        }
        this.buttons.appendChild(this.replay);
    }
}

export default Wordle;