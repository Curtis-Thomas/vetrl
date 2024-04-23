// src/redux/reducers/appointmentReducer.ts

type Appointment = {
  date: string;
  time: string;
  appointmentCardAppointmentNo: string;
  appointmentCardDate: string;
  appointmentCardTime: string;
  appointmentCardAnamnesis: string;
  appointmentCardDiagnosis: string;
  appointmentCardAdditionalNotes: string;
  appointmentCardProceduresPrice: number;
  appointmentCardMedicinePrice: number;
  appointmentCardSuppliesPrice: number;
  appointmentCardDischargeNotes: string;
  appointmentCardTotalPrice: number;
};

const initialState: Appointment = {
  date: "",
  time: "",
  appointmentCardAppointmentNo: "",
  appointmentCardDate: "",
  appointmentCardTime: "",
  appointmentCardAnamnesis: "",
  appointmentCardDiagnosis: "",
  appointmentCardAdditionalNotes: "",
  appointmentCardProceduresPrice: 0,
  appointmentCardMedicinePrice: 0,
  appointmentCardSuppliesPrice: 0,
  appointmentCardDischargeNotes: "",
  appointmentCardTotalPrice: 0,
};

const appointmentReducer = (
  state = initialState,
  action: { type: string; payload: Appointment }
) => {
  switch (action.type) {
    case "SET_APPOINTMENT":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default appointmentReducer;
