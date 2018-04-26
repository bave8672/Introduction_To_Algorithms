import { sum } from '../../utils/sum';

export interface Range {
    start: number;
    end: number;
    sum: number;
}

export type MaxSubarrayAlgorithm = (arr: number[]) => Range;

/**
 * Brute force maximum subarray
 * Check every possible start and end point
 */
export function maxSubarrayNaive(arr: number[]) {
    let max = 0;
    let range: Range = { start: 0, end: 0, sum: max };
    for (let start = 0; start < arr.length; start++) {
        for (let end = start; end <= arr.length; end++) {
            const sumij = sum(arr.slice(start, end));
            // console.log({ arr, start, end, sumij, max });
            if (sumij > max) {
                range = { start, end, sum: sumij };
            }
            max = Math.max(max, sumij);
        }
    }
    return range;
}

/**
 * (subroutine)
 * get the largest summing subarray starting from the first element
 * in linear time
 */
const maxSumFromStart: MaxSubarrayAlgorithm = arr => {
    let max = 0;
    let sumij = 0;
    let range: Range = { start: 0, end: 0, sum: max };
    for (let next = 0; next < arr.length; next++) {
        sumij += arr[next];
        if (sumij > max) {
            range = { start: 0, end: next + 1, sum: sumij };
        }
        max = Math.max(max, sumij);
    }
    return range;
};

const maxSumFromEnd: MaxSubarrayAlgorithm = arr => {
    const max = maxSumFromStart(arr.slice(0).reverse());
    return {
        start: arr.length - max.end,
        end: arr.length,
        sum: max.sum,
    };
};

export function maxSubarrayDivideAndConquer(arr: number[]) {
    // base case
    if (arr.length === 0 || (arr.length === 1 && arr[0] <= 0)) {
        return {
            start: 0,
            end: 0,
            sum: 0,
        };
    }
    if (arr.length === 1 && arr[0] > 0) {
        return { start: 0, end: 1, sum: arr[0] };
    }

    const midpoint = Math.round(arr.length / 2);
    const left = arr.slice(0, midpoint);
    const right = arr.slice(midpoint);

    // Find max subarray through the middle
    const maxFromMiddleLeft = maxSumFromEnd(left);
    const maxFromMiddleRight = maxSumFromStart(right);
    const maxThruMiddle = {
        start: maxFromMiddleLeft.start,
        end: midpoint + maxFromMiddleRight.end,
        sum: maxFromMiddleLeft.sum + maxFromMiddleRight.sum,
    };

    // Find max subarrays on each side
    const maxSubarrLeft = maxSubarrayDivideAndConquer(left);
    const maxSubarrRight = maxSubarrayDivideAndConquer(right);

    // console.log({ maxSubarrLeft, maxThruMiddle, maxSubarrRight });

    return [maxSubarrLeft, maxThruMiddle, maxSubarrRight].reduce(
        (max, msa) => (msa.sum > max.sum ? msa : max),
    );
}
