class User{
    constructor(data, rank){
        this.fetch = new Fetch();
        this.data = data;
        this.getRank = rank;
        this.createUser();
    }
    async createUser(){
        document.querySelector(".main").remove();
        this.body = document.querySelector("body");

        this.main = document.createElement("main");
        this.main.classList.add("main");
        this.body.appendChild(this.main);

        this.user = document.createElement("section");
        this.user.classList.add("user");
        this.main.appendChild(this.user);

        this.profile = document.createElement("div");
        this.profile.classList.add("user__profile");
        this.user.appendChild(this.profile);

        this.name = document.createElement("h2");
        this.name.classList.add("user__profile--name");
        this.name.innerText = this.data.name;
        this.profile.appendChild(this.name);

        this.image = document.createElement("img");
        this.image.classList.add("user__profile--image");
        this.image.setAttribute("src", this.data.image);
        this.image.setAttribute("alt", this.data.name);
        this.profile.appendChild(this.image);
        
        this.joined = document.createElement("p");
        this.joined.classList.add("user__profile--joined");
        this.joined.innerText = "joined on " + new Date(this.data.created_at.slice(0, 10)).toLocaleDateString('default', {day: 'numeric', month: 'short', year: 'numeric'});
        this.profile.appendChild(this.joined);

        this.info = document.createElement("div");
        this.info.classList.add("user__info");
        this.user.appendChild(this.info);

        this.guesses = document.createElement("div");
        this.guesses.classList.add("user__guesses");
        this.info.appendChild(this.guesses);

        this.guessTitle = document.createElement("h2");
        this.guessTitle.classList.add("user__guesses--title");
        this.guessTitle.innerText = "Guess disturbution";
        this.guesses.appendChild(this.guessTitle);

        this.guessWrapper = document.createElement("span");
        this.guessWrapper.classList.add("user__guesses--wrapper");
        this.guesses.appendChild(this.guessWrapper);

        const data = await this.fetch.fetch();
        for(let i = 0; i < data.guesses.length; i++){
            this.guess = document.createElement("article");
            this.guess.classList.add("user__guesses--guess");
            this.guess.innerText = i + 1;
            this.guessWrapper.appendChild(this.guess);

            this.height = "";
            
            console.log(this.height);
            this.guessText = document.createElement("p");
            this.guessText.classList.add("user__guesses--guess-number");
            this.guessText.innerText = this.data[data.guesses[i].guess];
            this.guess.appendChild(this.guessText);
            if(isNaN((this.data[data.guesses[i].guess] / this.data.wins) * 100) || (this.data[data.guesses[i].guess] / this.data.wins) * 100 == 0){
                this.height = "";
            }
            else{
                this.height = (this.data[data.guesses[i].guess] / this.data.wins) * 100 + "%";
                this.guessText.style.height = this.height;
            }
        }
        
        this.stats = document.createElement("span");
        this.stats.classList.add("user__stats");
        this.info.appendChild(this.stats);

        this.rank = document.createElement("article");
        this.rank.classList.add("user__stats--stat");
        this.stats.appendChild(this.rank);
        
        this.ranktext = document.createElement("p");
        this.ranktext.classList.add("user__stats--stat-title");
        this.ranktext.innerText = "rank";
        this.rank.appendChild(this.ranktext);

        this.ranking = document.createElement("p");
        this.ranking.classList.add("user__stats--stat-text");
        this.ranking.innerText = "#"+this.getRank;
        this.rank.appendChild(this.ranking);

        this.score = document.createElement("article");
        this.score.classList.add("user__stats--stat");
        this.stats.appendChild(this.score);
 
        this.scoretext = document.createElement("p");
        this.scoretext.classList.add("user__stats--stat-title");
        this.scoretext.innerText = "score";
        this.score.appendChild(this.scoretext);

        this.scored = document.createElement("p");
        this.scored.classList.add("user__stats--stat-text");
        this.scored.innerText = this.data.score;
        this.score.appendChild(this.scored);
        
        this.plays = document.createElement("article");
        this.plays.classList.add("user__stats--stat");
        this.stats.appendChild(this.plays);

        this.playstext = document.createElement("p");
        this.playstext.classList.add("user__stats--stat-title");
        this.playstext.innerText = "plays";
        this.plays.appendChild(this.playstext);

        this.played = document.createElement("p");
        this.played.classList.add("user__stats--stat-text");
        this.played.innerText = this.data.plays;
        this.plays.appendChild(this.played);

        this.wins = document.createElement("article");
        this.wins.classList.add("user__stats--stat");
        this.stats.appendChild(this.wins);

        this.winsText = document.createElement("p");
        this.winsText.classList.add("user__stats--stat-title");
        this.winsText.innerText = "won";
        this.wins.appendChild(this.winsText);

        this.won = document.createElement("p");
        this.won.classList.add("user__stats--stat-text");
        this.won.innerText = Math.floor((this.data.wins / this.data.plays) * 100) + "%";
        this.wins.appendChild(this.won);

    }
}

export default User;