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

//ENTIRELY DIFFERENT FUNCTION
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
let foxGolf = document.getElementById('FoxGolf')
let thanksgivingGolf = document.getElementById('ThanksgivingGolf')
let spanishGolf = document.getElementById('SpanishGolf')
let courseID = document.getElementById('courseID')
reset.addEventListener('click',()=>{
    courseID.innerHTML = `?????`
    document.getElementById('teeBoxSelCover').classList.add('d-none')
})
foxGolf.addEventListener('click',()=>{ //this is an arrow function from es6 which is used a lot throughout this program
    let course = foxGolf.value;
    courseID.innerHTML = `Course: ${course}`
    createGolfOptions(course)
})
thanksgivingGolf.addEventListener('click',()=>{ // () => function
    let course = thanksgivingGolf.value;
    courseID.innerHTML = `Course: ${course}`
    createGolfOptions(course)
})
spanishGolf.addEventListener('click',()=>{ // () => function
    let course = spanishGolf.value;
    courseID.innerHTML = `Course: ${course}`
    createGolfOptions(course)
})
// .finally(function(data){data[1]})

//example of how to access data with the 2 main api fuctions
// console.log(getCourses().then(function(data) {
//     const golfCourses = data;
//     for (const course of golfCourses) {
//     //   console.log(`Course ID: ${course.id}`);
//     //   console.log(`Course Name: ${course.name}`);
//     //   console.log(`Course URL: ${course.url}`);
//     }
//   })
//   .catch(function(error) {
//     console.error('Error:', error);
//   }))

// Creates teeboxes based off of course selected
function createGolfOptions(course){
    getCourseDetails(course).then(function(data) {
        const thisCourse = data;
        const courseTees = thisCourse.holes[0].teeBoxes; //goes into the first hole just to get the teeboxes

        document.getElementById('teeBoxSelCover').classList.remove('d-none') // grabs the parent div and toggles off the disply:hidden; propety
        let list = document.getElementById('TeeBoxSel')
        list.removeAttribute('class') // deletes any existing classe
        list.classList.add(`${course}`) //sets the class for the current course
        list.innerHTML = `<option id="reset2" onClick="teeBoxTBL(0, 'teebox-0')">Select One</option>` // resets the dropdown to this

        //adds every Tee option except for the weird one
        let ids = 0;
        courseTees.forEach((elem) => {
            let clean = elem.teeType
            if (clean !== 'auto change location') list.innerHTML += `<option id="teebox-${ids}" value="${ids}" onClick="teeBoxTBL(this.parentNode.classList, this.id)">${clean}</option>`
            ids++
        });
      })
      .catch(function(error) {
        console.error('Error:', error);
      })
}
//calculate total yards
// haven't done this one yet
let gameYrd = 0
async function getTotalYrds(course,id){
    const data = await getCourseDetails(course)
        const thisCourse = data;
        const courseHoles = thisCourse.holes; // an array that we can use
        let totalYRD = 0;
        courseHoles.forEach((element) => {
            // console.log(`Hole: ${element.hole}`)
            let yrd = element.teeBoxes[id].yards;
            totalYRD += yrd
            // console.log(`Total yards: ${totalYRD}`)
            // this gets the yards of the first teebox which is champion in this case
        });
        gameYrd = totalYRD
        console.log(gameYrd)
        return totalYRD;
};
//get total par
let gamePar = 0;
async function getTotalPar(course,id){
    const data = await getCourseDetails(course)
        const thisCourse = data;
        const courseHoles = thisCourse.holes; // an array that we can use
        let totalpar = 0;
        courseHoles.forEach((element) => {
            // console.log(`Hole: ${element.hole}`)
            let yrd = element.teeBoxes[id].par;
            totalpar += yrd
            // console.log(`Total par: ${totalpar}`)
            // this gets the yards of the first teebox which is champion in this case
        });
        gamePar = totalpar
        console.log(`Total of whole course par: ${gamePar}`)

};
//get handicap
let gameHcp = 0;
async function getTotalHcap(course,id){
    const data = await getCourseDetails(course)
        const thisCourse = data;
        const courseHoles = thisCourse.holes; // an array that we can use
        let totalcap = 0;
        courseHoles.forEach((element) => {
            // console.log(`Hole: ${element.hole}`)
            let hcp = element.teeBoxes[id].hcp;
            totalcap += hcp
            // console.log(`Total hcp: ${totalcap}`)
            // this gets the yards of the first teebox which is champion in this case
        });
        gameHcp = totalcap;
        console.log(`gamehcp ${gameHcp}`)
};

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
function teeBoxTBL(course, id){
    let courseNum = Number(course[0]) //
    let idNum = Number(id.charAt(7));
    
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
        // yard.innerHTML += `<td>${getTotalYrds(courseNum,idNum)}</td>`
    })
    getHandicap(courseNum,idNum).then((getHandicap) => {
        getHandicap.forEach((elem) => {
            cap.innerHTML += `<td>${elem}</td>`
        })
        // cap.innerHTML += `<td>${getTotalHcap(courseNum,idNum)}</td>`
    })
    getPar(courseNum, idNum).then((getPar) => {
        getPar.forEach((elem) => {
            par.innerHTML += `<td>${elem}</td>`;
        })
        // par.innerHTML += `<td>${getTotalPar(courseNum,idNum)}</td>`
    })
    // getTotalYrds(courseNum,idNum)
    // getTotalPar(courseNum,idNum)
    // getTotalHcap(courseNum,idNum)
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
playerName.addEventListener('keydown', function (e){
    if(e.key === 'Enter'){
        addPlayers(playerName.value)
    }
}) 


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




