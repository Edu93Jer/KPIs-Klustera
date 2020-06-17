import React from 'react';

import { Statistic } from 'antd';

function KPI({ title, value, prefix, suffix, formatter }) {
 return (
  <div className='kpi'>
   <Statistic title={title} value={value} prefix={prefix} suffix={suffix} formatter={formatter} />
  </div>
 )
}

export default KPI