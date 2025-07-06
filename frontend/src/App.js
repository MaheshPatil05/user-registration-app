import React, { useState } from "react";
import "./index.css";

export default function App() {
  // State to hold form field values
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    age: "",
    email: "", // Added email to state
  });

  // State to manage submission status
  const [submitted, setSubmitted] = useState(false);

  // State to manage validation errors
  const [valid, setValid] = useState(false);

  // Handle input changes
  const handleInputChange = (event) => {
    event.persist(); // Persist the event for asynchronous state updates
    setValues((prevValues) => ({
      ...prevValues,
      [event.target.name]: event.target.value,
    }));
    console.log("Input changed:", event.target.name, event.target.value); 
    //console.log("Current values state:", values);
  };

  // Handle form submission
  const handleSubmit = async(event) => {
    console.log("handleSubmit triggered!");
    event.preventDefault(); // Prevent default browser form submission

    // Basic validation logic
    if (values.firstName && values.lastName && values.age && values.email) {
      setValid(true); // All fields are valid
      console.log("Form data to send:", values);

      try {
        const response = await fetch('http://localhost:5000/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        });

        if (response.ok) {
          const result = await response.json();
          console.log('Registration successful:', result);
          // setValues({ firstName: "", lastName: "", age: "", email: "" });
        } else {
          const errorData = await response.json();
          console.error('Registration failed:', errorData);
        }
      } catch (error) {
        console.error('Error submitting form:', error);
      }
      
    } else {
      setValid(false); // Some fields are missing
      console.log("Form data invalid:", values);
    }

    setSubmitted(true); // Mark form as submitted
  };

  return (
    <div className="form-container">
      <form className="register-form" onSubmit={handleSubmit}>
        {/* Success message: Only show if submitted AND valid */}
        {submitted && valid && (
          <div className="success-message">Success! Thank you for registering</div>
        )}

        {/* First Name Input */}
        <input
          id="first-name"
          className="form-field"
          type="text"
          placeholder="First Name"
          name="firstName"
          value={values.firstName} // Controlled component: value comes from state
          onChange={handleInputChange} // Update state on change
        />
        {/* First Name Error: Only show if submitted AND first name is empty */}
        {submitted && !values.firstName && (
          <span id="first-name-error" className="error-message">
            Please enter a first name
          </span>
        )}

        {/* Last Name Input */}
        <input
          id="last-name"
          className="form-field"
          type="text"
          placeholder="Last Name"
          name="lastName"
          value={values.lastName}
          onChange={handleInputChange}
        />
        {/* Last Name Error: Only show if submitted AND last name is empty */}
        {submitted && !values.lastName && (
          <span id="last-name-error" className="error-message">
            Please enter a last name
          </span>
        )}

        {/* Age Input */}
        <input
          id="age"
          className="form-field"
          type="number"
          placeholder="Age"
          name="age"
          min="0"
          max="120"
          value={values.age}
          onChange={handleInputChange}
        />
        {/* Age Error: You might want to add specific age validation here too, e.g., min/max */}
        {submitted && !values.age && (
          <span id="age-error" className="error-message">
            Please enter your age
          </span>
        )}

        {/* Email Input (added) */}
        <input
          id="email" 
          className="form-field"
          type="email"
          placeholder="Email"
          name="email"
          value={values.email}
          onChange={handleInputChange}
        />
        {/* Email Error: Only show if submitted AND email is empty (or invalid format with more complex validation) */}
        {submitted && !values.email && (
          <span id="email-error" className="error-message">
            Please enter an email address
          </span>
        )}

        {/* Register Button */}
        <button className="form-field" type="submit">
          Register
        </button>
      </form>
    </div>
  );
}
