//function for sign up
function signUp(event) {
  //prevent page from refreshing
  event.preventDefault();

  //spin icon
  const getSpin = document.querySelector(".spin");
  getSpin.style.display = "inline-block";

  //Getting your values from the form
  const getName = document.getElementById("name").value;
  const getEmail = document.getElementById("email").value;
  const getPassword = document.getElementById("password").value;
  const getConfirmPassword = document.getElementById("confirmPassword").value;

  //checking for validation

  if (
    getName === "" ||
    getEmail === "" ||
    getPassword === "" ||
    getConfirmPassword === ""
  ) {
    Swal.fire({
      icon: "info",
      text: "All Fields are Required!",
      confirmButtonColor: "#2D85DE",
    });
    getSpin.style.display = "none";
  }

  if (getConfirmPassword !== getPassword) {
    Swal.fire({
      icon: "info",
      text: "Password do not match!",
      confirmButtonColor: "#2D85DE",
    });
    getSpin.style.display = "none";
  } else {
    //convert to form data
    const signData = new FormData();
    signData.append("name", getName);
    signData.append("email", getEmail);
    signData.append("password", getPassword);
    signData.append("password_confirmation", getConfirmPassword);

    const signMethod = {
      method: "POST",
      body: signData,
    };

    //create your url
    const url =
      "https://pluralcodesandbox.com/yorubalearning/api/register_admin";

    fetch(url, signMethod)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);

        if (result.status === "success") {
          Swal.fire({
            icon: "success",
            text: `${result.message}`,
            confirmButtonColor: "#2D85DE",
          });

          //set timeout

          setTimeout(() => {
            location.href = "index.html";
          }, 3000);
        } else {
          Swal.fire({
            icon: "info",
            text: `${result.message.email[0]}`,
            confirmButtonColor: "#2D85DE",
          });
          getSpin.style.display = "none";
        }
      })
      .catch((error) => {
        console.log("error", error);
        Swal.fire({
          icon: "info",
          text: `${result.message}`,
          confirmButtonColor: "#2D85DE",
        });
        getSpin.style.display = "none";
      });
  }
}

// login function
function logIn(event) {
  event.preventDefault();

  const getSpin = document.querySelector(".spin");
  getSpin.style.display = "inline-block";

  const getEmail = document.getElementById("email").value;
  const getPassword = document.getElementById("password").value;

  if (getEmail === "" || getPassword === "") {
    Swal.fire({
      icon: "info",
      text: "All Fields are Required!",
      confirmButtonColor: "#2D85DE",
    });
    getSpin.style.display = "none";
  } else {
    const signData = new FormData();
    signData.append("email", getEmail);
    signData.append("password", getPassword);

    const signMethod = {
      method: "POST",
      body: signData,
    };

    const url = "https://pluralcodesandbox.com/yorubalearning/api/admin_login";

    fetch(url, signMethod)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        localStorage.setItem("admin", JSON.stringify(result));

        if (result.hasOwnProperty("email")) {
          location.href = "dashboard.html";
        } else {
          Swal.fire({
            icon: "info",
            text: "Login Unsuccessful!",
            confirmButtonColor: "#2D85DE",
          });
          getSpin.style.display = "none";
        }
      })
      .catch((error) => console.log("error", error));
  }
}

// function to call a dashboard api
function getDashBoardApi() {
  const showName = document.getElementById("adminId");
  const showCategory = document.getElementById("category");
  const showLearn = document.getElementById("learnmat");
  const showSubCategory = document.getElementById("subCat");
  const showTotalQuiz = document.getElementById("quiz");
  const showStudent = document.getElementById("student");
  const getPageSpin = document.querySelector(".pagemodal");

  getPageSpin.style.display = "block";

  // get token from localstorage
  const myToken = localStorage.getItem("admin");
  const token = JSON.parse(myToken);
  const getToken = token.token;
  const dashHeader = new Headers();

  dashHeader.append("Authorization", `Bearer ${getToken}`);
  const dashMethod = {
    method: "GET",
    headers: dashHeader,
  };

  const url =
    "https://pluralcodesandbox.com/yorubalearning/api/admin/admin_dashboardapi";
  fetch(url, dashMethod)
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
      showName.innerHTML = `Welcome ${result.admin_name}`;
      showCategory.innerHTML = `${result.total_number_of_categories}`;
      showLearn.innerHTML = `${result.total_number_of_learningmaterial}`;
      showSubCategory.innerHTML = `${result.total_number_of_subcategories}`;
      showTotalQuiz.innerHTML = `${result.total_number_of_quize}`;
      showStudent.innerHTML = `${result.total_number_of_students}`;

      getPageSpin.style.display = "none";
    })

    .catch((error) => console.log("error", error));
}

