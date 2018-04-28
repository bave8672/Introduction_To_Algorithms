import { add, zeros } from '../../utils/matrix';

/**
 * Naiive matrix multiplication algorithm
 * @param A i * k matrix
 * @param B k * j matrix
 *
 * result C i * j matrix
 *
 * PHI(n^3)
 */
export function matMult(A: number[][], B: number[][]): number[][] {
    const C: number[][] = [];
    for (let i = 0; i < A.length; i++) {
        C[i] = [];
        for (let j = 0; j < B[0].length; j++) {
            C[i][j] = 0;
            for (let k = 0; k < B.length; k++) {
                C[i][j] += A[i][k] * B[k][j];
            }
        }
    }
    return C;
}

/**
 * Recursive strategy (PHI(n^3))
 * for square matrices with side length n = 2k for integer k
 */
export function matMultRecursive(
    A: number[][],
    B: number[][],
    ia = 0,
    ja = 0,
    ib = 0,
    jb = 0,
    n = A.length,
): number[][] {
    const C: number[][] = zeros(n);
    switch (n) {
        case 0:
            break;
        case 1:
            C[0][0] = A[ia][ja] * B[ib][jb];
            break;
        default:
            const halfN = n / 2;

            // C11
            const A11xB11 = matMultRecursive(A, B, ia, ja, ib, jb, halfN);
            const A12xB21 = matMultRecursive(
                A,
                B,
                ia,
                ja + halfN,
                ib + halfN,
                jb,
                halfN,
            );
            const C11 = add(A11xB11, A12xB21);

            // C12
            const A11xB12 = matMultRecursive(
                A,
                B,
                ia,
                ja,
                ib,
                jb + halfN,
                halfN,
            );
            const A12xB22 = matMultRecursive(
                A,
                B,
                ia,
                ja + halfN,
                ib + halfN,
                jb + halfN,
                halfN,
            );
            const C12 = add(A11xB12, A12xB22);

            // C21
            const A21xB11 = matMultRecursive(
                A,
                B,
                ia + halfN,
                ja,
                ib,
                jb,
                halfN,
            );
            const A22xB21 = matMultRecursive(
                A,
                B,
                ia + halfN,
                ja + halfN,
                ib + halfN,
                jb,
                halfN,
            );
            const C21 = add(A21xB11, A22xB21);

            // C22
            const A21xB12 = matMultRecursive(
                A,
                B,
                ia + halfN,
                ja,
                ib,
                jb + halfN,
                halfN,
            );
            const A22xB22 = matMultRecursive(
                A,
                B,
                ia + halfN,
                ja + halfN,
                ib + halfN,
                jb + halfN,
                halfN,
            );
            const C22 = add(A21xB12, A22xB22);

            add(C, C11);
            add(C, C12, 0, halfN);
            add(C, C21, halfN);
            add(C, C22, halfN, halfN);
    }

    return C;
}
