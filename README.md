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
