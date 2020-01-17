const model = {
    genres: {
        "1": "Action",
        "2": "Adventure",
        "3": "Animation",
        "4": "Comedy",
        "5": "Crime",
        "6": "Documentary",
        "7": "Drama",
        "8": "Family",
        "9": "Fantasy",
        "10": "History",
        "11": "Horror",
        "12": "Music",
        "13": "Mystery",
        "14": "Romance",
        "15": "Science Fiction",
        "16": "TV Movie",
        "17": "Thriller",
        "18": "War",
        "19": "Western"
    },
    
}

const view = {
    displayMovieCard (movie) {    // 顯示電影卡片
        let imageSrc = IMG_URL + movie.image
        let movieCard = `
        <div class="card mx-2 mb-1" style = "width: 11rem;" data-id = ${movie.id}>
            <img class="card-img-top" src=${imageSrc} alt="Card image cap">
                <div class="card-body">
                    <h5 class="card-title">${movie.title}</h5>
                    <div class="d-flex flex-wrap justify-content-start" id="card-${movie.id}"></div>
                </div>
        </div>`
        return movieCard
    },
    addGenreTabs () {   // 新增標籤 view
        document.querySelectorAll('.card').forEach(movie => {
            let id = Number(movie.dataset.id)
            let movieGenres = data[id - 1].genres
            let aPanel = document.querySelector(`#card-${movie.dataset.id}`)

            movieGenres.forEach(item => {
                let div = document.createElement('div')
                div.setAttribute('class', 'card-genre mb-2 ml-0 mr-1')
                div.innerHTML = model.genres[item]
                aPanel.appendChild(div)
            })
        })
    },

}

const BASE_URL = 'https://movie-list.alphacamp.io'
const IMG_URL = BASE_URL + '/posters/'
const INDEX_URL = BASE_URL + '/api/v1/movies/'
const genrePanel = document.querySelector('.genre-panel')
let data = []

// API
axios.get(INDEX_URL).then((response) =>{
    data.push(...response.data.results)
}).catch((err) => console.log(err))


// 設置監聽器 (controller)
// 點擊tab => loop每筆資料 => 如果資料的genre數字contains tab的 data-genre => 就回傳卡片內容
genrePanel.addEventListener('click', (e) => {
    let movieListPanel = ''
    data.forEach( movie => {    
        if (movie.genres.includes(Number(e.target.dataset.genre))) {
            let movieCard = view.displayMovieCard(movie)
            movieListPanel += movieCard           
        }   else return
    })
    document.querySelector('.movie-list').innerHTML = movieListPanel
    view.addGenreTabs()
})


// 顯示genre書籤 (view)
// 在每一個tab上標記genre的代號
let genreTab = ''
Object.entries(model.genres).forEach( ([key, genre]) => {
    // console.log(key, genre)
    genreTab += `
    <a class="nav-link" id="v-pills-genre-tab" data-toggle="pill" data-genre='${key}'
    href="#v-pills-profile" role="tab" aria-controls="v-pills-genre" aria-selected="false">${genre}</a>`
});
genrePanel.innerHTML = genreTab 







