// src/redux/actions/appointmentActions.ts

export type Appointment = {
  date: string;
  time: string;
  appointmentCardAppointmentNo: string;
  appointmentCardDate: string;
  appointmentCardTime: string;
  appointmentCardAnamnesis: string;
  appointmentCardDiagnosis: string;
  appointmentCardAdditionalNotes: string;
  appointmentCardProceduresPrice: string;
  appointmentCardMedicinePrice: string;
  appointmentCardSuppliesPrice: string;
  appointmentCardDischargeNotes: string;
  appointmentCardTotalPrice: number;
};

export const setAppointment = (appointment: Appointment) => ({
  type: "SET_APPOINTMENT",
  payload: appointment,
});

export const resetAppointmentData = () => ({
  type: "RESET_APPOINTMENT_DATA",
});
