const assert = require('assert');
const chai = require('chai');
const Game = require('../game');

const expect = chai.expect;

describe('Game', function () {
  it('should start with cursor at 0,0', function () {
    const game = Game.createState();
    expect(game.cursorPos).to.eql([0, 80])
  });

  it('alternates turns', (e) => {
    // TODO NEXT
    const game = Game.createState();
    expect(game.whoseTurn()).to.eql('A');
    game.nextTurn();
    expect(game.whoseTurn()).to.eql('B');
  })
})
