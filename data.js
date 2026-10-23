// Random but valid test data for the origo-booking school form (SchoolForm.tsx / LoppemarkedForm.tsx).
window.NinjaData = (() => {
  const pick = (list) => list[Math.floor(Math.random() * list.length)];
  const rand = (min, max) => min + Math.floor(Math.random() * (max - min + 1));

  const FIRST_NAMES = [
    'Kari', 'Ola', 'Ingrid', 'Lars', 'Sofie', 'Henrik', 'Nora', 'Magnus', 'Emma', 'Jonas',
    'Sigrid', 'Aksel', 'Aisha', 'Mohammed', 'Linnea', 'Tobias', 'Frida', 'Emil', 'Thea', 'Ibrahim',
  ];
  const LAST_NAMES = [
    'Nordmann', 'Hansen', 'Johansen', 'Olsen', 'Larsen', 'Andersen', 'Pedersen', 'Nilsen',
    'Kristiansen', 'Berg', 'Haugen', 'Bakken', 'Dahl', 'Ali', 'Strand', 'Lie',
  ];
  const STREETS = [
    'Karl Johans gate', 'Storgata', 'Thorvald Meyers gate', 'Bogstadveien', 'Grønlandsleiret',
    'Trondheimsveien', 'Kirkeveien', 'Markveien', 'Ullevålsveien', 'Hegdehaugsveien',
  ];
  // Real Oslo postcodes so the pair looks plausible.
  const POSTAL = [
    ['0150', 'Oslo'], ['0154', 'Oslo'], ['0182', 'Oslo'], ['0250', 'Oslo'], ['0355', 'Oslo'],
    ['0458', 'Oslo'], ['0552', 'Oslo'], ['0655', 'Oslo'], ['0751', 'Oslo'], ['0975', 'Oslo'],
  ];
  const VOLUNTEER_ORGS = [
    'Grünerløkka Strikkeklubb', 'Tøyen Brettspillvenner', 'Sagene Sjakkgjeng', 'Frogner Fotballfrivillige',
    'Nordstrand Korvenner', 'Holmlia Dataklubb', 'Bjerke Bakegruppe',
  ];
  const MUNICIPAL_ORGS = [
    'Utdanningsetaten', 'Bydel Gamle Oslo', 'Kulturetaten', 'Bydel Frogner', 'Deichman', 'Bydel Grorud',
    'Origo',
  ];
  const OTHER_ACTIVITIES = [
    'Ninjatrening', 'Lego-workshop', 'Strikkekafé', 'Brettspillkveld', 'Origami-kurs', 'Sjakkturnering',
  ];
  const DESCRIPTIONS = [
    'Vi skal ha en hyggelig samling med aktiviteter for hele gruppen. Testbooking laget av ninjaen.',
    'Ukentlig øving med instruktør. Vi rydder etter oss og holder god orden. (Testdata)',
    'Felles arrangement med enkel servering og litt underholdning. Dette er en testbooking.',
    'Kurs for nybegynnere, ingen forkunnskaper kreves. Generert testdata – kan slettes.',
    'Stille aktivitet, maks lydnivå som et klasserom. Laget av Booking Test Data Ninja.',
  ];

  const asciiSlug = (s) =>
    s.toLowerCase().replace(/æ/g, 'ae').replace(/ø/g, 'o').replace(/å/g, 'aa').replace(/ü/g, 'u').replace(/[^a-z]/g, '');

  const person = () => {
    const first = pick(FIRST_NAMES);
    const last = pick(LAST_NAMES);
    const [postCode, postalName] = pick(POSTAL);
    return {
      name: `${first} ${last}`,
      email: `${asciiSlug(first)}.${asciiSlug(last)}${rand(1, 999)}@example.com`,
      // 8 digits starting with 4 or 9, like a Norwegian mobile number.
      phone: `${pick(['4', '9'])}${String(rand(0, 9999999)).padStart(7, '0')}`,
      street: `${pick(STREETS)} ${rand(1, 120)}`,
      postCode,
      postalName,
    };
  };

  return {
    pick,
    rand,
    person,
    participants: () => rand(4, 60),
    description: () => pick(DESCRIPTIONS),
    otherActivity: () => pick(OTHER_ACTIVITIES),
    volunteerOrg: () => pick(VOLUNTEER_ORGS),
    municipalOrg: () => pick(MUNICIPAL_ORGS),
  };
})();
