import { useState, useEffect, useRef } from "react";
import style from "./index.module.css";
import { validate, LocalStorageSet } from "./functions";

export default function Todo() {
  const inputRef = useRef();
  const [data, setData] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("todos")) {
      let local = JSON.parse(localStorage.getItem("todos"));
      setData(local);
    }
  }, []);

  function handleDelete(elId) {
    let copy = JSON.parse(JSON.stringify(data));
    let a = confirm(`Rostdan ham o'chirishni istaysizmi ?`)
    if(a){
      copy = copy.filter((el) => el.id != elId)
    }
    LocalStorageSet(copy);
    setData(copy);
  }

  function handleCheckbox(e, todo) {
    let copy = JSON.parse(JSON.stringify(data));
    copy = copy.map((el) => {
      if (el.id == todo.id) {
        if (e.target.checked) {
          el.status = "checked";
        } else {
          el.status = "unchecked";
        }
      }
      return el;
    });
    LocalStorageSet(copy);
    setData(copy);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (validate(inputRef)) {
      let todo = {
        id: Date.now().toString(),
        name: inputRef.current.value,
        status: "unchecked",
      };
      let copy = JSON.parse(JSON.stringify(data));
      copy.push(todo);
      LocalStorageSet(copy);
      setData(copy);
      inputRef.current.value = "";
    }
  }

  return (
    <div className={style.wrapper}>
      <h2 className={style.todoTitle}>Todos ({data.length})</h2>
      <form className={style.formWrapper} onSubmit={handleSubmit}>
        <input
          type="text"
          ref={inputRef}
          maxLength={70}
          placeholder="Marhamat rejalarni kiriting..."
        />
        <button>Saqlash</button>
      </form>
      <div className={style.todoCards}>
        {data.map((el, index) => {
          return (
            <div key={index} className={style.todoCard}>
              <div className={style.inputAndText}>
                <input
                  type="checkbox"
                  checked={el.status == "checked" ? true : false}
                  onChange={(e) => {
                    handleCheckbox(e, el);
                  }}
                />
                <span
                  style={{
                    textDecoration: `${
                      el.status == "checked" ? "line-through" : "none"
                    }`,
                  }}
                >
                  {el.name}
                </span>
              </div>
              <div>
                <svg
                  fill="white"
                  width="30px"
                  height="30px"
                  viewBox="0 0 16 16"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M15.49 7.3h-1.16v6.35H1.67V3.28H8V2H1.67A1.21 1.21 0 0 0 .5 3.28v10.37a1.21 1.21 0 0 0 1.17 1.25h12.66a1.21 1.21 0 0 0 1.17-1.25z" />
                  <path d="M10.56 2.87 6.22 7.22l-.44.44-.08.08-1.52 3.16a1.08 1.08 0 0 0 1.45 1.45l3.14-1.53.53-.53.43-.43 4.34-4.36.45-.44.25-.25a2.18 2.18 0 0 0 0-3.08 2.17 2.17 0 0 0-1.53-.63 2.19 2.19 0 0 0-1.54.63l-.7.69-.45.44zM5.51 11l1.18-2.43 1.25 1.26zm2-3.36 3.9-3.91 1.3 1.31L8.85 9zm5.68-5.31a.91.91 0 0 1 .65.27.93.93 0 0 1 0 1.31l-.25.24-1.3-1.3.25-.25a.88.88 0 0 1 .69-.25z" />
                </svg>
                <svg
                  onClick={() => {
                    handleDelete(el.id);
                  }}
                  fill="white"
                  version="1.1"
                  id="Layer_1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  width="30px"
                  height="30px"
                  viewBox="0 0 70 70"
                  enable-background="new 0 0 70 70"
                  xml:space="preserve"
                >
                  <g>
                    <g>
                      <path
                        d="M18.041,14.021c1.013,0,2.021,0.385,2.79,1.153l14.196,14.142l14.142-14.142c0.77-0.769,1.778-1.152,2.791-1.152
            c1.024,0,2.053,0.394,2.839,1.18c1.563,1.562,1.574,4.082,0.027,5.63L40.685,34.973l14.142,14.196
            c1.547,1.547,1.535,4.068-0.026,5.631c-0.785,0.785-1.813,1.178-2.839,1.178c-1.013,0-2.022-0.383-2.792-1.152L35.027,40.63
            L20.831,54.825c-0.769,0.77-1.778,1.154-2.791,1.154c-1.024,0-2.054-0.395-2.839-1.18c-1.563-1.563-1.574-4.084-0.027-5.631
            l14.197-14.196L15.174,20.831c-1.547-1.547-1.533-4.068,0.027-5.63C15.987,14.415,17.016,14.021,18.041,14.021 M18.041,10.021
            L18.041,10.021c-2.138,0-4.151,0.835-5.667,2.351c-3.12,3.121-3.132,8.185-0.028,11.287l11.363,11.319L12.346,46.339
            c-3.105,3.107-3.092,8.172,0.028,11.289c1.514,1.516,3.526,2.352,5.666,2.352c2.126,0,4.121-0.826,5.62-2.326l11.362-11.361
            l11.313,11.355c1.505,1.504,3.5,2.33,5.626,2.33c2.138,0,4.15-0.834,5.666-2.35c3.12-3.121,3.132-8.184,0.027-11.287
            L46.336,34.978L57.654,23.66c3.104-3.106,3.092-8.17-0.028-11.287c-1.514-1.516-3.526-2.351-5.666-2.351
            c-2.124,0-4.119,0.825-5.618,2.323l-11.32,11.319L23.654,12.34C22.162,10.847,20.166,10.022,18.041,10.021L18.041,10.021z"
                      />
                    </g>
                    <g>
                      <path
                        d="M50.7,21.714c-0.256,0-0.512-0.098-0.707-0.293c-0.391-0.391-0.391-1.023,0-1.414l2.121-2.121
            c0.391-0.391,1.023-0.391,1.414,0s0.391,1.023,0,1.414l-2.121,2.121C51.212,21.617,50.956,21.714,50.7,21.714z"
                      />
                    </g>
                    <g>
                      <path
                        d="M40.801,31.614c-0.256,0-0.512-0.098-0.707-0.293c-0.391-0.391-0.391-1.023,0-1.414l7.07-7.07
            c0.391-0.391,1.023-0.391,1.414,0s0.391,1.023,0,1.414l-7.07,7.07C41.313,31.516,41.057,31.614,40.801,31.614z"
                      />
                    </g>
                  </g>
                </svg>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
