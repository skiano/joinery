module.exports = function createStack() {
  let length = 0;
  let head;

  return {
    push: (value) => {
      head = { value, next: head };
      length += 1;
    },
    pop: () => {
      if (head) {
        const { value } = head;
        head = head.next;
        length -= 1;
        return value;
      }
    },
    length: () => {
      return length;
    },
    peek: () => {
      return head.value;
    },
    toArray: () => {
      const arr = [];
      let h = head;
      while (h) {
        arr.push(h.value);
        h = h.next;
      }
      return arr.reverse();
    }
  };
}
