"use strict";

const fetchData = pokemon => {
    
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
        .then(response => response.json())  
        .then(json => displayData(json, checked()));
    

};

const checked = () => {

    let checked = $("input:checked").map(function() {
        return this.id;}).get().join(" ");
    console.log("checked is: " + checked);
    return checked;
}

const displayError = () => {

    if ( $("#display").text() === "") {
        $("#display").html(`<h5>No pokemon found. Please try again!</h5>`);
    }
    
    
}

const displayData = (data, checked) => {

    let html = "";

    if (checked == "") {
        html += `<h5>No items selected to display</h5>`;
    }

    if (checked != "") {
        html += `<h4>${data.name[0].toUpperCase() + data.name.slice(1)}</h4>`
    }
    
    if ( checked.includes("picture")) {
        html += `<img src="${data.sprites.front_default}" >`;
    }
    
    if( checked.includes("poketype")) {
        html += `<p>Pokemon Type: ${data.types[0].type.name}</p>`;
    }
    $("#display").html(html);

    $("#pokemon").val("");
    $("#pokemon").focus();


    console.log(data.sprites.front_default);
    console.log(data);
    
};

const pokeArray = ["pikachu", "jigglypuff", "charmander", 
                    "bulbasaur", "hitmonchan", "diglett",
                    "meowth", "eevee", "snorlax", "venusaur",
                    "clefairy", "pidgey", "pidgeotto", "raichu",
                    "diglett", "hitmonlee", "charizard",
                    "umbreon", "greninja", "torterra", "mudkip",
                    "ninetales", "blastoise", "scizor", "infernape",
                    "squirtle", "flygon", "luxray", "lickitung"];

$(document).ready( () => {
    
    let timer = null;

    $("#pokemon").focus( () => {
        timer = setInterval( () => {
            let pokemon = $("#pokemon").val();
            console.log("pokemon value changed");
            console.log("pokemon value is " + pokemon);

            // use map to check if entered pokemon name
            // is in the pokeArray
            if (pokemon.length > 1) {
                let suggestions = pokeArray.filter( pokeName => pokeName.includes(pokemon.toLowerCase()));
                console.log(suggestions);
                // display suggestions

                if (suggestions.length > 0 && suggestions[0] != pokemon) {
                    let html = `<p><em>Did you mean <a href="#">${suggestions[0]}</a>?</em></p>`
                    $("#suggestions").html(html);
    

                } else {
                    $("#suggestions").text("");
                }
               
            }


        }, 300);
    });
    
    $("#pokemon").blur( () => {

        clearInterval(timer);
    });
    
    $("#suggestions").click( (evt) => {
        console.log(evt.currentTarget.innerHTML);

        let start = 32; 
        let end = evt.currentTarget.innerHTML.indexOf("<", start);
        console.log(evt.currentTarget.innerHTML.substring(start, end));
        
        
        $("#pokemon").val(evt.currentTarget.innerHTML.substring(start, end));
        $("#suggestions").text("");
        $("#search").click();
    });


    $("#search").click( () => {

        let pokemon = $("#pokemon").val();
        fetchData(pokemon);
        displayError();
        
        

        
    });
    $("#pokemon").focus();
});