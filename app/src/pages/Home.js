import React, { Component } from "react"; 
import CardContainer from '../components/CardContainer'

class Home extends Component {
  render() {
    return (
        <section className="container -top">
            <section className="container__header">
                <h1 className="container__headerTitle">Creatures</h1>
                <p className="container__headerSubTitle">All the creatures found within Wizards Unite</p>
            </section>
            <CardContainer />
        </section>
    );
  }
}

export default Home;