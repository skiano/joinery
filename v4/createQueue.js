module.exports = function createQueue() {
  let head;
  let tail;
  let length;

  return {
    enqueue: (value) => {
      const node = { value };
      if (!head) head = node;
      if (tail) tail.next = node;
      tail = node;
      length += 1;
    },
    dequeue: () => {
      if (head) {
        const value = head.value;
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
  }
}
