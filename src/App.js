import React from "react";
import "./App.css";
import moment from "moment";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: undefined,
      city: "",
      error: undefined,
      img: "",
    };
  }

  getweather = (e) => {
    e.preventDefault();
    if (!this.state.city) {
      this.setState({
        error: `Enter the city please`,
      });
    } else {
      fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=${this.state.city}&appid=41996580c975e831ccaa55f66f0c054c`
      )
        .then((response) => {
          if (response.status === 200) {
            return response.json();
          } else {
            console.log("unable to fetch");
          }
        })
        .then((data) => {
          if (data) {
            console.log(data);
            console.log(data.weather[0].description);
            this.setState({
              data,
              error: undefined,
              img: `http://openweathermap.org/img/w/${data.weather[0].icon}.png`,
            });
          } else {
            console.log("check internet coonection");
          }
        });
    }
  };

  change = (e) => {
    this.setState({
      city: e.target.value,
    });
  };
  render() {
    return (
      <div id="home" className="weather-app-container">
        <h1 className="text-white text-center pt-2">Weather App</h1>
        <nav className="navbar navbar-light mt-4">
          <form className="form-inline m-auto" id="form-one">
            <div className="input-group">
              <input
                id="f"
                onChange={this.change}
                autoComplete="off"
                type="text"
                className="form-control border-top-0 border-right-0 border-left-0 border-dark"
                placeholder="Search City"
                aria-label="Username"
                aria-describedby="basic-addon1"
              ></input>
              <div class="input-group-append">
                <button
                  onClick={this.getweather}
                  className="input-group-text bg-dark border-top-0 border-right-0 border-left-0 border-dark text-white btn"
                  id="basic-addon1"
                >
                  <i className="fa fa-search"></i>
                </button>
              </div>
            </div>
          </form>
        </nav>
        <div className="container mt-3">
          {this.state.error && (
            <p className="text-white font-weight-normal text-center">
              {this.state.error}
            </p>
          )}
          {this.state.data && (
            <div className="row">
              <div className="col-1"></div>
              <div className="col-5 text-white h2 font-weight-bold">
                {this.state.data.name}, {this.state.data.sys.country}
                <div className="font-weight-normal lead">
                  {moment().format("hh:mm a dddd, Do MMM 'YY")}
                </div>
              </div>
            </div>
          )}
          {this.state.data && (
            <div className="row mt-5" id="maindiv">
              <div className="col-xs-6 col-lg-6 col-12">
                <div id="div">
                  <div className="text-white">
                    <img src={this.state.img} id="img-size"></img>
                  </div>
                  <div
                    className="text-white mt-4"
                    style={{ fontSize: "32px", fontWeight: "bold" }}
                  >
                    {Math.ceil(this.state.data.main.temp - 273.15)} &deg;C
                    <div className="font-weight-normal lead">
                      {this.state.data.weather[0].description}
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xs-6 col-lg-6 col-12">
                <div className="row">
                  <div className="col-4 text-white lead font-weight-normal">
                    {Math.ceil(this.state.data.main.temp_max - 273.15)} &deg;
                    <div className="text-dark">High</div>
                    <div>
                      {Math.ceil(this.state.data.main.temp_min - 273.15)} &deg;
                    </div>
                    <div className="text-dark">Low</div>
                  </div>
                  <div className="col-4 text-white lead font-weight-normal">
                    {this.state.data.wind.speed}
                    <div className="text-dark">Wind</div>
                    <div>{this.state.data.main.pressure}</div>
                    <div className="text-dark">Pressure</div>
                  </div>
                  <div className="col-4 text-white lead font-weight-normal">
                    {moment(this.state.data.sys.sunrise * 1000).format(
                      "hh:mm a"
                    )}
                    <div className="text-dark">Sunrise</div>
                    <div>
                      {moment(this.state.data.sys.sunset * 1000).format(
                        "hh:mm a"
                      )}
                    </div>
                    <div className="text-dark">Sunset</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default App;
