// JAVASCRIPT Section


function scrollToShareSection(event) {
    event.preventDefault();
    document.getElementById('share').scrollIntoView({ behavior: 'smooth'});
}

document.addEventListener('DOMContentLoaded', function() {
    var getInTouchLink = document.getElementById("get-in-touch");
    if(getInTouchLink) {
        getInTouchLink.addEventListener('click', scrollToShareSection);
    }
})