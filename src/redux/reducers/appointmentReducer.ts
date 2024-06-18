// src/redux/reducers/appointmentReducer.ts

type Appointment = {
  date: string;
  time: string;
  appointmentCardClientId: string;
  appointmentCardPatientId: string;
  appointmentCardAppointmentNo: string;
  appointmentCardDate: string;
  appointmentCardTime: string;
  appointmentCardAnamnesis: string;
  appointmentCardDiagnosis: string;
  appointmentCardAdditionalNotes: string;
  appointmentCardDischargeNotes: string;
  appointmentCardProceduresPrice: number;
  appointmentCardMedicinePrice: number;
  appointmentCardSuppliesPrice: number;
  appointmentCardTotalPrice: number;
};

const initialState: Appointment = {
  date: "",
  time: "",
  appointmentCardClientId: "",
  appointmentCardPatientId: "",
  appointmentCardAppointmentNo: "",
  appointmentCardDate: "",
  appointmentCardTime: "",
  appointmentCardAnamnesis: "",
  appointmentCardDiagnosis: "",
  appointmentCardAdditionalNotes: "",
  appointmentCardDischargeNotes: "",
  appointmentCardProceduresPrice: 0,
  appointmentCardMedicinePrice: 0,
  appointmentCardSuppliesPrice: 0,
  appointmentCardTotalPrice: 0,
};

const appointmentReducer = (
  state = initialState,
  action: { type: string; payload?: Appointment }
) => {
  switch (action.type) {
    case "SET_APPOINTMENT":
      return { ...state, ...action.payload };
    case "RESET_APPOINTMENT_DATA":
      return initialState; // Reset state to initial values
    default:
      return state;
  }
};

export default appointmentReducer;
