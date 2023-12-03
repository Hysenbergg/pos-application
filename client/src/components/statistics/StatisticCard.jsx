import React from "react";

const StatisticCard = ({title, amount, image}) => {
  return (
    <div className="card-item bg-gray-800 p-8 rounded-lg">
      <div className="flex gap-x-4">
        <div className="bg-white w-16 h-16 rounded-full p-3">
          <img src={image} alt="" />
        </div>
        <div className="text-white">
          <p className="mb-2 text-lg font-medium text-gray-400">
            {title}
          </p>
          <p className="text-gray-200 text-lg font-semibold">{amount}</p>
        </div>
      </div>
    </div>
  );
};

export default StatisticCard;
