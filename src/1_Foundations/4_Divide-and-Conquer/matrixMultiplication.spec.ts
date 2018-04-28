import { matMult, matMultRecursive } from './matrixMultiplication';

describe('matrix multiplication', () =>
    [matMult, matMultRecursive].forEach(alg =>
        [
            {
                A: [],
                B: [],
                C: [],
            },
            {
                A: [[2]],
                B: [[3]],
                C: [[6]],
            },
            {
                A: [[1, 0], [0, 1]],
                B: [[1, 0], [0, 1]],
                C: [[1, 0], [0, 1]],
            },
        ].forEach(({ A, B, C }) =>
            it(`${alg.name} - should give correct result for ${JSON.stringify({
                A,
                B,
                C,
            })}`, () => expect(alg(A, B)).toEqual(C)),
        ),
    ));
