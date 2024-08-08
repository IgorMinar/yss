const x: number = 3;

export function tokenize<T>(protoType: T): T {
    return protoType;
}

interface DiToken<T> extends ClassConstructor<T> {
    isThisAToken(): boolean;
}

function test(x: DiToken<Car>) {
}


export function tokenize<T>(protoType: T): DiToken<T> {
    return protoType;
}

export const Type = Function;

export interface Class<T> extends Function {
    new(...args: any[]): T;
    prototype: T;
}

interface ClassConstructor<T> {
    new (): T;
}


const Carr =  tokenize(Car);
type Carr = typeof Carr;

function create(t: Carr) {
    new t('asdf');
}

type foo = string | number;

abstract class Engine {
    abstract start(): void;
    abstract stop(): void;
    abstract setRpm(): void;
  }

abstract class Car {
    abstract left(): void;
    abstract right(): void;
    abstract forward(): void;
    abstract reverse(): void;
}


class Node {
    constructor(
        public firstChild: Node,
        public lastChild: Node,
        public  nextSibling: Node,
        public parent: Node,
        public value: number
    ) {}
}

function recursiveSum(rootNode: Node): number {
    if (!rootNode) return 0;
    return rootNode.value + recursiveSum(rootNode.firstChild) + recursiveSum(rootNode.nextSibling);
}

function stackingSum(rootNode: Node): number {
    if (!rootNode) return 0;

    const stack = [rootNode];
    let sum = 0;

    while (stack.length) {
        let node = stack.pop()!;
        
        while (node) {
            sum =+ node.value;
            if (node.firstChild) {
                stack.push(node.firstChild);
            }
            node = node.nextSibling;
        }
    }

    return sum;
}


function ngSum(rootNode: Node): number {
    if (!rootNode) return 0;

    let sum = 0;
    let node = rootNode;
    let lastNode = node;

    do {
        
        if (node !== lastNode.parent) {
          sum += node.value;
        }

        lastNode = node;
        node = node.firstChild || node.nextSibling || node.parent || node;
        
    } while (node !== rootNode)

    return sum;
}
