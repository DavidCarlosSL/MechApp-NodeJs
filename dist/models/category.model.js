"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Category = void 0;
var tslib_1 = require("tslib");
var typeorm_1 = require("typeorm");
;
var Category = /** @class */ (function () {
    function Category() {
    }
    tslib_1.__decorate([
        typeorm_1.PrimaryColumn('int', {
            generated: true,
            nullable: false,
            primary: true,
            name: 'id_category'
        })
    ], Category.prototype, "id_category", void 0);
    tslib_1.__decorate([
        typeorm_1.Column('varchar', {
            nullable: false,
            unique: true,
            name: 'name_category',
            length: "50"
        })
    ], Category.prototype, "nameCategory", void 0);
    Category = tslib_1.__decorate([
        typeorm_1.Entity({ name: 'category' })
    ], Category);
    return Category;
}());
exports.Category = Category;
