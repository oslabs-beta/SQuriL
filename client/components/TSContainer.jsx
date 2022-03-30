import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Controlled } from 'react-codemirror2';
import { Button } from '@mui/material';
import { saveAs } from 'file-saver';
import Tooltip from '@mui/material/Tooltip';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Loading from './Loading';
import '../Styles/TSContainer.css';

function TSContainer(props) {
  const { value, onChange, isDarkTheme, setLoading, loading, currentQueryId, createTsSchema } = props;
  const [tsLoading, setTsLoading] = useState(false);
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
    createQuery(value);
  }

  // export code functionality
  const exportCode = () => {
    saveAs(
      new File([`${value}`], 'TSschemaExport.ts', {
        type: 'text/plain;charset=utf-8',
      })
    );
  };

  return (
    <div
      className='TSContainer'
      style={isDarkTheme ? { background: '#212121', borderRadius: '25px' } : { background: '#fff', borderRadius: '25px' }}
      data-testid='schema-container'
    >
      <h3>{currentQueryId ? `TS Schema ${currentQueryId}` : 'TS Schema'}</h3>
      <span>
        <Button
          type='button'
          className='gen-schema'
          variant='contained'
          onClick={() => {
            setTsLoading(true);
            createTsSchema();
            setTimeout(() => setTsLoading(false), 2000);
          }}
          sx={{ borderRadius: 12.5, fontWeight: 'bold' }}
        >
          Generate
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
      {tsLoading === false ? (
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

TSContainer.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  isDarkTheme: PropTypes.bool,
  loading: PropTypes.bool,
  setLoading: PropTypes.func,
  currentQueryId: PropTypes.number,
  createTsSchema: PropTypes.func,
};

export default TSContainer;
