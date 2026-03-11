
const username = document.getElementById("userName");
const pass = document.getElementById("password");

username.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        pass.focus();
    }
});

document.getElementById("signinForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const username = document.getElementById("userName");
    const pass = document.getElementById("password");

    const usernameInput = username.value;
    const passInput = pass.value;

    const correctUN = "admin"
    const correctpass = "admin123"

    if (usernameInput === "" || passInput === "") {
        if (usernameInput === "" && passInput === "") {
            alert("Write Username and Password.")
            username.focus();
        }
        else if (usernameInput === "") {
            alert("Write Username.")
            username.focus();
        }
        else {
            alert("Write Password.");
            pass.focus();
        }
        return;
    }

    else if (usernameInput === correctUN && passInput === correctpass) {
        window.location.href = "home.html"
    }
    else {
        alert("Wrong password. Try Demo Credentials.")
    }


})