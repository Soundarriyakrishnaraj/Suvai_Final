// KitchenMenu.jsx
import React from "react";
import { useParams } from "react-router-dom";

const kitchenMenus = {
  "Sree Annamalaiyaar Cafe": [
    { name: "Idli", price: "₹30", description: "Soft steamed rice cakes" },
    { name: "Dosa", price: "₹40", description: "Crispy dosa with chutney & sambar" },
    { name: "Pongal", price: "₹50", description: "Rice and dal cooked with ghee and pepper" },
  ],
  // Add similar entries for other kitchens
};

function KitchenMenu() {
  const { kitchenName } = useParams();
  const decodedKitchenName = decodeURIComponent(kitchenName);
  const items = kitchenMenus[decodedKitchenName] || [];

  return (
    <div className="container my-5">
      <h2 className="text-success text-center mb-4">{decodedKitchenName}</h2>
      {items.length > 0 ? (
        <div className="row">
          {items.map((item, idx) => (
            <div key={idx} className="col-md-4 mb-4">
              <div className="card border-success shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">{item.name}</h5>
                  <p className="card-text">{item.description}</p>
                  <span className="badge bg-success">{item.price}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center">Menu not available yet.</p>
      )}
    </div>
  );
}

export default KitchenMenu;
