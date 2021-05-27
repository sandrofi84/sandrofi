import React from 'react'

import quotMarks from '../images/quotation-marks.svg'

const Qm = (props) => {

    const className = props.opening && props.high ? "icon-qmarks--opening-high" 
        : props.opening && !props.high ? "icon-qmarks--opening" 
        : props.closing ? "icon-qmarks--closing" 
        : ""

    return (
        <img src={quotMarks} alt="" className={className}/>
    )
}

export default Qm
