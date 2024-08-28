//import UploadedImagePreview from './UploadedImagePreview';
function ImageUpload(props){

    const [images, setImages] = React.useState([]);

    const imageURL = (baseURL, image) => {
        if(image != null){
            return baseURL + image.path;
        } else {
            return "/images/no-image-available.jpg";
        }
    };
    
    const imageAlt = image => {
        if(image != null){
            return image.name;
        } else {
            return "no image available";
        }
    };

    const image = (image, index) => {
        if(image.id)
            return (
                <li key={index} className={"image-upload-image"}>
                    <img src={imageURL(props.baseURL, image)} alt={imageAlt(image)} />
                    <button 
                        onClick = { event => {
                            event.preventDefault();
                            props.handleDelete(index);
                        }} 
                        className= {"image-upload-remove"+ " bg-danger text-white"}
                        >&times;</button>
                </li>
            )

        return(
            <li key={index} className={"image-upload-image"}>
                <UploadedImagePreview file={image} />
                <button 
                    onClick = { event => {
                        event.preventDefault();
                        props.handleDelete(index);
                    }} 
                    className= {"image-upload-remove"+ " bg-danger text-white"}
                    >&times;</button>
            </li>
        )
    }
    return(
        <div className={"image-upload-container"}>
            <p><strong>{"Product images"}</strong></p>
            <div className={"image-upload-horizontalScroll"}>
                <ul>
                    {
                        (props.images != undefined && props.images.length > 0) &&
                            props.images.map((element, index) => image(element, index))
                    }
                    {
                        (images != undefined && images.length < props.maximumImages && props.images != undefined && props.images.length < props.maximumImages)  &&
                            <li className = {"image-upload-dropzone"}>
                                <input 
                                    type="file" 
                                    onChange={event => {
                                        props.handleChange(event.target.files);
                                        event.target.value="";
                                    }}
                                    accept={".jpg, .JPG, .png, .PNG, .jpeg, .JPEG"}
                                    multiple
                                    />
                                    
                            </li>
                    }
                </ul>
            </div>
        </div>
    )
}