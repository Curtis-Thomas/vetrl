import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { useSelector } from "react-redux";
import { Appointment } from "../../../../redux/actions/appointmentActions";

function AppointmentBillDocument() {
  const appointment = useSelector(
    (state: { appointment: Appointment }) => state.appointment
  );
  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Appointment Bill",
    onAfterPrint: () => console.log("Printed bill successfully!"),
  });

  if (!appointment) {
    return <div>no data</div>;
  }

  return (
    <>
      <div
        ref={componentRef}
        style={{ width: "80%", height: window.innerHeight }}
      >
        <h1 style={{ textAlign: "center" }}>Appointment Bill</h1>
        <p>Appointment No: {appointment.appointmentCardAppointmentNo}</p>
        <p>Date: {appointment.appointmentCardDate}</p>
        <p>Time: {appointment.appointmentCardTime}</p>
        <p>Anamnesis: {appointment.appointmentCardAnamnesis}</p>
        <p>Diagnosis: {appointment.appointmentCardDiagnosis}</p>
        <p>Additional Notes: {appointment.appointmentCardAdditionalNotes}</p>
        <p>Procedures: {appointment.appointmentCardProceduresPrice}</p>
        <p>Medicine: {appointment.appointmentCardMedicinePrice}</p>
        <p>Supplies: {appointment.appointmentCardSuppliesPrice}</p>
        <p>Discharge Notes: {appointment.appointmentCardDischargeNotes}</p>
        <p>Total Price: {appointment.appointmentCardTotalPrice}</p>
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
