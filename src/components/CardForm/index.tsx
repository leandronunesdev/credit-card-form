// Import necessary libraries
import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import axios from "axios";

// Define the data structure for credit card
interface CreditCard {
  id: number;
  cardNumber: string;
  expirationDate: string;
  cvv: string;
  cardName: string;
}

// Define your React component
const CreditCardComponent: React.FC = () => {
  const [creditCardData, setCreditCardData] = useState<CreditCard[]>([]);
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: "",
    expirationDate: "",
    cvv: "",
    cardName: "",
    value: 0,
  });

  useEffect(() => {
    // Fetch initial credit card data
    fetchCreditCardData();
  }, []);

  const fetchCreditCardData = () => {
    // Make a GET request to the fake API endpoint
    axios
      .get<CreditCard[]>(
        "https://1e2b-2804-14c-87c1-cf4b-00-1003.ngrok-free.app/creditCardData",
        {
          headers: {
            "ngrok-skip-browser-warning": true,
          },
        }
      )
      .then((response) => {
        setCreditCardData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching credit card data:", error);
      });
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPaymentDetails({
      ...paymentDetails,
      [e.target.name]: e.target.value,
    });
    console.log(paymentDetails);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // Make a POST request to the fake API endpoint
    axios
      .post<CreditCard>(
        "https://1e2b-2804-14c-87c1-cf4b-00-1003.ngrok-free.app/creditCardData",
        { ...paymentDetails, value: +paymentDetails.value },
        {
          headers: {
            "ngrok-skip-browser-warning": true,
          },
        }
      )
      .then((response) => {
        setCreditCardData([...creditCardData, response.data]);
        setPaymentDetails({
          cardNumber: "",
          expirationDate: "",
          cvv: "",
          cardName: "",
          value: 0,
        });
      })
      .catch((error) => {
        console.error("Error submitting credit card data:", error);
      });
  };

  return (
    <div>
      <h1>Credit Card Data</h1>

      {/* Form to submit mock credit card data */}
      <form onSubmit={handleSubmit} method="POST">
        <label>
          Card Number:
          <input
            type="text"
            name="cardNumber"
            value={paymentDetails.cardNumber}
            onChange={handleInputChange}
            required
          />
        </label>
        <br />

        <label>
          Expiration Date:
          <input
            type="text"
            name="expirationDate"
            value={paymentDetails.expirationDate}
            onChange={handleInputChange}
            required
          />
        </label>
        <br />

        <label>
          CVV:
          <input
            type="text"
            name="cvv"
            value={paymentDetails.cvv}
            onChange={handleInputChange}
            required
          />
        </label>
        <br />

        <label>
          Card Name:
          <input
            type="text"
            name="cardName"
            value={paymentDetails.cardName}
            onChange={handleInputChange}
            required
          />
        </label>
        <br />

        <label>
          Value:
          <input
            type="number"
            name="value"
            value={paymentDetails.value}
            onChange={handleInputChange}
            required
          />
        </label>
        <br />

        <button type="submit">Submit</button>
      </form>

      {/* Display the fetched credit card data */}
      <ul>
        {creditCardData.map((card) => (
          <li key={card.id}>
            Card Number: {card.cardNumber}
            <br />
            Expiration Date: {card.expirationDate}
            <br />
            CVV: {card.cvv}
            <br />
            Card Name: {card.cardName}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CreditCardComponent;
