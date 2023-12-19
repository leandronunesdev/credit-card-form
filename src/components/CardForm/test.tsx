import React, { useState } from "react";

const PaymentComponent = () => {
  const [paymentRequest, setPaymentRequest] = useState(null);

  const initializePaymentRequest = () => {
    const supportedPaymentMethods = [
      {
        supportedMethods: "basic-card",
        data: {
          supportedNetworks: ["visa", "mastercard"],
        },
      },
    ];

    const paymentDetails = {
      total: {
        label: "Total",
        amount: {
          currency: "USD",
          value: "10.00",
        },
      },
    };

    const request = new PaymentRequest(supportedPaymentMethods, paymentDetails);

    setPaymentRequest(request);

    return request;
  };

  const handlePayment = async () => {
    const request = initializePaymentRequest();

    try {
      const paymentResponse = await request.show();

      // Handle the payment response as needed
      console.log("Payment response:", paymentResponse);

      // Complete the payment (this is required to close the payment sheet)
      await paymentResponse.complete("success");
    } catch (error) {
      console.error("Payment request failed:", error);
    }
  };

  return (
    <div>
      <h1>Payment Request</h1>
      <button onClick={handlePayment}>Make Payment</button>
    </div>
  );
};

export default PaymentComponent;
