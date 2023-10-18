import { ApiExeption } from "./../exeptions/api.exeption";
/* eslint-disable @typescript-eslint/no-explicit-any */

export class ApiValidateExeption extends ApiExeption {
  constructor(private data: any) {
    super("validation", "Data is not valid");
  }
}
