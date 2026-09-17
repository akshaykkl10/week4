const form = document.querySelector('form');
const notBtn = document.querySelector('.notification');

notBtn.addEventListener("click", async () => {
    const permission = await Notification.requestPermission();
    if(permission == 'granted') notBtn.textContent = 'Notifications Enabled!';
})

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const location = navigator.geolocation.getCurrentPosition((success) => {
        console.log(success)
    },(error) => {
        console.log(error)
    })
    if (Notification.permission == 'granted') {
        new Notification(
            "Gotcha !" ,
            {
                body: "You have a message!",
                
            }
        );
    }
});
if (navigator.share) {
    console.log("Web Share is supported");
} else {
    console.log("Web Share is NOT supported");
}
const shareBtn = document.body.querySelector('.share')
shareBtn.addEventListener("click", async () => {
    if (navigator.share){
        await navigator.share({
            title: "Akshay Kumar Portfolio",
            text: "Check out my portfolio!",
            url: window.location.href
        });
    }
});