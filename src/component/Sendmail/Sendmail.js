import React from "react";
import "./Sendmail.css";
import CloseIcon from "@material-ui/icons/Close";
import { Button } from "@material-ui/core";
import { useForm } from "react-hook-form";
import { db } from "../../firebase";
import firebase from "firebase";

//redux
import { useDispatch } from "react-redux";
import { closeSendMessage } from "../../features/mailSlice";

function Sendmail() {
  const { register, handleSubmit, watch, errors } = useForm();
  const dispatch = useDispatch();

  const onSubmit = (formdata) => {
    console.log("data >>>", formdata);
    db.collection("emails").add({
      to: formdata.to,
      subject: formdata.subject,
      message: formdata.message,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    dispatch(closeSendMessage());
  };

  return (
    <div className="sendmail">
      <div className="sendmail__Header">
        <h3>New Message</h3>
        <CloseIcon
          className="sendmail__Close"
          onClick={() => dispatch(closeSendMessage())}
        />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          name="to"
          type="text"
          placeholder="To"
          ref={register({ required: true })}
        />
        {errors.to && <p className="sendmail__error">To is Required</p>}
        <input
          name="subject"
          type="text"
          placeholder="Subject"
          ref={register({ required: true })}
        />
        {errors.subject && (
          <p className="sendmail__error">Subject is Requires</p>
        )}
        <input
          name="message"
          type="text"
          placeholder="Message ..."
          className="sendmail__messages"
          ref={register({ required: true })}
        />
        {errors.message && (
          <p className="sendmail__error">Message is Required</p>
        )}
        <div className="sendmail__Options">
          <Button
            className="sendmail__Send"
            variant="contained"
            color="primary"
            type="submit">
            Send
          </Button>
        </div>
      </form>
    </div>
  );
}

export default Sendmail;
