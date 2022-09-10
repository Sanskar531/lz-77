const { LZ77 } = require("../src/features/Compression/compressors");

describe("compressor_tests", () => {
    const searchBufferSize = 50;
    const lookAheadBufferSize = 50;

    it("simple_string", () => {
        let result = LZ77.compress("aa", searchBufferSize, lookAheadBufferSize);
        expect(result).toBe("a<1,1>");
        result = LZ77.compress("aabb", searchBufferSize, lookAheadBufferSize);
        expect(result).toBe("a<1,1>b<1,1>");
        result = LZ77.compress("aabbaabb", searchBufferSize, lookAheadBufferSize);
        expect(result).toBe("a<1,1>b<1,1><4,4>");
    });

    it("simple_decompress", () => {
        let result = LZ77.decompress("a<1,1>b<1,1><4,4>");
        expect(result).toBe("aabbaabb");
        result = LZ77.decompress("a<1,1>b<1,1>");
        expect(result).toBe("aabb");
        result = LZ77.decompress("a<1,1>")
        expect(result).toBe("aa");
    })
});
