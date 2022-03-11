import React from 'react';
import SchemaWindow from './SchemaWindow';
import '../Styles/SchemaContainer.css'

function SchemaContainer(props) {
// schemawindow prop to be passed down
    const { schema, setSchema } = props;
    return(
            <div className='SchemaContainer'>
                <h4>Schema</h4>
                <span>
                <button type='submit' className='saveSchema' value="Save">Save</button>
                <button type='submit' className='updateSchema' value="Update">Update</button>
                </span>
            <SchemaWindow
                value={schema}
                onChange={setSchema}
            />
            </div>
    )
}

export default SchemaContainer;