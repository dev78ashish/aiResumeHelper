fetch('http://localhost:8000/public/yes').then(response => response.text()).then(data => {
    console.log(data)
})