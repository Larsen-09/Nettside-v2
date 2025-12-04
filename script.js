let username;

document.getElementById("mysubmit").onclick = function() {
    username = document.getElementById("username").value;
    document.getElementById("myhello").textContent = `Hallo ${username}!`
}
