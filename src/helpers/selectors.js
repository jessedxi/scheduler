export function getAppointmentsForDay(state, day) {
  if (!state.days) {
    return [];
  }

  let selectedDay = state.days.filter(filterDay => filterDay.name === day)[0];
  if (!selectedDay) {
    return [];
  }

  const appointments = selectedDay.appointments.map(appointmentId => state.appointments[appointmentId]);
  return appointments;
};

export function getInterview(state, interview) {
  let interviewers = state.interviewers;
  let result = {};

  interviewers && interview ? result = {interviewer: state.interviewers[interview.interviewer], student: interview.student} : result = null;
  return result;
};

export function getInterviewersForDay(state, day) {

  if (!state.days) {
    return [];
  }

  let selectedDay = state.days.filter(filterDay => filterDay.name === day)[0];
  if (!selectedDay) {
    return [];
  }
  
  const interviewers = selectedDay.interviewers.map(interviewerstId => state.interviewers[interviewerstId]);
  return interviewers;
};