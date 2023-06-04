import { useState } from "react";
import s from "./popup.module.scss";
import { IoClose } from "react-icons/io5";
import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { PaymentMethod, StripeError } from "@stripe/stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useSnapshot } from "valtio";
import { store } from "@/store";

export const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

type props = {
  setIsPopupOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsWallOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isPopupOpen: boolean;
};

type formprops = {
  setIsPopupOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsWallOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Form: React.FC<formprops> = ({ setIsWallOpen, setIsPopupOpen }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useSnapshot(store);

  const handleClick = async () => {
    try {
      const paymentMethod = await stripe?.createPaymentMethod({
        type: "card",
        card: elements?.getElement("card")!,
      });

      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: user?.name,
          email: user?.email,
          paymentMethod: paymentMethod?.paymentMethod?.id,
        }),
      });

      if (!response.ok) return alert("Payment Unsuccessful");
      const data = await response.json();
      const confirm = await stripe?.confirmCardPayment(data.clientSecret);
      if (confirm?.error) return alert("Payment Unsuccessful");
      alert("Payment Successful Active");
      alert("Now You Access Lock Area");
      setIsWallOpen(true);
      setIsPopupOpen(false);
    } catch (error) {
      alert(`Payment Failed`);
      console.log(error);
    }
  };
  return (
    <>
      <CardElement />
      <button onClick={handleClick}>Buy Now - $ 10</button>
    </>
  );
};

const SubscriptionPopup: React.FC<props> = ({
  setIsPopupOpen,
  isPopupOpen,
  setIsWallOpen,
}) => {
  return (
    <div data-active={isPopupOpen} className={s.main}>
      <IoClose onClick={() => setIsPopupOpen(false)} />
      <h1>Buy Subscription Plan To Unlock Area</h1>
      <h2>Premium Plan</h2>
      <ul>
        <li>Fake point 1000</li>
        <li>All Unlocked Item</li>
        <li>Nothing everything free</li>
      </ul>
      <Elements stripe={stripePromise}>
        <Form setIsWallOpen={setIsWallOpen} setIsPopupOpen={setIsPopupOpen} />
      </Elements>
    </div>
  );
};

export default SubscriptionPopup;
