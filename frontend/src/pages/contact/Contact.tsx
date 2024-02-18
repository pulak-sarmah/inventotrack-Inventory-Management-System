import { FaPhoneAlt, FaEnvelope, FaTwitter } from "react-icons/fa";
import { GoLocation } from "react-icons/go";
import "./contact.scss";
import Cards from "../../components/cards/Cards";
import useRedirectLogOutUser from "../../hooks/useRedirectLogOutUser";
import { useState } from "react";
import { contactUs } from "../../services/authService";
import { useNavigate } from "react-router-dom";

const Contact = () => {
  useRedirectLogOutUser("/login");

  const navigate = useNavigate();
  const [subject, setSubject] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const data = {
    subject,
    message,
  };

  const sendEmail = async (e: React.FormEvent) => {
    e.preventDefault();

    await contactUs(data);
    navigate("/dashboard");
  };

  return (
    <div className="contact" style={{ marginLeft: "5rem" }}>
      <h3 className="--mt">Contact Us</h3>
      <div className="section">
        <form onSubmit={sendEmail}>
          <Cards cardClass="card">
            <label>Subject</label>
            <input
              type="text"
              name="subject"
              placeholder="Subject"
              required
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
            <label>Message</label>
            <textarea
              cols={30}
              rows={10}
              name="message"
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
            <button className="--btn --btn-primary">Send Message</button>
          </Cards>
        </form>

        <div className="details">
          <Cards cardClass={"card2"}>
            <h3>Our Contact Information</h3>
            <p>Fill the form or contact us via other channels listed below</p>

            <div className="icons">
              <span>
                <FaPhoneAlt />
                <p>0000000000</p>
              </span>
              <span>
                <FaEnvelope />
                <p>Support@invent.com</p>
              </span>
              <span>
                <GoLocation />
                <p>Pulak, India</p>
              </span>
            </div>
          </Cards>
        </div>
      </div>
    </div>
  );
};

export default Contact;
