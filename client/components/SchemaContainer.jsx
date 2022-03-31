import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from '@mui/material';
import { saveAs } from 'file-saver';
import Tooltip from '@mui/material/Tooltip';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material-darker.css';
import 'codemirror/theme/eclipse.css';
import 'codemirror/mode/javascript/javascript';
import '../Styles/SchemaContainer.css';
import { Controlled } from 'react-codemirror2';
import Loading from './Loading';

function SchemaContainer(props) {
  // schemawindow prop to be passed down
  const { value, tsSchema, onChange, currentQueryId, createQuery, isDarkTheme, setLoading, loading } = props;
  // const [sample, setSample] = useState(false);
  const [open, setOpen] = useState(false);

  // tooltip function close - copy button
  const handleTooltipClose = () => {
    setOpen(false);
  };

  // handleChange function for code-mirror editor window
  function handleChange(editor, data, valueCM) {
    onChange(valueCM);
  }

  // save schema functionality
  function handleSubmit() {
    createQuery(value, tsSchema);
  }

  // export code functionality
  const exportCode = () => {
    saveAs(
      new File([`${value}`], 'schemaExport.js', {
        type: 'text/plain;charset=utf-8',
      })
    );
  };

  // purple bar loading in schema container
  function loadingFunc() {
    setTimeout(() => setLoading(false), 2000);
    createSampleSchema();
  }

  const createSampleSchema = () => {
    const url = `http://www.squril.io/createGqlSchema`;
    fetch(url, {
      method: 'Post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        link: 'postgres://itjbbwxw:B0wiXF4aypk5kOpWNXmiU2JFV6CEvTW8@raja.db.elephantsql.com/itjbbwxw',
      }),
    })
      .then((data) => data.json())
      .then((data) => {
        const GQL = data;
        onChange(GQL);
      });
  };

  return (
    <div
      className='SchemaContainer'
      style={isDarkTheme ? { background: '#212121', borderRadius: '25px' } : { background: '#fff', borderRadius: '25px' }}
      data-testid='schema-container'
    >
      <h3>{currentQueryId ? `JS Schema ${currentQueryId}` : 'JS Schema'}</h3>
      <span>
        <Button type='button' className='save-schema' variant='contained' onClick={() => handleSubmit()} sx={{ borderRadius: 12.5, fontWeight: 'bold' }}>
          Save
        </Button>{' '}
        <Button
          sx={{ borderRadius: 12.5, fontWeight: 'bold' }}
          type='button'
          className='sample-schema'
          variant='contained'
          onClick={() => {
            setLoading(true);
            loadingFunc();
          }}
        >
          Sample
        </Button>{' '}
        <Button
          sx={{ borderRadius: 12.5, fontWeight: 'bold' }}
          variant='contained'
          onClick={() => {
            exportCode();
          }}
        >
          Export
        </Button>{' '}
        <ClickAwayListener onClickAway={handleTooltipClose}>
          <Tooltip
            PopperProps={{
              disablePortal: true,
            }}
            onClose={handleTooltipClose}
            open={open}
            placement='top'
            disableFocusListener
            disableHoverListener
            disableTouchListener
            title='Copied to clipboard'
          >
            <Button
              sx={{ borderRadius: 12.5, fontWeight: 'bold' }}
              variant='contained'
              onClick={() => {
                setOpen(true);
                navigator.clipboard.writeText(value);
                setTimeout(() => setOpen(false), 1000);
              }}
            >
              Copy
            </Button>
          </Tooltip>
        </ClickAwayListener>
      </span>
      {/* <FormControlLabel control={<Switch />} label='TypeScript' className='switch' /> */}
      {loading === false ? (
        <Controlled
          onBeforeChange={handleChange}
          value={value}
          options={{
            lineWrapping: true,
            showCursorWhenSelecting: true,
            scrollbarStyle: null,
            lint: true,
            mode: 'javascript',
            lineNumbers: true,
            theme: isDarkTheme ? 'material-darker' : 'eclipse',
          }}
        />
      ) : (
        <Loading isDarkTheme={isDarkTheme} />
      )}
    </div>
  );
}

SchemaContainer.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  currentQueryId: PropTypes.number,
  createQuery: PropTypes.func,
  isDarkTheme: PropTypes.bool,
  loading: PropTypes.bool,
  setLoading: PropTypes.func,
  tsSchema: PropTypes.string,
};

export default SchemaContainer;
