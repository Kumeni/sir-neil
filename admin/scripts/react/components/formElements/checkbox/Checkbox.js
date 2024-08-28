function Checkbox(props){
    console.log(props.checked);
    const [checked, setChecked] = React.useState();
    
    React.useEffect(()=>{
        console.log(props.checked);
        //setChecked(props.checked);
    },[props.checked])

    return(
        <div className={'checkbox'}>
            <input 
                type="checkbox" 
                id={props.name} 
                //checked={props.checked}
                checked={props.checked}
                onChange = { event => {
                    setChecked(event.target.checked);
                    props.handleChange(event.target.checked);
                }}
                />
            <label  htmlFor={props.name}>{props.name}</label>
        </div>
    )
}