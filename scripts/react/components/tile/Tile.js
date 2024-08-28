function Tile(props) {

	const getName = product => { 
		return product.name 
	};
	const getImages = product => {
		return product.images
	};
	const getPrices = product => { 
		return product.price
	};

	return (
		<div className={"tile-container"}>
		    <Images 
				baseURL={props.baseURL}
				images = {getImages(props.product)}
				mosaic={true}
			/>
			<TileDetails
				name={getName(props.product)}
				disabled={ props.product.disabled }
				edit = { () => props.edit()}
				delete = { () => props.delete()}
				disable = { () => props.disable()}
				addReferrals = { () => props.addReferrals()}
				referrals = { props.referrals }
			>
				<p className={"tile-price"}>{ getPrices(props.product) }</p>
			</TileDetails>
		</div>
	)
	
}