import React, { useRef, useContext } from "react";
import { useReactToPrint } from "react-to-print";
import { Context } from "../AppointmentContainer"; // replace with the actual path

function AppointmentBillDocument() {
  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Appointment Bill",
    onAfterPrint: () => console.log("Printed bill successfully!"),
  });

  const {
    appointmentCardAppointmentNo,
    appointmentCardDate,
    appointmentCardTime,
    appointmentCardAnamnesis,
    appointmentCardDiagnosis,
    appointmentCardAdditionalNotes,
    appointmentCardProcedures,
    appointmentCardMedicine,
    appointmentCardSupplies,
    appointmentCardDischargeNotes,
    appointmentCardTotalPrice,
  } = useContext(Context);

  return (
    <>
      <div
        ref={componentRef}
        style={{ width: "80%", height: window.innerHeight }}
      >
        <h1 style={{ textAlign: "center" }}>Appointment Bill</h1>
        <p>Appointment No: {appointmentCardAppointmentNo}</p>
        <p>Date: {appointmentCardDate}</p>
        <p>Time: {appointmentCardTime}</p>
        <p>Anamnesis: {appointmentCardAnamnesis}</p>
        <p>Diagnosis: {appointmentCardDiagnosis}</p>
        <p>Additional Notes: {appointmentCardAdditionalNotes}</p>
        <p>Procedures: {appointmentCardProcedures}</p>
        <p>Medicine: {appointmentCardMedicine}</p>
        <p>Supplies: {appointmentCardSupplies}</p>
        <p>Discharge Notes: {appointmentCardDischargeNotes}</p>
        <p>Total Price: {appointmentCardTotalPrice}</p>
      </div>
      <div style={{ height: "50px" }}>
        <button
          style={{
            width: "100px",
            height: "50px",
            fontSize: "20px",
            margin: "auto",
            display: "block",
            marginTop: "20px",
          }}
          onClick={handlePrint}
        >
          Print bill
        </button>
      </div>
    </>
  );
}

export default AppointmentBillDocument;
