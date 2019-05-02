import { Component, Inject, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule, MatButtonModule, MatIconModule } from '@angular/material';
import { EmailFormAbstractComponent, parseOnlyEmails, AlertTypeEnum, PolpMdComponentsModule } from '@polpware/md-components';
import { TagInputModule } from 'ngx-chips';
import { AutosizeModule } from 'ngx-autosize';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ComposeEmailDialogComponent extends EmailFormAbstractComponent {
    /**
     * @param {?} dialogRef
     * @param {?} data
     */
    constructor(dialogRef, data) {
        super(dialogRef);
        this.dialogRef = dialogRef;
        this.data = data;
        data.title && (this.title = data.title);
        this.messageBody = data.emailBody || '';
        // alert
        this.alertMessage = '';
        this.alertSubMessage = '';
        this.alertType = AlertTypeEnum.none;
        this.alertDismissible = false;
        this.requestAutocompleteItems = data.autocompleteObservable || null;
    }
    /**
     * @return {?}
     */
    get isSubmitDisabled() {
        return this.emails.length === 0 || this.alertType === AlertTypeEnum.running;
    }
    // Override
    /**
     * @return {?}
     */
    onSubmit() {
        // body
        // let messageBody = this.messageBody;
        // body
        // let messageBody = this.messageBody;
        // Convert it into html
        // const converter = new showdown.Converter();
        // messageBody = converter.makeHtml(messageBody);
        // Prepare email list
        /** @type {?} */
        const emails = [];
        this.emails.forEach((/**
         * @param {?} elem
         * @return {?}
         */
        elem => {
            /** @type {?} */
            let x = elem || (elem.value);
            /** @type {?} */
            const y = parseOnlyEmails(x);
            y.forEach((/**
             * @param {?} m
             * @return {?}
             */
            m => {
                emails.push(m);
            }));
        }));
        /** @type {?} */
        const outputs = {
            confirmed: true,
            emailReceivers: emails,
            emailBody: this.messageBody,
            emailTitle: this.data.emailTitle || '' // todo:
        };
        if (this.data.processor) {
            this.alertType = AlertTypeEnum.running;
            this.alertMessage = 'The email is being sent out.';
            this.alertSubMessage = '';
            this.alertDismissible = false;
            this.data.processor(outputs).then((/**
             * @return {?}
             */
            () => {
                this.alertType = AlertTypeEnum.none;
                this.dialogRef.close({
                    succeed: true
                });
            }), (/**
             * @param {?} error
             * @return {?}
             */
            (error) => {
                this.alertType = AlertTypeEnum.error;
                this.alertMessage = 'Something went wrong.';
                this.alertDismissible = true;
                this.alertSubMessage = (error && error.errorInfo) ? error.errorInfo : '';
            }));
        }
        else {
            this.dialogRef.close(outputs);
        }
    }
}
ComposeEmailDialogComponent.decorators = [
    { type: Component, args: [{
                selector: 'polp-md-compose-email-dialog',
                template: "<h2 mat-dialog-title>\n    {{title}}\n    <button class=\"float-right\"\n            mat-icon-button\n            tabIndex=\"-1\"\n            [mat-dialog-close]=\"true\">\n        <mat-icon>close</mat-icon>\n    </button>\n</h2>\n\n<mat-dialog-content>\n\n    <polp-md-alert-box [message]=\"alertMessage\"\n                       [subMessage]=\"alertSubMessage\"\n                       [kind]=\"alertType\"\n                       [dismissible]=\"alertDismissible\">\n    </polp-md-alert-box>\n\n    <form name=\"emailForm\" autocomplete=\"off\">\n        <div class=\"flex-box flex-column margin-bottom-15\">\n            <tag-input [(ngModel)]=\"emails\" #emailInputBox\n                       name=\"emailInputs\"\n                       [addOnPaste]=\"true\"\n                       [modelAsStrings]=\"true\"\n                       [trimTags]=\"true\"\n                       [editable]=\"true\"\n                       (focusout)=\"onOutOfTagInput($event)\"\n                       [errorMessages]=\"errorMessages\"\n                       [validators]=\"validators\"\n                       [secondaryPlaceholder]=\"'Emails'\"\n                       [separatorKeyCodes]=\"[32,44,58,59]\"\n                       [placeholder]=\"'More Emails'\">\n                <tag-input-dropdown *ngIf=\"requestAutocompleteItems\"\n                    [autocompleteObservable]=\"requestAutocompleteItems\"\n                    [minimumTextLength]=\"0\">\n                    <ng-template let-item=\"item\" let-index=\"index\">\n                        {{ item.display }}\n                    </ng-template>\n                </tag-input-dropdown>\n            </tag-input>\n\n            <div class=\"full-width margin-top-10\">\n                <textarea name=\"messageBodyInput\"\n                          class=\"full-width\"\n                          #emailBody\n                          autosize [minRows]=\"5\" [maxRows]=\"10\"\n                          placeholder=\"Type your personal message here\"\n                          [(ngModel)]=\"messageBody\">\n                </textarea>\n            </div>\n\n        </div>\n    </form>\n\n</mat-dialog-content>\n\n<mat-dialog-actions>\n    <button mat-flat-button\n            color=\"primary\"\n            [disabled]=\"isSubmitDisabled\"\n            (click)=\"onSubmit()\">\n        Send\n    </button>\n</mat-dialog-actions>\n",
                styles: [""]
            }] }
];
/** @nocollapse */
ComposeEmailDialogComponent.ctorParameters = () => [
    { type: MatDialogRef },
    { type: undefined, decorators: [{ type: Inject, args: [MAT_DIALOG_DATA,] }] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class PolpMdComposeEmailDialogModule {
}
PolpMdComposeEmailDialogModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    ComposeEmailDialogComponent
                ],
                imports: [
                    CommonModule,
                    ReactiveFormsModule,
                    FormsModule,
                    MatDialogModule,
                    MatButtonModule,
                    MatIconModule,
                    TagInputModule,
                    AutosizeModule,
                    PolpMdComponentsModule
                ],
                exports: [
                    ComposeEmailDialogComponent
                ],
                entryComponents: [
                    ComposeEmailDialogComponent
                ]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { ComposeEmailDialogComponent, PolpMdComposeEmailDialogModule };

//# sourceMappingURL=polpware-md-compose-email-dialog.js.map