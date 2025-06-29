import React from 'react';
import WhatsAppContact from './WhatsAppContact';
import Contact from './Contact';

const Aboutus = () => {
    return (
        <div className="aboutus-container">
            <WhatsAppContact />
            <h1 className='Banner about-title' style={{color:"#ffd54f", textAlign: "center", marginBottom: "10px"}}>About Us</h1>

            <h3 className='Banner about-subtitle' style={{textAlign: "center", maxWidth: "800px", margin: "0 auto", marginTop: "10px"}}>
                <b>Welcome to Silver Spoon Catering</b> — where taste meets elegance!
            </h3>
            <br />

            <p className='about-features' style={{textAlign: "center", maxWidth: "700px", margin: "0 auto"}}>
                "We specialize in offering top-quality catering services for all your special occasions — weddings, parties, corporate events, and more.
                With a wide variety of delicious dishes, professional service, and timely delivery, we ensure your events are truly memorable."
            </p>

            <div className='about-features' style={{textAlign: "center", maxWidth: "600px", margin: "0 auto"}}>
                <p style={{textAlign: "center"}}>At Silver Spoon, we believe that great food brings people together. Our easy-to-use website lets you:</p>
            </div>

            <div className="about-features" style={{textAlign: "center", maxWidth: "500px", margin: "0 auto"}}>
                <p style={{textAlign: "center"}}>• Explore our menu and services</p>
                <p style={{textAlign: "center"}}>• Make inquiries or bookings</p>
                <p style={{textAlign: "center"}}>• Stay updated with our latest offerings</p>
            </div>

            {/* Contact Section */}
            <div style={{ marginTop: '50px' }}>
                <Contact />
            </div>
        </div>
    );
}

export default Aboutus;
