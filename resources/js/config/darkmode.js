const darkmode = localStorage.getItem("darkMode");

if (darkmode === "true") {
  var root = document.getElementsByTagName("html")[0];
  root.setAttribute("class", "dark");
}
