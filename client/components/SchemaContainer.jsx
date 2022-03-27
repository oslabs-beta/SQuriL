import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from '@mui/material';
import { saveAs } from 'file-saver';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Tooltip from '@mui/material/Tooltip';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material-darker.css';
import 'codemirror/theme/cobalt.css';
import 'codemirror/mode/javascript/javascript';
import '../Styles/SchemaContainer.css';
import { Controlled } from 'react-codemirror2';
import Loading from './Loading';

function SchemaContainer(props) {
  // schemawindow prop to be passed down
  const { value, onChange, currentQueryId, createQuery, isDarkTheme, setLoading, loading } = props;
  // const [sample, setSample] = useState(false);
  const [open, setOpen] = useState(false);

  // tooltip function close - copy button
  const handleTooltipClose = () => {
    setOpen(false);
  };

  // // tooltip function open - copy button
  // const handleTooltipOpen = () => {
  //   setOpen(true);
  // };

  // handleChange function for code-mirror editor window
  function handleChange(editor, data, valueCM) {
    onChange(valueCM);
  }

  // save schema functionality
  function handleSubmit() {
    createQuery(value);
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
    const url = `/api/createGqlSchema`;
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
      style={isDarkTheme ? { background: 'rgba(255, 255, 255, 0.3)', borderRadius: '25px' } : { border: '1px solid black' }}
      data-testid='schema-container'
    >
      <h3>{currentQueryId ? `Schema ${currentQueryId}` : 'Schema'}</h3>
      <span>
        <Button type='button' className='save-schema' variant='contained' onClick={() => handleSubmit()}>
          Save
        </Button>{' '}
        {/* <button type='submit' className='updateSchema' value="Update">Update</button> */}
        <Button
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
      <FormControlLabel control={<Switch />} label='TypeScript' className='switch' />
      {loading === false ? (
        <Controlled
          onBeforeChange={handleChange}
          value={value}
          options={{
            lineWrapping: true,
            showCursorWhenSelecting: true,
            lint: true,
            mode: 'javascript',
            lineNumbers: true,
            theme: isDarkTheme ? 'material-darker' : 'cobalt',
          }}
        />
      ) : (
        <Loading />
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
};

export default SchemaContainer;
