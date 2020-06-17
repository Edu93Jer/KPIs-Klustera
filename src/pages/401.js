import React, { Component } from 'react';
import { Result, Button } from 'antd';

class Err401 extends Component {

 redirect = () => {
  this.props.history.push("/")
 }

 render() {
  return (
   <Result
    status="403"
    title="401"
    subTitle="Sorry, you are not authorized to access this page. Please login and try again"
    extra={<Button type="primary" onClick={this.redirect}>Back Home</Button>}
   />
  )
 }
};

export default Err401;