const $songsContainer = document.querySelector("section#songs")
const $cart = document.querySelector("section#cart ul")
let songs = []
let inCart = []

loadSongs()


function loadSongs() {
    fetch("/songs")
        .then( response => response.json() )
        .then( response => {
        console.log(response)
            createItemSongs(response) 
        })
        .catch(err => console.error(err))
}

function createItemSongs(_songs) {
    songs = _songs
    const songsHTML = _songs.map(song => 
        `<div class="song">
            <h3>Name: ${song.name}</h3>            
            <button onClick="addToCart(${song.songid}, event)">Add to Cart</button>
<button onClick="addToCart(${song.songid}, event)">Add to Cart</button>
        </div>`
    ).join('')
    $songsContainer.innerHTML = songsHTML    
}

function login(event) {
    event.preventDefault()
    //create order object
    const $form = document.forms[0]
    const order = {
        user: {
            first: $form.first.value,
            last: $form.last.value,
            email: $form.email.value,
            password: $form.password.value
        }
    }
    //POST on /login
    const config = {
        method: "POST",
        body: JSON.stringify( order ),
        headers: {
            "Content-Type":"application/json"
        }
    }
    fetch("/login",config)
        .then( response => response.json() )
        .then( response => console.log(response) )
        .catch(err => console.error(err))

}
function song(event) {
    event.preventDefault()
    //create order object
    const $form = document.forms[0]
    const order = {
        song: {
            name: $form.name.value,
        }
    }
    //POST on /login
    const config = {
        method: "POST",
        body: JSON.stringify( order ),
        headers: {
            "Content-Type":"application/json"
        }
    }
    fetch("/song",config)
        .then( response => response.json() )
        .then( response => loadSongs() )
        .catch(err => console.error(err))

}
function createAccount(event) {
    event.preventDefault()
    //create order object
    const $form = document.forms[0]
    const order = {
        createAccount: {
            first: $form.first.value,
            last: $form.last.value,
            email: $form.email.value,
            password: $form.password.value
        }
    }
    //POST on /login
    const config = {
        method: "POST",
        body: JSON.stringify( order ),
        headers: {
            "Content-Type":"application/json"
        }
    }
    fetch("/createAccount",config)
        .then( response => response.json() )
        .then( response => loadSongs() )
        .catch(err => console.error(err))

}
function addToCart(id, event) {
    const song = songs.find(song => song.songid == id)

    const $newsong = document.createElement("li")
    $newSong.innerHTML = 
        `${song.name}`
    $cart.append($newSong)
    inCart.push(song)
    document.querySelector("span#songCount").innerHTML = inCart.length
}