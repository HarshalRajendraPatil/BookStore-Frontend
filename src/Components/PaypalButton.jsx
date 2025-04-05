import { useEffect, useRef } from "react";

const PaypalButton = ({ amount, onSuccess }) => {
  const paypalRef = useRef(null);

  useEffect(() => {
    if (window.paypal && paypalRef.current) {
      // Clear previous PayPal button if any
      paypalRef.current.innerHTML = "";

      window.paypal
        .Buttons({
          style: {
            layout: "vertical",
            color: "gold",
            shape: "rect",
            label: "paypal",
          },
          createOrder: (data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: amount.toString(),
                  },
                },
              ],
            });
          },
          onApprove: async (data, actions) => {
            const order = await actions.order.capture();
            onSuccess(order);
          },
          onError: (err) => {
            console.error("PayPal Checkout onError", err);
            alert("❌ Payment failed.");
          },
        })
        .render(paypalRef.current);
    }
  }, [amount, onSuccess]);

  return <div ref={paypalRef}></div>;
};

export default PaypalButton;
