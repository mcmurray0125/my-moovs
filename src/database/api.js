let API_key="&api_key=51dc6d0882dbc06cc1467363108a4d8b"
let base_url="https://api.themoviedb.org/3"
let in_theatres=base_url+"/discover/movie?primary_release_date.gte=2014-09-15&primary_release_date.lte=2014-10-22"+API_key

let moviedata = [
    in_theatres
]

export default moviedata