const Die = (props) => {
    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "#fff"
    }
    return (
        <div className="die-face" style={styles} onClick={props.handleHold}>
            <h2 className="die-num">{props.value}</h2>
        </div>
    )
}

export default Die