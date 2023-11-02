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
console.log(getCourses().then(function(data) {
    const golfCourses = data;
    for (const course of golfCourses) {
      console.log(`Course ID: ${course.id}`);
      console.log(`Course Name: ${course.name}`);
      console.log(`Course URL: ${course.url}`);
    }
  })
  .catch(function(error) {
    console.error('Error:', error);
  }))

//qwertyqwertyqwerty yo yo yo my brudda you gonna do this one
function createGolfOptions(){

}
//calculate course data
function calcCourseData(course){
    getCourseDetails(course)
};
//populate tables with info
function addTblInfo(){

};

//populate table with players yo yo yo if you can also do this one then that would be cool
function addPlayers(){}; 

    //event listener to add players
    document.getElementById('addPlayerBtn').addEventListener('click',()=>{addPlayers()})
//calculate player data
function calcPlayerData(){};
//create the tables


function renderTbl(){
//ANIMATIONS AND STYLE STUFF GO HERE if we even do it which idk if we will

    //change color palates

    //animate top menu
}