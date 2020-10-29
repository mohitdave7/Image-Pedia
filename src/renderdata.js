import React, { useState } from "react";
import "./App.css";

function RenderData({ data }) {
  const [hasmore, setHasmore] = useState(true);

  return (
    <div className="image-box">
      <div className="col-12">
        <div className="row">
          {data &&
            data.map((item, i) => (
              <div className="col-lg-4 col-sm-6" key={i}>

                  <div className="box-in">
                    <div className="img-sec">
                      <img src={item.urls.regular} alt={item.name} />
                    </div>


                  </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default RenderData;
