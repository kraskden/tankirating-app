import { Image } from 'react-bootstrap';
import Carousel from 'react-bootstrap/Carousel';

export function AboutPictures() {
  return (
    <Carousel variant='dark' className='my-3' controls={true} interval={null}>
      {Array(13).fill(null).map((_, idx) => (
        <Carousel.Item key={idx}>
          <Image
            className="d-block"
            src={`./images/about${getNumberPostfix(idx)}.png`}
            alt="First slide"
            height={600}
            style={{margin: 'auto'}}
          />
        </Carousel.Item>
      ))}
    </Carousel>
  )
}

function getNumberPostfix(idx) {
  return ('' + ++idx).padStart(2, '0')
}