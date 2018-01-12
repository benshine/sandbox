import canCreateNote  from '../../src/ransom-noter.js';

describe('NoteBuilder', () => {


  function expectCreatePossible(note, magazine, isPossible, msg = 'unnamed') {
    expect(canCreateNote(note, magazine)).to.equal(isPossible, msg);
  };


  it('can create note when ransom note is exactly the magazine', function() {
    const note = 'this should be easy'.split(' ');
    const magazine = 'this should be easy'.split(' ');
    expectCreatePossible(note, magazine, true, 'same easy');
  });

  it('cannnot create note when a word ismissing', function() {
    const noteWords = 'cat dog puppy lump fish'.split(' ');
    const magazine = 'cat cat cat'.split(' ');
    expectCreatePossible(noteWords, magazine, false, 'needs puppies');
  });

  it('works with duplicate words', function() {
    const magazine = 'two times three is not four'.split(' ');
    const note = 'two times two is four'.split(' ');
    expectCreatePossible(note, magazine, false, 'needs two twice');
  });


});
