import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as $ from 'jquery';
import './App.css';
import Team from './Team';
import { getTeamPage } from './scrape.js';

interface AppProps {

}

interface AppState {
    division: string;
    gender: string;
    teamName: string;
    search: string;
    teamPage: string;
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
      teamPage: ''
    };
  }

  viewStats = () => {
    var teamSearch = `http://play.usaultimate.org/teams/events/team_rankings/?RankSet=${this.state.division}-${this.state.gender}&F_${this.state.search}Name=${this.state.teamName}`;

    var teamPage: string;

    $.get(proxyurl + teamSearch, (data) => {
      teamPage = getTeamPage(data, this.state.teamName, this.state.search);
    })
    .done(() => {
      if (teamPage.length > 0) {
        this.setState({
          teamPage: teamPage
        });

        ReactDOM.render(<div />, document.getElementById('root'));

        $('body').css('display', 'block');

        ReactDOM.render(
          <Team teamName={this.state.teamName} search={this.state.search} teamPage={this.state.teamPage}/>,
          document.getElementById('teams')
        );
      } else {
        alert('Team not found. Please search for a valid team.');

        var elements = document.getElementsByTagName('select');
        for (var i = 0; i < elements.length ; i++) {
          elements[i].selectedIndex = 0;
        }

        var teamName = document.getElementById('teamName') as HTMLInputElement;
        if (teamName) {
          teamName.value = '';
        }
      }
    });
  }

  render() {
    return (
      <div className="App">
        <div id="userInput">
          <fieldset>
            <p>Enter USAU tournament schedule website:</p>
            <input 
              type="url" 
              name="tournamentURL" 
              id="tournamentURL"
              placeholder="https://play.usaultimate.org/events/{Tournament Name}/schedule/{Gender}/{Division}-{Gender}/" 
            />
          </fieldset>
          <fieldset>
            <p>Or select a team:</p>
            <select id="division" data-class="division" onChange={event => {if (event.target.value === 'Club') { this.setState({ search: 'Team'}); } else { this.setState({ search: 'School'}); } this.setState({ division: event.target.value }); }}>
              <option>--DIVISION--</option>
              <option value="Club">Club</option>
              <option value="College">College</option>
            </select>
            <select id="gender" data-class="gender" onChange={event => this.setState({ gender: event.target.value })}>
              <option>--GENDER--</option>
              <option value="Men">Men</option>
              <option value="Mixed">Mixed</option>
              <option value="Women">Women</option>
            </select>
            <input type="text" id="teamName" name="teamName" placeholder="Team name" data-class="teamName" onChange={event => this.setState({ teamName: event.target.value })}/>
          </fieldset>
          <button id="viewStats" type="submit" name="viewStats" data-class="btn" onClick={this.viewStats}>View Stats</button>
        </div>
      </div>
    );
  }
}

export default App;
