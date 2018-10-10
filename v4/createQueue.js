module.exports = function createQueue() {
  let head;
  let tail;
  let length = 0;

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
      return head && head.value;
    },
    head: () => {
      return head;
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
