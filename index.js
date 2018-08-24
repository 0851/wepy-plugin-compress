import path from 'path';
import fs from 'fs';
import _ from 'lodash';
import pretty from 'pretty-data';
import UglifyJS from 'uglify-js';

const pd = pretty.pd;

export default class {
    constructor(config = {}) {
        this.filter = config.filter || /\.(json|wxml|wxss|js)$/;
        this.pretty = {
            ...{
                json: pd.jsonmin,
                wxml: pd.xmlmin,
                wxss: pd.cssmin,
                js: (code) => {
                    const minify = UglifyJS.minify(code);
                    if (minify.error) {
                        console.log(minify.error);
                        process.exit(0);
                        return code
                    }
                    return minify.code
                },
            },
            ...(config.pretty || {})
        };

    }

    apply(op) {
        if (!op.code) {
            op.next();
            return
        }
        if (!this.filter.test(op.file)) {
            op.next();
            return
        }
        try {
            op.output && op.output({
                action: '压缩',
                file: op.file
            });
            const extname = path.extname(op.file).replace(/\./, "");
            const met = this.pretty[extname];
            if (_.isFunction(met)) {
                op.code = met(op.code)
            }
            op.next();
        } catch (e) {
            console.error(`异常处理 , ${e.message}`)
            op.next();
            return
        }

    }
}