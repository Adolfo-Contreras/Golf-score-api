"use strict";
//get course data
function getCourses(){
    return fetch(
        `https://exquisite-pastelito-9d4dd1.netlify.app/golfapi/courses.json`,
        ).then(function (response) {
            if(!response.ok) {
                throw new Error('Network response was not ok');
              }else{return response.json()}
        }
    ).then(function (data){
        return data
    }).catch(function (error){
        console.error('Error:',error);
    })
}

// loads every invidiual course
function getCourseDetails(courseid){
    return fetch(
        `https://exquisite-pastelito-9d4dd1.netlify.app/golfapi/course${courseid}.json`,
        ).then(function (response) {
            if(!response.ok) {
                throw new Error('Network response was not ok');
              }else{return response.json()}
        }
    ).then(function (data){
        return data
    }).catch(function (error){
        console.error('Error:',error);
    })
}
let reset = document.getElementById('reset')
let thanksgivingGolf = document.getElementById('ThanksgivingGolf')
let foxGolf = document.getElementById('FoxGolf')
let spanishGolf = document.getElementById('SpanishGolf')
let courseID = document.getElementById('courseID')

let marker1 = false;
reset.addEventListener('click',()=>{
    courseID.innerHTML = `?????`
    document.getElementById('teeBoxSelCover').classList.add('d-none')
    marker1 = false;
})
foxGolf.addEventListener('click',()=>{ //this is an arrow function from es6 which is used a lot throughout this program
    let course = foxGolf.value;
    courseID.innerHTML = `Course: ${course}`
    createGolfOptions(course)
    marker1 = true;
})
thanksgivingGolf.addEventListener('click',()=>{ // () => function
    let course = thanksgivingGolf.value;
    courseID.innerHTML = `Course: ${course}`
    createGolfOptions(course)
    marker1 = true;
})
spanishGolf.addEventListener('click',()=>{ // () => function
    let course = spanishGolf.value;
    courseID.innerHTML = `Course: ${course}`
    createGolfOptions(course)
    marker1 = true;
})

// Creates teeboxes based off of course selected
function createGolfOptions(course){
    getCourseDetails(course).then(function(data) {
        const thisCourse = data;
        const courseTees = thisCourse.holes[0].teeBoxes; //goes into the first hole just to get the teeboxes

        document.getElementById('teeBoxSelCover').classList.remove('d-none') // grabs the parent div and toggles off the disply:hidden; propety
        let list = document.getElementById('TeeBoxSel')
        list.removeAttribute('class') // deletes any existing classe
        list.classList.add(`${course}`) //sets the class for the current course
        list.innerHTML = `<option id="reset2" onClick="teeBoxTBL(0, 'teebox-0', false)">Select One</option>` // resets the dropdown to this

        //adds every Tee option except for the weird one
        let ids = 0;
        courseTees.forEach((elem) => {
            let clean = elem.teeType
            if (clean !== 'auto change location') list.innerHTML += `<option id="teebox-${ids}" value="${ids}" onClick="teeBoxTBL(this.parentNode.classList, this.id, true)">${clean}</option>`
            ids++
        });
      })
      .catch(function(error) {
        console.error('Error:', error);
      })
}

//get the handicaps and return them in an array
async function getPar(course, id){
    let arrOfPar = [];
    const data = await getCourseDetails(course); // await is part of es6
    const thisCourse = data;
    const courseHoles = thisCourse.holes;
    courseHoles.forEach((element) => {
        let thing = element.teeBoxes[id].teeType;
        // console.log(`Teebox: ${thing}`)
        // console.log(`Hole: ${element.hole}`)
        let par = element.teeBoxes[id].par;
        arrOfPar.push(par)
        // console.log(`Total yards: ${arrOfPar}`)
    });
    // console.log(`Total of par: ${arrOfPar}`)
    return arrOfPar;
};

//get the handicaps and return them in an array
async function getHandicap(course, id){
    let arrOfHandicap = [];
    const data = await getCourseDetails(course); // await is part of es6
    const thisCourse = data
    const courseHoles = thisCourse.holes;
    courseHoles.forEach((element) => {
        let thing = element.teeBoxes[id].teeType;
        // console.log(`Teebox: ${thing}`)
        // console.log(`Hole: ${element.hole}`)
        let hcp = element.teeBoxes[id].hcp;
        let par = element.teeBoxes[id].par;
        arrOfHandicap.push(hcp+par)
        // console.log(`Total yards: ${arrOfHandicap}`)
    });
    // console.log(`Total of handicap course yards: ${arrOfHandicap}`)
    return arrOfHandicap;

};

