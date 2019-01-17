import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { SpectraViewer } from 'react-spectra-viewer';

import { saveFile } from '../actions/action_file';
import {
  writePeaksBody, toPeakStr, buildData, spectraOps,
} from '../utils/util_edit';

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

const editorStyle = {
  border: '1px solid',
  borderRadius: '8px',
  marginTop: 20,
};

const renderTitle = () => (
  <div style={titleStyle}>
    <h1 style={txtStyle}>
      Welcome to ChemSpectra
    </h1>
  </div>
);

class Content extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      desc: '',
    };

    this.writePeaks = this.writePeaks.bind(this);
    this.savePeaks = this.savePeaks.bind(this);
  }

  componentDidUpdate(prevProps) {
    const prevSrc = prevProps.fileSt.src;
    const { fileSt } = this.props;
    const nextSrc = fileSt.src;
    if (prevSrc !== nextSrc) {
      this.setState({ desc: '' }); // eslint-disable-line
      // https://github.com/airbnb/javascript/issues/1875
    }
  }

  writePeaks(peaks, layout) {
    const ops = spectraOps[layout];
    const body = writePeaksBody(peaks, layout);
    const desc = ops.head + body + ops.tail;
    this.setState({ desc });
  }

  savePeaks(peaks, shift) {
    const { saveFileAct } = this.props;
    const peakStr = toPeakStr(peaks);
    saveFileAct({ peakStr, shift });
  }

  render() {
    const { desc } = this.state;
    const { fileSt } = this.props;
    if (!fileSt) return renderTitle();

    const {
      input, xLabel, yLabel, peakObjs, isExist,
    } = buildData(fileSt.jcamp);
    if (!isExist) return renderTitle();

    return (
      <div>
        <SpectraViewer
          input={input}
          xLabel={xLabel}
          yLabel={yLabel}
          peakObjs={peakObjs}
          writePeaks={this.writePeaks}
          savePeaks={this.savePeaks}
        />
        <textarea
          rows="6"
          cols="150"
          placeholder="peaks"
          style={editorStyle}
          value={desc}
          readOnly
        />
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ( // eslint-disable-line
  {
    fileSt: state.file,
  }
);

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    saveFileAct: saveFile,
  }, dispatch)
);

Content.propTypes = {
  fileSt: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
  ]).isRequired,
  saveFileAct: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Content);
