import React, { Component } from 'react';
import axios from 'axios';

import { Bar } from 'react-chartjs-2';

import DatePicker from '../components/Date';
import TimePicker from '../components/Time';
import KPI from '../components/KPI';

import { Button, Spin } from 'antd';
import { CheckOutlined, SmileOutlined, UserOutlined, SyncOutlined, SketchOutlined, ShoppingCartOutlined, ClockCircleOutlined, StockOutlined } from '@ant-design/icons';

class Statistics extends Component {
 state = {
  startDate: '',
  endDate: '',
  startHour: '',
  endHour: '',
  graph: {},
  kpis: {},
  dates: [],
  visits: [],
  passersby: [],
  data: {},
  loading: false,
 }

 componentDidMount() {
  if (localStorage.getItem("token") == null) {
   this.props.history.push("/err401")
  }
 }

 onChange1 = (value, valueString) => {
  this.setState({ startDate: valueString })
 };

 onChange2 = (value, valueString) => {
  this.setState({ endDate: valueString })
 };

 onChange3 = (value, valueString) => {
  this.setState({ startHour: valueString })
 };

 onChange4 = (value, valueString) => {
  this.setState({ endHour: valueString })
 };

 callingAPI = async () => {
  this.setState({ loading: true })
  const token = localStorage.getItem("token")
  const { data: kpis } = await axios.get(`https://voldemort.klustera.com/get_kpis/1159/${this.state.startDate}/${this.state.endDate}/${this.state.startHour}/${this.state.endHour}`, {
   headers: {
    'x-access-token': token,
    'Content-Type': 'application/json'
   }
  })
  const { data: graph } = await axios.get(`https://voldemort.klustera.com/fetch_daily_footprint/1159/${this.state.startDate}/${this.state.endDate}/${this.state.startHour}/${this.state.endHour}`, {
   headers: {
    'x-access-token': token,
    'Content-Type': 'application/json'
   }
  })
  this.setState({ kpis, graph, loading: false });
  this.settingState();
  this.graphData();
 }

 settingState() {
  const dates = [], visits = [], passersby = []
  this.state.graph.results.visitors_daily.forEach((ele) => {
   dates.push(ele[0]);
   visits.push(ele[1]);
   passersby.push(ele[2]);
  });
  this.setState({ dates, visits, passersby })
 }

 graphData() {
  const data = {
   labels: this.state.dates,
   datasets: [
    {
     label: 'Visits',
     backgroundColor: '#52c41a',
     hoverBackgroundColor: '#95de64',
     data: this.state.visits,
    },
    {
     label: 'Passersby',
     backgroundColor: '#1890ff',
     hoverBackgroundColor: '#69c0ff',
     data: this.state.passersby,
    }
   ]
  }
  this.setState({ data })
 }

 render() {
  const { kpis } = this.state.kpis
  const options = {
   maintainAspectRatio: false,
   responsive: true,
   title: { display: true, text: "Foot Traffic", fontSize: 25 },
   legend: { display: true, position: 'bottom', labels: { boxWidth: 20 } },
  }
  return (
   <>
    <div className="period-bar">
     <div className='period-input'>
      <p>Start Period</p>
      <DatePicker onChange={this.onChange1} />
     </div>
     <div className='period-input'>
      <p>End Period</p>
      <DatePicker onChange={this.onChange2} />
     </div>
     <div className='period-input'>
      <p>Start Hour</p>
      <TimePicker onChange={this.onChange3} />
     </div>
     <div className='period-input'>
      <p>End Hour</p>
      <TimePicker onChange={this.onChange4} />
     </div>
     <div className='period-input'>
      <p>Refresh</p>
      <Button type="primary" onClick={this.callingAPI}>REFRESH</Button>
     </div>
    </div>
    {this.state.loading && <div className="spiner" > <Spin tip="Loading... Please wait 15 seconds before you try again, make sure you filled all inputs." size="large" /> </div>}
    {!this.state.loading &&
     <>
      <div className="kpis-container" >
       <KPI title={"Unique Visitors"} value={kpis?.clients} prefix={<CheckOutlined style={{ color: "#95de64", fontSize: '32px' }} />} />
       <KPI title={"Unique Loyals"} value={kpis?.branch_id} prefix={<SmileOutlined style={{ color: "#8c8c8c", fontSize: '32px' }} />} />
       <KPI title={"Visits"} value={kpis?.visits} prefix={<UserOutlined style={{ color: "#95de64", fontSize: '32px' }} />} />
       <KPI title={"% Loyalty Visitors"} value={kpis?.loyals} prefix={<SyncOutlined style={{ color: "#87e8de", fontSize: '32px' }} />} />
       <KPI title={"% Unique Visitors"} value={kpis?.potential_clients} prefix={<SketchOutlined style={{ color: "#87e8de", fontSize: '32px' }} />} />
       <KPI title={"Frequency Of Visit"} value={kpis?.frequency} prefix={<ShoppingCartOutlined style={{ color: "#87e8de", fontSize: '32px' }} />} />
       <KPI title={"Avg Time"} value={kpis?.avg_stay} prefix={<ClockCircleOutlined style={{ color: "#8c8c8c", fontSize: '32px' }} />} formatter={new Date()} />
       <KPI title={"Unique Passengers"} value={kpis?.impacts} prefix={<StockOutlined style={{ color: "#87e8de", fontSize: '32px' }} />} />
      </div>
      <div className='graph-container'>
       <Bar data={this.state?.data} options={options} />
      </div>
     </>
    }
   </>
  )
 }
}

export default Statistics