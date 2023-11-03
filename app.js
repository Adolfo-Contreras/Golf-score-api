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
let foxGolf = document.getElementById('FoxGolf')
let thanksgivingGolf = document.getElementById('ThanksgivingGolf')
let spanishGolf = document.getElementById('SpanishGolf')


foxGolf.addEventListener('click',()=>{
    let course = foxGolf.value;
    let courseID = document.getElementById('courseID')
    courseID.innerHTML = `Course: ${course}`
})
thanksgivingGolf.addEventListener('click',()=>{
    let course = thanksgivingGolf.value;
    let courseID = document.getElementById('courseID')
    courseID.innerHTML = `Course: ${course}`
})
spanishGolf.addEventListener('click',()=>{
    let course = spanishGolf.value;
    let courseID = document.getElementById('courseID')
    courseID.innerHTML = `Course: ${course}`
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

// qwertyqwertyqwerty yo yo yo my brudda you gonna do this one
function createGolfOptions(course){
    getCourseDetails(course).then(function(data) {
        const thisCourse = data;
        const courseTees = thisCourse.holes[0].teeBoxes; //goes into the first hole just to get the teeboxes

        document.getElementById('teeBoxSelCover').classList.remove('d-none') // grabs the parent div and toggles off the disply:hidden; propety
        let list = document.getElementById('TeeBoxSel')
        list.removeAttribute('class') // deletes any existing classe
        list.classList.add(`${course}`) //sets the class for the current course
        list.innerHTML = '<option>Select One</option>'// resets the dropdown to this

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

//calculate total yards and get hole and whatnot
// haven't done this one yet
function getTotalYrds(course){
    getCourseDetails(course).then(function(data) {
        const thisCourse = data;
        const courseHoles = thisCourse.holes;
        let totalYRD = 0;
        courseHoles.forEach((element) => {
            console.log(`Hole: ${element.hole}`)
            let yrd = element.teeBoxes[0].yards;
            totalYRD += yrd
            console.log(`Total yards: ${totalYRD}`)
            // this gets the yards of the first teebox which is champion in this case
        });
        console.log(`Total of whole course yards: ${totalYRD}`)
        return totalYRD;
      })
      .catch(function(error) {
        console.error('Error:', error);
      })
};

//get the handicaps and return them in an array
async function getPar(course, id){
    let arrOfPar = [];
    const data = await getCourseDetails(course);
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
    const data = await getCourseDetails(course);
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
    const data = await getCourseDetails(course);
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
    par.innerHTML = `<td>Par</td>`

    for(let i = 1;i<19;i++){
        holeRow.innerHTML += `<td>${i}</td>`
    }

    getYrdHole(courseNum,idNum).then((arrOfHoles) => {
        arrOfHoles.forEach((elem) => {
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

//populate table with players yo yo yo if you can also do this one then that would be cool
let playerList = 0;
let incr = 1;
function addPlayers(elem){
    let tbl = document.getElementById('playersTbl')
    // let playerList = document.getElementById('showPlayers')
    let playerWarn = document.getElementById('warningPocket')
    console.log(playerList);
    if (playerList !== 4) {
        playerList++
        if (elem === '') console.log('enter something smh');
        else {
            // playerList.innerHTML += `<li class="list-group-item active">${elem}</li>`
            tbl.innerHTML += `
                <tr id="player${incr}">
                <td>${elem}</td>
                </tr>
            `;
        incr++
        }
    } else {
        playerWarn.innerHTML = `
        <div class="alert alert-warning alert-dismissible fade show" role="alert">
            <strong>Woah there buddy!</strong> Max player limit reached!
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>`
    }
}; 

//calculate player data

function calcPlayerScore(player){
    //idk how to access the players data but ill make the thing so it adds them up
    let playerScores = []
    let playerTotal = 0;
    playerScores.forEach((element)=>{
        playerTotal += element;
    })
    return playerTotal;
};

//create the tables
function renderTbl(){}
//ANIMATIONS AND STYLE STUFF GO HERE if we even do it which idk if we will

    //change color palate

    //animate top menu