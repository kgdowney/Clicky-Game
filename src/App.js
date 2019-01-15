//imports dependencies and files
import React, { Component } from "react";
import Navbar from "./components/Navbar";
import Jumbotron from "./components/Jumbotron";
import FriendCard from "./components/FriendCard";
import Footer from "./components/Footer";
import dino from "./dino.json";
import "./App.css";

//sets state to 0 or empty
class App extends Component {
  state = {
    dino,
    clickedDino: [],
    score: 0
  };

//when you click on a card ... the dino is taken out of the array
  imageClick = event => {
    const currentDino = event.target.alt;
    const DinoAlreadyClicked =
      this.state.clickedDino.indexOf(currentDino) > -1;

//if you click on a dino that has already been selected, the game is reset and cards reordered
    if (DinoAlreadyClicked) {
      this.setState({
        fish: this.state.dino.sort(function(a, b) {
          return 0.5 - Math.random();
        }),
        clickedDino: [],
        score: 0
      });
        alert("You lose. Play again?");

//if you click on an available dino, your score is increased and cards reordered
    } else {
      this.setState(
        {
          dino: this.state.dino.sort(function(a, b) {
            return 0.5 - Math.random();
          }),
          clickedDino: this.state.clickedDino.concat(
            currentDino
          ),
          score: this.state.score + 1
        },
//if you get all 12 dino corrent you get a congrats message and the game resets        
        () => {
          if (this.state.score === 12) {
            alert("Yay! You Win!");
            this.setState({
              dino: this.state.dino.sort(function(a, b) {
                return 0.5 - Math.random();
              }),
              clickedDino: [],
              score: 0
            });
          }
        }
      );
    }
  };

//the order of components to be rendered: navbar, jumbotron, friendcard, footer 
  render() {
    return (
      <div>
        <Navbar 
          score={this.state.score}
        />
        <Jumbotron />
        <div className="wrapper">
          {this.state.dino.map(dino => (
            <FriendCard
              imageClick={this.imageClick}
              id={dino.id}
              key={dino.id}
              image={dino.image}
            />
          ))}
        </div>
        <Footer />
      </div>
    );
  }
}
export default App;