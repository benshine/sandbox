import Route from '@ember/routing/route';
import _ from 'lodash';

export default Route.extend({
  model() {
    console.log( 'hi'  );
    console.log( {_}  );
    const foods = ['pumnpkin', 'fish', 'fudge'];
    return foods.map(n => ({name: n}));
  }
});
