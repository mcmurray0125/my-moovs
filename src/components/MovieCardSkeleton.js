import React from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import { Card, Col } from 'react-bootstrap';

export default function MovieCardSkeleton({cards}) {
  return (
    <SkeletonTheme
        baseColor='#c9c9c9'
        highlightColor="#f0f0f0"
        duration={0.7}
        borderRadius="0.25rem"
    >
        {Array(cards).fill(0).map((item, index) => 
          <Col xs={6} md={3} key={index} className='mb-3'>
          <Card className="movie-card border-0 px-1">
              <Card.Body className='p-0'>
                  <div
                      className='movie-img mb-3'
                      style={{
                          minHeight:"234px",
                          height:"100%",
                          maxHeight:"100%",
                          width: "100%",
                          maxWidth:"100%",
                          aspectRatio: "2 / 3"
                      }}
                  >
                      <Skeleton
                          className='poster-skeleton'
                          height={"100%"}
                          width={"100%"}
                      />
                  </div>
                  <div className='d-flex align-items-center justify-content-between'>
                      <Card.Text className='m-0'><Skeleton width={115} count={2}/></Card.Text>
                      <Skeleton width={30} height={30} style={{borderRadius: "50% !important"}}/>
                  </div>
              </Card.Body>
          </Card>  
          </Col>   
          )}
    </SkeletonTheme>
    )
}
