import React from 'react'
import{ Col } from 'antd';


function GridCards(props) { //그리드이미지 가져오기 4*5
    return (
        <Col lg={6} md={8} xs={24}>
            <div style={{ position: 'relative'}}>
                <a href={`/movie/${props.movieId}`} >
                    <img style={{ width: '100%', height: '380px' }}src={props.image} alt={props.movieName} />
                </a>
            </div>
        </Col>
  )
}

export default GridCards