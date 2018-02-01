import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Team from './Team';
import jasmine from 'jasmine';

it('renders without crashing', () => {
    div = document.createElement('div');
    ReactDOM.render(<Team division="College" gender="Women" teamName="Texas" search="School" />, div);
});

describe('Team', () => {
    const div;

    spy = jasmine.createSpy

    beforeEach(() => {
        div = document.createElement('div');
        ReactDOM.render(<Team division="College" gender="Women" teamName="Texas" search="School" />, div);
    });

    afterEach(() => {
        if (div) {
            div.remove();
            div = undefined;
        }
    });

    it('removes the component', () => {
        spyOn(div, 'removeTeam');
        document.getElementById('removeBtn').click();
        expect(div.removeTeam).toHaveBeenCalled();
    });
});
