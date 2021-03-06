import React, { useEffect, useState } from 'react';
import FormField from './FormField';
import useInput from '../../hooks/useInput';
import { useParams } from 'react-router-dom';

const Contact = () => {
  // const params = useParams();
  // console.log(params.contactId);
  const contactId = useParams().contactId;

  useEffect(() => {
    loadContact(contactId);
  }, [contactId]);

  // const [data, setData] = useState(initialData);

  const loadContact = async (contactId) => {
    try {
      const response = await fetch(
        'http://localhost:8080/api/contacts/id?id=' + contactId
      );

      if (!response.ok) {
        throw new Error('not found');
      }
      const data = await response.json();
      console.log(data.name);
      // setData({ iName: 'wjhfghkjgwfhjg' });
      updateName(data.name);
      updateEmail(data.email);
      updatePhone(data.phone);
      updateMsg(data.message);
    } catch (error) {
      alert(error.message);
    }
    // name = data.name;
    // email = data.email;
    // phone = data.phone;
    // msg = data.message;
  };

  const sendRequest = async (contact) => {
    let method = 'POST';
    if (contact.id !== '') {
      method = 'PUT';
    }
    const response = await fetch('http://localhost:8080/api/contacts', {
      method: method,
      body: JSON.stringify(contact),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    alert(data);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const contact = {
      id: contactId,
      name,
      email,
      phone,
      message: msg,
    };
    sendRequest(contact);

    resetName();
    resetEmail();
    resetPhone();
    resetMsg();
  };
  const {
    value: name,
    isValidValue: isValidName,
    isError: isNameError,
    touchedHandler: nameTouched,
    valueChangedHandler: nameChanged,
    reset: resetName,
    updateVal: updateName,
  } = useInput((v) => v.trim() !== '');

  const {
    value: email,
    isValidValue: isValidEmail,
    isError: isEmailError,
    touchedHandler: emailTouched,
    valueChangedHandler: emailChanged,
    reset: resetEmail,
    updateVal: updateEmail,
  } = useInput((v) => /\S+@\S+\.\S+/.test(v));

  const {
    value: phone,
    isValidValue: isValidPhone,
    isError: isPhoneError,
    touchedHandler: phoneTouched,
    valueChangedHandler: phoneChanged,
    reset: resetPhone,
    updateVal: updatePhone,
  } = useInput((v) => /^\d+$/.test(v));

  const {
    value: msg,
    isValidValue: isValidMsg,
    isError: isMsgError,
    touchedHandler: msgTouched,
    valueChangedHandler: msgChanged,
    reset: resetMsg,
    updateVal: updateMsg,
  } = useInput((v) => v.trim() !== '');

  const isValidForm = isValidName && isValidEmail && isValidPhone && isValidMsg;
  return (
    // <!-- Contact Section-->
    <section className='page-section' id='contact'>
      <div className='container'>
        {/* <!-- Contact Section Heading--> */}
        <h2
          className='
            page-section-heading
            text-center text-uppercase text-secondary
            mb-0
          '
        >
          Contact Me
        </h2>
        {/* <!-- Icon Divider--> */}
        <div className='divider-custom'>
          <div className='divider-custom-line'></div>
          <div className='divider-custom-icon'>
            <i className='fas fa-star'></i>
          </div>
          <div className='divider-custom-line'></div>
        </div>

        {/* <!-- Contact Section Form--> */}
        <div className='row justify-content-center'>
          <div className='col-lg-8 col-xl-7'>
            <form id='contactForm'>
              {/* <!-- Name input--> */}

              <FormField
                id='name'
                type='text'
                placeholder='Enter your name...'
                value={name}
                onChange={nameChanged}
                onBlur={nameTouched}
                lable='FullName'
                isError={isNameError}
                msg='A name is required.'
              ></FormField>

              {/* <!-- Email address input--> */}
              <FormField
                id='email'
                type='email'
                placeholder='Enter your email...'
                value={email}
                onChange={emailChanged}
                onBlur={emailTouched}
                lable='Email'
                isError={isEmailError}
                msg='A valid email is required.'
              ></FormField>
              <FormField
                id='phone'
                type='tel'
                placeholder='Enter your phone...'
                value={phone}
                onChange={phoneChanged}
                onBlur={phoneTouched}
                lable='Phone number'
                isError={isPhoneError}
                msg='A phone number is required.'
              ></FormField>
              {/* <!-- Message input--> */}
              <div className='form-floating mb-3'>
                <textarea
                  className='form-control'
                  id='message'
                  type='text'
                  placeholder='Enter your message here...'
                  value={msg}
                  onChange={msgChanged}
                  onBlur={msgTouched}
                ></textarea>
                <label>Message</label>
                {isMsgError && (
                  <div className='invalid-input'>A message is required.</div>
                )}
              </div>
              {/* <!-- Submit success message--> */}
              <div className='d-none' id='submitSuccessMessage'>
                <div className='text-center mb-3'>
                  <div className='fw-bolder'>Form submission successful!</div>
                </div>
              </div>
              {/* <!-- Submit error message--> */}
              <div className='d-none' id='submitErrorMessage'>
                <div className='text-center text-danger mb-3'>
                  Error sending message!
                </div>
              </div>
              {/* <!-- Submit Button--> */}
              <button
                className='btn btn-primary btn-xl '
                id='submitButton'
                type='submit'
                onClick={submitHandler}
                disabled={!isValidForm}
              >
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
