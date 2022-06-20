import axios from "axios";

export const createProduct = async (authtoken, value) => {
  return await axios.post(process.env.REACT_APP_API + "/product", value, {
    headers: {
      authtoken,
    },
  });
};

export const listProduct = async (count) =>
  await axios.get(process.env.REACT_APP_API + "/product/" + count);

export const removeProduct = async (authtoken, id) =>
  await axios.delete(process.env.REACT_APP_API + "/product/" + id, {
    headers: {
      authtoken,
    },
  });

// update
export const readProduct = async (id) =>
  await axios.get(process.env.REACT_APP_API + "/products/" + id);

export const updateProduct = async (authtoken, id, product) =>
  await axios.put(process.env.REACT_APP_API + "/product/" + id, product, {
    headers: {
      authtoken,
    },
  });

export const listProductBy = async (sort, order, limit) =>
  await axios.post(process.env.REACT_APP_API + "/productby", {
    sort,
    order,
    limit,
  });

export const searchFilters = async (arg) =>
  await axios.post(process.env.REACT_APP_API + "/search/filters", arg);
