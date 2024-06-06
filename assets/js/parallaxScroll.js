function parallax() {
    var floaters = document.querySelectorAll(".floater");
    floaters.forEach(function(floater){
        var yPos = window.pageYOffset / 32;
        floater.style.top = - 60 + yPos + "%";
    })

}
window.addEventListener("scroll", function () {
    parallax();
});

function parallaxReverse() {
    var floatersReverse = document.querySelectorAll(".floaterReverse");
    floatersReverse.forEach(function(floaterReverse){
        var yPos = - window.pageYOffset / 32;
        floaterReverse.style.top = 60 + yPos + "%";
    })

}
window.addEventListener("scroll", function () {
    parallaxReverse();
});
