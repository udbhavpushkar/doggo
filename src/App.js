import "./App.css"
import React, { useEffect, useState } from "react";
import DogSelector from "./components/DogSelector";
import SubDogSelector from "./components/SubDogSelector";
export default function App() {

    const [breads, setBreads] = useState([])
    const [hasChild, setHasChild] = useState(false)
    const [child, setChild] = useState()
    const [image, setImage] = useState('affenpinscher')
    const [imgUrl, setImgUrl] = useState(`https://dog.ceo/api/breed/${image}/images/random`)
    const loadBreads = ()=>{
        fetch(`https://dog.ceo/api/breeds/list/all`)
            .then(res=>res.json())
            .then(data=> {
                setBreads(data.message)
            })
            .catch(err=>err)
    }

    const loadImage = ()=>{
        fetch(`https://dog.ceo/api/breed/${image}/images/random`)
            .then(res=>res.json())
            .then(data=>{
                setImgUrl(data.message)
            })
            .catch(err=>err)
    }

    useEffect(loadBreads,[])
    useEffect(loadImage, [image])

  return (
    <div className="container">
        <DogSelector setImage={setImage} setHasChild={setHasChild} setChild={setChild} breads={breads}/>
        {hasChild ? <SubDogSelector child={child}/> : null}
        <img src={imgUrl} alt={image}/>
    </div>
  );
}
