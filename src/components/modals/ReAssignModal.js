import React, { useState } from "react";
import ReactModal from "react-modal";

ReactModal.setAppElement("#root");

function ReAssignModal(props) {
  const [takenBy, setTakenBy] = useState('')

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: "75vw"
    },
    overlay: {
      backgroundColor: "rgba(1,1,1,0.75)"
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    props.handleTakenBySubmit(takenBy, 'reAssign-takenBy')
  }

  return (
    <ReactModal
        style={customStyles}
        onRequestClose={() => {
            props.handleModalClose('assign');
        }}
        isOpen={props.reAssignModalIsOpen}
    >
        <h1>{props.refreshment.refreshmentName}</h1>
        <p>Does {props.refreshment.takenBy} no longer want to bring "{props.refreshment.refreshmentName}"?  Please supply us with your name and we will re-assign this item, so the attendees know who's bringing it.</p>
        <form onSubmit={handleSubmit}>
          <label htmlFor="takenBy">Name:</label>
          <input
              type="text"
              placeholder="Your name..."
              name="takenBy"
              id="takenBy"
              value={takenBy}
              onChange={event => setTakenBy(event.target.value)}
              autoComplete="off"
              required
          />
          <button type="submit">REASSIGN ITEM</button>
        </form>
    </ReactModal>
  );
}

export default ReAssignModal;