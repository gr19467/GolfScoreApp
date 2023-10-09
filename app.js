let courses = [
    {
      "id": 11819,
      "name": "Thanksgiving Point Golf Course - Lehi, UT",
      "url": "https://exquisite-pastelito-9d4dd1.netlify.app/golfapi/course11819.json"
    },
    {
      "id": 18300,
      "name": "Fox Hollow Golf Course - American Fork, UT",
      "url": "https://exquisite-pastelito-9d4dd1.netlify.app/golfapi/course18300.json"
    },
    {
      "id": 19002,
      "name": "Spanish Oaks Golf Course - Spanish Fork, UT",
      "url": "https://exquisite-pastelito-9d4dd1.netlify.app/golfapi/course19002.json"
    }
  ];

function onload(){
  let courseOptionsHtml = '';
  courses.forEach((course) => {
    courseOptionsHtml += `<option onclick="courseSelected(${course.id})" value="${course.id}">${course.name}</option>`;
  });
  document.getElementById("course-select").innerHTML = courseOptionsHtml;
}

function courseDropdown(){
  dropdown = document.getElementById("course-select");
  dropdown.style.display = "block";
}

function courseSelected(id){
  let courseName;

  //identify the course that was selected
  courses.forEach(course => {
    if(course.id === id){
      courseName = course.name;
    }
  });

  //hide the dropdown
  dropdown = document.getElementById("course-select");
  dropdown.style.display = "none";

  //change the selection box to say the course they selected
  selection = document.getElementById("selected");
  selection.textContent = courseName;

  //make the go button visible
  document.getElementById("goButton").style.display = "flex";
}