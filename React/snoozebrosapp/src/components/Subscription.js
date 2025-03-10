import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Subscription = () => {
  const [selectedPlan, setSelectedPlan] = useState("");

  const plans = [
    { name: "Basic", price: "$8.99", quality: "Good", resolution: "720p" },
    { name: "Standard", price: "$13.99", quality: "Better", resolution: "1080p" },
    { name: "Premium", price: "$17.99", quality: "Best", resolution: "4K + HDR" },
  ];

  const handleSelectPlan = (plan) => {
    setSelectedPlan(plan);
  };

  const handleContinue = () => {
    if (selectedPlan) {
      alert(`You selected the ${selectedPlan} plan!`);
    } else {
      alert("Please select a plan!");
    }
  };

  return (
    <div className="container text-center vh-100 d-flex flex-column justify-content-center">
      <h2 className="mb-4">Choose the plan that’s right for you</h2>

      <div className="row justify-content-center">
        {plans.map((plan, index) => (
          <div
            key={index}
            className={`col-md-3 m-2 p-4 border rounded ${
              selectedPlan === plan.name ? "border-danger" : "border-secondary"
            }`}
            style={{
              cursor: "pointer",
              background: selectedPlan === plan.name ? "#ffe6e6" : "#f8f9fa",
            }}
            onClick={() => handleSelectPlan(plan.name)}
          >
            <h4 className="fw-bold">{plan.name}</h4>
            <h5>{plan.price} / month</h5>
            <p>{plan.quality} Video Quality</p>
            <p>{plan.resolution} Resolution</p>
          </div>
        ))}
      </div>

      <button
        className="btn btn-danger mt-4 px-5"
        onClick={handleContinue}
        disabled={!selectedPlan}
      >
        Continue
      </button>
    </div>
  );
};

export default Subscription;
