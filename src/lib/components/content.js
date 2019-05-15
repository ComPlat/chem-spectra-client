import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { SpectraViewer, FN } from 'react-spectra-viewer';

import { saveFileInit } from '../actions/action_file';
import { predictInit } from '../actions/action_predict';

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

    this.writeOp = this.writeOp.bind(this);
    this.saveOp = this.saveOp.bind(this);
    this.predictOp = this.predictOp.bind(this);
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

  writeOp({
    peaks, layout, shift, isAscend,
  }) {
    const body = FN.peaksBody(peaks, layout, shift, isAscend);
    const wrapper = FN.peaksWrapper(layout, shift);
    const desc = this.rmDollarSign(wrapper.head) + body + wrapper.tail;
    this.setState({ desc });
  }

  saveOp({
    peaks, shift, scan, thres, analysis,
  }) {
    const {
      saveFileInitAct, molSt,
    } = this.props;
    const { mass } = molSt;
    const fPeaks = FN.rmRef(peaks, shift);
    const peakStr = FN.toPeakStr(fPeaks);
    const predict = JSON.stringify({ result: [analysis] });

    saveFileInitAct({
      peakStr, shift, mass, scan, thres, predict,
    });
  }

  predictOp({ peaks, layout, shift }) {
    const { predictInitAct, molSt, fileSt } = this.props;
    const molfile = molSt.src;

    predictInitAct({
      molfile, peaks, layout, shift, spectrum: fileSt.src,
    });
  }

  // updatInput(e) {
  //   const molecule = e.target.value;
  //   this.setState({ molecule });
  // }

  buildPredictObj() {
    const { molSt, predictSt } = this.props;

    const predictObj = {
      molecule: molSt.src ? molSt.src.name : '',
      predictions: predictSt.result,
    };
    return predictObj;
  }

  render() {
    const { desc } = this.state;
    const { fileSt } = this.props;
    if (!fileSt) return renderTitle();

    const {
      entity, xLabel, yLabel, isExist,
    } = FN.buildData(fileSt.jcamp);
    if (!isExist) return renderTitle();

    const operations = [
      { name: 'save', value: this.saveOp },
      { name: 'write', value: this.writeOp },
      { name: 'predict', value: this.predictOp },
    ].filter(r => r.value);

    const predictObj = this.buildPredictObj();

    return (
      <div>
        <SpectraViewer
          entity={entity}
          xLabel={xLabel}
          yLabel={yLabel}
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
    predictInitAct: predictInit,
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
  predictInitAct: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Content);
