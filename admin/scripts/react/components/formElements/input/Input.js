function Input(props){
    return(
        <div className={'input'}>
            <input 
                onChange={event=>props.handleChange({value:event.target.value})} 
                value={props.value} 
                placeholder={props.placeholder}
                type={props.type?props.type:"text"}
                />
            <span>{props.error}</span>
        </div>
    )
}