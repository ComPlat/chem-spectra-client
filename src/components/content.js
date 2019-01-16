import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { SpectraViewer } from 'react-spectra-viewer';

const titleStyle = {
  backgroundColor: '#f5f5f5',
  border: '2px solid #e3e3e3',
  borderRadius: '10px',
  height: 250,
  lineHeight: '250px',
  marginTop: 100,
  textAlign: 'center',
};

const txtStyle = {
  lineHeight: '200px',
};

const renderTitle = () => (
  <div style={titleStyle}>
    <h1 style={txtStyle}>
      Welcome to ChemSpectra
    </h1>
  </div>
);

const renderLoading = () => (
  <div style={titleStyle}>
    <h1 style={txtStyle}>
      Loading...
    </h1>
  </div>
);

const buildData = (target) => {
  if (!target) return { isExist: false };
  const sp = target && target.spectrum;
  const input = sp ? sp.data[0] : {};
  const xLabel = sp ? `X (${sp.xUnit})` : '';
  const yLabel = sp ? `Y (${sp.yUnit})` : '';
  const peakObjs = target && target.peakObjs;
  return {
    input, xLabel, yLabel, peakObjs, isExist: true,
  };
};

const Content = ({
  fileSt, loadingSt,
}) => {
  if (loadingSt) return renderLoading();
  if (!fileSt) return renderTitle();

  const {
    input, xLabel, yLabel, peakObjs, isExist,
  } = buildData(fileSt.jcamp);

  if (!isExist) return renderTitle();

  return (
    <SpectraViewer
      input={input}
      xLabel={xLabel}
      yLabel={yLabel}
      peakObjs={peakObjs}
      writePeaks={() => console.log('writePeaks')}
      savePeaks={() => console.log('savePeaks')}
    />
  );
};

const mapStateToProps = (state, props) => ( // eslint-disable-line
  {
    fileSt: state.file,
    loadingSt: state.loading,
  }
);

const mapDispatchToProps = dispatch => (
  bindActionCreators({
  }, dispatch)
);

Content.propTypes = {
  fileSt: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
  ]).isRequired,
  loadingSt: PropTypes.bool.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Content);

