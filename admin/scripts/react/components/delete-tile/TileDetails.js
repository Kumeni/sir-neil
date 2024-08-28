function TileDetails(props) {

    const [showMoreActions, setShowMoreActions] = React.useState(false);

    const handleShowMoreActions = () => {
        setShowMoreActions(!showMoreActions);
    }

    
    return (
        <div className={"tile-details-container"}>
            <div className = {"tile-details-title"}>
                <div>
                    <span className={props.disabled && 'text-gray'}>{props.name}</span>
                    {
                        showMoreActions &&
                            <MoreActions 
                                setShowMoreActions = { data => setShowMoreActions(data)}
                                edit = { () => props.edit()}    
                                delete = { () => props.delete()}
                                disable = { () => props.disable()}
                                disabled = {Boolean(Number(props.disabled))}
                            />
                    }
                </div>
                <div onClick = { ()=> handleShowMoreActions()} className={"tile-details-more"}>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
            <div className={"tile-details-content"}>
                {/* <Referrals addReferrals={ () => props.addReferrals()} referrals={props.referrals}/> */}
                {
                    props.children
                }
                {console.log()}
                {
                    Boolean(Number(props.disabled)) &&
                        <div className={"tile-details-disabled"}></div>
                }
            </div>
            
        </div>
    )
}