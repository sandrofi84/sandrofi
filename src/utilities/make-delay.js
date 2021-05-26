const makeDelay = (baseDelay, addDelay) => {
    return {animationDelay: `${baseDelay + addDelay * .1}s`}
}

export default makeDelay

