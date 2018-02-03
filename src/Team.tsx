import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './Team.css';

interface TeamProps {
  teamName: string;
  search: string;
  teamPage: string;
  ranking: string;
  power: string;
  wins: string;
  losses: string;
  fullName: string;
}

interface TeamState {

}

class Team extends React.Component<TeamProps, TeamState> {
  private team: HTMLDivElement;

  constructor(props: TeamProps) {
    super(props);

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

    ReactDOM.render(
      <div className="teamInfo">
        <div className="info teamBasics">
          <span className="name">
            <a href={this.props.teamPage} target="_blank">{this.props.fullName}</a>
          </span>
          <span className="rank">#{this.props.ranking}</span>
        </div>
        <div className="info numbers">
          <span className="winloss">
            <span className="wins">{this.props.wins}</span>-<span className="losses">{this.props.losses}</span>
          </span>
          <span className="power">{this.props.power}</span>
        </div>
        <table className="info tournamentResults"/>
        <div className="info remove">
          <button className="btn removeBtn" name="remove" onClick={this.removeTeam}>
            <img className="removeImg" src="https://png.icons8.com/metro/1600/trash.png" />
          </button>
        </div>
      </div>,
      this.team
    );
  }

  removeTeam = () => {
    global.console.log('remove team');
  }

  render() {
    return (
      <div className="Team">
        <div ref={this.setRef} className="team"/>
      </div>
    );
  }
}

export default Team;
