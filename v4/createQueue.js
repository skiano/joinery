module.exports = function createQueue() {
  let head;
  let tail;
  let length;

  return {
    enqueue: (value) => {
      const node = { value };
      if (!head) head = task;
      if (tail) tail.next = task;
      tail = task;
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
    peak: () => {
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
