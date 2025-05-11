// script.js

function parseField(idVal, idUnit) {
  const val = parseFloat(document.getElementById(idVal).value);
  const unit = parseFloat(document.getElementById(idUnit).value);
  return isNaN(val) ? NaN : val * unit;
}

function setField(idVal, idUnit, value) {
  const unit = parseFloat(document.getElementById(idUnit).value);
  document.getElementById(idVal).value = isNaN(value) ? '' : (value / unit).toFixed(3);
}

function calculate() {
  const V = parseField('voltage', 'unitV');
  const I = parseField('current', 'unitI');
  const R = parseField('resistance', 'unitR');
  const P = parseField('power', 'unitP');

  const filled = [!isNaN(V), !isNaN(I), !isNaN(R), !isNaN(P)];
  const count = filled.filter(Boolean).length;
  const errDiv = document.getElementById('error');
  if (count !== 2) {
    errDiv.textContent = 'Please provide exactly two inputs.';
    errDiv.classList.remove('hidden');
    return;
  }
  errDiv.classList.add('hidden');

  let v = V, i = I, r = R, p = P;
  if (!isNaN(V) && !isNaN(I)) {
    r = V / I;
    p = V * I;
  } else if (!isNaN(V) && !isNaN(R)) {
    i = V / R;
    p = V * V / R;
  } else if (!isNaN(V) && !isNaN(P)) {
    i = P / V;
    r = V * V / P;
  } else if (!isNaN(I) && !isNaN(R)) {
    v = I * R;
    p = I * I * R;
  } else if (!isNaN(I) && !isNaN(P)) {
    v = P / I;
    r = P / (I * I);
  } else if (!isNaN(R) && !isNaN(P)) {
    v = Math.sqrt(P * R);
    i = Math.sqrt(P / R);
  }

  setField('voltage', 'unitV', v);
  setField('current', 'unitI', i);
  setField('resistance', 'unitR', r);
  setField('power', 'unitP', p);
}

function clearFields() {
  ['voltage', 'current', 'resistance', 'power'].forEach(id => {
    document.getElementById(id).value = '';
  });
  document.getElementById('error').classList.add('hidden');
}