import React, { useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { color } from "../../../assets/css/color/color";
import AEButton from "../../AEButton";
import "./index.css";
import { useDispatch, useSelector } from "react-redux";
import { buyPlan, getPlansList } from "../../../store/slice/subscription";
export default function PlanDialog(props) {
  const { show, handleClose } = props;
  const dispatch = useDispatch();
  const { planListData } = useSelector((state) => state.subscription);
  useEffect(() => {
    dispatch(getPlansList());
  }, []);
  const handlePurchasePlan = (id) => {
    dispatch(buyPlan(id));
  };
  return (
    <>
      <Modal size="xl" show={show} onHide={handleClose} centered>
        <Modal.Header closeButton style={{ backgroundColor: color.modalBG }}>
          <Modal.Title>Purchase Plan</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: color.modalBG }}>
          <div className="pricing-area" style={{ marginTop: "-4rem" }}>
            <div className="container">
              <div className="row">
                {planListData?.map((plan, i) => {
                  return (
                    <div className=" col-sm-12 col-md-12 col-lg-4">
                      <div className="single-price">
                        <div className="price-header">
                          <h5 className="title">{plan?.name} Plan </h5>
                        </div>
                        <div className="price-value">
                          <div className="value">
                            <span className="currency">₹</span>{" "}
                            <span className="amount">{plan?.fee}</span>{" "}
                            <span className="month fw-bold">/year</span>
                          </div>
                        </div>
                        <ul className="deals">
                          <li> {plan?.freeContacts} Contact Free .</li>
                          {/* <li>Profile Creation.</li>
                      <li>One Contact No addition.</li>
                      <li>One Photo.</li> */}
                        </ul>
                        <AEButton
                          style={{
                            position: "absolute",
                            marginLeft: "-50px",
                            left: "50%",
                            bottom: "5%",
                          }}
                          onClick={() => handlePurchasePlan(plan?._id)}
                          title={"Buy Now"}
                        />
                      </div>
                    </div>
                  );
                })}
                {/*                 
                <div className="col-md-4 col-sm-6">
                  <div className="single-price">
                    <div className="price-header">
                      <h3 className="title">Premium Yearly Plan</h3>
                    </div>
                    <div className="price-value">
                      <div className="value">
                        <span className="currency">₹</span>{" "}
                        <span className="amount">1200</span>{" "}
                        <span className="month fw-bold">/Year</span>
                      </div>
                    </div>
                    <ul className="deals">
                      <li>30 Contact as per your choice.</li>
                      <li>No hidden charges.</li>
                      <li>No hidden charges.</li>
                      <li>Two Contact No addition.</li>
                      <li>Premium Profile Creation.</li>
                      <li>Personal Support.</li>
                      <li>Two Photo.</li>
                    </ul>
                    <AEButton
                      style={{
                        position: "absolute",
                        marginLeft: "-50px",
                        left: "50%",
                        bottom: "5%",
                      }}
                      // onClick={() => navigate("/")}
                      title={"Buy Now"}
                    />
                  </div>
                </div>
                <div className="col-md-4 col-sm-6">
                  <div className="single-price">
                    <div className="price-header">
                      <h3 className="title"> Secret Plan</h3>
                    </div>
                    <div className="price-value">
                      <div className="value">
                        <span className="currency">₹</span>{" "}
                        <span className="amount">3000</span>{" "}
                        <span className="month fw-bold">/Till Marriage</span>
                      </div>
                    </div>
                    <ul className="deals">
                      <li> Validity till Marriage.</li>

                      <li>Unlimited Contacts.</li>
                      <li> No other Charges.</li>

                      <li> Premium Profile Creation.</li>

                      <li> Personal Support.</li>

                      <li> ANE will search for you secretly.</li>

                      <li> if you want your profile will be hidden.</li>

                      <li> 2 Contact No addition.</li>

                      <li> 2 Photo.</li>

                      <li> If you want your profile will be hidden.</li>
                    </ul>

                    <AEButton
                      style={{
                        position: "absolute",
                        marginLeft: "-50px",
                        left: "50%",
                        bottom: "5%",
                      }}
                      // onClick={() => navigate("/")}
                      title={"Buy Now"}
                    />
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
