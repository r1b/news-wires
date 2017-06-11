class Trie {
  constructor (glyph, value, children) {
    this.glyph = glyph || '';
    this.value = value || null;
    this.children = children || {};
  }

  static build (glyphMap) {
    const trie = new Trie();
    Object.keys(glyphMap).forEach((glyphs) => {
      trie.insert(glyphs.split(''), glyphMap[glyphs]);
    });
    return trie;
  }

  find (glyphs) {
    if (typeof glyphs === 'string') {
      glyphs = glyphs.split('');
    }

    if (glyphs.length === 0) {
      return this.value;
    }

    const glyph = glyphs.shift();

    if (this.children[glyph] === undefined) {
      return null;
    }

    return this.children[glyph].find(glyphs);
  }

  insert (glyphs, value) {
    if (typeof glyphs === 'string') {
      glyphs = glyphs.split('');
    }

    if (glyphs.length === 0) {
      this.value = value;
      return;
    }

    const glyph = glyphs.shift();

    if (this.children[glyph] === undefined) {
      this.children[glyph] = new Trie(glyph);
    }

    this.children[glyph].insert(glyphs, value);
  }

  lcp (glyphs) {
    glyphs = glyphs || [];

    let childGlyphs = Object.keys(this.children);
    if (childGlyphs.length !== 1 || this.value !== null) {
      return glyphs.concat([this.glyph]).join('');
    }

    let child = this.children[childGlyphs[0]];
    return child.lcp(glyphs.concat([this.glyph]));
  }
}

module.exports = Trie;
