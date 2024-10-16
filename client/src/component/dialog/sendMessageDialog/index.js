import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import AEButton from "../../../component/AEButton";
import { color } from "../../../assets/css/color/color";
import { useDispatch } from "react-redux";
import { sendInterest } from "../../../store/slice/auth";
import AEInput from "../../AEInput";
import { sendMessage } from "../../../store/slice/message";

export default function SendMessageDialog(props) {
  const { showDialog, handleCloseDialog, id } = props;
  const dispatch = useDispatch();
  const [message, setMessage] = useState();

  const handleSendMessageSuccess = () => {
    setMessage("");
    handleCloseDialog();
  };
  const handleSendMessage = () => {
    let request = {
      receiveUserId: "any",
      message: message,
    };
    dispatch(sendMessage(request, handleSendMessageSuccess));
  };
  return (
    <Modal show={showDialog} onHide={handleCloseDialog} centered>
      <Modal.Header closeButton style={{ backgroundColor: color.modalBG }}>
        <Modal.Title>Send Message</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ backgroundColor: color.modalBG }}>
        <textarea
          class="form-control"
          aria-label="With textarea"
          value={message}
          onChange={(event) => {
            setMessage(event.target.value);
          }}
          placeholder="Type here..."
          style={{ background: "#b99a4570" }}
        />
        <div className="row pt-5">
          <div className="col-12">
            <AEButton title="Send" fullWidth onClick={handleSendMessage} />
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
