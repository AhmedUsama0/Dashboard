$(document).ready(function () {
  // show user info
  function showUserInfo() {
    const user = document.getElementsByClassName("user");
    Array.from(user).forEach((user) => {
      user.addEventListener("click", function () {
        $("#user-info").fadeOut("slow");
        setTimeout(() => {
          $.ajax({
            method: "POST",
            url: "/database",
            data: { id: $(this).closest("tr").attr("id") },
            success: function (data) {
              const day = data[0].Day;
              const month = data[0].Month;
              const year = data[0].Year;
              $("#name").text(data[0].Name);
              $("#about").text(data[0].About);
              $("#age").text(data[0].Age);
              $("#gender").text(data[0].Gender);
              $("#date-of-birth").text(day + " " + month + " " + year);
              $("#address").text(data[0].Address);
              $("#user-img").attr("src", `/assets/${data[0].img}`);
              $("#user-info").fadeIn("slow");
            },
          });
        }, 500);
      });
    });
  }

  // search for a student or a teacher
  const search = document.getElementById("search");
  search.addEventListener("keyup", (e) => {
    const value = e.target.value.toLowerCase();
    const names = document.getElementsByClassName("name");
    Array.from(names).forEach(function (name) {
      if (name.textContent.toLowerCase().indexOf(value) != -1) {
        name.parentElement.style.display = "";
      } else {
        name.parentElement.style.display = "none";
      }
    });
  });

  // show students
  const student = document.getElementById("roles").firstElementChild;
  student.addEventListener("click", showStudents);
  function showStudents() {
    student.classList.add("green");
    teacher.classList.remove("green");
    $.ajax({
      method: "GET",
      url: "/student",
      async: false,
      success: function (data) {
        prepareData(data);
      },
    });
    showUserInfo();
  }

  // show teachers
  const teacher = document.querySelector("#roles :nth-child(2)");
  teacher.addEventListener("click", showTeachers);
  function showTeachers() {
    student.classList.remove("green");
    teacher.classList.add("green");
    $.ajax({
      method: "GET",
      url: "/teacher",
      async: false,
      success: function (data) {
        prepareData(data);
      },
    });
    showUserInfo();
  }
});

function prepareData(data) {
  const my_table = document.getElementById("my-table");
  // clear the exist data before call the new data
  // use it to remove data when switching between students and teachers
  // so that the data from both of them not added to each other
  while (my_table.children.length > 1) {
    my_table.removeChild(my_table.lastChild);
  }
  data.forEach((row) => {
    const tr = document.createElement("tr");
    tr.classList.add("user");
    tr.setAttribute("id", row._id);

    const img = document.createElement("img");
    img.src = `/assets/${row.img}`;
    img.classList.add("user-img", "img-fluid");


    const button = document.createElement("button");
    button.classList.add("btn-close");
    button.onclick = function () {
      // make the remove process at real time
      $(this).closest("tr").fadeOut();
      $.ajax({
        type: "DELETE",
        url: "/delete",
        data: { id: row._id },
      });
    };

    const span = document.createElement("span");
    span.append(row.Name);

    const nameContainer = document.createElement("div");
    nameContainer.append(img,span);
    nameContainer.classList.add("d-flex", "gap-2", "align-items-center");


    const td1 = document.createElement("td");
    const td2 = document.createElement("td");
    const td3 = document.createElement("td");
    const td4 = document.createElement("td");
    const td5 = document.createElement("td");
    const td6 = document.createElement("td");
    td1.append(nameContainer);
    td1.classList.add("name");
    td2.append(row._id);
    td3.append(row.Age);
    td4.append(row.Gender);
    td5.append(row.Email);
    td6.appendChild(button);
    tr.append(td1,td2,td3,td4,td5,td6);
    my_table.appendChild(tr);
  });
}
