import React, { useState } from 'react';
import dosaImg from './assets/dosa.jpg';
import idliImg from './assets/idli.jpg';
import pooriImg from './assets/poori.jpg';
import comboImg from './assets/combo.jpg';
import vegThaliImg from './assets/vegthali.jpg';
import deluxeImg from './assets/deluxe.jpg';
import chappatiImg from './assets/chappati.jpg';
import parottaImg from './assets/parotta.jpg';

const mealData = {
  breakfast: [
    { name: 'Executive', price: 99, original: 109, img: dosaImg, menu: ['Idli', 'Vada', 'Sambar', 'Chutney'] },
    { name: 'Classic', price: 109, original: 129, img: idliImg, menu: ['Pongal', 'Medu Vada', 'Filter Coffee'] },
    { name: 'Exclusive', price: 129, original: 149, img: pooriImg, menu: ['Masala Dosa', 'Uttapam', 'Chutneys'] },
    { name: 'Breakfast & Lunch', price: 209, original: 229, img: comboImg, menu: ['Idli', 'Sambar Rice', 'Poriyal', 'Curd Rice'] },
  ],
  lunch: [
    { name: 'Veg Feast', price: 149, original: 169, img: vegThaliImg, menu: ['Sambar', 'Rasam', 'Poriyal', 'Curd', 'Papad'] },
    { name: 'Non-Veg Classic', price: 189, original: 209, img: deluxeImg, menu: ['Chicken Curry', 'Rice', 'Salad', 'Sweet'] },
  ],
  dinner: [
    { name: 'Light Meal', price: 119, original: 139, img: chappatiImg, menu: ['Chapati', 'Kurma', 'Curd Rice'] },
    { name: 'Full Dinner', price: 159, original: 179, img: parottaImg, menu: ['Parotta', 'Chicken Gravy', 'Sweet', 'Curd'] },
  ],
};

const healthIssuesList = ['Low Pressure', 'High Pressure', 'Sugar', 'Blood Pressure', 'Diabetes', 'Obesity', 'None'];

