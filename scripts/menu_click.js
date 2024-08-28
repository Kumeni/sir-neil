let menuState = "CLOSED", lastScrollPos;
const handleMenuClick = () => {
    let bars = document.getElementById("menu").getElementsByTagName("div"), i, menu_info = document.getElementsByClassName("menu_info")[0];
    /*main = document.getElementsByTagName("main")[0],
    footer = document.getElementsByTagName("footer")[0],
    header = document.getElementsByTagName("header"), menuInfoHeight;*/

    if(menuState === "CLOSED"){
        for(i=1; i<bars.length; i++){
            bars[i].style.width = "100%";
        }
        menu_info.style.marginRight = "0px";
        menu_info.style.backgroundColor = "black";
        document.getElementById("menu-section").style.backgroundColor = "black";
        document.getElementsByTagName("body")[0].style.overflow = "hidden";
        /*lastScrollPos = window.scrollY;
        window.scrollTo(0,0);
        menuInfoHeight = menu_info.getBoundingClientRect().height;

        main.style.height = menuInfoHeight + "px";
        
        footer.style.display = "none";*/

        menuState = "OPEN";
    
    } else if( menuState === "OPEN"){
        for (i=1; i<bars.length; i++){
            if(i === 1)
                bars[i].style.width = "50%";
            else
                bars[i].style.width = "25%";
        }
        menu_info.style.marginRight = -window.innerWidth +"px";
        menu_info.style.backgroundColor = "transparent";
        document.getElementById("menu-section").style.backgroundColor = "inherit";
        document.getElementsByTagName("body")[0].style.overflow = "auto";
        /*main.style.height = "auto";
        
        footer.style.display = "block";
        if(lastScrollPos !== undefined)
            window.scrollTo(0, lastScrollPos);*/
        menuState = "CLOSED";
    }
    
    return null;

}

