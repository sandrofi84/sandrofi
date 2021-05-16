import React from 'react'

const FormConfirmationBanner = (props) => {
    const { wasSent, isVisible, isLoading } = props;

    const style = wasSent ? { color: "rgb(31, 197, 53)"} : { color: "red"}
    const message = wasSent ? "message sent!" : "sorry, failed to send..."

    return (
        <div style={style} className={`banner${ isVisible && !isLoading ? " banner--is-visible" : ""}`}>
            {message}
        </div>
    )
}

export default FormConfirmationBanner
