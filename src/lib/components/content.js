import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { SpectraViewer, FN } from 'react-spectra-viewer';

import { saveFileInit } from '../actions/action_file';
import { predictByPeaksInit } from '../actions/action_predict';

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
    this.predict = this.predict.bind(this);
    // this.updatInput = this.updatInput.bind(this);
    this.buildPredictObj = this.buildPredictObj.bind(this);
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

  rmDollarSign(target) {
    return target.replace(/\$/g, '');
  }

  writePeaks(peaks, layout, shift, isAscend) {
    const body = FN.peaksBody(peaks, layout, shift, isAscend);
    const wrapper = FN.peaksWrapper(layout, shift);
    const desc = this.rmDollarSign(wrapper.head) + body + wrapper.tail;
    this.setState({ desc });
  }

  savePeaks(peaks, layout, shift) {
    const { saveFileInitAct } = this.props;
    const fPeaks = FN.rmRef(peaks, shift);
    const peakStr = FN.toPeakStr(fPeaks);

    saveFileInitAct({ peakStr, shift });
  }

  predict(peaks, layout, shift) {
    const { predictByPeaksInitAct, molSt } = this.props;
    const molfile = molSt.src;

    predictByPeaksInitAct({
      molfile, peaks, layout, shift,
    });
  }

  // updatInput(e) {
  //   const molecule = e.target.value;
  //   this.setState({ molecule });
  // }

  buildPredictObj() {
    const { molSt, predictSt } = this.props;

    const predictObj = {
      btnCb: this.predict,
      // inputCb: this.updatInput,
      molecule: molSt.src,
      predictions: predictSt.result,
    };
    return predictObj;
  }

  render() {
    const { desc } = this.state;
    const { fileSt } = this.props;
    if (!fileSt) return renderTitle();

    const {
      input, xLabel, yLabel, peakObjs, isExist,
    } = FN.buildData(fileSt.jcamp);
    if (!isExist) return renderTitle();

    const operations = [
      { name: 'save peaks', value: this.savePeaks },
      { name: 'write peaks', value: this.writePeaks },
    ].filter(r => r.value);

    const predictObj = this.buildPredictObj();

    return (
      <div>
        <SpectraViewer
          input={input}
          xLabel={xLabel}
          yLabel={yLabel}
          peakObjs={peakObjs}
          predictObj={predictObj}
          operations={operations}
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
    molSt: state.mol,
    fileSt: state.file,
    predictSt: state.predict,
  }
);

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    saveFileInitAct: saveFileInit,
    predictByPeaksInitAct: predictByPeaksInit,
  }, dispatch)
);

Content.propTypes = {
  molSt: PropTypes.object.isRequired,
  fileSt: PropTypes.object.isRequired,
  predictSt: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
  ]).isRequired,
  saveFileInitAct: PropTypes.func.isRequired,
  predictByPeaksInitAct: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Content);