function studentModal(event) {
  event.preventDefault();
  const getThree = document.querySelector(".allstudent");
  const openModal = document.getElementById("dash-modal");

  openModal.style.display = "block";

  // get token from localstorage
  const myToken = localStorage.getItem("admin");
  const token = JSON.parse(myToken);
  const getToken = token.token;
  const dashHeader = new Headers();
  dashHeader.append("Authorization", `Bearer ${getToken}`);
  const dashMethod = {
    method: "GET",
    headers: dashHeader,
  };
  let data = [];
  const url =
    "https://pluralcodesandbox.com/yorubalearning/api/admin/top_three_students";
  fetch(url, dashMethod)
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
      if (result.length === 0) {
        getThree.innerHTML = "There are no top three at the moment!";
      } else {
        result.map((item) => {
          data += `
                <div class="search-card">
                   <div class="d-flex justify-content-between">
                     <h5 class="mt-3">Image:</h5>
                     <img src=${item.image} alt="img" class="w-25">
                   </div>
                   <div class="d-flex justify-content-between">
                     <h5>Name:</h5>
                     <p>${item.name}</p>
                   </div>
                   <div class="d-flex justify-content-between">
                     <h5>Email:</h5>
                     <p>${item.email}</p>
                   </div>
                   <div class="d-flex justify-content-between">
                     <h5>Phone Number:</h5>
                     <p>${item.phone_number}</p>
                   </div>
                   <div class="d-flex justify-content-between">
                     <h5>Position:</h5>
                     <p>${item.position}</p>
                   </div>
                   <div class="d-flex justify-content-between">
                     <h5>Total Score:</h5>
                     <p>${item.total_score}</p>
                   </div>
                </div>
              `;
          getThree.innerHTML = data;
        });
      }
    })
    .catch((error) => console.log("error", error));
}
function closeDashModal() {
  const openModal = document.getElementById("dash-modal");
  openModal.style.display = "none";
}

function getAllStudents() {
  const getTableBody = document.getElementById("table-id");
  const getSpin = document.querySelector(".pagemodal");
  getSpin.style.display = "block";
  const getToken = localStorage.getItem("admin");
  const myToken = JSON.parse(getToken);
  const token = myToken.token;
  const dashHeader = new Headers();
  dashHeader.append("Authorization", `Bearer ${token}`);
  const dashMethod = {
    method: "GET",
    headers: dashHeader,
  };
  let data = [];
  const url =
    "https://pluralcodesandbox.com/yorubalearning/api/admin/get_all_students";
  fetch(url, dashMethod)
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
      if (result.length === 0) {
        getTableBody.innerHTML = "No Records Found!";
        getSpin.style.display = "none";
      } else {
        result.map((item) => {
          data += `
                 <tr>
                    <td>${item.name}</td>
                    <td>${item.email}</td>
                    <td>${item.phone_number}</td>
                    <td>${item.position}</td>
                    <td>${item.total_score}</td>
                 </tr>
              `;
          getTableBody.innerHTML = data;
          getSpin.style.display = "none";
        });
      }
    })
    .catch((error) => console.log("error", error));
}

