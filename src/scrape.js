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

export function getFullName(data, name, search) {
    const $ = cheerio.load(data, {
        xmlMode: true
    });

    var fullName = $($('.profile_info').children().get(0).children).get(0).data.replace(/"/g, "").replace(/'/g, "").replace(/\(|\)/g, "").replace(/\s{2,}/g,'');
    var re = new RegExp(' '+name, 'g');
    var count = (fullName.match(re) || []).length;
    while (count > 0) {
        fullName = fullName.replace(` ${name}`,'');
        count = (fullName.match(re) || []).length;
    }

    return fullName;
}
