const sideBar = document.getElementById("sideBar");
const sideBarMenu = document.querySelector(".sideBarMenu");

sideBar.addEventListener("click", e =>{
    sideBarMenu.classList.toggle("active");
});

