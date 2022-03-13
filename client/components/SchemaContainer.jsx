import React from 'react';
import SchemaWindow from './SchemaWindow';
import '../Styles/SchemaContainer.css'

function SchemaContainer(props) {
// schemawindow prop to be passed down
    const { schema, setSchema, currentQueryId, postQuery } = props;
    return(
            <div className='SchemaContainer'>
                <h4>Schema</h4>
            <SchemaWindow
                value={schema}
                onChange={setSchema}
                currentQueryId={currentQueryId}
                postQuery={postQuery}
            />
            </div>
    )
}

export default SchemaContainer;