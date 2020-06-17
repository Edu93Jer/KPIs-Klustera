import React from 'react';

import { TimePicker } from 'antd';

function TimePick({ onChange }) {
 return (
  <TimePicker
   onChange={onChange}
   format="HH"
  />
 )
}

export default TimePick