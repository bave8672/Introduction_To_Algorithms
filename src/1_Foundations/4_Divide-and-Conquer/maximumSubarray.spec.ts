import {
    MaxSubarrayAlgorithm,
    maxSubarrayDivideAndConquer,
    maxSubarrayNaive,
} from './maximumSubarray';

describe('max subarray', () =>
    [maxSubarrayNaive, maxSubarrayDivideAndConquer].forEach(alg =>
        [
            { arr: [], result: { start: 0, end: 0, sum: 0 } },
            { arr: [1], result: { start: 0, end: 1, sum: 1 } },
            { arr: [-1, 2, 2, -1], result: { start: 1, end: 3, sum: 4 } },
        ].forEach(test =>
            it(`${alg.name} should give correct result for ${JSON.stringify(
                test.arr,
            )}`, () => expect(alg(test.arr)).toEqual(test.result)),
        ),
    ));
