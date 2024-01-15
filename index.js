
// Global variables ,
// Teams' array and sets variable that is used to 
// have an idea on which set the match is found at any given moment
const teams = ["Panathinaikos", "Olympiakos", "AEK", "PAOK", "Iraklis"]
let sets = -1;

// Picks 2 random teams out of the 5 Greek teams found in the teams Array
function pickTeams(teams){
    const a = parseInt(Math.random() * teams.length);
    const aTeam = teams[a];

    let b = parseInt(Math.random() * teams.length);
    while(b==a){
        b = parseInt(Math.random() * teams.length);
    }
    const bTeam = teams[b];
    return [aTeam, bTeam];
}

// Disables the buttons (Add Point and Timeout)
function disableButtons(){
    const red_buttons = document.getElementsByClassName("timeout");
    let red_button = red_buttons[0];
    red_button.setAttribute("disabled", "");
    red_button.classList.remove("timeout_button");
    const buttons = document.getElementsByClassName("addButton");
    for(let i = 0; i < buttons.length; i++) { 
        let button = buttons[i];
        button.setAttribute("disabled", "");
        button.classList.remove("but_hover");
    }

}

// Enables back the buttons (Add point and Timeout)
function enableButtons(){
    const red_buttons = document.getElementsByClassName("timeout");
    let red_button = red_buttons[0];
    red_button.removeAttribute("disabled", "");
    red_button.classList.add("timeout_button");
    const buttons = document.getElementsByClassName("addButton");
    for(let i = 0; i < buttons.length; i++) { 
        let button = buttons[i];
        button.removeAttribute("disabled", "");
        button.classList.add("but_hover");
    }
}

// Adds the set score to the table of sets, using the global variable sets
function addSetToTable(){
    let pointsA = document.getElementById("a-points").textContent;
    let pointsB = document.getElementById("b-points").textContent;
    try{
        document.getElementById(`set${sets}-results`).textContent = pointsA + " - " + pointsB;
        console.log(document.getElementById(`set${sets}-results`).textContent);
    }
    catch (error) {
        console.error("No more than 5 sets:", error.message);
      } 
}


// Receives the 2 random teams and fills the board respectively
function writeBoard(TeamA, TeamB){
    document.getElementById("team1").textContent = TeamA;
    document.getElementById("team2").textContent = TeamB;
    imgA = document.getElementById("imgTeamA");
    imgA.src = `./images/teams/${TeamA.toLowerCase()}.jpg`;
    imgB = document.getElementById("imgTeamB");
    imgB.src = `./images/teams/${TeamB.toLowerCase()}.jpg`;
}

// Initializes Set score
function initializeScores(){
    document.getElementById("setsA").textContent = 0;
    document.getElementById("setsB").textContent = 0;
    initializeGames();
}

// Initializes games points
function initializeGames(){
    if(++sets>0){
        addSetToTable();
    }
    document.getElementById("a-points").textContent = 0;
    document.getElementById("b-points").textContent = 0;
    
}

// Chekcs if a set has ended - which team has won it 
function checkSetEnd(){
    let setsA = parseInt(document.getElementById("setsA").textContent);
    let setsB = parseInt(document.getElementById("setsB").textContent);
    let gamesA = parseInt(document.getElementById("a-points").textContent);
    let gamesB = parseInt(document.getElementById("b-points").textContent);

    if(setsA < 2 || setsB < 2){
        if(gamesA>=25 && gamesA-gamesB>1){
            document.getElementById("setsA").textContent = setsA + 1;
            initializeGames();
            FirstService();
            if(setsA+1<3)
                setTimeout();
        }
        else if(gamesB>=25 && gamesB-gamesA>1){ 
            document.getElementById("setsB").textContent = setsB + 1;
            initializeGames();
            FirstService();
            if(setsB+1<3)
                setTimeout();
        }
    }
    else{
        if(gamesA>=15 && gamesA-gamesB>1){
            document.getElementById("setsA").textContent = setsA + 1;
            initializeGames();
            FirstService();
        }
        else if(gamesB>=15 && gamesB-gamesA>1){ 
            document.getElementById("setsB").textContent = setsB + 1;
            initializeGames();
            FirstService();

        }
    }
}

