import Team from './Team';
jest.mock('./Team');

describe('Team', () => {
    const props = {
        division: 'College', 
        gender: 'Women', 
        teamName: 'Texas', 
        search: 'School'
    };

    beforeEach(() => {
        Team.mockClear();
    });

    it('renders without crashing', () => {
        const team = new Team(props);
        expect(Team).toHaveBeenCalledTimes(1);
    });

    it('removes the component', () => {
        const mockTeamInstance = Team.mock.instances[0];
        const mockRemoveTeam = mockTeamInstance.removeTeam;

        document.getElementById('removeBtn').click();
        expect(mockRemoveTeam).toHaveBeenCalledTimes(1);
    });
});
