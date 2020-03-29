const utility = (updatedState, updatedValue) => {
    return {
        ...updatedState,
        ...updatedValue
    }
}

export default utility