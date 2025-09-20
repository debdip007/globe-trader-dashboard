export type AlertType = 'success' | 'error' | 'info' | 'warning';


export interface Alert {
id: string; // unique id for the alert
type: AlertType;
message: string;
autoClose?: boolean; // defaults to true
keepAfterRouteChange?: boolean;
timeout?: number; // milliseconds
}