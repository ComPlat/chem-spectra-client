import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { SpectraViewer, FN } from 'react-spectra-viewer';

import { saveFileInit } from '../actions/action_file';
import { predictInit, predictToWriteInit } from '../actions/action_predict';
import { updateDesc } from '../actions/action_desc';
import { RmDollarSign } from '../utils/helper';

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

    this.writeOp = this.writeOp.bind(this);
    this.checkWriteOp = this.checkWriteOp.bind(this);
    this.saveOp = this.saveOp.bind(this);
    this.predictOp = this.predictOp.bind(this);
    // this.updatInput = this.updatInput.bind(this);
    this.buildOpsByLayout = this.buildOpsByLayout.bind(this);
    this.buildForecast = this.buildForecast.bind(this);
  }

  writeOp({
    peaks, layout, shift, isAscend, decimal,
  }) {
    const body = FN.peaksBody(peaks, layout, decimal, shift, isAscend);
    const wrapper = FN.peaksWrapper(layout, shift);
    const desc = RmDollarSign(wrapper.head) + body + wrapper.tail;
    const { updateDescAct } = this.props;
    updateDescAct(desc);
  }

  checkWriteOp({
    peaks, layout, shift, isAscend, decimal,
  }) {
    const {
      predictToWriteInitAct, molSt, fileSt,
    } = this.props;
    const molfile = molSt.src;
    const cleanPeaks = FN.rmShiftFromPeaks(peaks, shift);
    predictToWriteInitAct({
      molfile,
      layout,
      shift,
      isAscend,
      decimal,
      peaks: cleanPeaks,
      spectrum: fileSt.src,
    });
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
    const predict = JSON.stringify(analysis);

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

  buildForecast() {
    const { molSt, predictSt } = this.props;

    const predictObj = {
      molecule: molSt.src ? molSt.src.name : '',
      predictions: predictSt,
    };
    return predictObj;
  }

  buildOpsByLayout(et) {
    const ops = [
      { name: 'save', value: this.saveOp },
      { name: 'write', value: this.writeOp },
    ];
    switch (et.spectrum.sTyp) {
      case 'MS':
        return ops;
      case 'INFRARED':
        return [
          ...ops,
          { name: 'predict', value: this.predictOp },
        ];
      case 'NMR':
        return [
          ...ops,
          { name: 'check & write', value: this.checkWriteOp },
          { name: 'predict', value: this.predictOp },
        ];
      default:
        return ops;
    }
  }

  render() {
    const { fileSt, descSt } = this.props;
    if (!fileSt) return renderTitle();

    const {
      entity, xLabel, yLabel, isExist,
    } = FN.buildData(fileSt.jcamp);
    if (!isExist) return renderTitle();

    const operations = this.buildOpsByLayout(entity);
    const forecast = this.buildForecast();

    return (
      <div>
        <SpectraViewer
          entity={entity}
          xLabel={xLabel}
          yLabel={yLabel}
          forecast={forecast}
          operations={operations}
        />
        <textarea
          rows="6"
          cols="150"
          placeholder="peaks"
          style={editorStyle}
          value={descSt}
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
    descSt: state.desc,
  }
);

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    saveFileInitAct: saveFileInit,
    predictInitAct: predictInit,
    predictToWriteInitAct: predictToWriteInit,
    updateDescAct: updateDesc,
  }, dispatch)
);

Content.propTypes = {
  molSt: PropTypes.object.isRequired,
  fileSt: PropTypes.object.isRequired,
  predictSt: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
  ]).isRequired,
  descSt: PropTypes.string.isRequired,
  saveFileInitAct: PropTypes.func.isRequired,
  predictInitAct: PropTypes.func.isRequired,
  predictToWriteInitAct: PropTypes.func.isRequired,
  updateDescAct: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Content);
