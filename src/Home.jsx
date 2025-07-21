import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./App.css";
import dosaaImage from "./assets/dosa-image.png";
function Home() {
    const reviews = [
      {
        text: "Perfect homely food. Healthy, good preparation, suitable for our elderly people. Mom is unwell and had difficulty eating",
        name: "Ram",
        location: "Trichy (Srirangam)",
        avatar: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
      },
      {
        text: "Amazing experience! The food tasted just like my mom's cooking. Highly recommend this to anyone missing home food.",
        name: "Ramesh K",
        location: "Erode (Surya Nagar)",
        avatar: "https://cdn-icons-png.flaticon.com/512/147/147144.png",
      },
      {
        text: "Very hygienic and neatly packed. Great portion size and timely delivery. Will definitely order again!",
        name: "Anita S",
        location: "Hosur(Krishna Nagar)",
        avatar: "https://cdn-icons-png.flaticon.com/512/194/194938.png",
      },
    ];
  
    const [index, setIndex] = useState(0);
  
    useEffect(() => {
      const interval = setInterval(() => {
        setIndex((prevIndex) => (prevIndex + 1) % reviews.length);
      }, 3000);
      return () => clearInterval(interval);
    }, [reviews.length]);
  
    const review = reviews[index];
  
    return (
      <div className="home-page">
        <div className="px-3 py-5 text-center">
          <h1 className="text-success fw-bold">Welcome to Suvai</h1>
          <p className="lead">
            Order delicious homemade meals prepared by our community chefs!
          </p>
  
          <div className="mt-4 d-flex justify-content-center">
            <img
              src={dosaaImage}
              alt="Delicious Dosa"
              className="img-fluid rounded shadow"
              style={{ maxHeight: "320px", width: "auto" }}
            />
          </div>
        </div>
  
        <div className="py-5 bg-light">
          <h2 className="text-success text-center mb-5">How It Works</h2>
          <div className="row text-center w-100 m-0">
            <div className="col-md-4 mb-4">
              <div className="step-circle">1</div>
              <h5 className="text-success fw-bold">Craving a homemade meal</h5>
              <p>Think about your favorite dish cooked with love.</p>
            </div>
            <div className="col-md-4 mb-4">
              <div className="step-circle">2</div>
              <h5 className="text-success fw-bold">Browse and order</h5>
              <p>Find your perfect meal on our app and place an order.</p>
            </div>
            <div className="col-md-4 mb-4">
              <div className="step-circle">3</div>
              <h5 className="text-success fw-bold">Enjoy at home</h5>
              <p>Receive delicious homemade food delivered to your door.</p>
            </div>
          </div>
        </div>
  
        <div
          className="mt-5 p-4 bg-success text-white rounded shadow mx-auto"
          style={{ maxWidth: "800px" }}
        >
          <blockquote className="blockquote">
            <div className="d-flex align-items-start justify-content-center mb-3">
              <img
                src="https://cdn-icons-png.flaticon.com/512/847/847969.png"
                alt="People Icon"
                width="40"
                height="40"
                className="me-2"
              />
              <p className="mb-0 text-start">"{review.text}"</p>
            </div>
            <footer className="blockquote-footer text-white d-flex align-items-center justify-content-center">
              <img
                src={review.avatar}
                alt="User Avatar"
                width="40"
                height="40"
                className="rounded-circle me-2"
              />
              <strong>{review.name}</strong>, {review.location}
            </footer>
          </blockquote>
        </div>
      </div>
    );
  }
  export default Home;