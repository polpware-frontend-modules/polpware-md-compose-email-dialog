import { MatDialogRef } from '@angular/material';
import { Observable } from 'rxjs';
import { EmailFormAbstractComponent } from '@polpware/md-components';
import { AlertTypeEnum } from '@polpware/md-components';
export interface IAutoCompleteModel {
    value: any;
    display: string;
}
export interface IComposeEmailDialogOutput {
    confirmed?: boolean;
    emailReceivers?: string[];
    emailBody?: string;
    emailTitle?: string;
    succeed?: boolean;
}
export interface IComposeEmailDialogInput {
    title: string;
    emailBody: string;
    emailTitle: string;
    processor?: (a: IComposeEmailDialogOutput) => Promise<any>;
    onTextChange?: (any: any) => any;
    autocompleteItemsAsync?: Observable<Array<IAutoCompleteModel>>;
}
export declare class ComposeEmailDialogComponent extends EmailFormAbstractComponent {
    dialogRef: MatDialogRef<ComposeEmailDialogComponent>;
    data: IComposeEmailDialogInput;
    alertMessage: string;
    alertSubMessage: string;
    alertType: AlertTypeEnum;
    alertDismissible: boolean;
    onTextChange: (any: any) => any;
    autocompleteItemsAsync: Observable<Array<IAutoCompleteModel>>;
    constructor(dialogRef: MatDialogRef<ComposeEmailDialogComponent>, data: IComposeEmailDialogInput);
    readonly isSubmitDisabled: boolean;
    onOutOfTagInput(evt: any): void;
    onSubmit(): void;
}
