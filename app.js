"use strict";
//get course data
function getCourse(courseid){
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
let FoxGolf = document.getElementById('FoxGolf');
FoxGolf.addEventListener('click',()=>{
    console.log(FoxGolf.value);
    console.log(getCourse(FoxGolf.value));
});
//populate tables with info
function addTblInfo(){};
//calculate course data
function calcCourseData(){};
//populate table with players
function addPlayers(){};

    //event listener to add players
    document.getElementById('addPlayerBtn').addEventListener('click',()=>{addPlayers()})
//calculate player data
function calcPlayerData(){};
//create the tables
function renderTbl(){}
//ANIMATIONS AND STYLE STUFF GO HERE if we even do it which idk if we will

    //change color palates

    //animate top menu