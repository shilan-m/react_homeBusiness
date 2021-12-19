import React from 'react';
import {Button, Form, Toast, ToastBody, ToastHeader, Modal} from 'react-bootstrap';


const axios = require('axios');
class Product extends React.Component {
    constructor(props) {
        super(props);
        this.state = {productList:[],createNew:false};
        this.handleFilterChange = this.handleFilterChange.bind(this);
        this.handleCreateNew = this.handleCreateNew.bind(this);
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
    handleCreateNew(){
        const currNewState = this.state.createNew;
        this.setState({createNew:!currNewState});
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
                <Button className="btn btn-primary" id='newButton'  onClick={this.handleCreateNew}>add new Product</Button>
                <br></br>
                <Modal  show={this.state.createNew} onHide={this.handleCreateNew}>
                    <Modal.Header closeButton>
                        <Modal.Title>Create New Product</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <NewProductForm/>
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
        this.state = {name:'',color:'',price:'',size:0,stock:0,category:'ring',other:'',imgurl:''};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        //create ref for img preview
        this.imgPreview = React.createRef();
    }
    handleChange(event){
        const stateName = event.target.name;
        if (stateName ==="imgurl") {
            var uploadImg =  event.target.files[0];
            this.setState({[stateName]: uploadImg});
            const preview = this.imgPreview.current;
            const imgeUrl = URL.createObjectURL(uploadImg);
            //************************************************* */
            const formData = new FormData();
            formData.append('uploaded_file', uploadImg)
            axios.put("/imagetest",formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
              })
              .then(function (response) {
                // handle success
                console.log(response);
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                })
            //************************************************* */
            preview.src = imgeUrl;
            preview.onload = function() {
                // free memory
                URL.revokeObjectURL(preview.src) 
            }
            return;
        }
        const newState = event.target.value
        this.setState({[stateName]: newState});
    }
    handleSubmit(event) {
        event.preventDefault();
        axios.put('/addNewProduct',this.state)
            .then(function (response) {
                // handle success
                console.log(response);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
        //************************************************************** */
        //**************************************************************
        //**************************************************************
        
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
            <Form>
                <h2>New Product Form</h2>
                <label htmlFor="name">Name</label>
                <Form.Control type="text" placeholder="Enter Product Name" name="name" onChange={this.handleChange} required />
                <br></br>
                <label htmlFor="color">Color</label>
                <Form.Control type="text" placeholder = "Enter any color the product has, split by comma :" name="color" onChange={this.handleChange} required></Form.Control>
                <br></br>
                <label htmlFor="Price">Price</label>
                <Form.Control type="number" placeholder = "Enter price" name="price" onChange={this.handleChange} required></Form.Control>
                <br></br>
                <label htmlFor="size">Size</label>
                <Form.Control type="number" placeholder = "Enter size of product if necessary" name="size" onChange={this.handleChange}></Form.Control>
                <br></br>
                <label htmlFor="stock">Stock Number</label>
                <Form.Control type="number" placeholder = "Enter stock number of product" name="stock" onChange={this.handleChange}></Form.Control>
                <br></br>
                <label htmlFor="category">Cateogry</label>
                <select className="form-control" name="category" onChange={this.handleChange}>
                    {listCategory}
                </select>
                <br></br>
                <textarea name="other" placeholder="Other Detail About the Product goes here...." onChange={this.handleChange}>
                </textarea>
                <Form.Control type="file" name="imgurl" accept="image/*" onChange={this.handleChange}></Form.Control>
                <img name="upload_preview" alt="waiting for new product to upload"ref={this.imgPreview}></img>
                <Form.Control type="button" value="Submit New Product" onClick={this.handleSubmit}></Form.Control>
            </Form>
            
        )
    }

}
class ProductArea extends React.Component {
    render() {
        const productFakeList = this.props.data;
        const listItems = productFakeList.map((item) =>
            <SingleProduct key={item.PID}
              item={item} />
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
          <Form className="filter">
            <label>text search </label>
            <Form.Control type="text" name="searchText" placeholder="search for product name" onChange={this.handleChange}/>
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
            <Form.Control type="button" value = "Apply" name="submitFilter" onClick={this.handleSubmit}/>
          </Form>
        )
    }
}
export default Product;
