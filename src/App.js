import "./App.css"
import React, { useEffect, useState } from "react";
import DogSelector from "./components/DogSelector";
import SubDogSelector from "./components/SubDogSelector";
export default function App() {

    const [breads, setBreads] = useState([])
    const [hasChild, setHasChild] = useState(false)
    const [child, setChild] = useState()
    const [image, setImage] = useState('https://via.placeholder.com/300/09f/fff.png')
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
                setImage(data.message)
            })
            .catch(err=>err)
    }

    useEffect(loadBreads,[])
    useEffect(loadImage, [hasChild])

  return (
    <div className="container">
        <DogSelector setImage={setImage} setHasChild={setHasChild} setChild={setChild} breads={breads}/>
        {hasChild ? <SubDogSelector child={child}/> : null}
        <img src={image} alt={image}/>
    </div>
  );
}
