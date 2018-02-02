import * as $ from 'jquery';
const cheerio = require('cheerio');

export function getTeamPage(data, name, search) {
    var $ = cheerio.load(data, {
        xmlMode: true
    });

    try {
        var teamPage = 'http://play.usaultimate.org' + $('#CT_Main_0_gvList_ctl02_lnk' + search).get(0).attribs.href;
        return teamPage;
    } catch (error) {
        return '';
    }
}

function replaceAllButFirst(string, regex) {
    var count = 0
    var replaceWith = ''

    return string.replace(regex, function (match) {
        count++
        if (count === 1) {
          return match
        } else {
          return replaceWith
        }
    })
}

export function getFullName(data, name, search) {
    const $ = cheerio.load(data, {
        xmlMode: true
    });

    var fullName = $($('.profile_info').children().get(0).children).get(0).data.replace(/"/g, "").replace(/'/g, "").replace(/\(|\)/g, "").replace(/\s{2,}/g,'');
    
    var re = new RegExp(name, 'g');

    return replaceAllButFirst(fullName, re);
}

export function getRanking(data, name, search) {
    const $ = cheerio.load(data, {
        xmlMode: true
    });

    var ranking = $($($('#CT_Main_0_gvList').children().get(1).children).get(1).children).get(0).data;

    return ranking;
}

export function getPower(data, name, search) {
    const $ = cheerio.load(data, {
        xmlMode: true
    });

    var power = $($($('#CT_Main_0_gvList').children().get(1).children).get(3).children).get(0).data.replace(' ','');

    return power;
}

export function getWins(data, name, search) {
    const $ = cheerio.load(data, {
        xmlMode: true
    });

    var wins;
    switch (search) {
        case 'School':
            wins = $($($('#CT_Main_0_gvList').children().get(1).children).get(9).children).get(0).data;
            break;
        case 'Team':
            wins = $($($('#CT_Main_0_gvList').children().get(1).children).get(10).children).get(0).data;
            break;
    }

    return wins;
}

export function getLosses(data, name, search) {
    const $ = cheerio.load(data, {
        xmlMode: true
    });

    var losses;
    switch (search) {
        case 'School':
            losses = $($($('#CT_Main_0_gvList').children().get(1).children).get(10).children).get(0).data;
            break;
        case 'Team':
            losses = $($($('#CT_Main_0_gvList').children().get(1).children).get(11).children).get(0).data;
            break;
    }

    return losses;
}
