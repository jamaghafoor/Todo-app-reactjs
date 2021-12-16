import "./App.css";
import React,{Component} from "react";
import EditSharpIcon from '@material-ui/icons/EditSharp';
import DeleteForeverSharpIcon from '@material-ui/icons/DeleteForeverSharp';
import Swal from 'sweetalert2'

class App extends Component {
  constructor() {
    super();
    this.state = {
      item: [],
      act:0, index:'',
     checkArr:[], btntext: 'Add',
     btnColor: 'success', isDisabled:true,
     id: 0,
    };
  }

//add item
  handleAdd() {
    let items = this.state.item;
    let value = this.refs.inputval.value;
    let id = this.state.id + 1;
    if (this.state.act === 0 && value !== '') {
      let itemObj = {
        id, value, isChecked:false
      }
      items.push(itemObj);
      this.setState({id: this.state.id+1})
      this.alertFun('Done!', 'User has been added Successfully')
    }
    else{
      if (value !== '') {
        let index = this.state.index;
      items[index].value = value;
      }      
    }
    this.setState({item:items,act:0})
    this.handleBtn('rgb(21, 115, 71)','Add')
    this.refs.inputval.value = '';
  }

//update function
handleUpdate(i){
let items = this.state.item[i].value;
this.refs.inputval.value = items;
this.setState({act:1,index:i});
 this.handleBtn('rgb(255, 202, 44)','Update');
}

//delete item
handleDelete = (id) => {
  let items = this.state.item;
 items.splice(id,1)
this.setState({item:items})
  this.alertFun('Deleted!', 'User removed Successfully')
};

//Delete All function
handleDeleteAll(){
  let items = this.state.item;
  let unchecked = items.filter((element) =>{
    return element.isChecked !== true;
  })
  this.setState({item:unchecked});
  let allChekced = document.getElementById('allChecked')
  allChekced.checked = false;
}

//Select Multiple checkboxes
handleCheckChieldElement = (event) => {
  let items = this.state.item;
  items.forEach((element) => {
    if (element.value === event.target.value)
      element.isChecked = event.target.checked;
  });
  this.setState({ item: items });
  this.setState({isDisabled:false})
};

// Select All Checkboxes
handleAllChecked = (event) => {
  let items= this.state.item;
  items.forEach((element) => (element.isChecked = event.target.checked));
  this.setState({ item: items });
  this.setState({isDisabled:false})
};

//alert function
alertFun(title,body){
  Swal.fire(
    title,
    body,
    'success'
  )
}
//handleBtn
handleBtn(bgcolor,txt){
  let addbtn = document.getElementById('addbtn');
  addbtn.style.backgroundColor= bgcolor
  this.setState({btntext:txt})
}

  render() {
    return (
       <div className="container-fluid my-5">
         {console.log(this.state.item)}
        <div className="row">
          <div className="col-sm-6 mx-auto shadow-lg py-3">
            <h2 className="text-center">Todo-App</h2>
            <div className="row justify-content-center mt-3">
              <div className="col-8 ml-5">
                <input
                id="input"
                  type="text"
                  placeholder="write your plan"
                  className="form-control"
                  ref="inputval"
                />
              </div>
              <div className="col-2">
                <button className="btn btn-success px-4" onClick={() => this.handleAdd()} id='addbtn'>{this.state.btntext}</button>
              </div>
              <div className ='row mt-4'>
               <div className="col-3" id='selectAll'>
                <lable>Select All </lable> 
                <input type="checkbox" onClick={this.handleAllChecked} id='allChecked'></input>
              </div>
              </div>
              <div className="container-fluid">
                <ul className="list-unstyled row m-5 justify-content-center">
                  {this.state.item.map((elem, i) => {
                    return (
                    <>
                      <li className="shadow p-2 my-2 col-md-7 col-sm-5 rounded"><input type='checkbox' className='inputBox multiSelect' checked={elem.isChecked} key={elem.id} onClick={this.handleCheckChieldElement} value={elem.value}/> <span>{i + 1}</span>&nbsp;&nbsp;{elem.value}</li>
                      <button className="col-sm-1" onClick={()=>this.handleUpdate(i)} id="updbtn"><EditSharpIcon/></button>
                      <button  className="col-sm-1" onClick={()=>this.handleDelete(i)} id='delbtn'><DeleteForeverSharpIcon/></button>
                    </>
                  );

                  })}
                </ul>
              </div>
              <div className='row'>
              <div className="col-sm-5" id='delallbtn'>
                <button className="btn btn-danger px-4" disabled={this.state.isDisabled} onClick={()=>this.handleDeleteAll()}>Delete Selected</button>
              </div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    );
  }
}

export default App;
