import Darkmode from "../Darkmode/Darkmode.js";
import Scoreboard from "../Scoreboard/Scoreboard.js";

class Header{
    constructor(){
        this.createHeader();
    }
    createHeader(){
        this.body = document.querySelector("body");

        this.header = document.createElement("header");
        this.header.classList.add("header");
        this.body.appendChild(this.header);

        this.navigation = document.createElement("nav");
        this.navigation.classList.add("header__navigation");
        this.header.appendChild(this.navigation);

        this.logo = document.createElement("a");
        this.logo.classList.add("header__navigation--logo");
        this.logo.setAttribute("href", "");
        this.logo.innerText = "Wordle";
        this.navigation.appendChild(this.logo);

        this.wrapper = document.createElement("span");
        this.wrapper.classList.add("header__navigation--wrapper");
        this.navigation.appendChild(this.wrapper);

        this.darkmode = document.createElement("button");
        this.darkmode.classList.add("header__navigation--button");
        this.darkmode.onclick = () => {new Darkmode()};
        this.wrapper.appendChild(this.darkmode);

        this.darkmodeicon = document.createElement("i");
        this.darkmodeicon.classList = "fa-solid fa-circle-half-stroke header__navigation--button-icon";
        this.darkmode.appendChild(this.darkmodeicon);

        this.scoreboard = document.createElement("button");
        this.scoreboard.classList.add("header__navigation--button");
        this.scoreboard.onclick = () => {new Scoreboard()};
        this.wrapper.appendChild(this.scoreboard);

        this.scoreboardicon = document.createElement("i");
        this.scoreboardicon.classList = "fa-solid fa-ranking-star header__navigation--button-icon";
        this.scoreboard.appendChild(this.scoreboardicon);
    }
}

export default Header;