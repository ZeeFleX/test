import React, { Component } from "react";
import { Route } from "react-router";
import { inject, observer } from "mobx-react";

// components
import EntitiesTable from "./components/entitiesTable";

// styles
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.sass";

@inject("routing")
@observer
export default class App extends Component<any> {
  render() {
    return (
      <div className="App">
        <EntitiesTable />
      </div>
    );
  }
}