function createCategory(event) {
  event.preventDefault();

  const getSpin = document.querySelector(".spin");
  getSpin.style.display = "inline-block";

  const catName = document.getElementById("cat").value;
  const catImage = document.getElementById("imcat").files[0];
  if (catName === "") {
    Swal.fire({
      icon: "info",
      text: "All Fields Required!",
      confirmButtonColor: "#2D85DE",
    });
    getSpin.style.display = "none";
  } else {
    const getToken = localStorage.getItem("admin");
    const myToken = JSON.parse(getToken);
    const token = myToken.token;
    const dashHeader = new Headers();
    dashHeader.append("Authorization", `Bearer ${token}`);
    const catData = new FormData();
    catData.append("name", catName);
    catData.append("image", catImage);
    const dashMethod = {
      method: "POST",
      headers: dashHeader,
      body: catData,
    };
    const url =
      "https://pluralcodesandbox.com/yorubalearning/api/admin/create_category";
    fetch(url, dashMethod)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result.status === "success") {
          Swal.fire({
            icon: "success",
            text: `${result.message}`,
            confirmButtonColor: "#2D85DE",
          });
          setTimeout(() => {
            location.reload();
          }, 3000);
        } else {
          Swal.fire({
            icon: "info",
            text: `${result.message}`,
            confirmButtonColor: "#2D85DE",
          });
        }
      })
      .catch((error) => console.log("error", error));
  }
}
function getCategoryList() {
  const getSpin = document.querySelector(".pagemodal");
  getSpin.style.display = "block";
  const showItem = document.querySelector(".scroll-object");
  const getToken = localStorage.getItem("admin");
  const myToken = JSON.parse(getToken);
  const token = myToken.token;
  const dashHeader = new Headers();
  dashHeader.append("Authorization", `Bearer ${token}`);
  const dashMethod = {
    method: "GET",
    headers: dashHeader,
  };
  let data = [];

  const url =
    "https://pluralcodesandbox.com/yorubalearning/api/admin/category_list";
  fetch(url, dashMethod)
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
      if (result.length === 0) {
        showItem.innerHTML = "No Category Found";
        getSpin.style.display = "none";
      } else {
        result.map((item) => {
          data += `
                    <div class="search-card">
                      <img src=${item.image} alt="image">
                      <p class="mt-3">${item.name}</p>
                      <div class="text-right">
                        <button class="update-button" onclick="modalBox(${item.id})">update</button>
                        <button class="delete-button" onclick="delCat(${item.id})">delete</button>
                      </div>
                    </div>
                `;
          showItem.innerHTML = data;
          getSpin.style.display = "none";
        });
      }
    })
    .catch((error) => console.log("error", error));
}
let globalId;
function modalBox(catId, name) {
  globalId = catId;
  console.log(name);
  const showModal = document.getElementById("my-modal3");
  showModal.style.display = "block";
  console.log(globalId);
  const getUpName = document.getElementById("updateName");
  const getToken = localStorage.getItem("admin");
  const myToken = JSON.parse(getToken);
  const token = myToken.token;
  const dashHeader = new Headers();
  dashHeader.append("Authorization", `Bearer ${token}`);
  const dashMethod = {
    method: "GET",
    headers: dashHeader,
  };
  const url = `https://pluralcodesandbox.com/yorubalearning/api/admin/get_details?category_id=${catId}`;
  fetch(url, dashMethod)
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
      getUpName.setAttribute("value", `${result.name}`);
    })
    .catch((error) => console.log("error", error));
}
function closeModal3() {
  const showModal = document.getElementById("my-modal3");
  showModal.style.display = "none";
}
function updateCategory(event) {
  event.preventDefault();
  const getSpin = document.querySelector(".spin2");
  getSpin.style.display = "inline-block";
  const catName = document.getElementById("updateName").value;
  const catImage = document.getElementById("updateImage").files[0];
  if (catName === "") {
    Swal.fire({
      icon: "info",
      text: "All Fields Required!",
      confirmButtonColor: "#2D85DE",
    });
    getSpin.style.display = "none";
  } else {
    const getToken = localStorage.getItem("admin");
    const myToken = JSON.parse(getToken);
    const token = myToken.token;
    const dashHeader = new Headers();
    dashHeader.append("Authorization", `Bearer ${token}`);
    const catData = new FormData();
    catData.append("name", catName);
    catData.append("image", catImage);
    catData.append("category_id", globalId);
    const dashMethod = {
      method: "POST",
      headers: dashHeader,
      body: catData,
    };
    const url =
      "https://pluralcodesandbox.com/yorubalearning/api/admin/update_category";
    fetch(url, dashMethod)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result.status === "success") {
          Swal.fire({
            icon: "success",
            text: `${result.message}`,
            confirmButtonColor: "#2D85DE",
          });
          setTimeout(() => {
            location.reload();
          }, 3000);
        } else {
          Swal.fire({
            icon: "info",
            text: `${result.message}`,
            confirmButtonColor: "#2D85DE",
          });
        }
      })
      .catch((error) => console.log("error", error));
  }
}

