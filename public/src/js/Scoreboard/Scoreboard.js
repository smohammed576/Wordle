import User from "../User/User.js";

class Scoreboard{
    constructor(){
        this.data = new Fetch();
        this.createScoreboard();
    }
    async createScoreboard(){
        const data = await this.data.fetchUrl("scoreboard.php");
        // const data = await this.data.fetch();
        console.log(data);
        this.body = document.querySelector("body");
        if(document.querySelector(".main")){
            document.querySelector(".main").remove();
        }
        this.main = document.createElement("main");
        this.main.classList.add("main");
        this.body.appendChild(this.main);

        this.scoreboard = document.createElement("section");
        this.scoreboard.classList.add("scoreboard");
        this.main.appendChild(this.scoreboard);

        let ranking = [...data.users].sort((a, b) => b.score - a.score);
        console.log(ranking);

        this.podium = document.createElement("div");
        this.podium.classList.add("scoreboard__podium");
        this.scoreboard.appendChild(this.podium);

        let index = [1, 0, 2];
        this.leading = ranking.splice(0, 3);
        for(let i = 0; i < 3; i++){
            let ranks = index[i];
            this.podiumUser = document.createElement("article");
            this.podiumUser.classList = "scoreboard__podium--user scoreboard__podium--user-"+i;
            this.podium.appendChild(this.podiumUser);

            this.podiumImage = document.createElement("img");
            this.podiumImage.classList.add("scoreboard__podium--user-image");
            this.podiumImage.setAttribute("src", this.leading[ranks].image);
            this.podiumUser.appendChild(this.podiumImage);

            this.podiumWrapper = document.createElement("span");
            this.podiumWrapper.classList.add("scoreboard__podium--user-wrapper");
            this.podiumUser.appendChild(this.podiumWrapper);

            this.podiumScore = document.createElement("h2");
            this.podiumScore.classList.add("scoreboard__podium--user-score");
            this.podiumScore.innerText = this.leading[ranks].score;
            this.podiumWrapper.appendChild(this.podiumScore);

            this.podiumName = document.createElement("h3");
            this.podiumName.classList.add("scoreboard__podium--user-name");
            this.podiumName.innerText = this.leading[ranks].name;
            this.podiumName.onclick = () => {this.profile = new User(this.leading[ranks], ranks + 1)};
            this.podiumWrapper.appendChild(this.podiumName);
        }

        this.list = document.createElement("ul");
        this.list.classList.add("scoreboard__list");
        this.scoreboard.appendChild(this.list);

        this.listUser = document.createElement("li");
        this.listUser.classList = "scoreboard__user scoreboard__list--user";
        this.list.appendChild(this.listUser);

        this.listRank = document.createElement("span");
        this.listRank.classList = "scoreboard__user--rank scoreboard__list--rank";
        this.listRank.innerText = "Rank";
        this.listUser.appendChild(this.listRank);

        this.listName = document.createElement("span");
        this.listName.classList = "scoreboard__user--name scoreboard__list--name";
        this.listUser.appendChild(this.listName);

        this.listLink = document.createElement("p");
        this.listLink.classList = "scoreboard__user--name-link scoreboard__list--link";
        this.listLink.innerText = "Name";
        this.listName.appendChild(this.listLink);

        this.listScore = document.createElement("span");
        this.listScore.classList = "scoreboard__user--score scoreboard__list--score";
        this.listScore.innerText = "Score";
        this.listUser.appendChild(this.listScore);

        this.ranking = ranking.splice(0, ranking.length);
        console.log(this.ranking);
        for(let i = 0; i < this.ranking.length; i++){
            this.user = document.createElement("li");
            this.user.classList.add("scoreboard__user");
            this.list.appendChild(this.user);

            this.rank = document.createElement("span");
            this.rank.classList.add("scoreboard__user--rank");
            this.rank.innerText = i + 4;
            this.user.appendChild(this.rank);

            this.name = document.createElement("span");
            this.name.classList.add("scoreboard__user--name");
            this.user.appendChild(this.name);

            this.userimage = document.createElement("img");
            this.userimage.classList.add("scoreboard__user--name-image");
            this.userimage.setAttribute("src", this.ranking[i].image);
            this.name.appendChild(this.userimage);

            this.nameLink = document.createElement("p");
            this.nameLink.classList.add("scoreboard__user--name-link");
            this.nameLink.innerText = this.ranking[i].name;
            this.nameLink.onclick = () => {this.profile = new User(this.ranking[i], i + 4)};
            this.name.appendChild(this.nameLink);

            this.score = document.createElement("span");
            this.score.classList.add("scoreboard__user--score");
            this.score.innerText = this.ranking[i].score;
            this.user.appendChild(this.score);
        }
    }
}

export default Scoreboard;