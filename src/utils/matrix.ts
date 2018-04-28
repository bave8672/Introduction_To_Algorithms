import { repeat } from './repeat';

export type Matrix<T = number> = T[][];

export const zeros = (i: number, j = i): Matrix =>
    repeat<number[]>(i)(() => repeat<number>(j)(() => 0));

export const add = (A: Matrix, B: Matrix, offsetI = 0, offsetJ = 0): Matrix => {
    for (let i = 0; i < B.length; i++) {
        for (let j = 0; j < B[0].length; j++) {
            A[i + offsetI][j + offsetJ] += B[i][j];
        }
    }
    return A;
};
