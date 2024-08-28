function Popup(props){

    if(props.popup)
        return(
            <div className={'popup-container'}>
                <div>
                    <div className={'popup-close-container'}>
                        <span onClick={()=>props.handlePopup(false)} className={'popup-close'}>&times;</span>
                    </div>
                    <div className={'popup-content'}>
                        {props.children}
                    </div>
                </div>
            </div>
        )
    
    return null;
}