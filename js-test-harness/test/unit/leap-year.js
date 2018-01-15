import Contacts, { Node } from '../../src/contacts.js';

import { map } from 'funcadelic';

function double(i) { return i * 2; }

describe('funcadelic', () => {
  it('can double', function() {
    expect(double(6)).to.equal(12);
  });

  it('can double by  map', function() {
    expect(map(double, [1,2])).to.have.members([2,4]);
  });
})
// Describe('LeapYear', () => {
// });
