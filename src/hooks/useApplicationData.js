import axios from 'axios';
import { useEffect, useState } from "react";

export default function useApplicationData() {

  //Queries API database, returns data as state object
  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then((all) => {
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }))
    })
  }, [])

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  //counts how many interview spots are available
  function getNullSpots(day, appointments) {
    let count = 0;

    for (const id of day.appointments) {
      const appointment = appointments[id];
      if (!appointment.interview) {
        count++
      }
    }

    return count;
  };

  //updates spots from newly set state after booking or cancelling an appointment
  function updootSpots(dayName, days, appointments) {
    const spreadDays = [...days];
    const day = spreadDays.find(itmem => itmem.name === dayName);
    const nulls = getNullSpots(day, appointments);
    day.spots = nulls;

    return spreadDays;
  };

  //sets selected day from state
  const setDay = day => setState({ ...state, day });

  //adds new interciew in selected spot to APU DB
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const days = updootSpots(state.day, state.days, appointments);

    return axios.put(`/api/appointments/${id}`, { interview })
      .then(() => {
        setState({
          ...state,
          appointments,
          days
        });
      });
  };

  //removes selected interview from API DB
  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const days = updootSpots(state.day, state.days, appointments);

    return axios.delete(`/api/appointments/${id}`).then(() => {
      setState({
        ...state,
        appointments,
        days
      })
    })
  };

  return { state, setDay, cancelInterview, bookInterview };
};