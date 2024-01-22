import { useState } from "react";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaTimes } from 'react-icons/fa';
import './ContactUs.css';

const ContactUs = () => {
  const [showForm, setShowForm] = useState(false);
  const [textareaValue, setTextareaValue] = useState("");
  const userEmail = useSelector((state) => state.user.currentUser.email);

  const handleToggleForm = () => {
    setShowForm((prevShowForm) => !prevShowForm);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3001/api/user/submitForm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          problemDescription: textareaValue,
          email: userEmail,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Form submitted successfully!");
        toast.success("Form submitted successfully!");

        setTextareaValue("");
        setShowForm(false);
      } else {
        console.error("Error submitting form:", data.message);
        toast.error(`Error submitting form: ${data.message}`);
      }
    } catch (error) {
      console.log("Network error:", error.message);
      toast.error("Network error. Please try again.");
    }
  };

  return (
    <div className="contact-us-container mx-auto pt-10 max-w-4xl pb-10">
      <button className="contact-us-button" onClick={handleToggleForm}>
        Contact Us
      </button>
      {showForm && (
        <div className="form-overlay ">
          <div className="form-container">
            <button className="close-button" onClick={handleToggleForm}>
              <FaTimes />
            </button>
            <form className="form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="textarea">How Can We Help You?</label>
                <textarea
                  required
                  cols={50}
                  rows={10}
                  id="textarea"
                  name="textarea"
                  value={textareaValue}
                  onChange={(e) => setTextareaValue(e.target.value)}
                />
              </div>
              <div className="flex justify-center">
              <button type="submit" className="form-submit-btn ">
                {/* <div> */}
                Submit
              </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default ContactUs;
