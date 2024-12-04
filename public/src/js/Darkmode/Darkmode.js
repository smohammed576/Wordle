class Darkmode{
    constructor(){
        this.createDarkmode();
    }
    createDarkmode(){
        document.querySelector("body").classList.toggle("darkmode");
    }
}

export default Darkmode;