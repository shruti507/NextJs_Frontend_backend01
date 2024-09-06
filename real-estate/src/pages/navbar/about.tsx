// pages/about.tsx
import Head from 'next/head';
// src/pages/about.tsx
import Header from '../../components/header';
import { useState } from 'react';
import Image from 'next/image';
import 'bootstrap/dist/css/bootstrap.min.css';


const About = () => {
  const [properties, setProperties] = useState<any[]>([]);

  return (
    <>
      <Header setProperties={setProperties} />
      <main>
      <div id="services" className="our-services section  d-flex justify-content-center align-items-center" style={{height:"950px"}}>
      <div className="container" style={{minWidth:"80%"}}>
        <div className="row">
          <div className="col-lg-6 align-self-center wow fadeInLeft" data-wow-duration="1s" data-wow-delay="0.2s">
            <div className="left-image">
              <Image
                src="/images/as.png" // Make sure the path is correct and image is in the public/images folder
                alt="Services"
                width={700} // Set appropriate width
                height={800} // Set appropriate height
              />
            </div>
          </div>
          <div className="col-lg-6 wow fadeInRight d-flex flex-column justify-content-center " data-wow-duration="1s" data-wow-delay="0.2s">
            <div className="section-heading">
              <h2><em>About Us</em></h2>
              <p>
                At RealEstate, we believe that finding your dream home or the perfect investment property should be an exciting and seamless journey. Founded in [Year], we have grown from a small local agency into a leading real estate platform with a mission to simplify the property search and buying process for our clients.
              </p>
            </div>
            <h3>Our Mission</h3>
            <p>
              Our mission is to provide exceptional real estate services through innovation, integrity, and a deep understanding of the property market. We are dedicated to helping individuals, families, and investors find the right property that fits their needs and lifestyle.
            </p>
            <h3>Who We Are</h3>
            <p>
              We are a team of passionate real estate professionals with years of experience in the industry. Our team is composed of knowledgeable agents, market analysts, and customer service experts who are committed to delivering personalized and attentive service.
            </p>
          </div>
        </div>
      </div>
    </div>
      </main>
    </>
  );
};

export default About;

