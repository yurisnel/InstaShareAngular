export class Alert {
    id?: string;
    type?: AlertType;
    message?: string;
    autoClose?: boolean = false;
    keepAfterRouteChange?: boolean;
    fade?: boolean = true;
    classesList: string[] = ['alert', 'alert-dismissible', 'd-flex align-items-center'];

    constructor(init?:Partial<Alert>) {
        Object.assign(this, init);
    }
}

export enum AlertType {
    Success,
    Error,
    Info,
    Warning
}