// //calculate player data
// function calcPlayerScore(pNum){
//     //idk how to access the players data but ill make the thing so it adds them up
//     let playerScores = playersArr[pNum]
//     let playerTotal = 0;
//     playerScores.scores.forEach((element)=>{
//         playerTotal=playerTotal + Number(element);
//     })
//     // if(!playerTotal){alert('No scores added')}else{
//         console.log(playerTotal)
//         return playerTotal;
// };


// // function that moves to the next rounds
// let currentRound = 1;
// let currentPlayer = 0;
// function nextRound(){
//     currentRound = currentRound += 1;
//     currentPlayer = 0;
// }
// //update the scores of players
// function updateScores(){
//         //get player
//         let playerHtml = document.getElementById(`player${currentPlayer+1}`)
//         //get score
//         let roundScore = playersArr[currentPlayer].scores[currentRound-1]
//         playerHtml.innerHTML +=`<td>${roundScore}</td>`
// }
// //eventlistener to add a score to the table
// document.getElementById('submitPlayerScore').addEventListener('click', ()=>{
//     pushPlayerScore()
// })
// document.getElementById('playerScoreInput').addEventListener('keydown', function (e){
//     if(e.key === 'Enter'){
//         pushPlayerScore()
//         console.log(`next Func: ${currentRound}`)
//         console.log(`next Func: ${currentPlayer}`)
//     }
// })
// console.log(`curr play is ; ${currentPlayer}`)


// //push score to scorecard and move to next round
// function pushPlayerScore(){
//     const regex = new RegExp(/^\d+$/);
//     let scoreInput = document.getElementById('playerScoreInput');
//     if (currentPlayer === (playersArr.length) || currentPlayer === (playersArr.length+1)) {
//         nextRound()
//         if(regex.test(scoreInput.value)){
//             playersArr[currentPlayer].scores.push(scoreInput.value);
//             updateScores()
//             scoreInput.value = '';
//             currentPlayer = (currentPlayer+1);
//             //display turn
//             showTurn()
//             console.log(`pushplayer func: ${currentPlayer}`)
//             //creates html for scores
//             // calcPlayerScore(currentPlayer)
//         }else{
//             alert('Enter a whole Number')
//         }
//     }else{
//         if(regex.test(scoreInput.value)){
//             playersArr[currentPlayer].scores.push(scoreInput.value);
//             updateScores()
//             scoreInput.value = '';
//             if(currentPlayer<4){
//                 currentPlayer = (currentPlayer+1);
//             }else if(currentPlayer >= 4){
//                 currentPlayer = 0
//             }
//             //display turn
//             showTurn()
//             console.log(`pushplayer func: ${currentPlayer}`)
//             //creates html for scores
//             // calcPlayerScore(currentPlayer)
//         }else{
//             alert('Enter a whole Number')
//         }
// }
// }
// //show player Turn and round 
// // let conditon = ;
// function showTurn(){
//     let playerTurn = document.getElementById('showTurn')
//         let currentName = playersArr[currentPlayer]
//     if(currentPlayer !== (playersArr.length+1) && currentRound !== 18){
//         console.log(`showturn: ${currentPlayer}`)
//         console.log(`showturn arr: ${playersArr.length}`)
//         playerTurn.innerText = `Round ${currentRound}: Player ${currentName.name} turn`;
//      }else{
//         playerTurn.innerText = 'Game end!'
//         document.getElementById('submitPlayerScore').classList.add('d-none')
//         document.getElementById('playerScoreInput').classList.add('d-none')
//         //show total scores

//         for (let i = 0; i < playersArr.length; i++) {
//             let playerHtml = document.getElementById(`player${i+1}`)
//             playerHtml.innerHTML += `<td>${calcPlayerScore(i)}</td>`
//         }
//     }
// }
// //start game function

// enter function to handle all enter key press

function enterAll(event) {
    if (event.key === 'Enter' || event == true ){
        let playerScoreInput = Number(document.getElementById('playerScoreInput').value.trim())
        
        if (isNaN(playerScoreInput)) {
            console.log(`enter a number`);
        } else {
            cycleRounds();
        }
    }
}

let roundInc = 1
let round2 = 0
function cycleRounds() {
    if (round2 === max_rounds) {
        console.log('game over');
        return 
    }

    if (thingArr2.length === 0) {
        // yell at the player for putting no players or something lol
        return
    };
    switch (roundInc) {
        case 1:
            p1.innerHTML += `<td>test</td>`
            break;
        case 2:
            p2.innerHTML += `<td>test</td>`
            break;
        case 3:
            p3.innerHTML += `<td>test</td>`
            break;
        case 4:
            p4.innerHTML += `<td>test</td>`
            break;
    }
    if (roundInc > roundMatch - 1) roundInc = 1;
    else roundInc++
    round2++
}


let thingArr2 = [];
let p1; let p2; let p3; let p4;
let max_rounds = 0; //18 for solo //36 for duo //54 for trio //72 for squad
let roundMatch;
function startGame(){
    // showTurn()

    p1 = document.getElementById('playersTbl').children[4]
    p2 = document.getElementById('playersTbl').children[5]
    p3 = document.getElementById('playersTbl').children[6]
    p4 = document.getElementById('playersTbl').children[7]

    let thingArr = [];
    thingArr.push(p1,p2,p3,p4);

    thingArr.forEach((elem) => {if (elem !== undefined) thingArr2.push(elem)})

    roundMatch = thingArr2.length; //how many players we have
    max_rounds = 18 * roundMatch; 

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