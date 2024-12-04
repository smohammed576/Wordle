import Wordle from "../Wordle/Wordle.js";

class Form{
    constructor(){
        this.data = new Fetch();
        this.createForm();
    }
    async createForm(){
        this.body = document.querySelector("body");

        this.main = document.createElement("main");
        this.main.classList.add("main");
        this.body.appendChild(this.main);
        
        this.form = document.createElement("form");
        this.form.classList.add("form");
        this.form.setAttribute("method", "get");
        this.main.appendChild(this.form);

        this.title = document.createElement("h2");
        this.title.classList.add("form__title");
        this.title.innerText = "Wordle";
        this.form.appendChild(this.title);
        
        const data = await this.data.fetch();
        for(let i = 0; i < data.form.length; i++){
            this.input = document.createElement("input");
            this.input.classList.add("form__input");
            this.input.setAttribute("type", data.form[i].type);
            this.input.setAttribute("name", data.form[i].name);
            this.input.required = true;
            this.input.placeholder = data.form[i].placeholder;
            this.form.appendChild(this.input);
        }
        

        // this.url = document.createElement("img");
        // this.url.classList.add("image");
        // this.form.appendChild(this.url);

        // this.image = document.createElement("input");
        // this.image.addEventListener("input", (event) => {
        //     this.addImage(event);
        // })
        // this.form.appendChild(this.image);

        this.submit = document.createElement("input");
        this.submit.classList.add("form__submit");
        this.submit.setAttribute("type", "submit");
        this.form.appendChild(this.submit);

        this.form.addEventListener("submit", (event) => {
            event.preventDefault();
            this.toPhpWithGet(event);
        });
    }
    toPhpWithGet(event){
        let form = event.target;
        const data = new FormData(form);
        let url = "auth.php?name="+data.get("name")+"&password="+data.get("password")+"&image="+data.get("image");
        fetch(url)
        .then((response) => {
        });
        this.main.remove();
        this.wordle = new Wordle(data.get("name"), data.get("password"));
    }
    addImage(event){
        console.log(event.data);
        document.getElementsByClassName("image")[0].setAttribute("src", event.data);
    }
}

export default Form;