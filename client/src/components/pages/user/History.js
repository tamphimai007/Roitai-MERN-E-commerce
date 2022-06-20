import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import MenubarUser from "../../layouts/MenubarUser";
import { getOrders } from "../../functions/users";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFDownloadLink,
} from "@react-pdf/renderer";

import Invoice from "../../order/Invoice";
import InvoiceJsPDF from '../../order/InvoiceJsPDF'

const History = () => {
  const { user } = useSelector((state) => ({ ...state }));

  const [orders, setOrders] = useState([]);
  useEffect(() => {
    //code
    loadData();
  }, []);

  const loadData = () => {
    getOrders(user.token).then((res) => setOrders(res.data));
  };


  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <MenubarUser />
        </div>

        <div className="col text-center">
          <div className="row">
            <h1>History Page User</h1>
            {/* 1 Loop Order Card */}
            {orders.map((item, index) => {
              console.log("item", item);
              return (
                <div key={index} className="card m-3">
                  <p>Order {"   " + item.orderstatus}</p>
                  {/* Table */}
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <td>Title</td>
                        <td>Price</td>
                        <td>Count</td>
                      </tr>
                    </thead>
                    {/* 2 Loop Table */}
                    {item.products.map((p, i) => (
                      <tr>
                        <td>{p.product.title}</td>
                        <td>{p.price}</td>
                        <td>{p.count}</td>
                      </tr>
                    ))}
                    <tr>
                      <td colSpan={3}>
                        ราคาสุทธิ:{" "}
                        <b>
                          <u>{item.cartTotal}</u>
                        </b>
                      </td>
                    </tr>
                  </table>
                  {/* Table */}

                  {/*  PDF*/}
                  <div className="row">
                    <div className="col">
                      <PDFDownloadLink
                        document={<Invoice order={item} />}
                        fileName="invoice.pdf"
                        className="btn btn-primary m-1"
                      >
                        PDF DownLoad
                      </PDFDownloadLink>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col">
                      <InvoiceJsPDF order={item}/>
                    </div>
                  </div>


                </div>

              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default History;
