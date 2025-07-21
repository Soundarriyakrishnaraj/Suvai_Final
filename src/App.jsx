import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./App.css";
import dosaaImage from "./assets/dosa-image.png";
import aboutImage from "./assets/image.png";
import JoinUsChefCustomer from './JoinUsChefCustomer';
import JoinUsPage from "./JoinUsPage";
import logo from "./assets/logo.jpeg";
import contactImage from './assets/contact.jpg';
import KitchenMenu from "./KitchenMenu";
import KitchenDetails from "./KitchenDetails";
import Subscribe from "./Subscribe";




const kitchenImages = import.meta.glob("./assets/kitchen*.jpg", { eager: true, import: 'default' });

function App() {
  return (
    <Router>
      <div className="bg-light text-dark min-vh-100vh d-flex flex-column">
        <nav className="navbar navbar-expand-lg navbar-dark bg-success">
          <div className="container-fluid">
            
            <Link className="navbar-brand" to="/">Suvai</Link>
            <div className="collapse navbar-collapse">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item"><Link className="nav-link" to="/home">Home</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/about">About Us</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/order">Order Now</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/JoinUsChefCustomer">Join Us</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/Subscribe">Subscribe</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/contact">Contact Us</Link></li>

              </ul>
            </div>
          </div>
        </nav>

        <div className="flex-grow-1 container-fluid py-10">
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/order" element={<OrderNow />} />
            <Route path="/JoinUsChefCustomer" element={<JoinUsChefCustomer />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/KitchenName" element={<KitchenMenu />} />
            <Route path="/JoinUsPage" element={<JoinUsPage />} />
            <Route path="/Subscribe" element={<Subscribe />} />
            <Route path="/kitchen/:kitchenName" element={<KitchenDetails />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

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

function AboutUs() {
  return (
    <div className="container-fluid my-5">
      <div className="text-center mb-4">
        <img src={aboutImage} alt="Homemade Meal" className="img-fluid rounded shadow" style={{ maxHeight: '400px' }} />
      </div>
      <h2 className="fw-bold mb-3" style={{ color: 'darkgreen', fontSize: '2rem' }}>Who we are?</h2>
      <p>Are you tired of bland, uninspiring meals that leave you feeling unsatisfied? At <strong>Suvai</strong>, we understand that a truly wholesome meal doesn't just nourish the body, it nourishes the heart and soul.
        That’s why our dedicated home chefs are passionate about creating meals that are not only delicious but also infused with love and care.
        <br /><br />
        With <strong>Suvai</strong>, you can indulge in the comforting taste of homemade meals, just like how mom makes! Imagine savouring a meal that is not only delicious but also made with the same love and care you would expect from your mother.
        <br /><br />
        But it’s not just about the taste, we also strive to empower your family and community to be as healthy as they can be. We believe that a healthy diet is the foundation of a happy and fulfilled life, and our mission is to make it easy for you to access the nutritious home-cooked meals you need to thrive.
        <br /><br />
        So why settle for mediocre meals when you can have the taste of home and the peace of mind that comes with knowing you are feeding yourself and your loved ones with the best? Try <strong>Suvai</strong> today and experience the difference for yourself.
      </p>



      <h2 className="fw-bold mt-5 mb-3" style={{ color: 'darkgreen', fontSize: '2rem' }}>What is Suvai?</h2>
      <p>
        At <strong>Suvai</strong>, we believe that everyone deserves to enjoy delicious and healthy food, without compromising on taste or quality. We are an early-stage food tech startup on a mission to revolutionise the food industry in India by building an e-commerce marketplace that offers a wide range of healthy alternatives to restaurant-delivered food.
        <br /><br />
        We partner with extremely talented home cooks to bring you delicious homemade meals straight from their homes. Not only does this allow us to offer our customers an unparalleled dining experience, but it also helps to create thousands of micro-entrepreneurs in society and enables them to make a primary livelihood for their families.
        <br /><br />
        At <strong>Suvai</strong>, we are dedicated to making it easy for you to access healthy and delicious homemade food, right at your doorstep.
      </p>

    </div>
  );
}
 // Replace with correct path

 
 
 function OrderNow() {
  const navigate = useNavigate();

  const kitchens = [
    {
      name: "Sree Annamalaiyaar Cafe",
      image: kitchenImages["./assets/kitchen1.jpg"],
      rating: 4,
      distance: "2.6 km",
      chef: "Saravanan",
      description: "Patient Friendly food items",
      mealsDelivered: 126,
      offer: "Flat 10% off",
    },
    {
      name: "KP Organic Home Foods",
      image: kitchenImages["./assets/kitchen2.jpg"],
      rating: 4,
      distance: "2.6 km",
      chef: "Sri Ram",
      description: "Veg Tiffin Items",
      mealsDelivered: 33,
      offer: "Flat 10% off",
    },
    {
      name: "Foodruties",
      image: kitchenImages["./assets/kitchen3.jpg"],
      rating: 4.3,
      distance: "1.6 km",
      chef: "Kavitha",
      description: "Desert | North Indian | Sweets",
      mealsDelivered: 323,
      offer: "Flat ₹40 off",
    },
    {
      name: "Nila soru",
      image: kitchenImages["./assets/kitchen4.jpg"],
      rating: 4.3,
      distance: "1.1 km",
      chef: "Latha",
      description: "Starters | Biriyani | Meals",
      mealsDelivered: 192,
      offer: "Flat ₹20 off",
    },
    {
      name: "Ambur Divine Kitchen",
      image: kitchenImages["./assets/kitchen6.jpg"],
      rating: 4.3,
      distance: "4.2 km",
      chef: "Mohamed Hussain",
      description: "Briyani | Halal",
      mealsDelivered: 223,
      offer: "Flat ₹40 off",
    },
  ];

  return (
    <div className="container-fluid my-5">
      <div className="d-flex justify-content-start mb-4 px-2">
        <button className="btn btn-success btn-lg" onClick={() => navigate("/order")}>
          Order Now
        </button>
      </div>

      <div className="row">
        {kitchens.map((kitchen, index) => (
          <div key={index} className="col-md-4 mb-4">
            <Link
              to={`/kitchen/${encodeURIComponent(kitchen.name)}`}
              className="text-decoration-none text-dark"
            >
              <div className="card h-100 shadow-sm border-success">
                <img
                  src={kitchen.image}
                  alt={kitchen.name}
                  className="card-img-top"
                  style={{ height: "180px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h5 className="card-title">{kitchen.name}</h5>
                  <p className="card-text">{kitchen.description}</p>
                  <p className="text-muted mb-1">👨‍🍳 {kitchen.chef}</p>
                  <p>
                    ⭐ {kitchen.rating} &nbsp; | &nbsp; 📍 {kitchen.distance}
                  </p>
                  <span className="badge bg-success">{kitchen.offer}</span>
                  <br />
                  <small className="text-muted d-block mt-2">
                    🍽️ {kitchen.mealsDelivered} Happy Meals Delivered
                  </small>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

 
function ContactUs() {
  return (
    <div
      className="d-flex flex-column align-items-center justify-content-center"
      style={{
        minHeight: "100vh",
        width: "100vw",
        backgroundColor: "#f8f9fa",
        padding: "20px",
        boxSizing: "border-box",
      }}
    >
      <img
        src={contactImage}
        alt="Contact Us"
        className="img-fluid mb-4 shadow rounded"
        style={{ maxWidth: "600px", width: "100%" }}
      />
      <div
        className="text-center bg-white p-4 rounded shadow"
        style={{
          width: "100%",
          maxWidth: "600px",
        }}
      >
        <h2 className="text-success mb-4">Contact Us</h2>
        <p>
          <strong>Email:</strong> support@suvai.com
        </p>
        <p>
          <strong>Phone:</strong> 9159475113
        </p>
        <p>
          <strong>Address:</strong> Teachers Colony, Erode
        </p>
      </div>
    </div>
  );
} 
export default App;
