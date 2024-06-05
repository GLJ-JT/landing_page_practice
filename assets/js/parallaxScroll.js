function parallax() {
    var floaters = document.querySelectorAll(".floater");
    floaters.forEach(function(floater){
        var yPos = window.pageYOffset / 24;
        floater.style.top = - 50 + yPos + "%";
    })

}
window.addEventListener("scroll", function () {
    parallax();
});