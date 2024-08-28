function Delete(props){
    const {useState, useEffect, useRef} = React;

    const container = useRef(null);
    const knob = useRef(null);

    const [state, setState] = useState(false);

    const handleStateChange = (state) => {
        console.log(state);
        if(state == false){
            container.current.style.border = "4px solid green";
            knob.current.style.left = "0px";
            knob.current.style.right = "unset";
            knob.current.style.backgroundColor = "green";
            knob.current.style.border = "4px solid green";
        } else if(state == true){
            container.current.style.border = "4px solid red";
            knob.current.style.right = "0px";
            knob.current.style.left = "unset";
            knob.current.style.backgroundColor = "red";
            knob.current.style.border = "4px solid red";
        }
        setState(state);
        props.handleChange(state);
    }

    return(
        <div onClick={() => handleStateChange(!state)}ref={container} className="available-container">
            <div ref={knob} className="available-knob"></div>
        </div>
    )
}