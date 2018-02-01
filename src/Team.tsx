import * as React from 'react';
import './Team.css';

interface TeamProps {
  division: string;
  gender: string;
  teamName: string;
  search: string;
}

interface TeamState {
    ranking: number;
    power: number;
    wins: number;
    losses: number;
}

class Team extends React.Component<TeamProps, TeamState> {

  constructor(props: TeamProps) {
    super(props);

    this.viewStats = this.viewStats.bind(this);

    this.state = {
      ranking: 0,
      power: 100,
      wins: 0,
      losses: 0
    };

    this.removeTeam = this.removeTeam.bind(this);
  }

  removeTeam = () => {
    global.console.log('remove team');
  }

  getRanking = (division: string, gender: string, teamName: string, search: string) => {
    global.console.log(this.state.ranking);
  }

  getTeamPage = (division: string, gender: string, teamName: string, search: string) => {
    global.console.log('');
  }

  viewStats = () => {
    global.console.log('view stats');
  }

  render() {
    return (
      <div className="Team">
        <div id="teamInfo">
          <div id="winloss">
            {this.state.wins}-{this.state.losses}
          </div>
          <div id="ranking">
            <span className="rank">{this.state.ranking}</span>
            <br />
            <span className="power">{this.state.power}</span>
          </div>
          <div id="name">
            <a href="">{this.props.teamName}</a>
          </div>
        </div>
        <table id="tournamentResults" />
        <div id="remove">
          <button data-class="btn" id="removeBtn" name="remove" onClick={this.removeTeam}>
            <img id="removeImg" src="https://png.icons8.com/metro/1600/trash.png" />
          </button>
        </div>
      </div>
    );
  }
}

export default Team;
