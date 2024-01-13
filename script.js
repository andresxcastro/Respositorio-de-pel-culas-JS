document.getElementById('searchButton').addEventListener('click', searchMovies) 
//inicialmente se agrega el escuchador de clicks en el boton del buscador
//especificando la función para la cual va a ser remitido el evento (searchMovies)

//aquí defino los parametros de flexibilidad de comunicación con los externos
let apiKey = '809632862ff1edb1aed615e2f0c4e300'
//luego se busca y define la clave de busqueda del appi
let urlBase = 'https://api.themoviedb.org/3/search/movie'
//aquí se trajo el ejemplo de la pag_appi para mirar la estructura y sacar la urlBase
let urlImg = 'https://image.tmdb.org/t/p/w500'
//esta url es para poder traer imagenes, hubo que buscarla en la TMB

let results = document.getElementById('results')
//se define el div en el que se presentarán los resultados

function searchMovies(){ 
    results.innerHTML='Cargando...'
    //se genera un mensaje para mostrar que se está cargando

    //se crea y se define la función que tramitará la conexion con la appi
    let searchInput = document.getElementById('searchInput').value
    // se extrae la frase buscada para usarlo en el fetch

    fetch(`${urlBase}?query=${searchInput}&api_key=${apiKey}`)
    //se genera la conexión con la appi
    .then(response => response.json())
    //se define la forma en la que se obtendrá la información
    .then(response => displayMovies(response.results))
    //Se dispone lo traído para remitirse (displayMovies(response.results))  
}

function displayMovies(movies){   //se define la función
    //(movies)=(response.results)
    results.innerHTML=''
    //se vacía por si hubo una busqueda anterior

    //se prepara para la opción de ser clickeado sin poner nada
    if(movies.length === 0){
        results.innerHTML = '<p> No se han encontrado resultados para tu busqueda </p>'
        return  //saliendo de la función (displayMovies)      
    }

    //si hay una busqueda entonces...
    movies.forEach(movie => {     //se recorren cada uno de los resultados
        let divMovie = document.createElement('div') 
        //se les crea un div a cada película
        divMovie.classList.add('movie')
        // y se les agrega la clase película, para presentar cada una

        let title = document.createElement('p')
        //aquí se crea el espacio para el título
        title.textContent = movie.title
        //se agrega la parte del objeto con clave title

        let calification = document.createElement('p')
        //aquí se crea el espacio para la calificacion de la movie
        calification.textContent = 'la calificación es: '+ Math.floor(movie.vote_average)
        //se agrega la parte del objeto con clave vote_average (calificacion)

        let overview = document.createElement('p')
        //aquí se crea el espacio para la reseña
        overview.textContent = movie.overview
        //se agrega la parte del objeto con clave overview o reseña
        
        let posterPath= urlImg + movie.poster_path
        //se crea de forma dinámica el alojamiento de donde se sustraerán la imagenes
        let image = document.createElement('img')
        //aquí se crea el espacio para la imagen
        image.src = posterPath
        //se agrega de forma directa la url del apartado para la imagen

        divMovie.appendChild(image)           //aquí se agregan al divMovie los elementos
        divMovie.appendChild(title)           // de información del buscador
        divMovie.appendChild(calification)
        divMovie.appendChild(overview)

        results.appendChild(divMovie)         
        //aquí se agrega el div al div central que está en el DOM


    });


}
