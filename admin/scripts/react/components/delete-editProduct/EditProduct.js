function EditProduct(props){

    const [name, setName] = React.useState({
        value:undefined, 
        error:undefined
    });

    const [price, setPrice] = React.useState({
        value:undefined,
        error:undefined
    });

    const [description, setDescription] = React.useState({
        value:undefined,
        error:undefined
    })

    const [brand, setBrand] = React.useState({
        value:undefined,
        error:undefined
    });
    const [SM, setSM] = React.useState(false);
    const [M, setM] = React.useState(false);
    const [L, setL] = React.useState(false);
    const [XL, setXL] = React.useState(false);
    const [XXL, setXXL] = React.useState(false);
    const [XXXL, setXXXL] = React.useState(false);

    const [sizes, setSizes] = React.useState({
        SM:false,
        M:false,
        L:false,
        XL:false,
        XXL:false,
        XXXL:false,
        error:undefined
    })

    const [featured, setFeatured] = React.useState(false);
    const [images, setImages] = React.useState([]);
    const [deletedImages, setDeletedImages] = React.useState([]);

    const handleNameChange = data => {
        let {value, error} = data;
        if(name.value != value)
            error = undefined;

        setName({
            value,
            error
        })
    }

    React.useEffect(()=>{
        if(props.activeProduct){
            handleNameChange({value:props.activeProduct.name});
            handlePriceChange({value:props.activeProduct.price});
            handleDescriptionChange({value:props.activeProduct.description});
            setSM(Boolean(Number(props.activeProduct.SM)));
            setM(Boolean(Number(props.activeProduct.M)));
            setL(Boolean(Number(props.activeProduct.L)));
            setXL(Boolean(Number(props.activeProduct.XL)));
            setXXL(Boolean(Number(props.activeProduct.XXL)));
            setXXXL(Boolean(Number(props.activeProduct.XXXL)));
            handleFeaturedChange(props.activeProduct.featured);
            handleFileChange(props.activeProduct.images);
        }
    }, [props.activeProduct])
    const handlePriceChange = data => {
        let {value, error} = data;
        if(price.value != value)
            error = undefined;
        
        setPrice({
            value,
            error
        })
    }

    const handleDescriptionChange = data => {
        let {value, error} = data;
        if(description.value != value)
            error = undefined;
        
        setDescription({
            value,
            error
        })
    }

    const handleSizesChange = (state, updateState) => {
        updateState(state);
    }
    /*const handleSizesChange = data => {
        let initialSizes = sizes;
        //console.log(data);
        setSizes();
        initialSizes.error = undefined;
        //if(data.SM === true || data.SM === false) initialSizes.SM = Boolean(data.SM);
        if(data.SM === true || data.SM === false) Boolean(data.SM);
        else if(data.M === true || data.M === false) initialSizes.M = Boolean(data.M);
        else if(data.L === true || data.L === false) initialSizes.L = Boolean(data.L);
        else if(data.XL === true || data.XL === false) initialSizes.XL = Boolean(data.XL);
        else if(data.XXL === true || data.XXL === false) initialSizes.XXL = Boolean(data.XXL);
        else if(data.XXXL === true || data.XXXL === false) initialSizes.XXXL = Boolean(data.XXXL);
        //console.log(initialSizes);
        setTimeout(setSizes(initialSizes), 500);
        console.log("updated sizes");
    }*/

    const handleFeaturedChange = data => {
        setFeatured(data);
    }

    const handleFileChange = files => {
        //setImages(images.concat(files));
        let holder = images, i;
        for(i=0; i<files.length; i++){
            holder = holder.concat(files[i]);
        }
        //setImages(images.concat(holder));
        setImages(holder);
    }

    const deleteImage = index => {
        //setImages(images.)
        let holder = deletedImages;
        if(images[index].id)
            holder = holder.concat(images[index].id);
        setDeletedImages(holder);
        
        holder = images;
        holder.splice(index, 1);
        setImages(holder.concat());
    }

    const handleSubmit = event => {
        event.preventDefault();
        console.log("Trying to submit");
        let formData = new FormData();

        if(props.activeProduct){
            formData.append("id", props.activeProduct.id);
            //formData.append("deletedImages", deletedImages);
        } else 
            formData.append("id", 0);

        formData.append("name", name.value);
        formData.append("price", price.value);
        formData.append("description", description.value);
        formData.append("featured", Number(featured));
        formData.append("SM", Number(SM));
        formData.append("M", Number(M));
        formData.append("L", Number(L));
        formData.append("XL", Number(XL));
        formData.append("XXL", Number(XXL));
        formData.append("XXXL", Number(XXXL));
        formData.append("brand", brand.value);
        formData.append("deletedImages", JSON.stringify(deletedImages));

        let i=0;
        for(i=0; i<images.length; i++){
            if(images[i].id == undefined){
                formData.append("images[]", images[i]);
            }
        }

        const API_ENDPOINT = "./server/products.php";
        const request = new XMLHttpRequest();

        request.open("POST", API_ENDPOINT, true);
        request.onreadystatechange = () => {
            if(request.readyState === 4 && request.status === 200){
                console.log(request);
                props.getProducts();
            }
        }

        request.send(formData);
    }

    return(
        <form className={'edit-product-form'} onSubmit={event => handleSubmit(event)}>
            <h2 id="title">{props.activeProduct?"Edit":"Create"} product</h2>
            <div className={'underline'}></div>
            <div>
                <div className={'edit-product-inputs'}>
                    <Input 
                        value={name.value}
                        error={name.error}
                        handleChange={ data => handleNameChange(data)}
                        placeholder={"Name"}
                        />
                    <Input 
                        value={price.value}
                        error={price.error}
                        handleChange={ data => handlePriceChange(data)}
                        placeholder={"Price"}
                        type={"number"}
                        />
                </div>
                <div>
                    <TextArea 
                        handleChange = { data => handleDescriptionChange(data)}
                        value={description.value}
                        error={description.errors}
                        placeholder={"Description"}
                    />
                </div>
            </div>
            <div className={'edit-product-available-sizes'}>
                {/* 
                    Update the checkboxes to work accordingly
                    Update the images update to function accordingly
                    Create the input for brands
                    Include it in the drop down
                    Link the products in the homepage
                */}
                <label>Available sizes:</label>
                <div>
                    <Checkbox 
                        name="SM" 
                        checked={SM} 
                        handleChange={ value => setSM(value) }
                        />
                    <Checkbox 
                        name="M" 
                        checked={M} 
                        handleChange={ value => setM(value) }
                        />
                    <Checkbox 
                        name="L" 
                        checked={L} 
                        handleChange={ value => setL(value) }
                        />
                    <Checkbox 
                        name="XL" 
                        checked={XL} 
                        handleChange={ value => setXL(value) }
                        />
                    <Checkbox 
                        name="XXL" 
                        checked={XXL} 
                        handleChange={ value => setXXL(value) }
                        />
                    <Checkbox 
                        name="XXXL" 
                        checked={XXXL} 
                        handleChange={ value => setXXXL(value) }
                        />
                </div>
            </div>
            <div className={'edit-product-brand'}>
                <label>Brand:</label>
                <Select />
            </div>
            <div className={'edit-product-featured'}>
                <label>Featured:</label>
                <Featured 
                    featured = {featured}
                    baseURL={props.baseURL}
                    handleChange = { data => handleFeaturedChange(data)}
                />
            </div>
            <div>
                <ImageUpload
                    images = {images}
                    maximumImages = {10}
                    handleChange = {file => handleFileChange(file)}
                    baseURL = {props.baseURL}
                    handleDelete = { index => deleteImage(index)}
                    />
            </div>
            <input type={"submit"} />
        </form>
    )
}