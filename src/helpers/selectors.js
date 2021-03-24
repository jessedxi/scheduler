//Helper functions used in index to get appointment/interviewer data from state.

//Provides appointments for selected day
export function getAppointmentsForDay(state, day) {
  if (!state.days) {
    return [];
  }

  const selectedDay = state.days.filter(filterDay => filterDay.name === day)[0];
  if (!selectedDay) {
    return [];
  }

  const appointments = selectedDay.appointments.map(appointmentId => state.appointments[appointmentId]);
  return appointments;
};

//Retrieves interview for given interview id
export function getInterview(state, interview) {
  const interviewers = state.interviewers;
  let result = {};

  interviewers && interview ? result = { interviewer: state.interviewers[interview.interviewer], student: interview.student } : result = null;
  return result;
};

//Provides array of interviews for slected day
export function getInterviewersForDay(state, day) {
  if (!state.days) {
    return [];
  }

  const selectedDay = state.days.filter(filterDay => filterDay.name === day)[0];

  if (!selectedDay) {
    return [];
  }

  const interviewers = selectedDay.interviewers.map(interviewerstId => state.interviewers[interviewerstId]);
  return interviewers;
};