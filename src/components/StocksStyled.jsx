
import styled from "styled-components"

 export const Button=styled.button`
  display:none;
  background-color: #dddddd;
  padding: 1px;
  align-self: flex-end;
  width: 4%;
  border-radius: 3px;
  border: 1px solid black;
  cursor: pointer;
 
`
export const StockItems=styled.div`

width: 41%;
  margin: auto;
  border: none;
  padding: 7px;
  border-bottom: 1px solid #dddddd;
  border: 1px solid #dddddd;
  height: 80px;
  &:hover{
      background-color:rgb(250,250,250);
  }
  &:hover .deleteButton {
    display:inline-flex;
    justify-content:center;
    text-align:center;
  }
  `