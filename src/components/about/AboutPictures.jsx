import Carousel from 'react-bootstrap/Carousel';

export function AboutPictures() {
  return (
    <Carousel variant='dark' className='my-3' controls={true} interval={null}>
      {Array(13).fill(null).map((_, idx) => (
        <Carousel.Item key={idx}>
          <img
            className="d-block"
            src={`./images/about${getNumberPostfix(idx)}.png`}
            alt="First slide"
            style={{height: '600px', margin: 'auto'}}
          />
        </Carousel.Item>
      ))}
    </Carousel>
  )
}

function getNumberPostfix(idx) {
  return ('' + ++idx).padStart(2, '0')
}