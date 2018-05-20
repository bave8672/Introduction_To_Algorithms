import { add, Matrix, subtract, zeros } from '../../utils/matrix';

/**
 * Naiive matrix multiplication algorithm
 * @param A i * k matrix
 * @param B k * j matrix
 *
 * result C i * j matrix
 *
 * PHI(n^3)
 */
export function matMult(A: Matrix, B: Matrix): Matrix {
    const C: Matrix = [];
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
 *
 * pseudocode:
 *
 * SQUARE-MATRIX-MULTIPLY-RECURSIVE.A; B/
 * 1 n D A:rows
 * 2 let C be a new n 	 n matrix
 * 3 if n == 1
 * 4 c11 D a11  b11
 * 5 else partition A, B, and C as in equations (4.9)
 * 6 C11 D SQUARE-MATRIX-MULTIPLY-RECURSIVE.A11; B11/
 * C SQUARE-MATRIX-MULTIPLY-RECURSIVE.A12; B21/
 * 7 C12 D SQUARE-MATRIX-MULTIPLY-RECURSIVE.A11; B12/
 * C SQUARE-MATRIX-MULTIPLY-RECURSIVE.A12; B22/
 * 8 C21 D SQUARE-MATRIX-MULTIPLY-RECURSIVE.A21; B11/
 * C SQUARE-MATRIX-MULTIPLY-RECURSIVE.A22; B21/
 * 9 C22 D SQUARE-MATRIX-MULTIPLY-RECURSIVE.A21; B12/
 * C SQUARE-MATRIX-MULTIPLY-RECURSIVE.A22; B22/
 * 10 return C
 */
export function matMultRecursive(
    A: Matrix,
    B: Matrix,
    ia = 0,
    ja = 0,
    ib = 0,
    jb = 0,
    n = A.length,
): Matrix {
    const C: Matrix = zeros(n);
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

/**
 * 1. Divide the input matrices A and B and output matrix C into n=2	n=2 submatrices,
 * as in equation (4.9). This step takes ‚.1/ time by index calculation, just
 * as in SQUARE-MATRIX-MULTIPLY-RECURSIVE.
 * 2. Create 10 matrices S1; S2;:::;S10, each of which is n=2 	 n=2 and is the sum
 * or difference of two matrices created in step 1. We can create all 10 matrices in
 * ‚.n2/ time.
 * 3. Using the submatrices created in step 1 and the 10 matrices created in step 2,
 * recursively compute seven matrix products P1; P2;:::;P7. Each matrix Pi is
 * n=2 	 n=2.
 * 4. Compute the desired submatrices C11; C12; C21; C22 of the result matrix C by
 * adding and subtracting various combinations of the Pi matrices. We can compute
 * all four submatrices in ‚.n2/ time.
 */

export function strassensMethod(
    A: Matrix,
    B: Matrix,
    ia = 0,
    ja = 0,
    ib = 0,
    jb = 0,
    n = A.length,
): Matrix {
    const C: Matrix = zeros(A.length);

    switch (n) {
        case 0:
            break;
        case 1:
            C[0][0] = A[ia][ja] * B[ib][jb];
            break;
        default:
            const halfN = n / 2;

            const S1 = zeros(halfN);
            const S2 = zeros(halfN);
            const S3 = zeros(halfN);
            const S4 = zeros(halfN);
            const S5 = zeros(halfN);
            const S6 = zeros(halfN);
            const S7 = zeros(halfN);
            const S8 = zeros(halfN);
            const S9 = zeros(halfN);
            const S10 = zeros(halfN);

            add(S1, B, 0, halfN);
            subtract(S1, B, halfN, halfN);

            add(S2, A);
            add(S2, A, 0, halfN);

            add(S3, A, halfN);
            add(S3, A, 0, halfN);
    }

    return C;
}
