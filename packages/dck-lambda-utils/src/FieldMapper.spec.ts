import {FieldMapper} from "./";

describe("Field Mapper", () => {
    it("should map with default reverse mappings", () => {
        const  mapper = new FieldMapper({a: "b", c: "d", e: "f"});
        const source: any = {a: 1, c: 2, e: 3};
        mapper.toDatasource(source, (err, data) => {
            expect(data).toBeDefined();
            expect(data).toHaveProperty("b", 1);
            expect(data).toHaveProperty("d", 2);
            expect(data).toHaveProperty("f", 3);

            mapper.fromDatasource(data, (err2, data2) => {
                expect(data2).toEqual(source);
            });
        });
    });
    it("should map with non-default reverse mappings", () => {
        const  mapper = new FieldMapper({a: "b", c: "d", e: "f"}, {b: "x", d: "y", f: "z" });
        const source: any = {a: 1, c: 2, e: 3};
        mapper.toDatasource(source, (err, data) => {
            expect(data).toBeDefined();
            expect(data).toHaveProperty("b", 1);
            expect(data).toHaveProperty("d", 2);
            expect(data).toHaveProperty("f", 3);

            mapper.fromDatasource(data, (err2, data2) => {
                expect(data2).toEqual({x: 1, y: 2, z: 3});
            });
        });
    });
    it("should map without mappings", () => {
        const  mapper = new FieldMapper();
        const source: any = {a: 1, c: 2, e: 3};
        mapper.toDatasource(source, (err, data) => {
            expect(data).toBeDefined();
            expect(data).toEqual(source);

            mapper.fromDatasource(data, (err2, data2) => {
                expect(data2).toEqual(source);
            });
        });
    });
});
