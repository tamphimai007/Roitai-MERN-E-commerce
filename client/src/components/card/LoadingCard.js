import React from "react";
import { Skeleton, Card } from "antd";

const LoadingCard = ({count}) => {

    const LoobCard = ()=>{
        let cards = []
        for (let i =0; i< count;i++){
            cards.push(<Card className="col-md-4">
            <Skeleton active />
          </Card>)
        }
        return cards

    }

  return (
    <>
      <div className="row pb-5">
        {LoobCard()}
      </div>
    </>
  );
};

export default LoadingCard;
