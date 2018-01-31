import * as React from 'react';
import './App.css';

interface AppProps {

}

interface AppState {
    division: string;
    gender: string;
    teamName: string;
    search: string;
}

class App extends React.Component<AppProps, AppState> {

  constructor(props: AppProps) {
    super(props);

    this.viewStats = this.viewStats.bind(this);

    this.state = {
      division: '',
      gender: '',
      teamName: '',
      search: ''
    };
  }

  viewStats = () => {
    global.console.log('view stats');
  }

  render() {
    return (
      <div className="App">
        <form>
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
        </form>
      </div>
    );
  }
}

export default App;
