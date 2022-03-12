import React from 'react';

function URIInput(props) {
    
    return(
        <div className='URIInput'>
            <form>
                <label form='postgreSQL'>PostgreSQL URI:</label><br></br>
                <input type='text' id='URIAddr' name='URIAddr'></input><button type='button' id='URIAddrButton'>Go!</button>
            </form> 
        </div>
    )
}

export default URIInput;