const Subscribe = () => {
  const [mealType, setMealType] = useState('breakfast');
  const [quantities, setQuantities] = useState({});
  const [activeItem, setActiveItem] = useState(null);
  const [openMenus, setOpenMenus] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [packageDuration, setPackageDuration] = useState('');
  const [healthIssues, setHealthIssues] = useState([]);
  const [suggestion, setSuggestion] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [foodCategory, setFoodCategory] = useState('');
  const [cuisineStyle, setCuisineStyle] = useState('');

  const handleQty = (itemName, delta) => {
    setQuantities((prev) => {
      const newQty = Math.max(0, (prev[itemName] || 0) + delta);
      if (newQty > 0) setActiveItem(itemName);
      else setActiveItem(null);
      return { ...prev, [itemName]: newQty };
    });
  };

  const toggleMenu = (itemName) => {
    setOpenMenus((prev) => ({
      ...prev,
      [itemName]: !prev[itemName],
    }));
  };

  const resetSelection = () => {
    setQuantities({});
    setActiveItem(null);
    setShowForm(false);
    setPackageDuration('');
    setHealthIssues([]);
    setSuggestion('');
    setFoodCategory('');
    setCuisineStyle('');
    setSubscribed(false);
  };

  const handleHealthChange = (value) => {
    setHealthIssues((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const canSubscribe =
    packageDuration &&
    healthIssues.length > 0 &&
    suggestion.trim() &&
    foodCategory &&
    cuisineStyle;

  const selectedMeals = mealData[mealType];
  const subtotal = selectedMeals.reduce((total, item) => {
    const qty = quantities[item.name] || 0;
    return total + qty * item.price;
  }, 0);

  return (
    <div style={{ width: '100vw', minHeight: '100vh', backgroundColor: '#f5f5f5', padding: '20px 0' }}>
      <h1 style={{ textAlign: 'center', color: 'green', fontSize: '22px', fontWeight: 'bold', marginBottom: '30px' }}>
        SUBSCRIBE - EAT - REPEAT
      </h1>

      <div style={styles.wrapper}>
        <div style={styles.left}>
          <div style={styles.heading}>
            <h2 style={styles.headingText}>
              CHOOSE YOUR <span style={{ color: '#fff' }}>MEAL TIME AND COMBO</span>
            </h2>
          </div>

          <div style={styles.tabs}>
            {['breakfast', 'lunch', 'dinner'].map((meal) => (
              <button
                key={meal}
                style={{
                  ...styles.tab,
                  backgroundColor: mealType === meal ? '#008000' : '#f0f0f0',
                  color: mealType === meal ? '#fff' : '#333',
                }}
                onClick={() => setMealType(meal)}
                disabled={activeItem !== null}
              >
                {meal.charAt(0).toUpperCase() + meal.slice(1)}
                <span style={styles.tabCount}> {mealData[meal].length}</span>
              </button>
            ))}
          </div>

          {selectedMeals.map((item) => {
            const isDisabled = activeItem && activeItem !== item.name;
            return (
              <div key={item.name} style={{ ...styles.card, opacity: isDisabled ? 0.5 : 1 }}>
                <img src={item.img} alt={item.name} style={styles.img} />
                <div style={styles.info}>
                  <strong style={{ fontSize: '14px' }}>{item.name}</strong>
                  <div style={{ fontSize: '13px' }}>
                    ₹{item.price}/Meal <span style={styles.strike}>₹{item.original}/Meal</span>
                  </div>
                </div>
                {quantities[item.name] > 0 ? (
                  <div style={styles.qtyBox}>
                    <button onClick={() => handleQty(item.name, -1)} style={styles.qtyBtn}>-</button>
                    <div style={styles.qtyDisplay}>{quantities[item.name]}</div>
                    <button onClick={() => handleQty(item.name, 1)} style={styles.qtyBtn}>+</button>
                  </div>
                ) : (
                  <button
                    onClick={() => handleQty(item.name, 1)}
                    style={styles.addBtn}
                    disabled={isDisabled}
                  >
                    Add Quantity +
                  </button>
                )}
                <button
                  style={styles.viewBtn}
                  onClick={() => toggleMenu(item.name)}
                  disabled={isDisabled}
                >
                  {openMenus[item.name] ? 'Hide Menu' : 'View Menu >'}
                </button>

                {openMenus[item.name] && (
                  <div style={styles.menuBox}>
                    <strong>Today's Menu:</strong>
                    <ul style={{ marginTop: '4px', fontSize: '13px' }}>
                      {item.menu.map((dish, idx) => (
                        <li key={idx}>{dish}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            );
          })}

          {activeItem && (
            <button style={styles.resetBtn} onClick={resetSelection}>
              Reset Selection
            </button>
          )}
        </div>

        <div style={styles.right}>
          <h3 style={{ fontSize: '16px' }}>Your Subscription Details</h3>
          <p style={styles.p}><strong>Meal Combo:</strong> {mealType.charAt(0).toUpperCase() + mealType.slice(1)}</p>
          <p style={styles.p}><strong>Sub total:</strong> ₹{subtotal}</p>
          {!showForm && (
            <button style={styles.selectBtn} disabled={!activeItem} onClick={() => setShowForm(true)}>
              Select Days
            </button>
          )}

          {showForm && (
            <div style={{ marginTop: '20px' }}>
              <label><strong>Choose Package:</strong></label>
              <select style={styles.input} value={packageDuration} onChange={(e) => setPackageDuration(e.target.value)}>
                <option value="">Select</option>
                <option value="1week">1 Week</option>
                <option value="2weeks">2 Weeks</option>
                <option value="1month">1 Month</option>
                <option value="2months">2 Months</option>
              </select>

              <label><strong>Food Category:</strong></label>
              <select style={styles.input} value={foodCategory} onChange={(e) => setFoodCategory(e.target.value)}>
                <option value="">Select</option>
                <option value="Veg">Veg</option>
                <option value="Non-Veg">Non-Veg</option>
              </select>

              <label><strong>Cuisine Style:</strong></label>
              <select style={styles.input} value={cuisineStyle} onChange={(e) => setCuisineStyle(e.target.value)}>
                <option value="">Select</option>
                <option value="Tamil Nadu">Tamil Nadu</option>
                <option value="Karnataka">Karnataka</option>
                <option value="Andhra">Andhra</option>
                <option value="Kerala">Kerala</option>
              </select>

              <div style={{ margin: '10px 0' }}>
                <strong>Any Health Issues?</strong>
                {healthIssuesList.map((issue) => (
                  <div key={issue}>
                    <label style={{ fontSize: '13px' }}>
                      <input
                        type="checkbox"
                        value={issue}
                        checked={healthIssues.includes(issue)}
                        onChange={() => handleHealthChange(issue)}
                      />
                      {' '}{issue}
                    </label>
                  </div>
                ))}
              </div>

              <label><strong>Your Suggestions for Cooking to the Chef:</strong></label>
              <textarea
                style={{ ...styles.input, height: '70px', fontSize: '13px' }}
                value={suggestion}
                onChange={(e) => setSuggestion(e.target.value)}
                placeholder="Type here..."
              />

              <button
                style={{ ...styles.selectBtn, backgroundColor: canSubscribe ? '#008000' : 'gray' }}
                disabled={!canSubscribe}
                onClick={() => setSubscribed(true)}
              >
                Subscribe
              </button>

              {subscribed && <p style={{ color: 'green', fontWeight: 'bold', marginTop: '10px', textAlign: 'center' }}>Your Subscription is confirmed!!!</p>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const styles = {
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    height: 'calc(100vh - 80px)',
    padding: '20px',
    boxSizing: 'border-box',
    justifyContent: 'space-between',
    backgroundColor: '#f8f8f8',
  },
  left: {
    flex: '1 1 65%',
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '10px',
    marginRight: '20px',
    boxShadow: '0 0 8px rgba(0,0,0,0.1)',
    overflowY: 'auto',
  },
  right: {
    flex: '1 1 30%',
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 0 8px rgba(0,0,0,0.1)',
    fontSize: '14px',
    overflowY: 'auto',
  },
  heading: {
    backgroundColor: '#008000',
    padding: '12px',
    borderRadius: '10px',
    marginBottom: '20px',
  },
  headingText: {
    color: '#fff',
    margin: 0,
    fontSize: '16px',
    textAlign: 'center',
  },
  tabs: {
    display: 'flex',
    gap: '10px',
    marginBottom: '20px',
  },
  tab: {
    border: 'none',
    padding: '8px 14px',
    borderRadius: '20px',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '13px',
  },
  tabCount: {
    background: '#fff',
    color: '#008000',
    marginLeft: '5px',
    padding: '2px 6px',
    borderRadius: '10px',
    fontSize: '11px',
  },
  card: {
    border: '1px solid #ddd',
    borderRadius: '10px',
    padding: '12px',
    marginBottom: '15px',
    fontSize: '13px',
  },
  img: {
    width: '60px',
    height: '60px',
    borderRadius: '8px',
  },
  info: {
    marginLeft: '10px',
  },
  strike: {
    textDecoration: 'line-through',
    color: '#888',
    fontSize: '12px',
    marginLeft: '5px',
  },
  addBtn: {
    backgroundColor: '#008000',
    color: '#fff',
    border: 'none',
    padding: '6px 10px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '13px',
  },
  viewBtn: {
    marginTop: '8px',
    background: 'none',
    border: 'none',
    color: '#007BFF',
    cursor: 'pointer',
    fontSize: '13px',
  },
  menuBox: {
    marginTop: '10px',
    backgroundColor: '#f0f0f0',
    padding: '10px',
    borderRadius: '8px',
    fontSize: '13px',
  },
  qtyBox: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginTop: '10px',
  },
  qtyBtn: {
    backgroundColor: '#008000',
    color: '#fff',
    border: 'none',
    padding: '4px 8px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
  },
  qtyDisplay: {
    fontWeight: 'bold',
    fontSize: '14px',
  },
  resetBtn: {
    marginTop: '20px',
    backgroundColor: '#ff4d4d',
    color: '#fff',
    border: 'none',
    padding: '8px 14px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '13px',
  },
  selectBtn: {
    marginTop: '20px',
    backgroundColor: '#008000',
    color: '#fff',
    border: 'none',
    padding: '8px 14px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '13px',
  },
  input: {
    width: '100%',
    marginTop: '6px',
    marginBottom: '12px',
    padding: '8px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    boxSizing: 'border-box',
    fontSize: '13px',
  },
  p: {
    fontSize: '13px',
    margin: '6px 0',
  },
};

export default Subscribe;