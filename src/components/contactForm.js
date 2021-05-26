import React, { useState, useRef, useContext } from 'react'
import Axios from 'axios'

import InputStatus from "./inputStatus"
import FormConfirmationBanner from "./formConfirmationBanner"
import greenCheckmarkIcon from "../images/icon-checkmark.svg"
import invalidIcon from "../images/icon-invalid.svg"
import playIcon from '../images/play.svg'
import pauseIcon from '../images/pause.svg'

import StateContext from '../context/stateContext'

const ContactForm = () => {
    const {baseDelay, delayAnimation} = useContext(StateContext)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
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
                const response = await Axios.post(`/api/ses-send-email`, { name, email, message });
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
                setNameIsValid(false);
                setEmailIsValid(false);
                setMessageIsValid(false);

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
            // setStatusIsVisible(true);
        } else {
            // setStatusIsVisible(true);
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
                    const response = await Axios.post("/api/ses-send-email", { name, email, message });
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
                    setNameIsValid(false);
                    setEmailIsValid(false);
                    setMessageIsValid(false);

                } catch (error) {
                    console.log(error);
                    setWasSent(false);
                    setBannerIsLoading(false);
                    setTimeout(() => {
                        setBannerIsVisible(false)
                    }, 4000)
                }

            } else {
                // setStatusIsVisible(true);
            }

        } else {
            notabotCheckbox.current.disabled = true
        }
    }

    return (
        <div className="form-container">
            
                <form onSubmit={e => handleSubmit(e)} autoComplete="off" className="form">
                    <div id="nab-container" className={`goodybag${isRobot ? " goodybag--is-visible" : ""}`}>
                        <div className="bg--orange-tr border-radius">
                            <input ref={notabotCheckbox} onChange={handleChange} type="checkbox" name="notabot" id="notabot" disabled={false}/>
                            <label htmlFor="notabot">I am not a robot</label>
                        </div>
                    </div>
                    

                    <div className="form-group">
                        <label htmlFor="name-field" className="form-group__label color--red animation--slide-in" style={delayAnimation(baseDelay, 0)}>your name.</label>
                        <div className={`form-group__input${nameIsValid ? " form-group__input--is-valid" : ""} animation--slide-in`} style={delayAnimation(baseDelay, 1)}>
                            <input ref={nameField} onChange={e => {
                                setName(e.target.value);
                                setNameIsValid(validateName(e.target.value));
                                }} type="text" name="name" id="name-field" value={name} />
                            <InputStatus isValid={nameIsValid} />
                        </div>
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="email-field" className="form-group__label color--red animation--slide-in" style={delayAnimation(baseDelay, 2)}>your email.</label>
                        <div className={`form-group__input${emailIsValid ? " form-group__input--is-valid" : ""} animation--slide-in`} style={delayAnimation(baseDelay, 3)}>
                            <input ref={emailField} onChange={e => {
                                setEmail(e.target.value);
                                setEmailIsValid(validateEmail(e.target.value));
                            }} type="email" name="email" id="email-field" value={email} autoComplete="new-password" />
                            <InputStatus isValid={emailIsValid} />
                        </div>
                    </div>
                
                    <div className="form-group">
                        <label htmlFor="message-field" className="form-group__label color--red animation--slide-in" style={delayAnimation(baseDelay, 4)}>your message.</label>
                        <div className={`form-group__input${messageIsValid ? " form-group__input--is-valid" : ""} animation--slide-in`} style={delayAnimation(baseDelay, 5)}>
                            <textarea ref={messageField} onChange={e => {
                                setMessage(e.target.value);
                                setMessageIsValid(validateMessage(e.target.value));
                            }} name="message" id="message-field" cols="33" rows="5" value={message} autoComplete="new-password" />
                            <InputStatus isValid={messageIsValid} isLast={true} />
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

                    <div className="form__btn-group animation--slide-in" style={delayAnimation(baseDelay, 6)}>
                        <button type="submit" className={`btn btn--red${bannerIsLoading ? " btn--loading" : ""}${nameIsValid && emailIsValid && messageIsValid ? "" : " btn--disabled"}`} disabled={bannerIsLoading} style={!bannerIsLoading && bannerIsVisible ? {backgroundColor: "red"} : {}}>
                            { 
                                bannerIsLoading ? <div className="loading-icon"><div></div></div> :
                                bannerIsVisible ? <img src={wasSent ? greenCheckmarkIcon : invalidIcon} alt={wasSent ? "valid" : "invalid"} style={wasSent ? {transform: "translateY(3px)"} : {}}/> : 
                                "send"
                            }
                            {
                                !bannerIsLoading && !bannerIsVisible && nameIsValid && emailIsValid && messageIsValid ? <span className="animation--shake" style={{display: "inline-block"}}><img src={playIcon} alt="" className="icon-play"/></span> 
                                : !bannerIsLoading && !bannerIsVisible && !(nameIsValid && emailIsValid && messageIsValid) ? <span className="" style={{display: "inline-block"}}><img src={pauseIcon} alt="" className="icon-play"/></span>
                                : ""
                            }
                        </button>
                        <FormConfirmationBanner isLoading={bannerIsLoading} wasSent={wasSent} isVisible={bannerIsVisible} />
                    </div>
                
                </form>

            

        </div>
        
    )
}

export default ContactForm
