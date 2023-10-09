function onload(){
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

  let courseOptionsHtml = '';
  courses.forEach((course) => {
    courseOptionsHtml += `<option value="${course.id}">${course.name}</option>`;
  });
  document.getElementById("course-select").innerHTML = courseOptionsHtml;
}

function courseDropdown(){
  dropdown = document.getElementById("course-select");
  dropdown.style.display = "block";
}

function courseSelected(course){
  //hide the dropdown

  //change the selection box to say the course they selected

  //light up the go button
}