function createCategory(event) {
  event.preventDefault();

  const getSpin = document.querySelector(".spin");
  getSpin.style.display = "inline-block";

  const catName = document.getElementById("cat").value;
  const catImage = document.getElementById("imcat").files[0];

  if (catName === "") {
    Swal.fire({
      icon: "info",
      text: "All Fields Required!",
      confirmButtonColor: "#2D85DE",
    });
    getSpin.style.display = "none";
  } else {
    const getToken = localStorage.getItem("admin");
    const myToken = JSON.parse(getToken);
    const token = myToken.token;

    const dashHeader = new Headers();
    dashHeader.append("Authorization", `Bearer ${token}`);

    const catData = new FormData();
    catData.append("name", catName);
    catData.append("image", catImage);

    const dashMethod = {
      method: "POST",
      headers: dashHeader,
      body: catData,
    };

    const url =
      "https://pluralcodesandbox.com/yorubalearning/api/admin/create_category";

    fetch(url, dashMethod)
      .then((res) => res.json())
      .then((result) => {
        if (result.status === "success") {
          Swal.fire({
            icon: "success",
            title: `${result.message}`,
            confirmButtonColor: `#2D85DE`,
          });

          setTimeout(() => {
            location.reload();
          }, 3000);
        } else {
          Swal.fire({
            icon: "info",
            text: `${result.message}`,
            confirmButtonColor: "#2D85DE",
          });
        }
      })
      .catch((err) => console.log("Error: ", err));
  }
}

function getCategoryList() {
  const getSpin = document.querySelector(".pagemodal");
  getSpin.style.display = "block";

  const showItem = document.querySelector("admin");

  const getToken = localStorage.getItem("admin");
  const myToken = JSON.parse(getToken);
  const token = myToken.token;

  const dashHeader = new Headers();
  dashHeader.append("Authorization", `Bearer ${token}`);

  const dashMethod = {
    method: "GET",
    headers: dashHeader,
  };

  let data = [];

  const url =
    "https://pluralcodesandbox.com/yorubalearning/api/admin/category_list";

  fetch(url, dashMethod)
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
      if (result.length === 0) {
        showItem.innerHTML = "No category Found";
        getSpin.style.display = "none";
      } else {
        result.map((item) => {
          data += `
        <div class+ "search-card">
          <img src= ${item.image} alt= "image">
          <p class= "mt-3">${item.name}</p>
            <div class= "text-right">
            <button class= "update-button"
            onclick= "modalBox(${item.id})">update</button>
            <button class= "delete-button"
            onclick= "delCat(${item.id})"> delete</button>
              </div>
        </div>
        `;
          showItem.innerHTML = data;
          getSpin.style.display = "none";
        });
      }
    })
    .catch((error) => console.log("error", error));
}

let globalld;

function modalBox(catId, name) {
  globalId = catId;
  console.log(name);
  const showModal = document.getElementById("my-modal3");
  showModal.style.display = "block";

  console.log(globalId);

  const getUpName = document.getElementById("updateName");

  const getToken = localStorage.getItem("admin");
  const myToken = JSON.parse(getToken);
  const token = myToken.token;

  const dashHeader = new Headers();
  dashHeader.append("Authorization", `Bearer ${token}`);

  const dashMethod = {
    method: "GET",
    headers: dashHeader,
  };

  const url = `https://pluralcodesandbox.com/yorubalearning/api/admin/get_details?category_id=${catId}`;

  fetch(url, dashMethod)
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
      getUpName.setAttribute("value", `${result.name}`);
    })
    .catch((error) => console.log("error", error));
}

function closeModal3() {
  const showmodal = document.getElementById("my-modal3");
  showModal.style.display = "none";
}

function updateCategory(event) {
  event.preventDefault();

  const getSpin = document.getElementById("updateName").value;
  const catImage = document.getElementById("updateImage").files[0];

  if (catName === "") {
    Swal.fire({
      icon: "info",
      text: "All fields Required!",
      confirmButtonColor: "#2D85DE",
    });
    getSpin.style.display = "none";
  } else {
    const getToken = localStorage.getItem("admin");
    const myToken = JSON.parse(getToken);
    const token = mytoken.token;

    const catData = new FormData();
    catData.append("name", catName);
    catData.append("image", catImage);
    catData.append("category_id", globalId);

    const dashMethod = {
      method: "POST",
      headers: dashHeader,
      body: catData,
    };

    const url =
      "https://pluralcodesandbox.com/yorubalearning/api/admin/update_category";

    fetch(url, dashMethod)
      .then((respond) => response.json())
      .then((result) => {
        console.log(result);
        if (result.status === "success") {
          Swal.fire({
            icon: "success",
            text: `${result.message}`,
            confirmButtonColor: "#2D85DE",
          });
          setTimeout(() => {
            location.reload();
          }, 3000);
        } else {
          Swal.fire({
            icon: "info",
            text: `${result.message}`,
            confirmButtonColor: "#2D85DE",
          });
        }
      })
      .catch((error) => console.log("error", error));
  }
}
