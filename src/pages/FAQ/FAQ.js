import React, { useEffect } from "react";
export default function FAQ() {
  useEffect(() => {
    document.documentElement.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  return (
    <div
      className="container my-4 feature"
      style={{ padding: "3rem 0", fontFamily: "sans-serif" }}
    >
      <div className="container ml-5 my-3">
        <h2 style={{ fontFamily: "sans-serif" }}>Frequently Asked Questions</h2>
      </div>

      <div class="container py-3">
        <div class="row">
          <div class="col-10 mx-auto">
            <div class="accordion" id="faqExample">
              <div class="card" style={{ border: "1px solid #434445" }}>
                <div
                  class="card-header p-2"
                  id="headingOne"
                  style={{
                    background: "#F2F1F0",
                  }}
                >
                  <h5 class="mb-0">
                    <button
                      style={{
                        background: "0",
                        border: "0px",
                        color: "#343a40",
                      }}
                      class="btn btn-link"
                      type="button"
                      data-toggle="collapse"
                      data-target="#collapseOne"
                      aria-expanded="true"
                      aria-controls="collapseOne"
                    >
                      Question: What are the services do you offer?
                    </button>
                  </h5>
                </div>

                <div
                  id="collapseOne"
                  class="collapse show"
                  aria-labelledby="headingOne"
                  data-parent="#faqExample"
                >
                  <div class="card-body">
                    Customers can search for specific books or browse through
                    the bookstore's selection of titles by category, author, or
                    genre. Customers can place an order for a book, either for
                    delivery or for pickup at a local store.
                  </div>
                </div>
              </div>
              <div class="card" style={{ border: "1px solid #434445" }}>
                <div
                  class="card-header p-2"
                  id="headingTwo"
                  style={{
                    background: "#F2F1F0",
                  }}
                >
                  <h5 class="mb-0">
                    <button
                      style={{
                        background: "0",
                        border: "0px",
                        color: "#343a40",
                      }}
                      class="btn btn-link collapsed"
                      type="button"
                      data-toggle="collapse"
                      data-target="#collapseTwo"
                      aria-expanded="false"
                      aria-controls="collapseTwo"
                    >
                      Question: What are our preferred method of payment?
                    </button>
                  </h5>
                </div>
                <div
                  id="collapseTwo"
                  class="collapse"
                  aria-labelledby="headingTwo"
                  data-parent="#faqExample"
                >
                  <div class="card-body">
                    We accept all leading payment services of Pakistan i.e.
                    credit/debit cards and Easy Pay etc. Easypay offers you: Pay
                    via mobile account, Pay via Easypaisa Shop, and Pay via
                    Credit/Debit Card.
                  </div>
                </div>
              </div>
              <div class="card" style={{ border: "1px solid #434445" }}>
                <div
                  class="card-header p-2"
                  id="headingThree"
                  style={{
                    background: "#F2F1F0",
                  }}
                >
                  <h5 class="mb-0">
                    <button
                      style={{
                        background: "0",
                        border: "0px",
                        color: "#343a40",
                      }}
                      class="btn btn-link collapsed"
                      type="button"
                      data-toggle="collapse"
                      data-target="#collapseThree"
                      aria-expanded="false"
                      aria-controls="collapseThree"
                    >
                      Question: What if, I placed an order and later change my
                      mind, can I cancel my order?
                    </button>
                  </h5>
                </div>
                <div
                  id="collapseThree"
                  class="collapse"
                  aria-labelledby="headingThree"
                  data-parent="#faqExample"
                >
                  <div class="card-body">
                    Yes! You can cancel your order within twenty four (24) hours
                    of placing. Once this time may elapsed, then you can ask for
                    refund, only.
                  </div>
                </div>
              </div>
              <div class="card" style={{ border: "1px solid #434445" }}>
                <div
                  class="card-header p-2"
                  id="headingThree"
                  style={{
                    background: "#F2F1F0",
                  }}
                >
                  <h5 class="mb-0">
                    <button
                      style={{
                        background: "0",
                        border: "0px",
                        color: "#434445",
                      }}
                      class="btn btn-link collapsed"
                      type="button"
                      data-toggle="collapse"
                      data-target="#collapseFour"
                      aria-expanded="false"
                      aria-controls="collapseThree"
                    >
                      Question: Do you ensure secure transactions?
                    </button>
                  </h5>
                </div>
                <div
                  id="collapseFour"
                  class="collapse"
                  aria-labelledby="headingThree"
                  data-parent="#faqExample"
                >
                  <div class="card-body">
                    Yes for sure, we have integrated state of the art secure
                    transaction procedure. And have also made it sure that your
                    personal information may not leak out from any database.
                  </div>
                </div>
              </div>

              <div
                className="card feature"
                style={{ border: "1px solid #434445" }}
              >
                <div
                  class="card-header p-2"
                  id="headingThree"
                  style={{
                    background: "#F2F1F0",
                  }}
                >
                  <h5 class="mb-0">
                    <button
                      style={{
                        background: "0",
                        border: "0px",
                        color: "#343a40",
                      }}
                      class="btn btn-link collapsed"
                      type="button"
                      data-toggle="collapse"
                      data-target="#collapseFour"
                      aria-expanded="false"
                      aria-controls="collapseThree"
                    >
                      Question: I have some more questions. What do I do?
                    </button>
                  </h5>
                </div>
                <div
                  id="collapseFour"
                  class="collapse"
                  aria-labelledby="headingThree"
                  data-parent="#faqExample"
                >
                  <div class="card-body">
                    Our customer services team is always there to support you.
                    Please feel free to contact us via “Contact Us” page.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <!--/row--> */}
      </div>
    </div>
  );
}
