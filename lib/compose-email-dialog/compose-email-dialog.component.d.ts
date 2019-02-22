import { MatDialogRef } from '@angular/material';
import { EmailFormAbstractComponent } from '@polpware/md-components';
import { AlertTypeEnum } from '@polpware/md-components';
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
    processor?: (a: IComposeEmailDialogOutput) => Promise<void>;
}
export declare class ComposeEmailDialogComponent extends EmailFormAbstractComponent {
    dialogRef: MatDialogRef<ComposeEmailDialogComponent>;
    data: IComposeEmailDialogInput;
    alertMessage: string;
    alertSubMessage: string;
    alertType: AlertTypeEnum;
    alertDismissible: boolean;
    constructor(dialogRef: MatDialogRef<ComposeEmailDialogComponent>, data: IComposeEmailDialogInput);
    readonly isSubmitDisabled: boolean;
    onSubmit(): void;
}
