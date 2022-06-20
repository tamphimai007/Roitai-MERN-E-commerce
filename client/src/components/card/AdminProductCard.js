// rafce
import React from "react";
import { Card } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Link } from 'react-router-dom'


const { Meta } = Card;

const AdminProductCard = ({ product, handleRemove }) => {
  console.log(product);
  const { _id, title, description, images } = product;

  return (
    <Card
      hoverable
      cover={
        <img
          className="p-1"
          style={{ height: "150px", objectFit: "cover" }}
          alt="example"
          src={images && images.length ? images[0].url : ""}
        />
      }
      actions={[
        <Link to={'/admin/update-product/'+_id}>
        <EditOutlined className="text-warning" />
        </Link>
        ,
        <DeleteOutlined
          onClick={() => handleRemove(_id)}
          className="text-danger"
        />,
      ]}
    >
      <Meta title={title} description={description} />
    </Card>
  );
};

export default AdminProductCard;
