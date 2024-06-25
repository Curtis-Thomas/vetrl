import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";

import { Appointment } from "../../../../redux/actions/appointmentActions";

function AppointmentBillDocument() {
  const userSettings = useSelector((state: RootState) => state.settings);

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
    <div>
      <div
        style={{
          textAlign: "center",
          paddingTop: "7.5vh",
          paddingBottom: "2.5vh",
        }}
      >
        <button
          style={{
            width: "100px",
            height: "50px",
            fontSize: "20px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
          onClick={handlePrint}
        >
          Print Bill
        </button>
      </div>
      <style>
        {`@media print {
          @page {
            size: A4 portrait;
            margin: 20mm;
          }
          body {
            width: 100%;
          }
        }`}
      </style>
      <div
        ref={componentRef}
        style={{
          width: "794px", // A4 width in pixels
          minHeight: "1123px", // A4 height in pixels, minHeight to allow content to expand
          margin: "auto", // Center the invoice on the page
          padding: "25.4mm", // Adjust padding to create standard invoice formatting style
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)", // Optional: add a shadow to make it pop a bit on screen
          backgroundColor: "white", // Ensure background is white for printing
          color: "#000", // Use black for text for better print contrast
          fontFamily: "'Helvetica', 'Arial', sans-serif", // Use a standard, professional font
        }}
      >
        {/* Header */}
        <div style={{ display: "flex" }}>
          <div style={{ textAlign: "left", width: "50%" }}>
            <h1>Invoice</h1>
          </div>

          <div style={{ textAlign: "right", width: "50%" }}>
            <p
              style={{
                lineHeight: "0.75em",
                marginTop: "0.25em",
                marginBottom: "0.25em",
              }}
            >
              {userSettings.surgeryName}
            </p>
            <p
              style={{
                lineHeight: "0.75em",
                marginTop: "0.25em",
                marginBottom: "0.25em",
              }}
            >
              {userSettings.surgeryAddressNoStreet}
            </p>
            <p
              style={{
                lineHeight: "0.75em",
                marginTop: "0.25em",
                marginBottom: "0.25em",
              }}
            >
              {userSettings.surgeryAddressArea}
            </p>
            <p
              style={{
                lineHeight: "0.75em",
                marginTop: "0.25em",
                marginBottom: "0.25em",
              }}
            >
              {userSettings.surgeryAddressPostCode}
            </p>
            <p
              style={{
                lineHeight: "0.75em",
                marginTop: "0.25em",
                marginBottom: "0.25em",
              }}
            >
              {userSettings.surgeryAddressCountry}
            </p>
            <p
              style={{
                lineHeight: "0.75em",
                marginTop: "0.25em",
                marginBottom: "0.25em",
              }}
            >
              {userSettings.surgeryAddressPhoneNo}
            </p>
            <p
              style={{
                lineHeight: "0.75em",
                marginTop: "0.25em",
                marginBottom: "0.25em",
              }}
            >
              {userSettings.businessId}
            </p>
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-evenly" }}>
          <div>
            <p>
              <strong>Appointment No:</strong>{" "}
              {appointment.appointmentCardAppointmentNo}
            </p>
          </div>
          <div>
            <p>
              <strong>Date:</strong> {appointment.appointmentCardDate}
            </p>
          </div>
          <div>
            <p>
              <strong>Time:</strong> {appointment.appointmentCardTime}
            </p>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-evenly" }}>
          <div>
            <p>
              <strong>Anamnesis:</strong> {appointment.appointmentCardAnamnesis}
            </p>
          </div>
          <div>
            <p>
              <strong>Diagnosis:</strong> {appointment.appointmentCardDiagnosis}
            </p>
          </div>
        </div>

        {/* Appointment Details */}
        <table style={{ width: "100%", marginBottom: "20px" }}>
          <thead>
            <tr>
              <th style={{ textAlign: "left" }}>Description</th>
              <th style={{ textAlign: "right" }}>Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Procedures</td>
              <td style={{ textAlign: "right" }}>
                {userSettings.currency}
                {appointment.appointmentCardProceduresPrice}
              </td>
            </tr>
            <tr>
              <td>Medicine</td>
              <td style={{ textAlign: "right" }}>
                {userSettings.currency}
                {appointment.appointmentCardMedicinePrice}
              </td>
            </tr>
            <tr>
              <td>Supplies</td>
              <td style={{ textAlign: "right" }}>
                {userSettings.currency}
                {appointment.appointmentCardSuppliesPrice}
              </td>
            </tr>
            <tr>
              <td>
                <strong>Total Price</strong>
              </td>
              <td style={{ textAlign: "right" }}>
                <strong>
                  {userSettings.currency}
                  {(
                    parseFloat(appointment.appointmentCardProceduresPrice) +
                    parseFloat(appointment.appointmentCardMedicinePrice) +
                    parseFloat(appointment.appointmentCardSuppliesPrice)
                  ).toFixed(2)}
                </strong>
              </td>
            </tr>
          </tbody>
        </table>
        <div>
          <p>
            {" "}
            <strong>Additional Notes:</strong>{" "}
            {appointment.appointmentCardAdditionalNotes}
          </p>
        </div>
        <div>
          <p>
            {" "}
            <strong>Discharge Notes:</strong>{" "}
            {appointment.appointmentCardDischargeNotes}
          </p>
        </div>
      </div>
    </div>
  );
}

export default AppointmentBillDocument;
