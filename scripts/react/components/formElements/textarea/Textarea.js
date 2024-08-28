function TextArea(props){
    return(
        <div className={"textarea"}>
            <textarea 
                onChange={event => props.handleChange({value:event.target.value})}
                value={props.value}
                placeholder={props.placeholder}
                ></textarea>
            <span className="error">{props.error}</span>
        </div>
    )
}