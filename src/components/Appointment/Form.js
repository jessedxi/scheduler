import React, {useState} from "react";
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";

//Renders input form to create new appointment
export default function Form(props) {
  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");

  //resets form when called
  const reset = function() {
    setName("");
    setInterviewer(null);
  };

  //cancels creation of new, called w/ on click event
  const cancel = function() {
    reset();
    props.onCancel();
  };

  //Ensures form name field is not blank, called ith on save event click
  function validate() {
    if (name === "") {
      setError("Student name cannot be blank");
      return;
    }
    setError("");
    props.onSave(name, interviewer);
  };

  return(<main className="appointment__card appointment__card--create">
  <section className="appointment__card-left">
    <form autoComplete="off" onSubmit={event => event.preventDefault()}>
      <input
        className="appointment__create-input text--semi-bold"
        name="name"
        type="text"
        placeholder="Enter Student Name"
        onChange={event => setName(event.target.value)}
        value={name}
        data-testid="student-name-input"
        /*
          This must be a controlled component
        */
      />
    </form>
    <section className="appointment__validation">{error}</section>
    <InterviewerList interviewers={props.interviewers} interviewer={interviewer} setInterviewer={setInterviewer} />
  </section>
  <section className="appointment__card-right">
    <section className="appointment__actions">
      <Button danger onClick={event => cancel()}>Cancel</Button>
      <Button confirm onClick={event => validate()}>Save</Button>
    </section>
  </section>
</main>);
};