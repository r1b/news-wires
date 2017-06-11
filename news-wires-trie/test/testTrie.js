const assert = require('assert');
const Trie = require('..');

describe('Trie', function () {
  describe('#build()', function () {
    it('should make a Trie', function () {
      let trie = Trie.build({
        'abcdef': true,
        '123456': false,
        'qwerty': true
      });
      assert.strictEqual(typeof trie, 'object');
      assert.strictEqual(trie.find('abcdef'), true);
      assert.strictEqual(trie.find('abcde'), null);
      assert.strictEqual(trie.find('123456'), false);
      assert.strictEqual(trie.find('1234567'), null);
    });
  });
  describe('#insert()', function () {
    it('should add a node to the Trie', function () {
      let trie = new Trie();

      trie.insert('abc', true);
      trie.insert('ab', true);
      trie.insert('abd', false);

      assert.strictEqual(trie.find('abc'), true);
    });
  });
  describe('#lcp()', function () {
    it('should find the longest common prefix of the Trie', function () {
      let trie = Trie.build({
        'https://google.com/': true,
        'https://google.com/test': true,
        'https://google.com/test/1': true
      });
      assert.strictEqual(trie.lcp(), 'https://google.com/');

      let noLCPTrie = Trie.build({
        'abc': true,
        'def': true,
        'ghi': true
      });
      assert.strictEqual(noLCPTrie.lcp(), '');
    });
  });
});
