const Client = require('ftp');
const fs = require('fs');
const xml2js = require('xml2js');
const path = require('path');


const tar = require('tar');
const zlib = require('zlib');
const timezoneJS = require('timezone-js');

const regionMap = {'Etc':'etcetera','EST':'northamerica','MST':'northamerica','HST':'northamerica','EST5EDT':'northamerica','CST6CDT':'northamerica','MST7MDT':'northamerica','PST8PDT':'northamerica','America':['northamerica','southamerica'],'Pacific':'australasia','Atlantic':'europe','Africa':'africa','Indian':'africa','Antarctica':'antarctica','Asia':'asia','Australia':'australasia','Europe':'europe','WET':'europe','CET':'europe','MET':'europe','EET':'europe'};
const regionExceptions = {'Pacific/Honolulu':'northamerica','Atlantic/Bermuda':'northamerica','Atlantic/Cape_Verde':'africa','Atlantic/St_Helena':'africa','Indian/Kerguelen':'antarctica','Indian/Chagos':'asia','Indian/Maldives':'asia','Indian/Christmas':'australasia','Indian/Cocos':'australasia','America/Danmarkshavn':'europe','America/Scoresbysund':'europe','America/Godthab':'europe','America/Thule':'europe','Asia/Istanbul':'europe','Asia/Yekaterinburg':'europe','Asia/Omsk':'europe','Asia/Novosibirsk':'europe','Asia/Krasnoyarsk':'europe','Asia/Irkutsk':'europe','Asia/Yakutsk':'europe','Asia/Vladivostok':'europe','Asia/Sakhalin':'europe','Asia/Magadan':'europe','Asia/Kamchatka':'europe','Asia/Anadyr':'europe','Africa/Ceuta':'europe','GMT':'etcetera','Europe/Nicosia':'asia'};

const xmlParser = new xml2js.Parser();

// copied from timezone-js
const files = [
      'Africa'
    , 'Antarctica'
    , 'Asia'
    , 'Australasia'
    , 'Backward'
    , 'Etcetera'
    , 'Europe'
    , 'Factory'
    , 'NorthAmerica'
    , 'PacificNew'
    , 'SouthAmerica'
    , 'SystemV'
];

const EXCLUDED = new RegExp('README|Makefile|factory|(\\.+)', 'i');

const FTP_HOST = 'ftp.iana.org';
const FTP_TZDATA_IANA = 'tz/tzdata-latest.tar.gz';

function cityInfo(tz, city) {
    if (!tz || !city) { return {}; }

    var zoneList = tz.zones[city];
    var rules = {};

    for (var i = 0; i < zoneList.length; i++) {
        var ruleKey = zoneList[i][1];
        rules[ruleKey] = tz.rules[ruleKey];
    }

    return {
        zones: zoneList,
        rules
    };
}

const IMPORTS = `const dm = require('@progress/kendo-date-math');\n`;
function buildTemplate(method) {
    return function(result) {
        return IMPORTS + 'dm.loadTimezone(' + JSON.stringify(result, null, 2) + ');';
    }
}

function exists(dir) {
    return fs.existsSync(dir);
}

function ensure(dir) {
    dir.split('/').reduce(function(prev, curr) {
        const next = prev + '/' + curr;

        if (exists(prev) === false) {
            fs.mkdirSync(prev);
        }

        if (exists(next) === false) {
            fs.mkdirSync(next);
        }

        return next;
    });
}

function fetchAndExtractZones(dirLocation) {
    ensure(dirLocation);
    return new Promise(function (reject, resolve) {
        const client = new Client();
        client.on('ready', function() {
            client.get(FTP_TZDATA_IANA, function(err, stream) {
                if (err) {
                    console.error('Error during accessing IANA FTP server!');
                    reject(err);
                }

                console.info(`Fetching data from ${FTP_HOST}...`);

                stream.once('close', function() {
                    console.info('Olson DB was cloned successfully!');
                    client.end();
                    resolve();
                });

                stream
                  .pipe(zlib.Unzip())
                  .pipe(tar.Parse())
                  .on('entry', function(entry) {
                      var fullpath  = path.join(dirLocation, entry.path);
                      entry.pipe(fs.createWriteStream(fullpath));
                  });
            });
        });

        console.info(`Connecting to ${FTP_HOST}...`);
        client.connect({ host: FTP_HOST });
    });
}

function findTitle(timezone, titles) {
    for (let key in titles) {
        if (key.indexOf(timezone) > -1) {
            return titles[key].name;
        }
    }

    return null;
}

function findGroup(longName, groups) {
    if (!longName) { return null; }

    for (let g of groups) {
        if (g.value === longName) {
            return g.text;
        }
    }

    return null;
}

function buildTimezones({ content = buildTemplate('loadTimezone'), groupsFile, titlesFile, olsonRepo, timezonesDir }) {
    const regionsDir = `${timezonesDir}/regions`;

    const _tz = timezoneJS.timezone;
    const result = {};

    if (!exists(olsonRepo)) {
        console.error('Error: Olson repository is not available. Run gulp sync-timezones to download it.');
        return;
    }

    ensure(timezonesDir);
    ensure(regionsDir);

    _tz.loadingScheme = _tz.loadingSchemes.MANUAL_LOAD;
    _tz.zoneFiles = files;

    for (var i = 0; i < _tz.zoneFiles.length; i++) {
        var zoneFile = _tz.zoneFiles[i];
        if (EXCLUDED.test(zoneFile)) continue;
        var zoneData = fs.readFileSync(path.join(olsonRepo, zoneFile), 'utf8');
        _tz.parseZones(zoneData);
    }

    const { groups } = JSON.parse(fs.readFileSync(groupsFile));
    const { titles } = JSON.parse(fs.readFileSync(titlesFile));

    let regions = {};
    let allTitles = {};

    for (const name in _tz.zones) {
        const { rules, zones } = cityInfo(_tz, name);

        const continentName = getContinentName(name);

        const title = findTitle(name, titles);
        const cityTitles = { [name]: { long: title, group: findGroup(title, groups) } };

        Object.assign(allTitles, cityTitles);

        if (continentName) {
            const regionInfo = regions[continentName] || {};

            const regionRules = Object.assign({}, regionInfo.rules, rules);
            const regionTitles = regionInfo.titles || {};
            const regionZones = regionInfo.zones || {};

            regionTitles[name] = cityTitles;
            regionZones[name] = zones;
            regions[continentName] = { rules: regionRules, titles: regionTitles, zones: regionZones };
        }

        const fileName = path.join(timezonesDir, name + '.js');
        const dirName = path.dirname(fileName);

        ensure(dirName);
        fs.writeFileSync(
            fileName,
            content({ zones: { [name]: zones }, rules, titles: cityTitles })
        );
    }

    for (let regionName in regions) {
        fs.writeFileSync(path.join(regionsDir, `${regionName}.js`), content(regions[regionName]));
    }

    fs.writeFileSync(
        path.join(timezonesDir, 'all.js'),
        content({
            rules: _tz.rules,
            titles: allTitles,
            zones: _tz.zones
        })
    );
}

function getContinentName(name) {
    const continentName = (name.split('/')[0] || name);
    return files.filter(f => f.indexOf(continentName) !== -1)[0] || null;
}

module.exports = {
    buildTimezones,
    fetchAndExtractZones
};
