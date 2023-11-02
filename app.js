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
    console.log(getCourseDetails(foxGolf.value))
    createGolfOptions(foxGolf.value)
})
thanksgivingGolf.addEventListener('click',()=>{
    console.log(getCourseDetails(thanksgivingGolf.value))
    createGolfOptions(thanksgivingGolf.value)
})
spanishGolf.addEventListener('click',()=>{
    console.log(getCourseDetails(spanishGolf.value))
    // console.log(getPar(spanishGolf.value))
    createGolfOptions(spanishGolf.value)
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
        console.log('test');
        document.getElementById('teeBoxSelCover').classList.remove('d-none') // grabs the parent div and toggles off the disply:hidden; propety
        let list = document.getElementById('TeeBoxSel')

        list.innerHTML = '<option>Select One</option>'// resets the dropdown to this

        //adds every Tee option except for the weird one
        let ids = 0;
        courseTees.forEach((elem) => {
            let clean = elem.teeType
            if (clean !== 'auto change location') list.innerHTML += `<option value="${ids}">${clean}</option>`
            ids++
        });
      })
      .catch(function(error) {
        console.error('Error:', error);
      })
}


//calculate total yards and get hole and whatnot
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
function getPar(course){
    getCourseDetails(course).then(function(data) {
        const thisCourse = data;
        const courseHoles = thisCourse.holes;
        let arrOfPar = [];
        courseHoles.forEach((element) => {
            let thing = element.teeBoxes[0].teeType;
            console.log(`Teebox: ${thing}`)
            console.log(`Hole: ${element.hole}`)
            let par = element.teeBoxes[0].par;
            arrOfPar.push(par)
            console.log(`Total yards: ${arrOfPar}`)
        });
        console.log(`Total of handicap course yards: ${arrOfPar}`)
        return arrOfPar;
      })
      .catch(function(error) {
        console.error('Error:', error);
      })
};

//get the handicaps and return them in an array
function getHandicap(course){
    getCourseDetails(course).then(function(data) {
        const thisCourse = data;
        const courseHoles = thisCourse.holes;
        let arrOfHandicap = [];
        courseHoles.forEach((element) => {
            let thing = element.teeBoxes[0].teeType;
            console.log(`Teebox: ${thing}`)
            console.log(`Hole: ${element.hole}`)
            let hcp = element.teeBoxes[0].hcp;
            let par = element.teeBoxes[0].par;
            arrOfHandicap.push(hcp+par)
            console.log(`Total yards: ${arrOfHandicap}`)
        });
        console.log(`Total of handicap course yards: ${arrOfHandicap}`)
        return arrOfHandicap;
      })
      .catch(function(error) {
        console.error('Error:', error);
      })
};

// get yards per hole and gives them back in an array
function getYrdHole(course){
    getCourseDetails(course).then(function(data) {
        const thisCourse = data;
        const courseHoles = thisCourse.holes;
        let arrOfHoles = [];
        courseHoles.forEach((element) => {
            console.log(`Hole: ${element.hole}`)
            let yrd = element.teeBoxes[0].yards;
            arrOfHoles.push(yrd)
            console.log(`yards for this hole: ${arrOfHoles}`)
        });
        console.log(`Yards of all Holes: ${arrOfHoles}`)
        return arrOfHoles;
      })
      .catch(function(error) {
        console.error('Error:', error);
      })
};

//populate tables with info
function addTblInfo(){

};

//populate table with players yo yo yo if you can also do this one then that would be cool
function addPlayers(elem){
    let playerList = document.getElementById('showPlayers')
    let playerWarn = document.getElementById('warningPocket')
    if (playerList.childElementCount !== 4) {
        playerList.innerHTML += `<li class="list-group-item active">${elem}</li>`
    } else {
        playerWarn.innerHTML = `
        <div class="alert alert-warning alert-dismissible fade show" role="alert">
            <strong>Holy guacamole!</strong> You should check in on some of those fields below.
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>`
    }
    console.log(playerList.childElementCount);

}; 

//calculate player data
let playerScores = []
function calcPlayerScore(player){
    //idk how to access the players data but ill make the thing so it adds them up
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