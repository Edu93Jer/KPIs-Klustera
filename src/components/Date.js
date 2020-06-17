import React from 'react';

import { DatePicker } from 'antd';
import moment from 'moment';

function disabledDate(current) {
 return current && current > moment().endOf('day');
}

function DatePick({ onChange }) {
 return (
  <>
   <DatePicker
    disabledDate={disabledDate}
    onChange={onChange}
    format="YYYY-MM-DD" />
  </>
 )
}

export default DatePick

