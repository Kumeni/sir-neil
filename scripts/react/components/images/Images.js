function Images(props) {

	const imageURL = image => props.baseURL+image.path;
	return (
		<div className={"images"}>
			{/*
				props.images &&
					<span className={'text-white'}>{props.images.length}</span>
			*/}
			
			{/* <Swiper
				spaceBetween={1}
				slidesPerView={1}
				//onSlideChange={() => console.log('slide change')}
				//onSwiper={(swiper) => console.log(swiper)}
			> */}
				{/* <div className={props.mosaic?style.imageMosaic:style.image}>
					<img src={"/images/victor-2PJMDIgK9EA-unsplash.jpg"} alt="" />
				</div> */}
					{/*<SwiperSlide> */}
				{
					(props.images && props.images.length > 0) &&
						<div className={props.mosaic?"imageMosaic":"image"}>
							<img src={imageURL(props.images[0])} alt="" />
						</div>
				}
				{/* </SwiperSlide>*/}
			{/*</Swiper> */}
		</div>
	)
}