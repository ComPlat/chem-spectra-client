import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { SpectraViewer } from 'react-spectra-viewer';
import {
  convertPeaksToStr, buildData, spectraOps,
} from '../utils/edit';

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

const renderLoading = () => (
  <div style={titleStyle}>
    <h1 style={txtStyle}>
      Loading...
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
    const body = convertPeaksToStr(peaks, layout);
    const desc = ops.head + body + ops.tail;
    this.setState({ desc });
  }

  savePeaks(peaks, shift) {
    console.log(peaks, shift);
  }

  render() {
    const { desc } = this.state;
    const { fileSt, loadingSt } = this.props;
    if (loadingSt) return renderLoading();
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
        />
      </div>
    );
  }
}

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
