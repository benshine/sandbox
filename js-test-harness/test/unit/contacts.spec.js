import Contacts, { Node } from '../../src/contacts.js';

describe('Contacts', () => {

  let subject;

  function expectContainsCount(partial, count, msg = '') {
    expect(subject.findPartial(partial)).to.equal(count, msg);
  }

  beforeEach(() => {
    subject = new Contacts();
  });

   describe('add', function() {
     it('can add a single name', function() {
       expect(subject.contents(false)).to.have.length(0);
       subject.add('ronald');
       expect(subject.contents(false)).to.have.length(1);
     });

     it('can add several names of one letter each', function() {
       expect(subject.contents(false)).to.have.length(0);
       subject.add('r');
       subject.add('b');
       subject.add('z');
       expect(subject.contents(false)).to.have.length(3);
    });

     it('can add several names of several letters each', function() {
       expect(subject.contents(false)).to.have.length(0);
       subject.add('ra');
       subject.add('ba');
       subject.add('zi');
       expect(subject.contents(false)).to.have.length(3);
     });

     it('can add several at once', function() {
       subject.add('ronald', 'alice', 'george', 'jordan');
       expect(subject.contents(false)).to.have.length(4);
     });
   });
;
  describe('find', function() {
    it('can find a single letter name', function() {
      subject.add('z');
      expectContainsCount('z', 1, 'z has one');
      expectContainsCount('r', 0, 'r has none');
    });
    it('can find a two letter name', function() {
      subject.add('bo');
      expect(subject.findPartial('bo')).to.equal(1);
      expect(subject.findPartial('bj')).to.equal(0);
    });
    it('can find a partial match with several children', function() {
      subject.add('zed');
      expectContainsCount('ze', 1, 'should have just zed');
      subject.add('zeb');
      subject.add('zen');
      expectContainsCount('ze', 3, 'should have zed, zeb, zen');
    });

    it('can find no match if the first letter does not match', function() {
      subject.add('ronald');
      subject.add('george');
      subject.add('alice');
      expectContainsCount('z', 0, 'nothing starts with z');
    });
  });

  describe('test cases', function() {
    it('works for the sample', function() {
      subject.add('hack');
      subject.add('hackerrank');
      expectContainsCount('hac', 2, 'two hacs');
      expectContainsCount('hak', 0, 'no haks');
    });

    it('works for simplified sample', function() {
      subject.add('hack', 'hackr');
      expectContainsCount('ha', 2, 'two has');
      expectContainsCount('hac', 2, 'two hacs');
    });
  });

  describe('contents', function() {
    xit('returns the entire contents', function() {
      const names = ['ronald', 'george', 'roy', 'rick'];
      for (name in names) {
        subject.add(name);
      }
      expect(subject.contents(true)).to.have.members(names);
    });
  });
});
