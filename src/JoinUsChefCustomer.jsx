import React, { useState } from "react";
import loginpic1Img from "./assets/loginpic1.jpg";
import tickImg from "./assets/tick.jpg";

const JoinUsChefCustomer = () => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    contact: "",
    email: "",
    experience: "",
    cuisine: "",
    role: "chef",
  });

  const [showSuccess, setShowSuccess] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/submit-form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        if (formData.role === "chef") {
          setMessage("We will send you an email with further instructions!");
        } else {
          setMessage("Welcome to the Suvai family!");
        }
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 4000);

        // Reset form
        setFormData({
          name: "",
          address: "",
          contact: "",
          email: "",
          experience: "",
          cuisine: "",
          role: "chef",
        });
      } else {
        alert("Submission failed: " + (result.error || "Please try again."));
      }
    } catch (error) {
      alert("Error submitting form: " + error.message);
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div style={pageWrapperStyle}>
      {showSuccess && (
        <div style={successBoxStyle}>
          <img src={tickImg} alt="Success" style={{ width: "80px", marginBottom: "20px" }} />
          <p style={{ fontSize: "20px", color: "#2E8B57", fontWeight: "600" }}>{message}</p>
        </div>
      )}

      <div style={formOuterWrapper}>
        <div style={formContainerStyle}>
          <h2 style={{ textAlign: "center", color: "#1f7a50", marginBottom: "30px" }}>
            Join the Suvai Family !!!
          </h2>
          <form onSubmit={handleSubmit}>
            <label style={labelStyle}>Role:</label>
            <select
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              style={inputStyle}
            >
              <option value="chef">Join as Chef</option>
              <option value="customer">Join as Customer</option>
            </select>

            <label style={labelStyle}>Name:</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              style={inputStyle}
              required
            />

            <label style={labelStyle}>Address:</label>
            <textarea
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              style={{ ...inputStyle, height: "70px", resize: "vertical" }}
              required
            />

            <label style={labelStyle}>Contact Number:</label>
            <input
              type="text"
              value={formData.contact}
              onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
              style={inputStyle}
              required
            />

            <label style={labelStyle}>Email ID:</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              style={inputStyle}
              required
            />

            {formData.role === "chef" && (
              <>
                <label style={labelStyle}>Signature Cuisine:</label>
                <input
                  type="text"
                  value={formData.cuisine}
                  onChange={(e) => setFormData({ ...formData, cuisine: e.target.value })}
                  style={inputStyle}
                  required
                />

                <label style={labelStyle}>Years of Experience:</label>
                <input
                  type="text"
                  value={formData.experience}
                  onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                  style={inputStyle}
                />
              </>
            )}

            <button
              type="submit"
              style={submitButtonStyle}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#1c5d3f")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "#2E8B57")}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

// Styles
const pageWrapperStyle = {
  minHeight: "100vh",
  width: "100vw",
  backgroundImage: `url(${loginpic1Img})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  padding: "0",
  margin: "0",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
};

const formOuterWrapper = {
  width: "100%",
  maxWidth: "600px",
  padding: "20px",
};

const formContainerStyle = {
  backgroundColor: "rgba(255, 255, 255, 0.95)",
  padding: "40px 35px",
  borderRadius: "20px",
  width: "100%",
  boxShadow: "0 12px 30px rgba(0,0,0,0.2)",
};

const successBoxStyle = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "white",
  padding: "40px",
  borderRadius: "20px",
  textAlign: "center",
  boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
  zIndex: 999,
};

const labelStyle = {
  fontWeight: "600",
  marginTop: "16px",
  marginBottom: "6px",
  display: "block",
  fontSize: "14px",
  color: "#444",
};

const inputStyle = {
  padding: "10px",
  fontSize: "14px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  width: "100%",
  marginBottom: "14px",
  boxSizing: "border-box",
  backgroundColor: "#fff",
};

const submitButtonStyle = {
  marginTop: "24px",
  padding: "12px 20px",
  backgroundColor: "#2E8B57",
  color: "white",
  border: "none",
  borderRadius: "10px",
  fontSize: "16px",
  cursor: "pointer",
  fontWeight: "bold",
  width: "100%",
  transition: "background 0.3s ease",
};

export default JoinUsChefCustomer;
