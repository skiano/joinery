module.exports = function createStack() {
  let length = 0;
  let top;

  return {
    push: (value) => {
      top = { value, next: top };
      length += 1;
    },
    pop: () => {
      if (top) {
        const { value } = top;
        top = top.next;
        length -= 1;
        return value;
      }
    },
    length: () => {
      return length;
    },
    peek: () => {
      return top.value;
    },
    toArray: () => {
      const arr = [];
      let h = top;
      while (h) {
        arr.push(h.value);
        h = h.next;
      }
      return arr.reverse();
    }
  };
}
