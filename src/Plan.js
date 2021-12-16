import React from "react";
function Plan(props) {
  return (
    <>
      <li className="shadow p-2 my-2 col-md-7 col-sm-5 rounded"><input type='checkbox' className='multiSelect' /> <span>{props.id + 1}</span>&nbsp;&nbsp;{props.value}</li>
      <button type='button' className="btn btn-warning col-sm-1 " onClick={()=>{props.deleteItem(props.id)}} id='delbtn'>U</button>
      <button type='button' className="btn btn-danger col-sm-1 " onClick={()=>{props.deleteItem(props.id)}} id='delbtn'>X</button>
    </>
  );
}
export default Plan;
