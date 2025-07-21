import { useParams } from "react-router-dom";
import { useState, useMemo } from "react";

const kitchenMenus = {
  "Sree Annamalaiyaar Cafe": [
    {
      name: "Mapillai samba rice ice biryani",
      price: 135,
      description: "500ml with pickle and small onion and chilli",
      image: "/mapillai.jpg",
    },
    {
      name: "Keerai Poriyal",
      price: 80,
      description: "Keerai Poriyal 250 ML",
      image: "/keerai.jpg",
      bestSeller: true,
      rating: 4.7,
    },
    {
      name: "Karuppu Kavuni Rice Ice Biryani",
      price: 135,
      description: "500ml with small onion, chilli and pickle",
      image: "/karuppu.webp",
    },
    {
      name: "Beans Poriyal",
      price: 95,
      description: "Beans Poriyal 250 ML",
      image: "/beans.jpg",
    },
  ],
  "KP Organic Home Foods": [
    {
      name: "Idly with mutton kulambu",
      price: 200,
      description: "6 nos idly",
      image: "/kolambu.jpg",
    },
    {
      name: "Karandi omlette",
      price: 80,
      description: "2 nos",
      image: "/karandi.jpeg",
      bestSeller: true,
      rating: 4.7,
    },
    {
      name: "Rava kichadi",
      price: 135,
      description: "750ml rava kichadi",
      image: "/kichadi.jpg",
    },
    {
      name: "Muttai paniyaram",
      price: 195,
      description: "9 nos masala muttai paniyaram",
      image: "/muttai.webp",
    },
  ],
  "Foodruties": [
    {
      name: "Dates milk shake",
      price: 110,
      description: "300 ml of dates milkshake",
      image: "/shake.webp",
    },
    {
      name: "Poha",
      price: 80,
      description: "250 ml",
      image: "/poha.webp",
      bestSeller: true,
      rating: 4.7,
    },
    {
      name: "Maida Pan cake with egg",
      price: 135,
      description: "4 nos",
      image: "/pancake.jpg",
    },
    {
      name: "Peanut chat masala",
      price: 100,
      description: "250 ml boiled peanut chat masala",
      image: "/peanut.jpg",
    },
  ],
  "Nila soru": [
    {
      name: "Egg Bhurji",
      price: 110,
      description: "250 ml of Egg Bhurji",
      image: "/egg.jpg",
    },
    {
      name: "Ragi sweet Semiya",
      price: 80,
      description: "500 ml",
      image: "/ragi.jpg",
      bestSeller: true,
      rating: 4.7,
    },
    {
      name: "Healthy meal box",
      price: 180,
      description: "2 nos",
      image: "/box.jpg",
    },
    {
      name: "Gobi 65",
      price: 100,
      description: "250 ml",
      image: "/gobi.webp",
    },
  ],
  "Ambur Divine Kitchen": [
    {
      name: "Chapathi with Chicken gravy",
      price: 110,
      description: "3 nos with 250 ml of Chicken gravy",
      image: "/chicken.jpg",
    },
    {
      name: "Chicken fried rice",
      price: 180,
      description: "500 ml",
      image: "/rice.png",
      bestSeller: true,
      rating: 4.7,
    },
    {
      name: "Bucket Biryani Combo",
      price: 800,
      description: "3-4 serves with raita and break halwa",
      image: "/bucket.avif",
    },
    {
      name: "Chicken 65",
      price: 120,
      description: "500 ml",
      image: "/65.jpg",
    },
  ],
};

function KitchenDetails() {
  const { kitchenName } = useParams();
  const decodedName = decodeURIComponent(kitchenName);
  const menu = kitchenMenus[decodedName] || [];

  const [quantities, setQuantities] = useState({});
  const [orderPlaced, setOrderPlaced] = useState(false);

  const handleAdd = (index) => {
    setQuantities((prev) => ({
      ...prev,
      [index]: (prev[index] || 0) + 1,
    }));
  };

  const handleRemove = (index) => {
    setQuantities((prev) => {
      const updated = { ...prev };
      if (updated[index] > 1) {
        updated[index] -= 1;
      } else {
        delete updated[index];
      }
      return updated;
    });
  };

  const { totalItems, totalPrice } = useMemo(() => {
    let totalItems = 0;
    let totalPrice = 0;

    Object.entries(quantities).forEach(([indexStr, quantity]) => {
      const index = parseInt(indexStr, 10);
      const item = menu[index];
      if (item) {
        totalItems += quantity;
        totalPrice += item.price * quantity;
      }
    });

    return { totalItems, totalPrice };
  }, [quantities, menu]);

  return (
    <div className="container my-4">
      <h2 className="mb-4 text-success">{decodedName}</h2>

      <div className="row">
        {/* Left: Food Items */}
        <div className="col-md-8">
          <div className="row">
            {menu.map((item, index) => (
              <div key={index} className="col-md-6 mb-4">
                <div className="card h-100 shadow-sm">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="card-img-top"
                    style={{ height: "180px", objectFit: "cover" }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{item.name}</h5>
                    <p className="card-text">{item.description}</p>
                    <p className="fw-bold text-success">₹{item.price}</p>
                    {item.bestSeller && (
                      <span className="badge bg-warning text-dark me-2">
                        🌟 Best Seller
                      </span>
                    )}
                    {item.rating && (
                      <span className="text-muted">⭐ {item.rating}</span>
                    )}

                    <div className="mt-3">
                      {quantities[index] ? (
                        <div className="d-flex align-items-center">
                          <button
                            className="btn btn-outline-danger btn-sm"
                            onClick={() => handleRemove(index)}
                          >
                            −
                          </button>
                          <span className="mx-2 fw-bold">{quantities[index]}</span>
                          <button
                            className="btn btn-outline-success btn-sm"
                            onClick={() => handleAdd(index)}
                          >
                            +
                          </button>
                        </div>
                      ) : (
                        <button
                          className="btn btn-outline-success"
                          onClick={() => handleAdd(index)}
                        >
                          ADD
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Bill Summary */}
        <div className="col-md-4">
          {totalItems > 0 && (
            <div
              className="sticky-top p-4 border rounded bg-light shadow-sm"
              style={{ top: "100px" }}
            >
              <h4 className="text-success">🧾 Bill Summary</h4>
              <hr />
              <p>
                Total Items: <strong>{totalItems}</strong>
              </p>
              <p>
                Total Price: <strong>₹{totalPrice}</strong>
              </p>
              <button
                className="btn btn-success w-100 mt-3"
                onClick={() => setOrderPlaced(true)}
              >
                Proceed
              </button>

              {orderPlaced && (
                <div className="alert alert-success mt-3" role="alert">
                  ✅ Order placed successfully!
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default KitchenDetails;
