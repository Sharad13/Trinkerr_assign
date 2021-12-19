import "./Stocks.css";
import data from "../data.json";
import { useState } from "react";
import { useEffect } from "react";
import { Savedata, Loaddata } from "../Utils/LocalStorage";
import {StockItems,Button} from "./StocksStyled"

const arr = data.data;

const abc = [];
export function Stocks() {
  const [stock, setStock] = useState("");
  const [list, setList] = useState([...arr]);
  const [userStock, setuserStock] = useState([]);
  const [show, setShow] = useState(false);
  const [alreadyPresentList,setAlreadyPresentList]=useState([])
  const [addpopup,setaddPopup]=useState(false)
  const [deletepopup,setDeletePopup]=useState(false)

  useEffect(() => {
    if (stock.length >= 1) getData();
    else {
      let ldata = Loaddata("Items");
      if(ldata==null)ldata=[]
      setAlreadyPresentList([])
      setuserStock([...ldata]);
      setShow(false);
    }
  }, [stock]);

  const handleDelete = (titlee) => {
    var ldata = Loaddata("Items");
    let elem = ldata.filter((el) => {
        let title = el[0].split("::");
        return (title[0] !== titlee) ;
      });
       ldata = Loaddata("Items");
      Savedata("Items", [...elem]);
      let x = Loaddata("Items");
      setuserStock([...x]);
      setDeletePopup(true)
    setTimeout(()=>{
      setDeletePopup(false)
    },1000)
      setStock("") //going back to watchlist
  };

  const handleAdd = (a) => {
    console.log("add",a)
    let elem = arr.filter((el) => {
      let title = el[0].split("::");
      //console.log(title[0],stock)
      if (title[0] === a) return el;
    });
    var ldata = Loaddata("Items");

    if (ldata == null) {
      ldata = [];
    } else ldata = Loaddata("Items");
    Savedata("Items", [...ldata, ...elem]);

    setaddPopup(true)
    setTimeout(()=>{
      setaddPopup(false)
    },1000)
  };


//searching for stock options
 const getData = () => {
      //checking if its already available in watchlist or not
     let options=Loaddata("Items")
     if(options!=null){
      var option1 = options.filter((el) => {
        let title = el[0].split("::");
        //console.log(title[0].toLowerCase(),stock)
        return title[0].toLowerCase().includes(stock);
      });
  }
  else options=Savedata("Items",[])
  console.log("qqq",option1)
  if(options!=null)setAlreadyPresentList([...option1])
    //checking through all available options
    let option2 = arr.filter((el) => {
      let title = el[0].split("::");
      //console.log(title[0],stock)
      return title[0].toLowerCase().includes(stock);
    });
    //console.log(d)
   
   setList([...option2]);
    setShow(true);
  };
  return (
    <div className="outerBox">
      <div className="Box">
        <input
          onChange={(e) => setStock(e.target.value)}
          className="inp"
          type="text"
          placeholder="Search Stocks..."
        ></input>
      </div>

      {!show?
        <div className="user">
      <p className="=textName">SHARAD</p>
      </div>:null
      }
      {alreadyPresentList.length!==0 &&
        alreadyPresentList.map((el, i) => {
          console.log("11111", el);
          let nam = el[0].split("::");
          let a = nam[0];
          let b = nam[1];
          let perc = Math.round((el[1] - el[2]) * 100) / el[2];

          return (
            <StockItems  className="alreadyPresent">    
            <div className="stockName">
                <span
                  style={{
                    fontWeight: "500",
                    color: perc > 0 ? "rgb(41,197,193)" : "rgb(231,89,46)",
                  }}
                >
                  {a}
                </span>
                <span
                  style={{
                    fontWeight: "500",
                    color: perc > 0 ? "rgb(41,197,193)" : "rgb(231,89,46)",
                  }}
                >
                  {el[1]}
                </span>
              </div>
              <div className="stockName">
                <span className="NSE">
                  {b}
                </span>
                <span style={{ color: perc > 0 ? "black" : "red" }}>
                {(perc>0)?<img className="arrow1" src="https://img.icons8.com/ios-filled/50/4a90e2/collapse-arrow.png"/>:<img className="arrow2" src="https://img.icons8.com/ios/50/fa314a/expand-arrow--v2.png"/>}{perc.toFixed(3)}%
                </span>
              </div>
              {console.log("sssss")}

              <div className="addButton">
              <Button className="deleteButton" onClick={() => handleDelete(a)}>
              <img className="deleteCont" src="https://img.icons8.com/external-kiranshastry-lineal-kiranshastry/50/000000/external-delete-multimedia-kiranshastry-lineal-kiranshastry.png"/>
              </Button>
              </div>

            </StockItems>
          );
        })}


      {show &&
        list.map((el, i) => {
          let nam = el[0].split("::");
          let a = nam[0];
          let b = nam[1];
          let perc = Math.round((el[1] - el[2]) * 100) / el[2];

          return (
            <StockItems>
              <div className="stockName">
                <span
                  style={{
                    fontWeight: "500",
                    color: perc > 0 ? "rgb(41,197,193)" : "rgb(231,89,46)",
                  }}
                >
                  {a}
                </span>
                <span
                  style={{
                    fontWeight: "500",
                    color: perc > 0 ? "rgb(41,197,193)" : "rgb(231,89,46)",
                  }}
                >
                  {el[1]}
                </span>
              </div>
              <div className="stockName">
                <span className="NSE">
                  {b}
                </span>
                <span style={{ color: perc > 0 ? "black" : "red" }}>
                {(perc>0)?<img className="arrow1" src="https://img.icons8.com/ios-filled/50/4a90e2/collapse-arrow.png"/>:<img className="arrow2" src="https://img.icons8.com/ios/50/fa314a/expand-arrow--v2.png"/>}{perc.toFixed(3)}%
                </span>
              </div>
              <div className="addButton">
              <Button className="deleteButton" onClick={() => handleAdd(a)}>
              <span className="plus">+</span>
              </Button>
              </div>
            </StockItems>
          );
        })}


        

      {!show &&
        userStock.map((el, i) => {
          console.log("11111", el);
          let nam = el[0].split("::");
          let a = nam[0];
          let b = nam[1];
          let perc = Math.round((el[1] - el[2]) * 100) / el[2];

          return (
            <StockItems > 
            
          
            <div className="stockName">
                <span
                  style={{
                    fontWeight: "500",
                    color: perc > 0 ? "rgb(41,197,193)" : "rgb(231,89,46)",
                  }}
                >
                  {a}
                </span>
                <span
                  style={{
                    fontWeight: "500",
                    color: perc > 0 ? "rgb(41,197,193)" : "rgb(231,89,46)",
                  }}
                >
                  {el[1]}
                </span>
              </div>
              <div className="stockName">
                <span className="NSE">
                  {b}
                </span>
                <span style={{ color: perc > 0 ? "black" : "red" }}>
                {(perc>0)?<img className="arrow1" src="https://img.icons8.com/ios-filled/50/4a90e2/collapse-arrow.png"/>:<img className="arrow2" src="https://img.icons8.com/ios/50/fa314a/expand-arrow--v2.png"/>}{perc.toFixed(3)}%
                </span>
              </div>

              <div className="addButton">
              <Button className="deleteButton" onClick={() => handleDelete(a)}>
              <img className="deleteCont" src="https://img.icons8.com/external-kiranshastry-lineal-kiranshastry/50/000000/external-delete-multimedia-kiranshastry-lineal-kiranshastry.png"/>
              </Button>
              </div>

            </StockItems>
          );
        })}

        
        {addpopup?<div className="popup">
        <div className="addPopup">
        Item Added Successfully!
        </div>
        </div>:null}

        {deletepopup?<div className="popup">
        <div className="addPopup">
        Item Deleted Successfully!
        </div>
        </div>:null}
        
    </div>
  );
}
