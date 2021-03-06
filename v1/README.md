# Joinery

given a template looking something like this:

```
ABA
BAB
```

where letters represent valid arrangements of 'blocks',
this will create an engine that will layout a field of blocks
using only the connections available in the template

For example, the template above could not produce the following:

```
AAAA
AAAA
AAAA
```

Because there is no example of an A ajoining an A in the template

---

Given this:

```
ABBABBABBAABBBBAABAB
ABBAAABBABBAABAAAABA
BBABBABBBABBABBBBABB
ABBBAAABBAABBABBAAAB
BBBABABAAABBBBAAAABA
AAAAABBBAAAAAABBABAB
ABABBAABAAABABABBAAA
BBABBBABBBBABABBABBB
BBABABBBABAABABAAAAA
AAAAAAABBBBBBAABAABA
```

How might I transform into an ABAB checkerboard with only this input:

```
ABA
BAB
```

---

```
  A     B
 ABA   BAB
  A     B
  
  
BA   AB
A    B
```



