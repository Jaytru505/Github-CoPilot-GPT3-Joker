// Joke generator
// Randomly generate a joke written by GPT-3 
class App {
    constructor(props) {
        this.joke = props.joke;
        this.joke_id = props.joke_id;
        this.loading = props.loading;
        this.error = props.error;
        this.JOKE_API_URL = props.JOKE_API_URL;
    }
    initialize() {
        //replace the joke in the joke div
        this.displayJoke();
        //bind the data-toggle="joker" button to the jokeButtonClicked function
        this.jokeButtonBind();
        //bind the data-toggle="clear" button to the clearJokes function
        this.clearButtonBind();
        //bind the data-toggle="save" button to the saveJoke function
        //this.saveButtonBind();
        //bind the data-toggle="share" button to the shareJokeToTwitter function
        this.shareButtonBind();
        return;
    }
    getJoke() {
        this.loading = true;
        this.loadingSpinner();
        this.error = "";
        return fetch(this.JOKE_API_URL);
    }
    displayJoke() {
        //get #jokes list
        let jokeList = document.getElementById("jokes");
        //append a new joke to the list
        jokeList.innerHTML += `<li>${this.joke}</li>`;
    }
    clearJokes() {
        //replace the joke in the joke div
        document.getElementById("jokes").innerHTML = '';
    }
    saveJoke() {
        console.log(this.joke);
        console.log(this.joke_id);
    }
    shareJokeToTwitter() {
        let joke = this.joke;
        let url = `https://twitter.com/intent/tweet?text=${joke}&hashtags=joke,gpt3,ai,jokeGenerator`;
        window.open(url, '_blank');
    }
    // create a new joke and replace the joke in the joke div when the data-toggle="joker" button is clicked
    jokeButtonClicked() {
        this.getJoke()
            .then(response => response.json())
            .then(data => {
            this.joke = data.choices[0].text;
            this.joke_id = data.id;
            this.loading = false;
            this.unloadingSpinner();
            this.displayJoke();
        })
            .catch(error => {
            console.log(error);
            this.error = error;
            this.loading = false;
        });
    }
    //hide get joke button and show loading spinner
    loadingSpinner() {
        document.getElementById("jokerButton").style.display = "none";
        document.getElementById("loadingSpinner").style.display = "inline-block";
    }
    // show the get joke button and hide the loading spinner
    unloadingSpinner() {
        document.getElementById("jokerButton").style.display = "inline-block";
        document.getElementById("loadingSpinner").style.display = "none";
    }
    // bind the data-toggle="joker" button to the jokeButtonClicked function
    jokeButtonBind() {
        document.getElementById("jokerButton").addEventListener("click", this.jokeButtonClicked.bind(this));
    }
    // bind the data-toggle="clear" button to the clearJokes function
    clearButtonBind() {
        document.getElementById("clearButton").addEventListener("click", this.clearJokes.bind(this));
    }
    // bind the data-toggle="save" button to the saveJoke function
    saveButtonBind() {
        document.getElementById("saveButton").addEventListener("click", this.saveJoke.bind(this));
    }
    // bind the data-toggle="share" button to the shareJokeToTwitter function
    shareButtonBind() {
        document.getElementById("shareButton").addEventListener("click", this.shareJokeToTwitter.bind(this));
    }
}
const joke_app = new App({
    joke: "GPT-3 Geroge Carlin Initalized",
    joke_id: 0,
    loading: false,
    error: "",
    JOKE_API_URL: "https://us-central1-retweeter.cloudfunctions.net/joker/"
});
joke_app.initialize();
//# sourceMappingURL=index.js.map