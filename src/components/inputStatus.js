import React from 'react'
import greenCheckmarkIcon from "../images/icon-checkmark.svg"
import invalidIcon from "../images/icon-invalid.svg"

const InputStatus = (props) => {
    const {isValid, isLast} = props


    return (
        <div className={`form-group__input-status${isLast ? " form-group__input-status--last" : ""}`}>
            <img src={isValid ? greenCheckmarkIcon : invalidIcon} alt={isValid ? "valid" : "invalid"}/>    
        </div>
    )
}

export default InputStatus
