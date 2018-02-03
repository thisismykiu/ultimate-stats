import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as $ from 'jquery';
import './App.css';
import Team from './Team';
import { getTeamPage, getRanking, getPower, getWins, getLosses, getFullName } from './scrape.js';

interface AppProps {

}

interface AppState {
    division: string;
    gender: string;
    teamName: string;
    search: string;
    teamPage: string;
    ranking: string;
    power: string;
    wins: string;
    losses: string;
    fullName: string;
}

const proxyurl = 'https://cors-anywhere.herokuapp.com/';

class App extends React.Component<AppProps, AppState> {

  constructor(props: AppProps) {
    super(props);

    this.viewStats = this.viewStats.bind(this);

    this.state = {
      division: '',
      gender: '',
      teamName: '',
      search: '',
      teamPage: '',
      ranking: '',
      power: '',
      wins: '',
      losses: '',
      fullName: ''
    };
  }

  viewStats = () => {
    $('#viewStats').prop('disabled', true);
    $('#viewStats').css('backgroundColor', '#159dab');
    $('#viewStats').css('cursor', 'wait');

    var teamSearch = `http://play.usaultimate.org/teams/events/team_rankings/?RankSet=${this.state.division}-${this.state.gender}&F_${this.state.search}Name=${this.state.teamName}`;

    var teamPage: string;
    var ranking: string;
    var power: string;
    var wins: string;
    var losses: string;
    var fullName: string;

    $.get(proxyurl + teamSearch, (data) => {
      teamPage = getTeamPage(data, this.state.teamName, this.state.search);
      return data;
    })
    .done((data) => {
      if (teamPage.length > 0) {
        ranking = getRanking(data, this.state.teamName, this.state.search);
        power = getPower(data, this.state.teamName, this.state.search);
        wins = getWins(data, this.state.teamName, this.state.search);
        losses = getLosses(data, this.state.teamName, this.state.search);

        this.setState({
          teamPage: teamPage,
          ranking: ranking,
          power: power,
          wins: wins,
          losses: losses
        });

        $.get(proxyurl + teamPage, (info) => {
          fullName = getFullName(info, this.state.teamName, this.state.search);
        })
        .done(() => {
          this.setState({
            fullName: fullName
          });
        })
        .done(() => {
          ReactDOM.render(<div />, document.getElementById('root'));

          $('body').css('display', 'block');

          ReactDOM.render(
            <Team teamName={this.state.teamName} search={this.state.search} teamPage={this.state.teamPage} ranking={this.state.ranking} power={this.state.power} wins={this.state.wins} losses={this.state.losses} fullName={this.state.fullName}/>,
            document.getElementById('teams')
          );
        });
      } else {
        alert('Team not found. Please search for a valid team.');

        window.location.reload(); 
      }
    });
  }

  render() {
    return (
      <div className="App">
        <div className="userInput">
          <div className="section" id="byTournament">
            <p>Enter USAU tournament schedule website:</p>
            <input 
              type="url" 
              name="tournamentURL" 
              id="tournamentURL"
              placeholder="https://play.usaultimate.org/events/{Tournament Name}/schedule/{Gender}/{Division}-{Gender}/" 
            />
          </div>
          <div className="section" id="byTeam">
            <p>Or select a team:</p>
            <select id="division" onChange={event => {if (event.target.value === 'Club') { this.setState({ search: 'Team'}); } else { this.setState({ search: 'School'}); } this.setState({ division: event.target.value }); }}>
              <option>--DIVISION--</option>
              <option value="Club">Club</option>
              <option value="College">College</option>
            </select>
            <select id="gender" onChange={event => this.setState({ gender: event.target.value })}>
              <option>--GENDER--</option>
              <option value="Men">Men</option>
              <option value="Mixed">Mixed</option>
              <option value="Women">Women</option>
            </select>
            <input type="text" id="teamName" name="teamName" placeholder="Team name" onChange={event => this.setState({ teamName: event.target.value })}/>
          </div>
          <button id="viewStats" type="submit" name="viewStats" className="btn" onClick={this.viewStats} >View Stats</button>
        </div>
      </div>
    );
  }
}

export default App;
