import React from "react";
import Modal from "react-bootstrap/Modal";
import AEButton from "../../../component/AEButton";
import { color } from "../../../assets/css/color/color";
import { useDispatch, useSelector } from "react-redux";
import { sendInterest } from "../../../store/slice/auth";

export default function SendInterestDialog(props) {
  const { showDialog, handleCloseDialog, id } = props;
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.auth);
  const handleSend = () => {
    dispatch(sendInterest(id, handleCloseDialog));
  };
  return (
    <Modal show={showDialog} onHide={handleCloseDialog} centered>
      <Modal.Header closeButton style={{ backgroundColor: color.modalBG }}>
        <Modal.Title>Send Interest</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ backgroundColor: color.modalBG }}>
        <div className="fs-5 fw-bolder">
          Are you sure you want to send interest?
        </div>
        <div className="row pt-5">
          <div className="col-12">
            <AEButton
              title={`Send (${userData?.freeContactsCount})`}
              fullWidth
              // disabled={userData?.freeContactsCount < 0 ? false : true}
              onClick={handleSend}
            />
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
