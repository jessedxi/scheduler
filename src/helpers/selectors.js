export function getAppointmentsForDay(state, day) {

  if (!state.days) {
    return [];
  }

  let selectedDay = state.days.filter(filterDay => filterDay.name === day)[0];
  if (!selectedDay) {
    return [];
  }

  let result = [];
  for (const id of selectedDay.appointments) {
    const appointmentObj = state.appointments[id];
    result.push(appointmentObj);
  }

  return result;
};

export function getInterview(state, interview) {
  let interviewers = state.interviewers;
  let result = {};

  interviewers && interview ? result = {interviewer: state.interviewers[interview.interviewer], student: interview.student} : result = null;
  return result;
};

  /*
  if (!interviewers || !interview) {
    return null;
  }
  if (interview.interviewer) {
    result["interviewer"] = state.interviewers[interview.interviewer];
    result["student"] = interview.student;
  }
  return result; */