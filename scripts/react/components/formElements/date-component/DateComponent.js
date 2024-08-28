function DateComponent(props){
    return(
        <div className="date">
            <input
                onChange={event=>props.handleChange({value:event.target.value})} 
                value={props.value} 
                type="date" />
            <span className="error">{props.error}</span>
        </div>
    )
}