// get yards per hole and gives them back in an array
async function getYrdHole(course, id){
    let arrOfHoles = [];
    const data = await getCourseDetails(course); // await is part of es6
    const thisCourse = data;
    const courseHoles = thisCourse.holes;
    courseHoles.forEach((element) => {
        let yrd = element.teeBoxes[id].yards;
        arrOfHoles.push(yrd)
    });
      return arrOfHoles;
};

//populate and render tables with info
let check = false;
function teeBoxTBL(course, id, maybe){
    let courseNum = Number(course[0]) //
    let idNum = Number(id.charAt(7));
    check = maybe; 
    // let courseID = document.getElementById('courseID')
    // courseID.innerHTML = `${course}`
    
    let holeRow = document.getElementById('holeRow');
    holeRow.innerHTML = `<td>Hole</td>`;
    
    let yard = document.getElementById('yardageRow'); //table row
    yard.innerHTML = `<td>Yardage</td>`; //resets table
    
    let cap = document.getElementById('HandicapRow');
    cap.innerHTML = `<td>Handicap</td>`;
    
    let par = document.getElementById('parRow');
    par.innerHTML = `<td>Par</td>`;

    if (course === 0) {
        holeRow.innerHTML = `<td>Hole</td>`;
        yard.innerHTML = `<td>Yardage</td>`;
        cap.innerHTML = `<td>Handicap</td>`;
        par.innerHTML = `<td>Par</td>`;
        return;
    }

    for(let i = 1;i<19;i++){
        holeRow.innerHTML += `<td>${i}</td>`
    }

    getYrdHole(courseNum,idNum).then((arrOfHoles) => { // () => function
        arrOfHoles.forEach((elem) => { // () => function
            yard.innerHTML += `<td>${elem}</td>`
        })
    })
    getHandicap(courseNum,idNum).then((getHandicap) => {
        getHandicap.forEach((elem) => {
            cap.innerHTML += `<td>${elem}</td>`
        })
    })
    getPar(courseNum, idNum).then((getPar) => {
        getPar.forEach((elem) => {
            par.innerHTML += `<td>${elem}</td>`;
        })
    })
}

//populate table with players
let playersArr = [];
let playerName = document.getElementById('PlayerName');
let playerList = 0;
let incr = 1;
function addPlayers(elem){
    let tbl = document.getElementById('playersTbl')
    let playerWarn = document.getElementById('warningPocket')
    elem = elem.trim()
    if (playerList !== 4) {
        if (elem === '') console.log('enter something smh');
        else {
            // playerList.innerHTML += `<li class="list-group-item active">${elem}</li>`
            tbl.innerHTML += `
                <tr id="player${incr}">
                <td><span id="player${incr}Name">${elem}</span> <button class="Trashbutton"><img src="/icons/trash.svg" alt="TrashCan"></button></td>
                </tr>
            `;
            //add players to Arr
            playertoArr(incr);
             //add event listeners to the trash buttons
             const Trash = Object.values(document.querySelectorAll('.Trashbutton'));
            //  console.log(Trash)
             Trash.forEach((values, index) => {values.setAttribute('onclick',`handleDelete(this.parentNode.parentNode.id)`)});
            playerName.value = '';
        incr++;
        playerList++
        }
    } else {
        playerWarn.innerHTML = `
        <div class="alert alert-warning alert-dismissible fade show" role="alert">
            <strong>Woah there buddy!</strong> Max player limit reached!
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>`
    }    
};

//add players to array
function playertoArr(pNum){
    let pName = document.querySelector(`#player${pNum}Name`).innerHTML;
    let pObj = {name:pName, scores:[]}; 
    playersArr.push(pObj);
    // console.log(playersArr)
}

//Delete players
function handleDelete(playerNum){
    //grabs the id number of clicked button and converts it into a number
    playerNum = Number(playerNum.charAt(6));

    //deleted clicked player
    playerList--
    let player = document.getElementById(`player${playerNum}`);
    player.remove()

    let playerList2 = []
    let playerList3 = []

    //grabs all of any current players
    playerList2.push(document.getElementById('playersTbl').children[4]);
    playerList2.push(document.getElementById('playersTbl').children[5]);
    playerList2.push(document.getElementById('playersTbl').children[6]);
    playerList2.push(document.getElementById('playersTbl').children[7]);
    let increment = 1;

    // filters out the undefined ones
    playerList2.forEach((elem) => {
        if (elem !== undefined) {
            playerList3.push(elem)
        }
    })

    //updates the id's from 1-4 
    playerList3.forEach((elem) => {
        console.log(elem.id);
        elem.id = `player${increment}`
        increment++
        
    })
}

