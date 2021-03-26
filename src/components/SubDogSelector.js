import React from "react";

const SubDogSelector = ({child }) => {


    return (
        <div>
            <label htmlFor="myid">Sub Breads : </label>
            <select id="bread">
                {child.map((ele)=>(
                    <option key={ele} value={ele}>{ele}</option>
                ))}
            </select>
        </div>
    );
};

export default SubDogSelector;