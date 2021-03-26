import React from "react";

const DogSelector = ({ breads, setHasChild, setChild, setImage }) => {

    const breadChangeHandler = (e)=>{
        let sub = breads[e.target.value]
        if (sub.length>0){
            setHasChild(true)
            setChild(sub)
        }
        setImage(e.target.value)
    }

    return (
        <div>
            <label htmlFor="myid">Breads : </label>
            <select id="bread" onChange={breadChangeHandler}>
                {Object.keys(breads).map((ele)=>(
                    <option key={ele} value={ele}>{ele}</option>
                ))}
            </select>
        </div>
    );
};

export default DogSelector;