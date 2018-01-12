
function buildFrequencyMap(words) {
  const wordCounts = new Map();
  for (const word of words) {
    const count = wordCounts.get(word);
    wordCounts.set(word, (count === undefined) ? 1 : count + 1);
  }
  return wordCounts;
}

const canCreateNote = function(noteWords, magazineWords) {
  const magazineCounts = buildFrequencyMap(magazineWords);
  const noteCounts = buildFrequencyMap(noteWords);

  for (const [word,noteCount] of noteCounts) {
    const sourceCount = magazineCounts.get(word);
    if (!sourceCount || noteCount > sourceCount) {
      return false;
    }
  }
  return true;
};

// This is just for hacker rank
function main() {
    var m_temp = readLine().split(' ');
    var m = parseInt(m_temp[0]);
    var n = parseInt(m_temp[1]);
    magazine = readLine().split(' ');
    ransom = readLine().split(' ');
  if (canCreateNote(ransom, magazine)) {
    console.log('Yes');
  } else {
    console.log('No');
  }
}

export default canCreateNote;
