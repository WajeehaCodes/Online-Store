import React, { useEffect } from "react";
import "../../styles/terms.css";

const ExchangePolicy = () => {
  useEffect(() => {
    document.documentElement.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="container main-content terms-of-services feature">
      <h2 className="text-center">Exchange Policy</h2>
      <p>
        At our book store, we want you to be completely satisfied with your
        purchase. If you are not happy with an item that you have purchased, you
        may return it for a full refund or exchange within 30 days of the
        original purchase date.
      </p>
      <p>
        To be eligible for a return or exchange, the item must be in its
        original condition, with the original packaging and receipts. Books must
        be unopened and in their original shrink wrap.
      </p>
      <p>
        If you would like to make a return or exchange, please bring the item(s)
        to our store or contact us for instructions on how to mail the item(s)
        back to us.
      </p>
      <p>
        We reserve the right to refuse any returns or exchanges that do not meet
        the above criteria.
      </p>
    </div>
  );
};

export default ExchangePolicy;
