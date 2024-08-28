function UploadedImagePreview(props) {

    const [src, setSrc] = React.useState();

    React.useEffect(()=>{
        let reader = new FileReader();
        reader.readAsDataURL(props.file);
        reader.onload = event => {
            setSrc(event.target.result);
        }
    }, [props.file])
    
    return (
        <>
            {
                src!== undefined?(
                    <img src={src} />
                ):''
            }
        </>
    )
}
