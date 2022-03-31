import React from 'react'
import{ Col } from 'antd';


function GridCards(props) { //그리드이미지 가져오기 4*5
    
    if(props.landingPage) {
        return (
            <Col lg={6} md={8} xs={24}>
                <div style={{ position: 'relative'}}>
                    <a href={`/movie/${props.movieId}`} >
                        <img style={{ width: '100%', height: '380px' }}src={props.image} alt={props.movieName} />
                    </a>
                </div>
            </Col>
        
            )
    }else {
        return (
            <Col lg={6} md={8} xs={24}>
                <div style={{ position: 'relative'}}>
        
                        <img style={{ width: '100%', height: '380px' }}src={props.image} alt={props.chracterName} />
            
                </div>
            </Col>
        
            )
    }
}

export default GridCards
