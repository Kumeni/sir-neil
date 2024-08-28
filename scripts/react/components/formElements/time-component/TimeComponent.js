function TimeComponent(props){
    return(
        <div className="time">
            <input 
                onChange={event=>props.handleChange({value:event.target.value})} 
                value={props.value} 
                type="time" />
            <span className="error">{props.error}</span>
        </div>
    )
}