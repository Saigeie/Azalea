import { APIRouteTypes } from "../../typings/classTypes";

export class APIRoute {
    constructor(options: APIRouteTypes) {
        Object.assign(this, options)
    }
}