// enter function to handle all enter key press
function enterAll(event, id) {
    if (event.key === 'Enter' || event == true){
        switch (id) {
            case 1:
                let playerScoreInput = Number(document.getElementById('playerScoreInput').value.trim()) //makes sure it's a number
        
                if (isNaN(playerScoreInput)) {
                    console.log(`enter a number`);
                } else {
                    if (playerScoreInput <= 0) console.log('not that type of number');
                    else {
                        cycleRounds(playerScoreInput);
                        document.getElementById('playerScoreInput').value = null;
                    }
                }
                break;
            case 2:
                addPlayers(playerName.value)
                break;
        }
        
    }
}

let playerRound = 1; // starts off on the first player
let currentRound = 0;

const showTurn = document.getElementById('showTurn');
const playerTurn = document.getElementById('playerTurn');

function cycleRounds(input) {
    // console.log(currentRound);
    if (realPlayers.length === 0) {
        // yell at the player for putting no players or something lol
        return
    };
    switch (playerRound) {
        case 1:
            p1.innerHTML += `<td>${input}</td>`
            break;
        case 2:
            p2.innerHTML += `<td>${input}</td>`
            break;
        case 3:
            p3.innerHTML += `<td>${input}</td>`
            break;
        case 4:
            p4.innerHTML += `<td>${input}</td>`
            break;
    }
    if (playerRound > realPlayers.length - 1) {
        playerRound = 1; // resets back to first player to go again
        playerTurn.innerHTML = `  Player ${playerRound}'s Turn!`;
        currentRound++; //increases the overall rounds 

        if (currentRound === 18) { // checks if the game is over
            showTurn.innerHTML = ` Game Over!`;
            playerTurn.innerHTML = null
            document.getElementById('submitPocket').classList.add('d-none')
            let holeRow = document.getElementById('holeRow')
            let hole = document.getElementById('holeRow').firstChild.nextElementSibling

            let yardRow = document.getElementById('yardageRow')
            let yard = document.getElementById('yardageRow').firstChild.nextElementSibling

            let parRow = document.getElementById('parRow')
            let par = document.getElementById('parRow').firstChild.nextElementSibling

            let handRow = document.getElementById('HandicapRow')
            let hand = document.getElementById('HandicapRow').firstChild.nextElementSibling
            
            let total = 0;
            while (hole = hole.nextElementSibling) {
                total += Number(hole.textContent);    
            }
            holeRow.innerHTML += `<td>${total}</td>`;
            
            total = 0;
            while (yard = yard.nextElementSibling) {
                total += Number(yard.textContent);    
            }
            yardRow.innerHTML += `<td>${total}</td>`;
            
            total = 0;
            while (par = par.nextElementSibling) {
                total += Number(par.textContent);    
            }
            parRow.innerHTML += `<td>${total}</td>`;
            
            total = 0;
            while (hand = hand.nextElementSibling) {
                total += Number(hand.textContent);    
            }
            handRow.innerHTML += `<td>${total}</td>`;

            realPlayers.forEach((elem) => {
                let sibs = elem.firstChild.nextElementSibling;

                total = 0
                while (sibs = sibs.nextElementSibling) {
                    total += Number(sibs.textContent); //cycles thru every sibling and adds it up to the final score
                }
                elem.innerHTML += `<td>${total}</td>`; //submits the final score
            })
        } else showTurn.innerHTML = ` Hole: ${currentRound + 1}! `; // updates round counter
    } else {
        playerRound++
        playerTurn.innerHTML = `  Player ${playerRound}'s Turn!`; //moves up until every player got their turn
    }
}


let realPlayers = [];
let p1; let p2; let p3; let p4;
function startGame(){
    
    //locates all existing players and filters them into totalPlayers
    p1 = document.getElementById('playersTbl').children[4];
    p2 = document.getElementById('playersTbl').children[5];
    p3 = document.getElementById('playersTbl').children[6];
    p4 = document.getElementById('playersTbl').children[7];
    
    let allPlayers = [];
    allPlayers.push(p1,p2,p3,p4);
    
    allPlayers.forEach((elem) => {if (elem !== undefined) realPlayers.push(elem)})
    
    if (realPlayers.length === 0 || marker1 === false || check === false) {
        return;
    };
    playerTurn.innerHTML = `  Player 1's Turn!`
    // hides everything and stuff
    document.getElementById('createScoreCard').classList.add("noHtml")
    document.getElementById('ScoreCard').classList.add('centerScoreCard')
    document.getElementById('playerScoreInput').classList.remove('d-none')
    document.getElementById('submitPlayerScore').classList.remove('d-none')
    document.getElementById('startGame').classList.add('d-none')
    let trashbutton = document.querySelectorAll('.Trashbutton')//removes trash buttons
    trashbutton.forEach((elm)=>{
        elm.remove()
    })
}