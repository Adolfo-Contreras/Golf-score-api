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
// .finally(function(data){data[1]})
console.log(getCourses().then(function(data) {
    // Access the array of golf course objects
    const golfCourses = data;

    // You can now work with the data
    for (const course of golfCourses) {
      console.log(`Course ID: ${course.id}`);
      console.log(`Course Name: ${course.name}`);
      console.log(`Course URL: ${course.url}`);
    }
  })
  .catch(function(error) {
    // Handle any errors here
    console.error('Error:', error);
  }))

//qwertyqwertyqwerty yo yo yo my brudda you gonna do this one
function createGolfOptions(){

}
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