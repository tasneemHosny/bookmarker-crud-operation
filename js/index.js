var Site_name = document.getElementById("Site-name");
var Site_URL = document.getElementById("Site-URL");
var mymodal = new bootstrap.Modal(document.getElementById('exampleModal'), {
    keyboard: false
});
var websitesList = [];

if (localStorage.getItem("website List") !== null) {
    websitesList = JSON.parse(localStorage.getItem("website List"));
    displayItem();
}

function addWebsite() {
    if (validationName() && validationURl()) {
        var website = {
            name: Site_name.value,
            uRL: Site_URL.value
        };
        websitesList.push(website);
        localStorage.setItem("website List", JSON.stringify(websitesList));
        displayItem();
        clear();
        console.log(websitesList);
    } else {
        mymodal.show();
    }
}

function clear() {
    Site_name.value = "";
    Site_URL.value = "";
    Site_name.classList.remove("is-valid");
    Site_URL.classList.remove("is-valid");
}

function displayItem() {
    var cartona = "";
    for (var i = 0; i < websitesList.length; i++) {
        cartona +=
            `<tr>
                <td>${i + 1}</td>
                <td>${websitesList[i].name}</td>
                <td><button class="btn btn-success"><a href="${websitesList[i].uRL}" target="_blank"><i class="fa-solid fa-eye me-2" style="color: #ffffff;"></i>Visit</a></button></td>
                <td><button class="btn btn-danger" onclick="DeleteItem(${i})">Delete</button></td>
            </tr>`;
    }
    document.getElementById("table-body").innerHTML = cartona;
}

function DeleteItem(index) {
    websitesList.splice(index, 1);
    localStorage.setItem("website List", JSON.stringify(websitesList));
    displayItem();
}

function validationName() {
    var name_regex = /[\d a-zA-Z]{3,}$/;
    if (name_regex.test(Site_name.value)) {
        Site_name.classList.add("is-valid");
        Site_name.classList.remove("is-invalid");
        return true;
    } else {
        Site_name.classList.add("is-invalid");
        Site_name.classList.remove("is-valid");
        return false;
    }
}

function validationURl() {
    var URL_regex = /\b((http|https):\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)\b/;
    if (URL_regex.test(Site_URL.value)) {
        Site_URL.classList.add("is-valid");
        Site_URL.classList.remove("is-invalid");
        return true;
    } else {
        Site_URL.classList.add("is-invalid");
        Site_URL.classList.remove("is-valid");
        return false;
    }
}
