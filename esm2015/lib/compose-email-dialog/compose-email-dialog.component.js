/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { EmailFormAbstractComponent, parseOnlyEmails } from '@polpware/md-components';
import { AlertTypeEnum } from '@polpware/md-components';
/**
 * @record
 */
export function IAutoCompleteModel() { }
if (false) {
    /** @type {?} */
    IAutoCompleteModel.prototype.value;
    /** @type {?} */
    IAutoCompleteModel.prototype.display;
}
/**
 * @record
 */
export function IComposeEmailDialogOutput() { }
if (false) {
    /** @type {?|undefined} */
    IComposeEmailDialogOutput.prototype.confirmed;
    /** @type {?|undefined} */
    IComposeEmailDialogOutput.prototype.emailReceivers;
    /** @type {?|undefined} */
    IComposeEmailDialogOutput.prototype.emailBody;
    /** @type {?|undefined} */
    IComposeEmailDialogOutput.prototype.emailTitle;
    /** @type {?|undefined} */
    IComposeEmailDialogOutput.prototype.succeed;
}
/**
 * @record
 */
export function IComposeEmailDialogInput() { }
if (false) {
    /** @type {?} */
    IComposeEmailDialogInput.prototype.title;
    /** @type {?} */
    IComposeEmailDialogInput.prototype.emailBody;
    /** @type {?} */
    IComposeEmailDialogInput.prototype.emailTitle;
    /** @type {?|undefined} */
    IComposeEmailDialogInput.prototype.processor;
    /** @type {?|undefined} */
    IComposeEmailDialogInput.prototype.onTextChange;
    /** @type {?|undefined} */
    IComposeEmailDialogInput.prototype.autocompleteItemsAsync;
}
export class ComposeEmailDialogComponent extends EmailFormAbstractComponent {
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
        this.onTextChange = data.onTextChange;
        this.autocompleteItemsAsync = data.autocompleteItemsAsync;
    }
    /**
     * @return {?}
     */
    get isSubmitDisabled() {
        return this.emails.length === 0 || this.alertType === AlertTypeEnum.running;
    }
    // Override
    /**
     * @param {?} evt
     * @return {?}
     */
    onOutOfTagInput(evt) {
        if (this.emailInputBox.dropdown && this.emailInputBox.dropdown.isVisible) {
            return;
        }
        super.onOutOfTagInput(evt);
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
                template: "<h2 mat-dialog-title>\n    {{title}}\n    <button class=\"float-right\"\n            mat-icon-button\n            tabIndex=\"-1\"\n            [mat-dialog-close]=\"true\">\n        <mat-icon>close</mat-icon>\n    </button>\n</h2>\n\n<mat-dialog-content>\n\n    <polp-md-alert-box [message]=\"alertMessage\"\n                       [subMessage]=\"alertSubMessage\"\n                       [kind]=\"alertType\"\n                       [dismissible]=\"alertDismissible\">\n    </polp-md-alert-box>\n\n    <form name=\"emailForm\" autocomplete=\"off\">\n        <div class=\"flex-box flex-column margin-bottom-15\">\n            <tag-input [(ngModel)]=\"emails\" #emailInputBox\n                       name=\"emailInputs\"\n                       (focusout)=\"onOutOfTagInput($event)\"\n                       (onTextChange)=\"onTextChange($event)\"\n                       [addOnPaste]=\"true\"\n                       [modelAsStrings]=\"true\"\n                       [trimTags]=\"true\"\n                       [editable]=\"true\"\n                       [errorMessages]=\"errorMessages\"\n                       [validators]=\"validators\"\n                       [secondaryPlaceholder]=\"'Emails'\"\n                       [separatorKeyCodes]=\"[32,44,58,59]\"\n                       [displayBy]=\"'display'\"\n                       [identifyBy]=\"'value'\"                       \n                       [placeholder]=\"'Emails'\">\n                <tag-input-dropdown [autocompleteItems]=\"autocompleteItemsAsync | async\">\n                    <ng-template let-item=\"item\" let-index=\"index\">\n                        {{ item.display }}\n                    </ng-template>\n                </tag-input-dropdown>\n            </tag-input>\n\n            <div class=\"full-width margin-top-10\">\n                <textarea name=\"messageBodyInput\"\n                          class=\"full-width\"\n                          #emailBody\n                          autosize [minRows]=\"5\" [maxRows]=\"10\"\n                          placeholder=\"Type your personal message here\"\n                          [(ngModel)]=\"messageBody\">\n                </textarea>\n            </div>\n\n        </div>\n    </form>\n\n</mat-dialog-content>\n\n<mat-dialog-actions>\n    <button mat-flat-button\n            color=\"primary\"\n            [disabled]=\"isSubmitDisabled\"\n            (click)=\"onSubmit()\">\n        Send\n    </button>\n</mat-dialog-actions>\n",
                styles: [""]
            }] }
];
/** @nocollapse */
ComposeEmailDialogComponent.ctorParameters = () => [
    { type: MatDialogRef },
    { type: undefined, decorators: [{ type: Inject, args: [MAT_DIALOG_DATA,] }] }
];
if (false) {
    /** @type {?} */
    ComposeEmailDialogComponent.prototype.alertMessage;
    /** @type {?} */
    ComposeEmailDialogComponent.prototype.alertSubMessage;
    /** @type {?} */
    ComposeEmailDialogComponent.prototype.alertType;
    /** @type {?} */
    ComposeEmailDialogComponent.prototype.alertDismissible;
    /** @type {?} */
    ComposeEmailDialogComponent.prototype.onTextChange;
    /** @type {?} */
    ComposeEmailDialogComponent.prototype.autocompleteItemsAsync;
    /** @type {?} */
    ComposeEmailDialogComponent.prototype.dialogRef;
    /** @type {?} */
    ComposeEmailDialogComponent.prototype.data;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcG9zZS1lbWFpbC1kaWFsb2cuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHBvbHB3YXJlL21kLWNvbXBvc2UtZW1haWwtZGlhbG9nLyIsInNvdXJjZXMiOlsibGliL2NvbXBvc2UtZW1haWwtZGlhbG9nL2NvbXBvc2UtZW1haWwtZGlhbG9nLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQXlCLE1BQU0sZUFBZSxDQUFDO0FBQ3pFLE9BQU8sRUFBYSxZQUFZLEVBQUUsZUFBZSxFQUFxQixNQUFNLG1CQUFtQixDQUFDO0FBTWhHLE9BQU8sRUFDSCwwQkFBMEIsRUFDMUIsZUFBZSxFQUNsQixNQUFNLHlCQUF5QixDQUFDO0FBRWpDLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQzs7OztBQUV4RCx3Q0FHQzs7O0lBRkcsbUNBQVc7O0lBQ1gscUNBQWdCOzs7OztBQUdwQiwrQ0FNQzs7O0lBTEcsOENBQW9COztJQUNwQixtREFBMEI7O0lBQzFCLDhDQUFtQjs7SUFDbkIsK0NBQW9COztJQUNwQiw0Q0FBa0I7Ozs7O0FBR3RCLDhDQU9DOzs7SUFORyx5Q0FBYzs7SUFDZCw2Q0FBa0I7O0lBQ2xCLDhDQUFtQjs7SUFDbkIsNkNBQTJEOztJQUMzRCxnREFBNEI7O0lBQzVCLDBEQUErRDs7QUFRbkUsTUFBTSxPQUFPLDJCQUE0QixTQUFRLDBCQUEwQjs7Ozs7SUFVdkUsWUFBbUIsU0FBb0QsRUFDbkMsSUFBOEI7UUFFOUQsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBSEYsY0FBUyxHQUFULFNBQVMsQ0FBMkM7UUFDbkMsU0FBSSxHQUFKLElBQUksQ0FBMEI7UUFJOUQsSUFBSSxDQUFDLEtBQUssSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3hDLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFB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Q0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQ2pDO0lBRUwsQ0FBQzs7O1lBaEdKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsOEJBQThCO2dCQUN4Qyw4NkVBQW9EOzthQUV2RDs7OztZQXZDbUIsWUFBWTs0Q0FtRHZCLE1BQU0sU0FBQyxlQUFlOzs7O0lBVDNCLG1EQUFxQjs7SUFDckIsc0RBQXdCOztJQUN4QixnREFBeUI7O0lBQ3pCLHVEQUEwQjs7SUFFMUIsbURBQTJCOztJQUMzQiw2REFBOEQ7O0lBRWxELGdEQUEyRDs7SUFDbkUsMkNBQThEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbmplY3QsIFZpZXdDaGlsZCwgRWxlbWVudFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTWF0RGlhbG9nLCBNYXREaWFsb2dSZWYsIE1BVF9ESUFMT0dfREFUQSwgTWF0Q2hlY2tib3hDaGFuZ2UgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5cbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcblxuaW1wb3J0ICogYXMgc2hvd2Rvd24gZnJvbSAnc2hvd2Rvd24nO1xuXG5pbXBvcnQge1xuICAgIEVtYWlsRm9ybUFic3RyYWN0Q29tcG9uZW50LFxuICAgIHBhcnNlT25seUVtYWlsc1xufSBmcm9tICdAcG9scHdhcmUvbWQtY29tcG9uZW50cyc7XG5cbmltcG9ydCB7IEFsZXJ0VHlwZUVudW0gfSBmcm9tICdAcG9scHdhcmUvbWQtY29tcG9uZW50cyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUF1dG9Db21wbGV0ZU1vZGVsIHtcbiAgICB2YWx1ZTogYW55O1xuICAgIGRpc3BsYXk6IHN0cmluZztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJQ29tcG9zZUVtYWlsRGlhbG9nT3V0cHV0IHtcbiAgICBjb25maXJtZWQ/OiBib29sZWFuO1xuICAgIGVtYWlsUmVjZWl2ZXJzPzogc3RyaW5nW107XG4gICAgZW1haWxCb2R5Pzogc3RyaW5nO1xuICAgIGVtYWlsVGl0bGU/OiBzdHJpbmc7XG4gICAgc3VjY2VlZD86IGJvb2xlYW47XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUNvbXBvc2VFbWFpbERpYWxvZ0lucHV0IHtcbiAgICB0aXRsZTogc3RyaW5nO1xuICAgIGVtYWlsQm9keTogc3RyaW5nO1xuICAgIGVtYWlsVGl0bGU6IHN0cmluZztcbiAgICBwcm9jZXNzb3I/OiAoYTogSUNvbXBvc2VFbWFpbERpYWxvZ091dHB1dCkgPT4gUHJvbWlzZTxhbnk+O1xuICAgIG9uVGV4dENoYW5nZT86IChhbnkpID0+IGFueTtcbiAgICBhdXRvY29tcGxldGVJdGVtc0FzeW5jPzogT2JzZXJ2YWJsZTxBcnJheTxJQXV0b0NvbXBsZXRlTW9kZWw+Pjtcbn1cblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdwb2xwLW1kLWNvbXBvc2UtZW1haWwtZGlhbG9nJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vY29tcG9zZS1lbWFpbC1kaWFsb2cuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL2NvbXBvc2UtZW1haWwtZGlhbG9nLmNvbXBvbmVudC5jc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBDb21wb3NlRW1haWxEaWFsb2dDb21wb25lbnQgZXh0ZW5kcyBFbWFpbEZvcm1BYnN0cmFjdENvbXBvbmVudCB7XG5cbiAgICBhbGVydE1lc3NhZ2U6IHN0cmluZztcbiAgICBhbGVydFN1Yk1lc3NhZ2U6IHN0cmluZztcbiAgICBhbGVydFR5cGU6IEFsZXJ0VHlwZUVudW07XG4gICAgYWxlcnREaXNtaXNzaWJsZTogYm9vbGVhbjtcblxuICAgIG9uVGV4dENoYW5nZTogKGFueSkgPT4gYW55O1xuICAgIGF1dG9jb21wbGV0ZUl0ZW1zQXN5bmM6IE9ic2VydmFibGU8QXJyYXk8SUF1dG9Db21wbGV0ZU1vZGVsPj47XG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZGlhbG9nUmVmOiBNYXREaWFsb2dSZWY8Q29tcG9zZUVtYWlsRGlhbG9nQ29tcG9uZW50PixcbiAgICAgICAgQEluamVjdChNQVRfRElBTE9HX0RBVEEpIHB1YmxpYyBkYXRhOiBJQ29tcG9zZUVtYWlsRGlhbG9nSW5wdXQpIHtcblxuICAgICAgICBzdXBlcihkaWFsb2dSZWYpO1xuXG4gICAgICAgIGRhdGEudGl0bGUgJiYgKHRoaXMudGl0bGUgPSBkYXRhLnRpdGxlKTtcbiAgICAgICAgdGhpcy5tZXNzYWdlQm9keSA9IGRhdGEuZW1haWxCb2R5IHx8ICcnO1xuXG4gICAgICAgIC8vIGFsZXJ0XG4gICAgICAgIHRoaXMuYWxlcnRNZXNzYWdlID0gJyc7XG4gICAgICAgIHRoaXMuYWxlcnRTdWJNZXNzYWdlID0gJyc7XG4gICAgICAgIHRoaXMuYWxlcnRUeXBlID0gQWxlcnRUeXBlRW51bS5ub25lO1xuICAgICAgICB0aGlzLmFsZXJ0RGlzbWlzc2libGUgPSBmYWxzZTtcblxuICAgICAgICB0aGlzLm9uVGV4dENoYW5nZSA9IGRhdGEub25UZXh0Q2hhbmdlO1xuICAgICAgICB0aGlzLmF1dG9jb21wbGV0ZUl0ZW1zQXN5bmMgPSBkYXRhLmF1dG9jb21wbGV0ZUl0ZW1zQXN5bmM7XG4gICAgfVxuXG4gICAgcHVibGljIGdldCBpc1N1Ym1pdERpc2FibGVkKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5lbWFpbHMubGVuZ3RoID09PSAwIHx8IHRoaXMuYWxlcnRUeXBlID09PSBBbGVydFR5cGVFbnVtLnJ1bm5pbmc7XG4gICAgfVxuXG4gICAgLy8gT3ZlcnJpZGVcbiAgICBwdWJsaWMgb25PdXRPZlRhZ0lucHV0KGV2dCkge1xuICAgICAgICBpZiAodGhpcy5lbWFpbElucHV0Qm94LmRyb3Bkb3duICYmIHRoaXMuZW1haWxJbnB1dEJveC5kcm9wZG93bi5pc1Zpc2libGUpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHN1cGVyLm9uT3V0T2ZUYWdJbnB1dChldnQpO1xuICAgIH1cblxuICAgIC8vIE92ZXJyaWRlXG4gICAgcHVibGljIG9uU3VibWl0KCkge1xuICAgICAgICAvLyBib2R5XG4gICAgICAgIC8vIGxldCBtZXNzYWdlQm9keSA9IHRoaXMubWVzc2FnZUJvZHk7XG5cbiAgICAgICAgLy8gQ29udmVydCBpdCBpbnRvIGh0bWxcbiAgICAgICAgLy8gY29uc3QgY29udmVydGVyID0gbmV3IHNob3dkb3duLkNvbnZlcnRlcigpO1xuICAgICAgICAvLyBtZXNzYWdlQm9keSA9IGNvbnZlcnRlci5tYWtlSHRtbChtZXNzYWdlQm9keSk7XG5cbiAgICAgICAgLy8gUHJlcGFyZSBlbWFpbCBsaXN0XG5cbiAgICAgICAgY29uc3QgZW1haWxzID0gW107XG5cbiAgICAgICAgdGhpcy5lbWFpbHMuZm9yRWFjaChlbGVtID0+IHtcblxuICAgICAgICAgICAgbGV0IHggPSBlbGVtIHx8IChlbGVtLnZhbHVlKTtcbiAgICAgICAgICAgIGNvbnN0IHkgPSBwYXJzZU9ubHlFbWFpbHMoeCk7XG4gICAgICAgICAgICB5LmZvckVhY2gobSA9PiB7XG4gICAgICAgICAgICAgICAgZW1haWxzLnB1c2gobSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29uc3Qgb3V0cHV0czogSUNvbXBvc2VFbWFpbERpYWxvZ091dHB1dCA9IHtcbiAgICAgICAgICAgIGNvbmZpcm1lZDogdHJ1ZSxcbiAgICAgICAgICAgIGVtYWlsUmVjZWl2ZXJzOiBlbWFpbHMsXG4gICAgICAgICAgICBlbWFpbEJvZHk6IHRoaXMubWVzc2FnZUJvZHksXG4gICAgICAgICAgICBlbWFpbFRpdGxlOiB0aGlzLmRhdGEuZW1haWxUaXRsZSB8fCAnJyAvLyB0b2RvOlxuICAgICAgICB9O1xuXG4gICAgICAgIGlmICh0aGlzLmRhdGEucHJvY2Vzc29yKSB7XG4gICAgICAgICAgICB0aGlzLmFsZXJ0VHlwZSA9IEFsZXJ0VHlwZUVudW0ucnVubmluZztcbiAgICAgICAgICAgIHRoaXMuYWxlcnRNZXNzYWdlID0gJ1RoZSBlbWFpbCBpcyBiZWluZyBzZW50IG91dC4nO1xuICAgICAgICAgICAgdGhpcy5hbGVydFN1Yk1lc3NhZ2UgPSAnJztcbiAgICAgICAgICAgIHRoaXMuYWxlcnREaXNtaXNzaWJsZSA9IGZhbHNlO1xuXG4gICAgICAgICAgICB0aGlzLmRhdGEucHJvY2Vzc29yKG91dHB1dHMpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuYWxlcnRUeXBlID0gQWxlcnRUeXBlRW51bS5ub25lO1xuICAgICAgICAgICAgICAgIHRoaXMuZGlhbG9nUmVmLmNsb3NlKHtcbiAgICAgICAgICAgICAgICAgICAgc3VjY2VlZDogdHJ1ZVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSwgKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5hbGVydFR5cGUgPSBBbGVydFR5cGVFbnVtLmVycm9yO1xuICAgICAgICAgICAgICAgIHRoaXMuYWxlcnRNZXNzYWdlID0gJ1NvbWV0aGluZyB3ZW50IHdyb25nLic7XG4gICAgICAgICAgICAgICAgdGhpcy5hbGVydERpc21pc3NpYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLmFsZXJ0U3ViTWVzc2FnZSA9IChlcnJvciAmJiBlcnJvci5lcnJvckluZm8pID8gZXJyb3IuZXJyb3JJbmZvIDogJyc7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZGlhbG9nUmVmLmNsb3NlKG91dHB1dHMpO1xuICAgICAgICB9XG5cbiAgICB9XG59XG4iXX0=