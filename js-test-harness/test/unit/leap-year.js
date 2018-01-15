import Contacts, { Node } from '../../src/contacts.js';

import { map } from 'funcadelic';

function double(i) { return i * 2; }

describe('funcadelic', () => {
  it('can double', function() {
    expect(double(6)).to.equal(12);
  })
})
// describe('LeapYear', () => {
// });
