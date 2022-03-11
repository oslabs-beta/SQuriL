import React from 'react';
import SchemaWindow from './SchemaWindow';
import { Button } from '@mui/material';
import styles from '../Styles/SchemaContainer.css'

function SchemaContainer(props) {
// schemawindow prop to be passed down
    const { schema, setSchema } = props;
    return(
            <div className='SchemaContainer'>
                <div className='SchemaContainerHeader'>
                <span>
                <h4>Schema</h4>
                <Button variant="contained" type='submit' className='submitButtons' value="Save">Save</Button>
                <Button variant="contained" type='submit' className='submitButtons' value="Update">Update</Button>
                </span>
                </div>
            <br></br>
            <SchemaWindow
                value={schema}
                onChange={setSchema}
            />
            </div>
    )
}

export default SchemaContainer;