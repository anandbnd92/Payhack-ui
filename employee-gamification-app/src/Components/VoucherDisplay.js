import React from "react";

const vouchers = [
  { threshold: 100, label: "Amazon Voucher", value: 10 },
  { threshold: 200, label: "Flipkart Voucher", value: 20 },
  { threshold: 300, label: "Edureka Voucher", value: 30 },
];

const VoucherDisplay = () => {
  const totalAmount = localStorage.getItem("total_amount");
  console.log("total_amount", totalAmount);
  const availableVouchers = vouchers.filter(
    (voucher) => totalAmount >= voucher.threshold
  );

  return (
    <div>
      {availableVouchers.map((voucher, index) => (
        <div
          key={index}
          style={{
            margin: "10px 0",
            padding: "10px",
            border: "1px solid #ccc",
          }}
        >
          Congratulations! You have earned a {voucher.label} worth $
          {voucher.value}
        </div>
      ))}
    </div>
  );
};

export default VoucherDisplay;
