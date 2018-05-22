import {reverseMap} from "./utils";
import {FieldsMap, IDckCallback} from "./BaseTypes";

/**
 * Field mapper.
 */
export class FieldMapper {
    private toDatasourceMappings: FieldsMap;
    private fromDataSourceMappings: FieldsMap;

    /**
     * FieldMapper constructor
     * @param toDatasourceMappings  to datasource mapping
     * @param fromDatasourceMappings from datasource mapping
     */
    public constructor(toDatasourceMappings?: FieldsMap,
                       fromDatasourceMappings?: FieldsMap) {
        this.toDatasourceMappings = toDatasourceMappings || {};
        this.fromDataSourceMappings = fromDatasourceMappings || reverseMap(this.toDatasourceMappings);
    }

    /**
     * Map data to datasource.
     * @param source  source
     * @param callback function callback
     */
    public toDatasource(source: any, callback: IDckCallback): any {
        return this.transformData(source, this.toDatasourceMappings, callback);
    }

    /**
     * Map data from datasource
     * @param source source
     * @param callback function callback
     */
    public fromDatasource(source: any, callback: IDckCallback): any {
        return this.transformData(source, this.fromDataSourceMappings, callback);
    }

    private transformData(source: any, mappings: FieldsMap, callback: IDckCallback): any {
        if (mappings) {
            const destination: any = {};

            for (const key in source) {
                if (source.hasOwnProperty(key)) {
                    if (mappings.hasOwnProperty(key)) {
                        destination[mappings[key]] = source[key];
                    } else {
                        destination[key] = source[key];
                    }
                }
            }

            callback(null, destination);

        } else {
            callback(null, Object.assign({}, source));
        }
    }
}
