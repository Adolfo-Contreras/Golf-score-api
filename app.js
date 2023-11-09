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
//show add players
function addplayersui(){
    
}
//calculate total yards
// haven't done this one yet
async function getTotalYrds(course,id){
    const data = await getCourseDetails(course)
        const thisCourse = data;
        const courseHoles = thisCourse.holes; // an array that we can use
        let totalYRD = 0;
        courseHoles.forEach((element) => {
            console.log(`Hole: ${element.hole}`)
            let yrd = element.teeBoxes[id].yards;
            totalYRD += yrd
            console.log(`Total yards: ${totalYRD}`)
            // this gets the yards of the first teebox which is champion in this case
        });
        console.log(`Total of whole course yards: ${totalYRD}`)
        return totalYRD;
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

    if (playerList !== 4) {
        playerList++
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
             Trash.forEach((values, index) => {values.setAttribute('onclick',`handleDelete(${index+1})`)});
            playerName.value = '';
        incr++;
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
    console.log(playersArr)
}
playerName.addEventListener('keydown', function (e){
    if(e.key === 'Enter'){
        addPlayers(playerName.value)
    }
}) 
//Delete players
function handleDelete(playerNum){
    console.log(`Player: ${playerNum}`)
}
//calculate player data
function calcPlayerScore(pNum){
    //idk how to access the players data but ill make the thing so it adds them up
    let playerScores = playersArr[pNum]
    let playerTotal = 0;
    playerScores.scores.forEach((element)=>{
        playerTotal=playerTotal + Number(element);
    })
    // if(!playerTotal){alert('No scores added')}else{
        console.log(playerTotal)
        return playerTotal;
};
// function that moves to the next rounds
let currentRound = 1;
let currentPlayer = 0;
function nextRound(){
    currentRound = currentRound += 1;
    currentPlayer = 0;
}
//update the scores of players
function updateScores(){
        //get player
        let playerHtml = document.getElementById(`player${currentPlayer+1}`)
        //get score
        let roundScore = playersArr[currentPlayer].scores[currentRound-1]
        playerHtml.innerHTML +=`<td>${roundScore}</td>`
}
//eventlistener to add a score to the table
document.getElementById('submitPlayerScore').addEventListener('click', ()=>{
    pushPlayerScore()
})
document.getElementById('playerScoreInput').addEventListener('keydown', function (e){
    if(e.key === 'Enter'){
        pushPlayerScore()
        console.log(`next Func: ${currentRound}`)
        console.log(`next Func: ${currentPlayer}`)
    }
})
console.log(`curr play is ; ${currentPlayer}`)
//push score to scorecard and move to next round
function pushPlayerScore(){
    const regex = new RegExp(/^\d+$/);
    let scoreInput = document.getElementById('playerScoreInput');
    if (currentPlayer === (playersArr.length) || currentPlayer === (playersArr.length+1)) {
        nextRound()
        if(regex.test(scoreInput.value)){
            playersArr[currentPlayer].scores.push(scoreInput.value);
            updateScores()
            scoreInput.value = '';
            currentPlayer = (currentPlayer+1);
            //display turn
            showTurn()
            console.log(`pushplayer func: ${currentPlayer}`)
            //creates html for scores
            // calcPlayerScore(currentPlayer)
        }else{
            alert('Enter a whole Number')
        }
    }else{
        if(regex.test(scoreInput.value)){
            playersArr[currentPlayer].scores.push(scoreInput.value);
            updateScores()
            scoreInput.value = '';
            if(currentPlayer<4){
                currentPlayer = (currentPlayer+1);
            }
            //display turn
            showTurn()
            console.log(`pushplayer func: ${currentPlayer}`)
            //creates html for scores
            // calcPlayerScore(currentPlayer)
        }else{
            alert('Enter a whole Number')
        }
}
}
//show player Turn and round 
// let conditon = ;
function showTurn(){
    let playerTurn = document.getElementById('showTurn')
        let currentName = playersArr[currentPlayer]
    if(currentPlayer !== playersArr.length+1 && currentRound !== 18){
        console.log(`showturn: ${currentPlayer}`)
        console.log(`showturn arr: ${playersArr.length}`)
        playerTurn.innerText = `Round ${currentRound}: Player ${currentName.name} turn`
     }else{
        playerTurn.innerText = 'Game end!'
        document.getElementById('submitPlayerScore').classList.add('d-none')
        document.getElementById('playerScoreInput').classList.add('d-none')
    }
}
//start game function
document.getElementById('startGame').addEventListener('click',()=>{startGame()})
function startGame(){
    showTurn()
    document.getElementById('createScoreCard').classList.add("noHtml")
    document.getElementById('ScoreCard').classList.add('centerScoreCard')
    document.getElementById('playerScoreInput').classList.remove('d-none')
    document.getElementById('submitPlayerScore').classList.remove('d-none')
    document.getElementById('startGame').classList.add('d-none')
}
//ANIMATIONS AND STYLE STUFF GO HERE if we even do it which idk if we will

    //change color palate

    //animate top menu