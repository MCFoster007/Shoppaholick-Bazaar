import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';

const DropDownCategory =({}: { handleModalClose: () => void }) => {
  return (
<div className="ui fluid search selection dropdown">
  <input type="hidden" name="country"/>
  <div className="default text">Select Country</div>
  <i className="dropdown icon"></i>
  <div className="menu">
  <div className="item" data-value="af"><i className="af flag"></i>Electronics</div>
  <div className="item" data-value="ax"><i className="ax flag"></i>Aland Islands</div>
  <div className="item" data-value="al"><i className="al flag"></i>Albania</div>
  <div className="item" data-value="dz"><i className="dz flag"></i>Algeria</div>
  </div>
 </div>
)};

export default DropDownCategory;