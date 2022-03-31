//rfce로 function 편리하게 만들 수 있음 (es7 설치해야함)
import React, { useEffect, useState } from 'react'
import { API_URL, API_KEY, IMAGE_BASE_URL} from '../../Config';
import MainImage from '../LandingPage/Section/MainImage';
import MovieInfo from './Sections/MovieInfo';
import { useParams } from 'react-router-dom';
import GridCards from '../commons/GridCards';
import Favorite from './Sections/Favorite';
import { Row } from 'antd';
import { Button } from 'antd' ;

function MovieDetail(props) {

    
    const {movieId} = useParams()
    const [Movie, setMovie] = useState([])
    const [Casts, setCasts] = useState([])
    const [ActorToggle, setActorToggle] =useState(false)

    useEffect(() => {

        // console.log(props.match)
    
        let endpointCrew = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`
        let endpointInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}`
        //let endpointInfo = `${API_URL}movie/${movieId}/?api_key=${API_KEY}` -> 위에 꺼로 수정

        fetch(endpointInfo)
            .then(response => response.json())
            .then(response => {
                // console.log(response)
                setMovie(response)

        })
    
        fetch(endpointCrew)
            .then(response => response.json())
            .then(response => {
                setCasts(response.cast)
            })

    }, [])

        const toggleActorView = () => {
            setActorToggle(!ActorToggle)
        }

    return ( 
        <div>
        
            {/* Header */}

                <MainImage 
                    image = {`${IMAGE_BASE_URL}w1280${Movie.backdrop_path}`} 
                    title = {Movie.original_title}
                    text = {Movie.overview}
                />

            {/* Body */}
            <div style={{ width: '85%', margin: '1rem auto' }}>
            
            {/* 좋아요 버튼 위치 */}
                <div style={{ display: 'flex', justifyContent:'flex-end' }}>
                   <Favorite movieInfo={Movie} movieId={movieId} userFrom={localStorage.getItem('userId')}/>
                </div> 

                {/* Movie Info 영화 정보 가져오기 */}

                <MovieInfo
                    movie={Movie}
                />

                {/* Actors Grid */}

                <div style={{ display: 'flex', justifyContent: 'center', margin: '2rem' }}>
                    <Button onClick={toggleActorView}>Toggle Actor View</Button>
                </div>

                {ActorToggle &&

                <Row gutter={[13, 13]} >
    
                    {Casts && Casts.map((cast, index) => (
                        <React.Fragment key={index}>
                            <GridCards
                                landingPage
                                image={cast.profile_path ?
                                    `${IMAGE_BASE_URL}w500${cast.profile_path}` : null}
                                chracterName={cast.name} />
                        </React.Fragment>
                        ))}
                    </Row>
                }
            </div>

        </div>
    )
}

export default MovieDetail