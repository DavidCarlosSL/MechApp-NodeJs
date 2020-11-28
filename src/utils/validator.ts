export class Validator {
    public static validadeRequiredFields(reqFileds: string[], data: object) : boolean {
        const fields = Object.keys(data).filter((e) => reqFileds.includes(e));
        return fields.length !== reqFileds.length ? true : false;
    }
}