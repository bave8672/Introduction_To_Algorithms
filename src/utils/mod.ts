class ModularArithmetic {
    constructor(public modulus: number) {}

    mod(x): number {
        return (x % this.modulus + this.modulus) % this.modulus;
    }

    mult(x, n): number {
        return this.mod(Math.abs((x * n)));
    }

    pow(x, n): number {
        let res = 1;
        for (let i = 0; i < n; i++) {
            res = this.mult(res, x);
        }
        return res;
    }

    sub(x, n) {
        return this.mod((x - n));
    }
}

export { ModularArithmetic };
