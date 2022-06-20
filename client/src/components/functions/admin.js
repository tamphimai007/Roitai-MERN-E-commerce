import axios from "axios";

export const updateStatusOrder = async (authtoken, orderId, orderstatus) =>
  await axios.put(
    process.env.REACT_APP_API + "/admin/order-status",
    { orderId, orderstatus },
    {
      headers: {
        authtoken,
      },
    }
  );
export const getOrdersAdmin = async (authtoken) => {
    return await axios.get(process.env.REACT_APP_API + "/admin/orders", {
      headers: {
        authtoken,
      },
    });
  };
