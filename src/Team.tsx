import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as $ from 'jquery';
import './Team.css';
import { getFullName } from './scrape.js';

interface TeamProps {
  teamName: string;
  search: string;
  teamPage: string;
}

interface TeamState {
  fullName: string;
  ranking: number;
  power: number;
  wins: number;
  losses: number;
}

const proxyurl = 'https://cors-anywhere.herokuapp.com/';

class Team extends React.Component<TeamProps, TeamState> {
  private team: HTMLDivElement;

  constructor(props: TeamProps) {
    super(props);

    this.state = {
      fullName: '',
      ranking: 0,
      power: 100,
      wins: 0,
      losses: 0
    };

    this.removeTeam = this.removeTeam.bind(this);
  }

  setRef = (team: HTMLDivElement) => {
      this.team = team;
  }

  componentDidMount() {
    ReactDOM.render(
      <div className="loader" />,
      this.team
    );

    var fullName: string;

    $.get(proxyurl + this.props.teamPage, (data) => {
      fullName = getFullName(data, this.props.teamName, this.props.search);
    })
    .done(() => {
      this.setState({
        fullName: fullName
      });
    })
    .done(() => {
      ReactDOM.render(
        <div id="teamInfo">
          <div id="teamBasics" data-class="info">
            <div id="winloss">
              {this.state.wins}-{this.state.losses}
            </div>
            <div id="ranking">
              <span className="rank">{this.state.ranking}</span>
              <br />
              <span className="power">{this.state.power}</span>
            </div>
            <div id="name">
              <a href={this.props.teamPage} target="_blank">{this.state.fullName}</a>
            </div>
          </div>
          <table id="tournamentResults" data-class="info"/>
          <div id="remove" data-class="info">
            <button data-class="btn" id="removeBtn" name="remove" onClick={this.removeTeam}>
              <img id="removeImg" src="https://png.icons8.com/metro/1600/trash.png" />
            </button>
          </div>
        </div>,
        this.team
      );
    });
  }

  removeTeam = () => {
    global.console.log('remove team');
  }

  getRanking = (division: string, gender: string, teamName: string, search: string) => {
    global.console.log(this.state.ranking);
  }

  render() {
    return (
      <div className="Team">
        <div ref={this.setRef} id="team"/>
      </div>
    );
  }
}

export default Team;
