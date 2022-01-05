import React from 'react';
import axios from 'axios';
import {Table} from 'react-bootstrap';

class Customers extends React.Component{
    constructor(props) {
        super(props);
        this.state = {customerList:[]};
    }
    componentDidMount() {
        axios.get('/customers')
            .then(function (response){
                this.setState({customerList:response})
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
    }
    render(){
        // const customerRows = this.state.customerList.map(customer=>
        //     <customerRow key={customer.CID} customer={customer} />);
        return(
            <Table striped>
            <thead>
                <tr>
                <th>#</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>email</th>
                <th>wechat</th>
                <th>phone</th>
                </tr>
            </thead>
            <tbody>
                {/* {customerRows} */}
            </tbody>
        </Table>
        );
    }
}

export default Customers;