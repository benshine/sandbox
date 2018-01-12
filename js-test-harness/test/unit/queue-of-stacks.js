import QofStacks from '../../src/queue-of-stacks.js';

describe('Queue of Stacks', () => {

  let subject;
  beforeEach(() => {
    subject = new QofStacks();
  });
  describe('enqueue', () => {
    it('can enqueue', () => {
      subject.enqueue('george');
      expect(subject.peek()).to.equal('george');
    });

    it('can enqueue several', () => {
      subject.enqueue('alice');
      subject.enqueue('barb');
      subject.enqueue('connie');
      subject.enqueue('dahlia');
      expect(subject.peek()).to.equal('alice');
    });
  });

  describe('dequeue', () => {
    it('can dequeue from a one-element queue', function() {
      subject.enqueue('alice');
      expect(subject.dequeue()).to.equal('alice');
    });

    it('can dequeue one', function() {
      subject.enqueue('alice');
      subject.enqueue('barb');
      subject.enqueue('connie');
      subject.enqueue('dahlia');
      expect(subject.dequeue()).to.equal('alice');
    });

    it('can dequeue several in a row', function() {
      subject.enqueue('alice');
      subject.enqueue('barb');
      subject.enqueue('connie');
      subject.enqueue('dahlia');
      expect(subject.dequeue()).to.equal('alice');
      expect(subject.dequeue()).to.equal('barb');
      expect(subject.dequeue()).to.equal('connie');
    });
  });

  describe('combined', function() {
    it('can enqueue then dequeue several times', function() {
      subject.enqueue('alice');
      subject.enqueue('barb');
      subject.enqueue('connie');
      subject.enqueue('dahlia');
      expect(subject.peek()).to.equal('alice');
      subject.dequeue(); // this should get alice
      subject.enqueue('florence');
      expect(subject.peek()).to.equal('barb');
      expect(subject.dequeue()).to.equal('barb');
      expect(subject.dequeue()).to.equal('connie');
      subject.enqueue('gloria');
      subject.enqueue('hazel');
      expect(subject.dequeue()).to.equal('dahlia');
      expect(subject.dequeue()).to.equal('florence');
      expect(subject.peek()).to.equal('gloria');
      expect(subject.dequeue()).to.equal('gloria');
      expect(subject.dequeue()).to.equal('hazel');
    });
  });

  describe('hackerrank test case example', function() {
    it('sample', function() {
      const subject = new QofStacks();
      subject.enqueue( 42 );
      subject.dequeue();
      subject.enqueue( 14 );
      const front = subject.peek();
      expect(front).to.equal(14);
      subject.enqueue( 28);
      const other = subject.peek();
      expect(other).to.equal(14);
      subject.enqueue( 60);
      subject.enqueue( 78);
      subject.dequeue();
      subject.dequeue();
    });

    it('test case 0', function() {
      const subject = new QofStacks();
      subject.enqueue( 76 );
      subject.enqueue( 33 );

      subject.debug();
      expect(subject.dequeue()).to.equal(76); // this should dequeue 76
      console.log('time 0b');
      subject.debug();
      subject.enqueue(23);
      subject.enqueue(97);
      subject.enqueue(21);
      console.log('time 1h');
      subject.debug();
      expect(subject.peek()).to.equal(33);

    });
  });

  });


  /*
10
1 76
1 33
2
1 23
1 97
1 21
3
3
1 74
3

should print
33
33
33
*/
