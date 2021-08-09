import React from 'react';
import 'antd/dist/antd.css';
import { Select,Input,Button } from 'antd';

const axios = require('axios');
class Product extends React.Component {
    constructor(props) {
        super(props);
        this.state = {productList:[]};
        this.handleFilterChange = this.handleFilterChange.bind(this);
    }
    handleFilterChange(newFilter){
        const currentComponent = this;
        for (const key of Object.keys(newFilter)) {
            if (newFilter[key] === "") {
              delete newFilter[key];
            }
        }
        axios.get('/filterProduct',{ params: newFilter })
            .then(function (response) {
                // handle success
                currentComponent.setState({productList:response.data})
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
    }
    componentDidMount() {
        const currentComponent = this;
        axios.get('/filterProduct')
            .then(function (response) {
                // handle success
                currentComponent.setState({productList:response.data})
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
    }
    render() {
        return (
            <div>
                <button id='newButton'>add new Product</button>
                <NewProductForm/>
                <FunctionBar data={this.state.productList} handleFilterChange = {this.handleFilterChange}/>
                <ProductArea data={this.state.productList}/>
            </div>
        )
    }
}
class NewProductForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {name:'',color:'',price:''};
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event,stateName=event.target.id){
        var newState ='';
        if (event.target === undefined) {
            newState = event;
        } else {
            newState = event.target.value
        }
        this.setState({[stateName]: newState.toString()});
    }
    render(){
        return(
            <form>
                <h2>New Product Form</h2>
                <label htmlFor="name">Name</label>
                <input type="text" placeholder="Enter Product Name" id="name" onChange={this.handleChange} required></input>
                <label htmlFor="color">Color : if there are muti-color,Hold down the Ctrl (windows) or Command (Mac) button to select multiple options</label>
                <Select
                    mode="multiple"
                    allowClear
                    style={{ width: '100%' }}
                    placeholder="Please select"
                    onChange={(e) => this.handleChange(e,'color')}
                    id = 'color'
                    required
                >
                    <Select.Option value="black">black</Select.Option>
                    <Select.Option value="gold">gold</Select.Option>
                    <Select.Option value="roseGold">roseGold</Select.Option>
                    <Select.Option value="silver">silver</Select.Option>
                </Select>

            </form>
            
        )
    }
}
class ProductArea extends React.Component {
    render() {
        // const productFakeList = [
        //     {pid: 's1',name: 'the love',color :'platinum', price: '56', imgurl:'1.jpeg'},
        //     {pid: 's2',name: 'the monkey',color :'gold', price: '50', imgurl:'2.png'},
        //     {pid: 's4',name: 'the dophin',color :'silver', price: '100', imgurl:'3.jpeg'},
        //     {pid: 'k1',name: 'the liuliu',color :'rose gold', price: '33', imgurl:'4.jpeg'},
        //     {pid: 'k2',name: 'the maomao',color :'gold', price: '88', imgurl:'5.jpeg'},
        // ]
        const productFakeList = this.props.data;
        const listItems = productFakeList.map((item) =>
            <SingleProduct key={item.PID}
              item={item} />
        );
        return (
            listItems
        );
    }
}


function SingleProduct(props) {
    const item = props.item
    return (
        <div className="singleProduct">
            <img src={require("./"+item.category +"/"+ item.imgurl).default} alt = "source error"/>
            <p>{item.name}</p>
            <p>color: {item.color}</p>
            <p>price:{item.price}</p>
        </div>
    )
}

class FunctionBar extends React.Component {
    constructor(props){
        super(props);
        this.state = {searchText: '',priceMax:'',priceMin:'',color:''};
        // this.handleEnter = this.handleEnter.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        // this.textRef = React.createRef();
        // this.pMinRef = React.createRef();
        // this.pMaxRef = React.createRef();
        // this.colorRef = React.createRef();
        // this.buttonRef = React.createRef();
        // this.refList = [this.textRef,this.pMinRef,this.pMaxRef,this.colorRef,this.buttonRef]

    }
    // handleEnter(event) {
    //     if(event.key !=='Enter') {
    //         return;
    //     }
    //     if(event.target.id !== "submitFilter") {
    //         var nextFocusIndex;
    //         for (let i = 0; i < this.refList.length; i++) {
    //             if(event.target === this.refList[i].current){
    //                 nextFocusIndex = i + 1;
    //                 break;
    //             }
    //         }
    //         this.refList[nextFocusIndex].current.focus();
    //     }
    // }
    handleChange(event){
        const stateName = event.target.id;
        const newState = event.target.value
        this.setState({[stateName]: newState});
    }
    handleSubmit(event) {
        this.props.handleFilterChange(this.state);
    }
    render() {
        const colorOptions = [
            { value: '', label: 'ALL' },
            { value: 'gold', label: 'Gold' },
            { value: 'silver', label: 'Silver' },
            { value: 'platinum', label: 'Platinum' },
            { value: 'rose gold', label: 'Rose Gold'},
          ]
          const listColor = colorOptions.map((option) =>
              <option key={option.value} value={option.value}>{option.label}</option>
        );
        return(
          <div>
            <input type="text" id="searchText" placeholder="search for product name" onChange={this.handleChange}/>
            <div name="price_filter">
                <label>filter product by price: </label>
                <input type="number" min="0" id="priceMin" onChange={this.handleChange}/>
                <label> ~ </label>
                <input type="number" min="0" id="priceMax" onChange={this.handleChange}/>

            </div>
            <select id="color" defaultValue="all"  onChange={this.handleChange}>
                {listColor}
            </select>
            <button id="submitFilter"ref={this.buttonRef} onClick={this.handleSubmit}>Apply</button>
          </div>
        )
    }
}
export default Product;
