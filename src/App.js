import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./Home";
import Adicionales from "./adicionales/Adicionales";
import Cliente from "./cliente/Cliente";
import Zona from "./zona/Zona";
import Consumo from "./consumo/Consumo";
import Layout from "./component/Layout";
import Precios from "./precios/Precios";
import VerZona from "./zona/VerZona";
import PagoMedidor from "./medidor/PagoMedidor";
import HistorialPagos from "./medidor/HistorialPagos";
import DeudasMedidor from "./medidor/DeudasMedidor";

const App = (props) => {
  return (
    <>
      <Router>
        <Layout>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/adicionales" component={Adicionales} />
            <Route exact path="/cliente" component={Cliente} />
            <Route exact path="/zona" component={Zona} />
            <Route exact path="/consumo/:clienteId" component={Consumo} />
            <Route exact path="/precios" component={Precios} />
            <Route exact path="/zona/:zonaId" component={VerZona} />
            <Route exact path="/pagomedidor" component={PagoMedidor} />
            <Route
              exact
              path="/pagomedidor/:medidorId"
              component={HistorialPagos}
            />
            <Route exact path="/deudasmedidor" component={DeudasMedidor} />
          </Switch>
        </Layout>
      </Router>
    </>
  );
};

export default App;
