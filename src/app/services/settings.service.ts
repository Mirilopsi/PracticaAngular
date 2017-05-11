import { OpaqueToken } from "@angular/core";

export const BackendUri: OpaqueToken = new OpaqueToken("BackendUri");

export const BackendUriProvider = {
    provide: BackendUri,
    useValue: {
        server: "http://localhost:3004",
        app: "http://localhost:4200"
    }
};
