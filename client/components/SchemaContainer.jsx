import React from 'react';
import SchemaWindow from './SchemaWindow';
import '../Styles/SchemaContainer.css'

function SchemaContainer(props) {
// schemawindow prop to be passed down
    const { schema, setSchema, currentQueryId } = props;
    return(
            <div className='SchemaContainer'>
                <h4>Schema</h4>
            <SchemaWindow
                value={schema}
                onChange={setSchema}
                currentQueryId={currentQueryId}
            />
            </div>
    )
}

export default SchemaContainer;