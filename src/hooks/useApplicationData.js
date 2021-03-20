import axios from 'axios';
import { useEffect, useState } from "react";

export default function useApplicationData() {


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

  
  function updateSpots(days, appointments, id, value) {
    console.log(appointments[id].interview);
    days.forEach(day => {
      if ((!appointments[id].interview && value === -1) || value === 1) {
        if(day.appointments.includes(id)) {
          day.spots += value;
        }
      }
    })
    return days;
  }



  const setDay = day => setState({ ...state, day });

 

  function bookInterview(id, interview) {
    
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

   
const days = updateSpots([...state.days], state.appointments,  id, -1)
    

    return axios.put(`/api/appointments/${id}`, { interview })
      .then(() => {
        setState({
          ...state,
          appointments,
          days
        });
      })
  };


  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

   
const days = updateSpots([...state.days], state.appointments,    id, 1)

    return axios.delete(`/api/appointments/${id}`).then( () => {
      setState({
        ...state,
        appointments,
        days
      })
    })
  }



  return { state, setDay, cancelInterview, bookInterview };
}