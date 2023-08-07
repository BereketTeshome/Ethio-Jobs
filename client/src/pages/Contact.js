import React, {useRef} from 'react'
import {SiGmail} from 'react-icons/si'
import {FaTelegramPlane} from 'react-icons/fa'
import {MdTextsms} from 'react-icons/md'
import emailjs from 'emailjs-com'
import Navbar from '../components/Navbar';


const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_kg4i1m6', 'template_8dmgofd', form.current, 'M4Zpi-71dA7NzuDyn')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
    
      e.target.reset();
  };



  return (
    <>
    <Navbar />
    <section className='contact'>
      <h2 style={{fontSize:'2rem'}}>Contact <span className='me'>Us</span></h2>

    <div className="container contact__container">
      <div className="contact__options">

        <article className='contact__option'>
          <SiGmail className='contact-icon'/>
          <h4>GMAIL</h4>
          <h5>bereketteshome685@gmail.com</h5>
          <a href="mailto:bereketteshome685@gmail.com" target='_blank'>send a message</a>
        </article>

        <article className='contact__option'>
          <FaTelegramPlane className='contact-icon'/>
          <h4>Telegram</h4>
          <h5>@Medication12</h5>
          <a href="https://t.me/Medication12" target='_blank'>send a message</a>
        </article>

        <article className='contact__option'>
          <MdTextsms className='contact-icon'/>
          <h4>SMS</h4>
          <h5>+251977622890</h5>
          <a href="sms://+251977622890?body=Contact">send a message</a>
        </article>

      </div>

      <form className='contact_form' ref={form} onSubmit={sendEmail}>
        <input type="text" name='name' placeholder='Your Full Name' required/>
        <input type="email" name='email' placeholder='Your Email' required/>
        <textarea name="message" id=""  rows="7" placeholder='Your Message' required></textarea>
        <button type="submit" className='btn btn-primary'>Send Message</button>
      </form>

    </div>

    </section>
    </>
  )
}

export default Contact