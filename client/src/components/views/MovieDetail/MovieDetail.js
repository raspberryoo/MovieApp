//rfce로 function 편리하게 만들 수 있음 (es7 설치해야함)
import React, { useEffect, useState } from 'react'
import { API_URL, API_KEY, IMAGE_BASE_URL} from '../../Config';
import MainImage from '../LandingPage/Section/MainImage';
// import GridCards from '../commons/GridCards';
import MovieInfo from './Sections/MovieInfo';
import { useParams } from 'react-router-dom';
// import axios from 'axios';
function MovieDetail(props) {

    //let movieId = props.match.params.movieId
    const {movieId} = useParams()
    const [Movie, setMovie] = useState([])

    useEffect(() => {
    
        let endpointCrew = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`;
        let endpointInfo = `${API_URL}movie/${movieId}/?api_key=${API_KEY}`;

        fetch(endpointInfo)
        .then(response => response.json())
        .then(response => {
            console.log(response)
            setMovie(response)

        })
    
        fetch(endpointCrew)
        .then(response => response.json())
        .then(response => {
            console.log('responseForCrew',response)

            })

    }, [])

    return ( 
        <div>
        
            {/* Header */}

            {Movie &&
                <MainImage 
                    image = {`${IMAGE_BASE_URL}w350${Movie.backdrop_path}`} 
                    title = {Movie.original_title}
                    text = {Movie.overview}
                />
            }

            {/* Body */}
            <div style={{ width: '85%', margin: '1rem auto' }}>

                {/* Movie Info 영화 정보 가져오기 */}
            
                <MovieInfo movie = {Movie} />
                
                <br />
                {/* Actors Grid */}

                <div style={{ display: 'flex', justifyContent: 'center', margin: '2rem'}}>
                    <button>Toggle Actor View</button>
                </div>
            </div>

        </div>
    )
}

export default MovieDetail
