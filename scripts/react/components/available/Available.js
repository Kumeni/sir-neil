function Available(props){
    const {useState, useEffect, useRef} = React;

    const container = useRef(null);
    const knob = useRef(null);

    const [state, setState] = useState(props.paymentConfirmed);

    const handleStateChange = (state) => {
        if(state == false){
            container.current.style.border = "4px solid red";
            knob.current.style.left = "0px";
            knob.current.style.right = "unset";
            knob.current.style.backgroundColor = "red";
            knob.current.style.border = "4px solid red";
        } else if(state == true){
            container.current.style.border = "4px solid green";
            knob.current.style.right = "0px";
            knob.current.style.left = "unset";
            knob.current.style.backgroundColor = "green";
            knob.current.style.border = "4px solid green";
        }
        setState(state);
        if(props.handleChange) props.handleChange(state);
    }

    useEffect(()=>{
        //if(state != props.paymentConfirmed){
            if(props.paymentConfirmed == false){
                container.current.style.border = "4px solid red";
                knob.current.style.left = "0px";
                knob.current.style.right = "unset";
                knob.current.style.backgroundColor = "red";
                knob.current.style.border = "4px solid red";
            } else if(props.paymentConfirmed == true){
                container.current.style.border = "4px solid green";
                knob.current.style.right = "0px";
                knob.current.style.left = "unset";
                knob.current.style.backgroundColor = "green";
                knob.current.style.border = "4px solid green";
            }
            setState(props.paymentConfirmed);
        //}
    }, [props.paymentConfirmed])

    return(
        <div onClick={() => handleStateChange(!state)} ref={container} className="available-container">
            <div ref={knob} className="available-knob"></div>
        </div>
    )
}