import React, { useState, useRef } from 'react'
import Axios from 'axios'

import InputStatus from "./inputStatus"
import FormConfirmationBanner from "./formConfirmationBanner"
import greenCheckmarkIcon from "../images/icon-checkmark.svg"
import invalidIcon from "../images/icon-invalid.svg"

const ContactForm = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const [statusIsVisible, setStatusIsVisible] = useState(false)
    const [nameIsValid, setNameIsValid] = useState(false)
    const [emailIsValid, setEmailIsValid] = useState(false)
    const [messageIsValid, setMessageIsValid] = useState(false)
    const [wasSent, setWasSent] = useState(false)
    const [bannerIsVisible, setBannerIsVisible] = useState(false)
    const [bannerIsLoading, setBannerIsLoading] = useState(false)
    const [isRobot, setIsRobot] = useState(false)
    const notabotCheckbox = useRef();
    const messageField = useRef();
    const nameField = useRef();
    const emailField = useRef();
    const phoneField = useRef();
    const addressField = useRef();



    const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

    function validateName(text) {

        if (text.replace(/\s/g, '').length) {
            return true
        } else {
            return false
        }
    }

    function validateEmail(email) {
        return emailRegex.test(email)
    }

    function validateMessage(text) {
        if (text.replace(/\s/g, '').length) {
            return true
        } else {
            return false
        }
    }

    async function handleSubmit(e) {

        e.preventDefault();
        setNameIsValid(validateName(name));
        setEmailIsValid(validateEmail(email));
        setMessageIsValid(validateMessage(message));


        if (nameIsValid && emailIsValid && messageIsValid && !phone && !address) {
            setBannerIsLoading(true);
            setBannerIsVisible(true);

            try {
                const response = await Axios.post(`https://sandrofi.vercel.app/api/ses-send-email`, { name, email, message });
                console.log(response)

                if (response.status === 200) {
                    setWasSent(true);
                    setBannerIsLoading(false);
                    setTimeout(() => {
                        setBannerIsVisible(false)
                    }, 4000)
                }

                setName("");
                setEmail("");
                setMessage("");
            } catch (error) {
                console.log(error);
                setWasSent(false);
                setBannerIsLoading(false);
                setTimeout(() => {
                    setBannerIsVisible(false)
                }, 4000)
            }

        } else if (nameIsValid && emailIsValid && messageIsValid && (phone || address)) {
            setIsRobot(true);
            setStatusIsVisible(true);
        } else {
            setStatusIsVisible(true);
        }

    }

    async function handleChange() {

        if (isRobot && notabotCheckbox.current.checked) {
            if (nameIsValid && emailIsValid && messageIsValid) {

                document.getElementById("nab-container").classList.toggle("goodybag--is-visible")
                notabotCheckbox.current.checked = false
                setIsRobot(false)
                setBannerIsLoading(true);
                setBannerIsVisible(true);
    
                try {
                    const response = await Axios.post("/.netlify/functions/ses-send-email", { name, email, message });
                    if (response.status === 200) {
                        setWasSent(true);
                        setBannerIsLoading(false);
                        setTimeout(() => {
                            setBannerIsVisible(false)
                        }, 4000)
                    }
    
                    setName("");
                    setEmail("");
                    setMessage("");
                } catch (error) {
                    console.log(error);
                    setWasSent(false);
                    setBannerIsLoading(false);
                    setTimeout(() => {
                        setBannerIsVisible(false)
                    }, 4000)
                }

            } else {
                setStatusIsVisible(true);
            }

        } else {
            notabotCheckbox.current.disabled = true
        }
    }

    return (
        <div className="form-container bg--black-tr border-radius border-shadow">
            <div className="">
                <form onSubmit={e => handleSubmit(e)} autoComplete="off">
                    <div id="nab-container" className={`goodybag${isRobot ? " goodybag--is-visible" : ""}`}>
                        <div>
                            <input ref={notabotCheckbox} onChange={handleChange} type="checkbox" name="notabot" id="notabot" disabled={false}/>
                            <label htmlFor="notabot">I am not a robot</label>
                        </div>
                    </div>
                    

                    <div className="form-group">
                        <label htmlFor="name-field" className="form-group__label color--red">your name</label>
                        <div className={`form-group__input${nameIsValid ? " form-group__input--is-valid" : ""}`}>
                            <input ref={nameField} onChange={e => {
                                setName(e.target.value);
                                setNameIsValid(validateName(e.target.value));
                                }} type="text" name="name" id="name-field" value={name} />
                            <InputStatus isVisible={statusIsVisible} isValid={nameIsValid} />
                        </div>
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="email-field" className="form-group__label color--red">your email</label>
                        <div className={`form-group__input${emailIsValid ? " form-group__input--is-valid" : ""}`}>
                            <input ref={emailField} onChange={e => {
                                setEmail(e.target.value);
                                setEmailIsValid(validateEmail(e.target.value));
                            }} type="email" name="email" id="email-field" value={email} autoComplete="new-password" />
                            <InputStatus isVisible={statusIsVisible} isValid={emailIsValid} />
                        </div>
                    </div>
                
                    <div className="form-group">
                        <label htmlFor="message-field" className="form-group__label color--red">your message</label>
                        <div className={`form-group__input${messageIsValid ? " form-group__input--is-valid" : ""}`}>
                            <textarea ref={messageField} onChange={e => {
                                setMessage(e.target.value);
                                setMessageIsValid(validateMessage(e.target.value));
                            }} name="message" id="message-field" cols="33" rows="7" value={message} autoComplete="new-password" />
                            <InputStatus isVisible={statusIsVisible} isValid={messageIsValid} isLast={true} />
                        </div>
                    </div>

                    <label htmlFor="phone-field" className="goodybag"></label>
                    <input ref={phoneField} onChange={e => {
                            setPhone(e.target.value);
                        }} type="text" name="phone" id="phone-field" value={phone} autoComplete="new-password" className="goodybag"/>

                    <label htmlFor="address-field" className="goodybag"></label>
                    <input ref={addressField} onChange={e => {
                            setAddress(e.target.value);
                        }} type="text" name="address" id="address-field" value={address} autoComplete="new-password" className="goodybag"/>

                    <div className="form__btn-group">
                        <button type="submit" className={`btn btn--red${bannerIsLoading ? " btn--loading" : ""} `} disabled={bannerIsLoading}>
                            { 
                                bannerIsLoading ? <div className="loading-icon"><div></div></div> :
                                bannerIsVisible ? <img src={wasSent ? greenCheckmarkIcon : invalidIcon} alt={wasSent ? "valid" : "invalid"} style={wasSent ? {transform: "translateY(3px)"} : {}}/> : 
                                "send"
                            }
                        </button>
                        <FormConfirmationBanner isLoading={bannerIsLoading} wasSent={wasSent} isVisible={bannerIsVisible} />
                    </div>
                
                </form>

            </div>

        </div>
        
    )
}

export default ContactForm
