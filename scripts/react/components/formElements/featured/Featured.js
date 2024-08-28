function Featured(props){
    return(
        <div 
            onClick = {()=>props.handleChange(!props.featured)}
            className={'featured'}>
            {
                props.featured == true?
                    <img src={props.baseURL + "/img/star filled.png"} alt={"filled star"} />
                    :<img src={props.baseURL + "/img/star.png"} alt={"blank star"} />
                }
        </div>
    )
}