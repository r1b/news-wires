# news-wires-import

Import module for news-wires

## Import Heuristic I

1. Receive a twitter screen name
2. Fetch last 200 tweets
3. Extract links
4. Normalize all links (follow 301s until 200, basically just fetch the link)
5. Remove all links with `hostname === twitter.com`
6. Find the most common origin (scheme + hostname)
7. Remove all links that don't match origin
8. Put remaining links in a Trie
9. Compute longest common prefix of links - this is the urlRegexp

## Import Heuristic II

Repeat 1-8 as before, then:

1. Walk n levels of the Trie
    * Walk the Trie while `children.length === 1`
    * When `children.length > 1`, walk n more levels
    * Store all links along the way
2. Manually review links where `children.length > 1`

For now, `n = 3`

This will allow us to filter out irrelevant pages. News services tweet links to
videos, image galleries & other ephemera that don't constitute `headline news`.
Often these are anchored under a path e.g `/videos`.

*FWIW I don't think that these pages are useless - they just don't have a place
in news-wires yet.*

Random thought, it would be nice to have a path Trie - same semantics as a Trie
but with directories as the unit (instead of characters).
