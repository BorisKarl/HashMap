class Node {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.next = null;
  }
}

class HashMap {
  constructor(name) {
    this.name = name;
    this.buckets = new Array(8);
    this.linkedListArray = [];
    this.loadFactor = 0;
    this.nodeList = [];
  }

  load(array) {
    if (array.length <= 0) return 0;
    let num = 0;
    for (let i = 0; i < array.length; i++) {
      if (array[i]) {
        num++;
      }
    }
    if (num > 0) {
      let result = num / array.length;
      result = Math.floor(result * 100);
      result /= 100;
      this.loadFactor = result;
    }
    return this.loadFactor;
  }

  hash(key) {
    let hashCode = 0;
    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode =
        (primeNumber * hashCode + key.charCodeAt(i)) % this.buckets.length;
    }
    return hashCode;
  }

  makeNodeList(node) {
    if (node === null) return this.linkedListArray;
    this.linkedListArray.push(node);
    this.makeNodeList(node.next);
  }

  set(key, value) {
    let tmp = this.load(this.buckets);
    console.log("LoadFactor: " + tmp);
    if (this.loadFactor >= 0.75 && this.loadFactor <= 1) {
      let newBuckets = Array(this.buckets.length * 2);

      for (let i = 0; i < this.buckets.length; i++) {
        newBuckets[i] = this.buckets[i];
      }
      this.buckets = newBuckets;
    }
    let index = this.hash(key);
    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access index out of bound");
    }
    let newNode = new Node(key, value);
    if (this.buckets[index]) {
      if (this.buckets[index].value === value) {
        this.buckets[index] = newNode;
        this.nodeList.push(newNode);
      } else {
        newNode.next = this.buckets[index];
        this.nodeList.push(newNode);
      }
    }
    this.buckets[index] = newNode;
    return this.buckets;
  }

  get(key) {
    for (let i = 0; i < this.buckets.length; i++) {
      let head = this.buckets[i];
      while (head !== null && head) {
        if (head.key === key) {
          return head.value;
        }
        head = head.next;
      }
    }
    return null;
  }

  has(key) {
    let targetnode = this.get(key);
    if (targetnode) return true;
    return false;
  }

  remove(key) {
    for (let i = 0; i < this.buckets.length; i++) {
      let head = this.buckets[i];
      while (head !== null && head) {
        if (head.key === key) {
          this.buckets.splice(i, 1);
          let index = this.nodeList.findIndex((e) => e.key === key);
          this.nodeList.splice(index, 1);
          return true;
        }
        head = head.next;
      }
    }
    return false;
  }

  length() {
    let count = 0;
    for (let i = 0; i < this.buckets.length; i++) {
      let head = this.buckets[i];
      while (head !== null && head) {
        count++;
        head = head.next;
      }
    }
    return count;
  }

  clear() {
    this.buckets = new Array(8);
  }

  keys() {
    let keys = [];
    for (let i = 0; i < this.buckets.length; i++) {
      let head = this.buckets[i];
      while (head !== null && head) {
        keys.push(head.key);
        head = head.next;
      }
    }
    return keys;
  }

  values() {
    let values = [];
    for (let i = 0; i < this.buckets.length; i++) {
      let head = this.buckets[i];
      while (head !== null && head) {
        values.push(head.value);
        head = head.next;
      }
    }
    return values;
  }
  entries() {
    let entries = [];
    for (let i = 0; i < this.buckets.length; i++) {
      let head = this.buckets[i];
      while (head !== null && head) {
        entries.push([head.key, head.value]);
        head = head.next;
      }
    }
    return entries;
  }
}

//

const hashMap = new HashMap("Hashmap");
hashMap.set("1Nicole", "Schink");
hashMap.set("2Nicole", "Schrink");
hashMap.set("3Carla", "hernandez");
hashMap.set("4Carlos", "Hernandez");
hashMap.set("5ff", "fdf");
hashMap.set("6ff", "fds");
hashMap.set("7ff", "fdfs");
hashMap.set("8ff", "fdfss");
hashMap.set("9ff", "fdddf");
hashMap.set("10Albrecht", "fdddf");
hashMap.set("11Gitti", "fdddf");
hashMap.set("12Petra", "fdddf");
hashMap.set("13Meike", "fdddf");
hashMap.set("14Ysacole", "Schink");
hashMap.set("15Ysacole", "Schrink");
hashMap.set("16Ysarla", "hernandez");
hashMap.set("17Ysarlos", "Hernandez");
hashMap.set("18Ysa", "fdf");
hashMap.set("19Ysa", "fds");
hashMap.set("20Ysa", "fdfs");
hashMap.set("21Ysa", "fdfss");
hashMap.set("22Ysa", "fdddf");
hashMap.set("23Ysabrecht", "fdddf");
hashMap.set("2524Ysatti", "fdddf");
hashMap.set("26Ysatra", "fdddf");
hashMap.set("27Ysaike", "fdddf");

let result = hashMap.set("Dennis", "Staffel");

console.log(result);
console.log("Ausserhalb der Funktion: " + hashMap.load(hashMap.buckets));
console.log(hashMap.loadFactor);
console.log(hashMap.buckets);
console.log(hashMap.get("Dennis"));
//console.log(hashMap.nodeList);
console.log(hashMap.has("boing"));
console.log(hashMap.has("Dennis"));
//
console.log(hashMap.remove("Dennis"));
console.log(hashMap.buckets);
console.log(hashMap.nodeList);
console.log(hashMap.length());
console.log(hashMap.keys());
console.log(hashMap.values());
console.log(hashMap.entries());
console.log(hashMap.clear());
console.log(hashMap.buckets);
