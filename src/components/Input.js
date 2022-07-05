import React from "react";

function Input(props){

    return (
        <div className="form-town">
            <input 
                placeholder='Ciudad' 
                className='input'
                value={props.input}
                type='text'
                name='search'
                onChange={props.search}
            >
            </input>
            <button onClick={props.submit}>
                Buscar
            </button>
        </div>
        
    );
}

export default Input;