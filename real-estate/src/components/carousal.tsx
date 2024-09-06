// src/components/CarCarousel.tsx
import React from 'react';
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Image from 'next/image';
import styles from "../styles/carousel.module.css";

const CarCarousel = () => {
  return (
    <Carousel>
      <Carousel.Item>
        <Image
          className="d-block w-100"
          src="/images/third.jpg"
          alt="First slide"
          width={800}  // Set appropriate width
          height={950} // Set appropriate height
        />
        <Carousel.Caption>
          <h3>First Slide Label</h3>
          <p>Description for the first slide.</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <Image
          className="d-block w-100"
          src="/images/first.jpg"
          alt="Second slide"
          width={800}  // Set appropriate width
          height={950} // Set appropriate height
        />
        <Carousel.Caption>
          <h3>Second Slide Label</h3>
          <p>Description for the second slide.</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <Image
          className="d-block w-100"
          src="/images/second.jpg"
          alt="Third slide"
          width={800}  // Set appropriate width
          height={950} // Set appropriate height
        />
        <Carousel.Caption>
          <h3>Third Slide Label</h3>
          <p>Description for the third slide.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default CarCarousel;