// Removes the player image when the match ends
function endService(){
    document.getElementById("player1").style.display="none";
    document.getElementById("player2").style.display="none";
    document.getElementById("serving-team").textContent = `End of Match`
}

// Checks if there is a winner - whoever has 3 won sets
function checkWinner(){
    let setsA = parseInt(document.getElementById("setsA").textContent);
    let setsB = parseInt(document.getElementById("setsB").textContent);

    if(setsA == 3){
        let win_team = document.getElementById("team1").textContent;
        document.getElementById("sets-sign").textContent = `${win_team} won`;
        disableButtons();
        endService();
    }
    if(setsB == 3){
        let win_team = document.getElementById("team2").textContent;
        document.getElementById("sets-sign").textContent = `${win_team} won`;
        disableButtons();
        endService();
    }
}

// Adds a point to A team - checks if a timeouts is needed
// When A team wins the point it either keeps or takes back the service with the 'Service(0)'
function addApoint(){
    let value = parseInt(document.getElementById("a-points").textContent);
    value += 1;
    document.getElementById("a-points").textContent = value;
    if(value==8 && value>parseInt(document.getElementById("b-points").textContent))
        setTimeout();
    if(value==16 && value>parseInt(document.getElementById("b-points").textContent))
        setTimeout();
    Service(0);
    checkSetEnd();
    checkWinner();
    
}

// Adds a point to B team - checks if a timeouts is needed
// When B team wins the point it either keeps or takes back the service with the 'Service(1)'
function addBpoint(){
    let value = parseInt(document.getElementById("b-points").textContent);
    value += 1;
    document.getElementById("b-points").textContent = value;
    if(value==8 && value>parseInt(document.getElementById("a-points").textContent))
        setTimeout();
    if(value==16 && value>parseInt(document.getElementById("a-points").textContent))
        setTimeout();
    Service(1);
    checkSetEnd();
    checkWinner();
    
}

// Gives the service at the start of the match and of every new set
// The service of the first set is randomly given and the next services are given in turn to each team
// The global variable let is used for this 
function FirstService(){
    let x;
    if(parseInt(document.getElementById("setsA").textContent) == 0 && parseInt(document.getElementById("setsB").textContent) == 0){
        x = parseInt(Math.random()*2);
        serve = x;
        Service(serve);
    }else{
        
        serve = Math.abs(serve-1);
        Service(serve);
    }

}

// Arranges the team that has the service
// 0 for Team A - 1 for Team B
// Also hides and shows the player image at the respective side of the court
function Service(x){

    if(x == 0){
        document.getElementById("player1").style.display="inline";
        document.getElementById("player2").style.display="none";
        const team = document.getElementById("team1").textContent
        document.getElementById("serving-team").textContent = `${team} serves`
    }else{
        document.getElementById("player2").style.display="inline";
        document.getElementById("player1").style.display="none";
        const team = document.getElementById("team2").textContent
        document.getElementById("serving-team").textContent = `${team} serves`
    }
}

// Implements the timeout logic, count equals the seconds of the timeout
// Some more styling changes for when the timeout is on
function setTimeout(){
    let count = 60;
    disableButtons();
    document.getElementById("sets-sign").style.color = "red";
    document.getElementById("sets-sign").textContent = `Timeout ${count}s`;
    const timer = setInterval(function() {
    count--;
    document.getElementById("sets-sign").textContent = `Timeout ${count}s`;
    if (count === 0) {
        clearInterval(timer);
        enableButtons();
        document.getElementById("sets-sign").style.color = "black"
        document.getElementById("sets-sign").textContent = "Sets";
    }
    }, 1000);
}

// main Functionality
//Initialization of setsm picking the random teams and writing the board
// The match then is played based on the events triggered (add point buttons and timeout)

let setsA = 0, setsB = 0;
let serve;
const myTeams = pickTeams(teams);
writeBoard(myTeams[0], myTeams[1]);
initializeScores();
FirstService();








