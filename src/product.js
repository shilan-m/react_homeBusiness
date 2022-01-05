import React from 'react';
import {Button, Form, FormGroup, Modal} from 'react-bootstrap';
import axios from 'axios';



class Product extends React.Component {
    constructor(props) {
        super(props);
        this.state = {productList:[],createNew:false};
        this.handleFilterChange = this.handleFilterChange.bind(this);
        this.handleModalOpenClose = this.handleModalOpenClose.bind(this);
    }
    handleFilterChange(newFilter){
        const currentComponent = this;
        for (const key of Object.keys(newFilter)) {
            if (newFilter[key] === "") {
              delete newFilter[key];
            }
        }
        axios.get('/product/filterProduct',{ params: newFilter })
            .then(function (response) {
                // handle success
                currentComponent.setState({productList:response.data})
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
    }
    handleModalOpenClose(){
        const currNewState = this.state.createNew;
        this.setState({createNew:!currNewState});
    }
    componentDidMount() {
        const currentComponent = this;
        axios.get('/product/filterProduct')
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
                <Button className="btn btn-primary" id='newButton'  onClick={this.handleModalOpenClose}>add new Product</Button>
                <br></br>
                <Modal  show={this.state.createNew} onHide={this.handleModalOpenClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Create New Product</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <NewProductForm handleModalOpenClose = {this.handleModalOpenClose}/>
                    </Modal.Body>
                </Modal>
                <Filter data={this.state.productList} handleFilterChange = {this.handleFilterChange}/>
                <ProductArea data={this.state.productList}/>
            </div>
        )
    }
}

class NewProductForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {validated:false, name:null,color:null,price:0,size:null,stock:0,category:null,other:null,imgurl:null};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        //create ref for img preview
        this.imgPreview = React.createRef();
    }
    handleChange(event){
        const stateName = event.target.name;
        if (stateName ==="imgurl") {
            var uploadImg =  event.target.files[0];
            const preview = this.imgPreview.current;
            // handle no image select
            if(uploadImg === undefined) {
                preview.src = null;
                this.setState({[stateName]: null});
                return;
            }
            this.setState({[stateName]: uploadImg});
            const imgeUrl = URL.createObjectURL(uploadImg);
            preview.src = imgeUrl;
            preview.onload = function() {
                // free memory
                URL.revokeObjectURL(preview.src); 
            }
            return;
        }
        const newState = event.target.value
        this.setState({[stateName]: newState});
    }
    handleSubmit(event) {
        const currComponent = this;
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            // event.stopPropagation();
            console.log("not valid")
            this.setState({validated:true});
            return;
        }

        // console.log("form valid")

        const formData = new FormData();
        for (const stateName in this.state){
            const stateValue = this.state[stateName];
            if(stateValue === null || stateName === 'validated'){
                continue;
            }
            formData.append(stateName,this.state[stateName])
        }
        axios.put('/product/addNewProduct',formData
        , {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
          }
          )
            .then(function (response) {
                // handle success
                console.log(response);
                // close Modal 
                currComponent.props.handleModalOpenClose();
                
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
        
    }
    render(){
        const CategoryOptions = [
            { value: 'ring', label: 'ring' },
            { value: 'necklace', label: 'necklace' },
            { value: 'bracelet', label: 'bracelet' },
            { value: 'anklet', label: 'anklet' },
          ]
        const listCategory = CategoryOptions.map((option) =>
              <option key={option.value} value={option.value}>{option.label}</option>
        );
        return(
            <Form onSubmit={this.handleSubmit} noValidate validated={this.state.validated}>
                <h2>New Product Form</h2>
                <FormGroup validated={false} >
                    <label htmlFor="name">Name</label>
                    <Form.Control type="text" placeholder="Enter Product Name" name="name" onChange={this.handleChange} required />
                    <br></br>
                    <label htmlFor="color">Color</label>
                    <Form.Control type="text" placeholder = "Enter any color the product has, split by comma :" name="color" onChange={this.handleChange} required></Form.Control>
                    <br></br>
                    <label htmlFor="Price">Price</label>
                    <Form.Control type="number" placeholder = "Enter price" name="price" onChange={this.handleChange} required min='1' step='0.01' ></Form.Control>
                    <br></br>
                    <label htmlFor="stock">Stock Number</label>
                    <Form.Control type="number" placeholder = "Enter stock number of product" name="stock" onChange={this.handleChange} required min="0"></Form.Control>
                    <br></br>
                    <label htmlFor="category">Cateogry</label>
                    <select className="form-control" name="category" defaultValue="" onChange={this.handleChange} required>
                        <option hidden="" disabled="disabled"  value="">Select Category</option>
                        {listCategory}
                    </select>
                    <br></br>
                </FormGroup>
                <label htmlFor="size">Size</label>
                <Form.Control type="number" placeholder = "Enter size of product if necessary" name="size" onChange={this.handleChange}></Form.Control>
                <br></br>
                <textarea name="other" placeholder="Other Detail About the Product goes here...." onChange={this.handleChange}>
                </textarea>
                <Form.Control type="file" name="imgurl" accept="image/*" onChange={this.handleChange}></Form.Control>
                <img name="upload_preview" alt="waiting for new product to upload"ref={this.imgPreview}></img>
                <Form.Control type="submit" value="Submit New Product"></Form.Control>
            </Form>
            
        )
    }

}
class ProductArea extends React.Component {
    render() {
        const productFakeList = this.props.data;
        const listItems = productFakeList.map((item) =>
            <SingleProduct key={item.PID} item={item} />
        );
        return (
             <div className='productArea'>{listItems}</div>
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

class Filter extends React.Component {
    constructor(props){
        super(props);
        this.state = {searchText: '',priceMax:'',priceMin:'',color:''};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event){
        const stateName = event.target.name;
        const newState = event.target.value
        this.setState({[stateName]: newState});
    }
    handleSubmit(event) {
        event.preventDefault();
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
          <Form id="filterForm">
            <label>text search </label>
            <Form.Control type="text" name="searchText" placeholder="search for product name" onChange={this.handleChange} />
            <label>price range </label>
            <div name="price_filter">
                <Form.Control type="number" min="0" name="priceMin" onChange={this.handleChange} style={{"width" : "30%","display" : "inline-block"}}></Form.Control>
                <label>  ~  </label>
                <Form.Control type="number" min="0" name="priceMax" onChange={this.handleChange} style={{"width" : "30%","display" : "inline-block"}}/>
            </div>
            <label>color </label>
            <select  className="form-control" name="color" defaultValue="all"  onChange={this.handleChange}>
                {listColor}
            </select>
            <Form.Control type="submit" value = "Apply" onSubmit={this.handleSubmit}/>
          </Form>
        )
    }
}
export default Product;
