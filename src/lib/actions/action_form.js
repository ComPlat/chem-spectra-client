import { FORM } from '../constants/action_type';

const updateFormScan = payload => (
  {
    type: FORM.UPDATE_SCAN,
    payload,
  }
);

const clearFormScan = payload => (
  {
    type: FORM.CLEAR_SCAN,
    payload,
  }
);

const submitForm = payload => (
  {
    type: FORM.SUBMIT,
    payload,
  }
);

export {
  updateFormScan, clearFormScan, submitForm,
};
