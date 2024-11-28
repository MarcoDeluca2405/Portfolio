import gsap from "gsap";
import React, { useEffect, useRef } from "react"
import styled from "styled-components";
import { IStyledComponentBase } from "styled-components/dist/types";


const RetNav = styled.div({
    width:"100vw",
    height:"50vh",
    borderBottomLeftRadius:"25px",
    borderBottomRightRadius:"25px",
    background: `linear-gradient(
        180deg,
        #000000 0%,
        #000000 1%,
        #2D2A2A 90%
      )`,
      position:"relative",
      display:"flex",
      justifyContent:"center"
});

const OvalNav = styled.div({
    width:"125px",
    height:"115px",
    borderRadius:"100%",
    position:"absolute",
    bottom:-50,  
    cursor:"pointer"
});

const OvalImage = styled.img({
    width:"100%",
    height:"100%",
    objectFit:"cover",
    borderRadius:"50%"
})


const NavBar:React.FC= () =>{

const retNavRef = useRef <HTMLDivElement>(null);
const ovalNavRef = useRef <HTMLDivElement>(null);



useEffect(()=>{
const handleMouseEnter = ()=>{
if(ovalNavRef.current){
    gsap.to(retNavRef.current,{
        boxShadow:"0 10px 40px 5px rgba(128, 0, 128, 0.6)",
        duration:0.3,
        yoyo: true,
        repeat: -1,
        ease: "power1.inOut",
    });
    gsap.to(ovalNavRef.current,{
        boxShadow:"0 20px 50px 1px rgba(128, 0, 128, 0.6)",
        duration:0.3,
        yoyo: true,
        repeat: -1,
        ease: "power1.inOut",
    })
}
}

const handleMouseLeave = ()=>{
    if(ovalNavRef.current){
        gsap.to(retNavRef.current, {
            boxShadow: "none",
            duration: 0.3,
            yoyo: false,
            repeat: 0,
           
          });
          gsap.to(ovalNavRef.current, {
            boxShadow: "none",
            duration: 0.3,
            yoyo: false,
            repeat: 0,
          });
    }
}

const ovaNavElm = ovalNavRef.current;

if(ovaNavElm){
    ovaNavElm.addEventListener("mouseenter",handleMouseEnter);
    ovaNavElm.addEventListener("mouseleave",handleMouseLeave);
}

},[]);

return(
<>
    <RetNav ref={retNavRef}>

    <OvalNav ref={ovalNavRef}>
        <OvalImage src="/public/Png/groupReact.png" alt="Image" />
    </OvalNav>

    </RetNav>
</>
)

}



export default NavBar;