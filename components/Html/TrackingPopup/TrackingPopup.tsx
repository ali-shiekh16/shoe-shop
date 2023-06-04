import { gql, useQuery } from "@apollo/client";
import s from "./popup.module.scss";
import { IoClose } from "react-icons/io5";
import { useSnapshot } from "valtio";
import { store } from "@/store";
import { useState } from "react";
import { BiCurrentLocation } from "react-icons/bi";

const GET_TRACKING_DATA = gql`
  query filterOrder($email: String) {
    orders(where: { email: $email }) {
      id
      productName
      price
      trackingId
      courierCompany
      statues
    }
  }
`;

type dataType = {
  id: string;
  productName: string;
  price: string;
  trackingId: string;
  courierCompany: string;
  statues: string;
};

const TrackingPopup = () => {
  const { user } = useSnapshot(store);

  const { loading, error, data } = useQuery(GET_TRACKING_DATA, {
    variables: { email: user?.email },
  });

  const [active, setActive] = useState<boolean>(false);

  return (
    <>
      <button onClick={() => setActive(true)} className={s.button}>
        <BiCurrentLocation />
      </button>
      <div data-active={active} className={s.main}>
        <IoClose onClick={() => setActive(false)} />
        <h1>Track Your Order</h1>
        <div className={s.main_cover}>
          <div className={s.card}>
            <h3>Product</h3>
            <h3>Price</h3>
            <h3>Tracking ID</h3>
            <h3>Courier Company</h3>
            <h3>Status</h3>
          </div>
          {loading ? (
            <div>
              <h2>Please wait loading..</h2>
            </div>
          ) : (
            data.orders.map((e: dataType) => {
              return (
                <div key={e.id} className={s.card}>
                  <p>{e.productName}</p>
                  <p>$ {e.price}</p>
                  <p>
                    {e.trackingId
                      ? e.trackingId
                      : "Please wait to ship your order."}
                  </p>
                  <p>{e.courierCompany ? e.courierCompany : ""}</p>
                  <p>{e.statues}</p>
                </div>
              );
            })
          )}
        </div>
      </div>
    </>
  );
};

export default TrackingPopup;
