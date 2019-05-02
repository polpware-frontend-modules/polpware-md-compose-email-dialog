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
    IComposeEmailDialogInput.prototype.autocompleteObservable;
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
                template: "<h2 mat-dialog-title>\n    {{title}}\n    <button class=\"float-right\"\n            mat-icon-button\n            tabIndex=\"-1\"\n            [mat-dialog-close]=\"true\">\n        <mat-icon>close</mat-icon>\n    </button>\n</h2>\n\n<mat-dialog-content>\n\n    <polp-md-alert-box [message]=\"alertMessage\"\n                       [subMessage]=\"alertSubMessage\"\n                       [kind]=\"alertType\"\n                       [dismissible]=\"alertDismissible\">\n    </polp-md-alert-box>\n\n    <form name=\"emailForm\" autocomplete=\"off\">\n        <div class=\"flex-box flex-column margin-bottom-15\">\n            <tag-input [(ngModel)]=\"emails\" #emailInputBox\n                       name=\"emailInputs\"\n                       [addOnPaste]=\"true\"\n                       [modelAsStrings]=\"true\"\n                       [trimTags]=\"true\"\n                       [editable]=\"true\"\n                       (focusout)=\"onOutOfTagInput($event)\"\n                       [errorMessages]=\"errorMessages\"\n                       [validators]=\"validators\"\n                       [secondaryPlaceholder]=\"'Emails'\"\n                       [separatorKeyCodes]=\"[32,44,58,59]\"\n                       [placeholder]=\"'More Emails'\">\n                <tag-input-dropdown [autocompleteObservable]=\"requestAutocompleteItems\"\n                                    *ngIf=\"requestAutocompleteItems\">\n                </tag-input-dropdown>\n            </tag-input>\n\n            <div class=\"full-width margin-top-10\">\n                <textarea name=\"messageBodyInput\"\n                          class=\"full-width\"\n                          #emailBody\n                          autosize [minRows]=\"5\" [maxRows]=\"10\"\n                          placeholder=\"Type your personal message here\"\n                          [(ngModel)]=\"messageBody\">\n                </textarea>\n            </div>\n\n        </div>\n    </form>\n\n</mat-dialog-content>\n\n<mat-dialog-actions>\n    <button mat-flat-button\n            color=\"primary\"\n            [disabled]=\"isSubmitDisabled\"\n            (click)=\"onSubmit()\">\n        Send\n    </button>\n</mat-dialog-actions>\n",
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
    ComposeEmailDialogComponent.prototype.requestAutocompleteItems;
    /** @type {?} */
    ComposeEmailDialogComponent.prototype.dialogRef;
    /** @type {?} */
    ComposeEmailDialogComponent.prototype.data;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcG9zZS1lbWFpbC1kaWFsb2cuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHBvbHB3YXJlL21kLWNvbXBvc2UtZW1haWwtZGlhbG9nLyIsInNvdXJjZXMiOlsibGliL2NvbXBvc2UtZW1haWwtZGlhbG9nL2NvbXBvc2UtZW1haWwtZGlhbG9nLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQXlCLE1BQU0sZUFBZSxDQUFDO0FBQ3pFLE9BQU8sRUFBYSxZQUFZLEVBQUUsZUFBZSxFQUFxQixNQUFNLG1CQUFtQixDQUFDO0FBTWhHLE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxlQUFlLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUN0RixPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0seUJBQXlCLENBQUM7Ozs7QUFHeEQsK0NBTUM7OztJQUxHLDhDQUFvQjs7SUFDcEIsbURBQTBCOztJQUMxQiw4Q0FBbUI7O0lBQ25CLCtDQUFvQjs7SUFDcEIsNENBQWtCOzs7OztBQUd0Qiw4Q0FNQzs7O0lBTEcseUNBQWM7O0lBQ2QsNkNBQWtCOztJQUNsQiw4Q0FBbUI7O0lBQ25CLDZDQUEyRDs7SUFDM0QsMERBQWdFOztBQVFwRSxNQUFNLE9BQU8sMkJBQTRCLFNBQVEsMEJBQTBCOzs7OztJQVN2RSxZQUFtQixTQUFvRCxFQUNuQyxJQUE4QjtRQUU5RCxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUM7UUFIRixjQUFTLEdBQVQsU0FBUyxDQUEyQztRQUNuQyxTQUFJLEdBQUosSUFBSSxDQUEwQjtRQUk5RCxJQUFJLENBQUMsS0FBSyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDeEMsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsU0FBUyxJQUFJLEVBQUUsQ0FBQztRQUV4QyxRQUFRO1FBQ1IsSUFBSSxDQUFDLFlBQVksR0FBRyxFQUFFLENBQUM7UUFDdkIsSUFBSSxDQUFDLGVBQWUsR0FBRyxFQUFFLENBQUM7UUFDMUIsSUFBSSxDQUFDLFNBQVMsR0FBRyxhQUFhLENBQUMsSUFBSSxDQUFDO1FBQ3BDLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxLQUFLLENBQUM7UUFFOUIsSUFBSSxDQUFDLHdCQUF3QixHQUFHLElBQUksQ0FBQyxzQkFBc0IsSUFBSSxJQUFJLENBQUM7SUFDeEUsQ0FBQzs7OztJQUVELElBQVcsZ0JBQWdCO1FBQ3ZCLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEtBQUssQ0FBQyxJQUFJLElBQUksQ0FBQyxTQUFTLEtBQUssYUFBYSxDQUFDLE9BQU8sQ0FBQztJQUNoRixDQUFDOzs7OztJQUdNLFFBQVE7UUFDWCxPQUFPO1FBQ1Asc0NBQXNDOzs7Ozs7OztjQU9oQyxNQUFNLEdBQUcsRUFBRTtRQUVqQixJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU87Ozs7UUFBQyxJQUFJLENBQUMsRUFBRTs7Z0JBQ25CLENBQUMsR0FBRyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDOztrQkFDdEIsQ0FBQyxHQUFHLGVBQWUsQ0FBQyxDQUFDLENBQUM7WUFDNUIsQ0FBQyxDQUFDLE9BQU87Ozs7WUFBQyxDQUFDLENBQUMsRUFBRTtnQkFDVixNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ25CLENBQUMsRUFBQyxDQUFDO1FBQ1AsQ0FBQyxFQUFDLENBQUM7O2NBRUcsT0FBTyxHQUE4QjtZQUN2QyxTQUFTLEVBQUUsSUFBSTtZQUNmLGNBQWMsRUFBRSxNQUFNO1lBQ3RCLFNBQVMsRUFBRSxJQUFJLENBQUMsV0FBVztZQUMzQixVQUFVLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLElBQUksRUFBRSxDQUFDLFFBQVE7U0FDbEQ7UUFFRCxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFO1lBQ3JCLElBQUksQ0FBQyxTQUFTLEdBQUcsYUFBYSxDQUFDLE9BQU8sQ0FBQztZQUN2QyxJQUFJLENBQUMsWUFBWSxHQUFHLDhCQUE4QixDQUFDO1lBQ25ELElBQUksQ0FBQyxlQUFlLEdBQUcsRUFBRSxDQUFDO1lBQzFCLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxLQUFLLENBQUM7WUFFOUIsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSTs7O1lBQUMsR0FBRyxFQUFFO2dCQUNuQyxJQUFJLENBQUMsU0FBUyxHQUFHLGFBQWEsQ0FBQyxJQUFJLENBQUM7Z0JBQ3BDLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDO29CQUNqQixPQUFPLEVBQUUsSUFBSTtpQkFDaEIsQ0FBQyxDQUFDO1lBQ1AsQ0FBQzs7OztZQUFFLENBQUMsS0FBSyxFQUFFLEVBQUU7Z0JBQ1QsSUFBSSxDQUFDLFNBQVMsR0FBRyxhQUFhLENBQUMsS0FBSyxDQUFDO2dCQUNyQyxJQUFJLENBQUMsWUFBWSxHQUFHLHVCQUF1QixDQUFDO2dCQUM1QyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDO2dCQUM3QixJQUFJLENBQUMsZUFBZSxHQUFHLENBQUMsS0FBSyxJQUFJLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1lBQzdFLENBQUMsRUFBQyxDQUFDO1NBQ047YUFBTTtZQUNILElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQ2pDO0lBQ0wsQ0FBQzs7O1lBbEZKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsOEJBQThCO2dCQUN4Qyx1cUVBQW9EOzthQUV2RDs7OztZQTlCbUIsWUFBWTs0Q0F5Q3ZCLE1BQU0sU0FBQyxlQUFlOzs7O0lBUjNCLG1EQUFxQjs7SUFDckIsc0RBQXdCOztJQUN4QixnREFBeUI7O0lBQ3pCLHVEQUEwQjs7SUFFMUIsK0RBQWlFOztJQUVyRCxnREFBMkQ7O0lBQ25FLDJDQUE4RCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5qZWN0LCBWaWV3Q2hpbGQsIEVsZW1lbnRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1hdERpYWxvZywgTWF0RGlhbG9nUmVmLCBNQVRfRElBTE9HX0RBVEEsIE1hdENoZWNrYm94Q2hhbmdlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuXG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCAqIGFzIHNob3dkb3duIGZyb20gJ3Nob3dkb3duJztcblxuaW1wb3J0IHsgRW1haWxGb3JtQWJzdHJhY3RDb21wb25lbnQsIHBhcnNlT25seUVtYWlscyB9IGZyb20gJ0Bwb2xwd2FyZS9tZC1jb21wb25lbnRzJztcbmltcG9ydCB7IEFsZXJ0VHlwZUVudW0gfSBmcm9tICdAcG9scHdhcmUvbWQtY29tcG9uZW50cyc7XG5cblxuZXhwb3J0IGludGVyZmFjZSBJQ29tcG9zZUVtYWlsRGlhbG9nT3V0cHV0IHtcbiAgICBjb25maXJtZWQ/OiBib29sZWFuO1xuICAgIGVtYWlsUmVjZWl2ZXJzPzogc3RyaW5nW107XG4gICAgZW1haWxCb2R5Pzogc3RyaW5nO1xuICAgIGVtYWlsVGl0bGU/OiBzdHJpbmc7XG4gICAgc3VjY2VlZD86IGJvb2xlYW47XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUNvbXBvc2VFbWFpbERpYWxvZ0lucHV0IHtcbiAgICB0aXRsZTogc3RyaW5nO1xuICAgIGVtYWlsQm9keTogc3RyaW5nO1xuICAgIGVtYWlsVGl0bGU6IHN0cmluZztcbiAgICBwcm9jZXNzb3I/OiAoYTogSUNvbXBvc2VFbWFpbERpYWxvZ091dHB1dCkgPT4gUHJvbWlzZTxhbnk+O1xuICAgIGF1dG9jb21wbGV0ZU9ic2VydmFibGU/OiAodGV4dDogc3RyaW5nKSA9PiBPYnNlcnZhYmxlPFJlc3BvbnNlPjtcbn1cblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdwb2xwLW1kLWNvbXBvc2UtZW1haWwtZGlhbG9nJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vY29tcG9zZS1lbWFpbC1kaWFsb2cuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL2NvbXBvc2UtZW1haWwtZGlhbG9nLmNvbXBvbmVudC5jc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBDb21wb3NlRW1haWxEaWFsb2dDb21wb25lbnQgZXh0ZW5kcyBFbWFpbEZvcm1BYnN0cmFjdENvbXBvbmVudCB7XG5cbiAgICBhbGVydE1lc3NhZ2U6IHN0cmluZztcbiAgICBhbGVydFN1Yk1lc3NhZ2U6IHN0cmluZztcbiAgICBhbGVydFR5cGU6IEFsZXJ0VHlwZUVudW07XG4gICAgYWxlcnREaXNtaXNzaWJsZTogYm9vbGVhbjtcblxuICAgIHJlcXVlc3RBdXRvY29tcGxldGVJdGVtczogKHRleHQ6IHN0cmluZykgPT4gT2JzZXJ2YWJsZTxSZXNwb25zZT47XG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZGlhbG9nUmVmOiBNYXREaWFsb2dSZWY8Q29tcG9zZUVtYWlsRGlhbG9nQ29tcG9uZW50PixcbiAgICAgICAgQEluamVjdChNQVRfRElBTE9HX0RBVEEpIHB1YmxpYyBkYXRhOiBJQ29tcG9zZUVtYWlsRGlhbG9nSW5wdXQpIHtcblxuICAgICAgICBzdXBlcihkaWFsb2dSZWYpO1xuXG4gICAgICAgIGRhdGEudGl0bGUgJiYgKHRoaXMudGl0bGUgPSBkYXRhLnRpdGxlKTtcbiAgICAgICAgdGhpcy5tZXNzYWdlQm9keSA9IGRhdGEuZW1haWxCb2R5IHx8ICcnO1xuXG4gICAgICAgIC8vIGFsZXJ0XG4gICAgICAgIHRoaXMuYWxlcnRNZXNzYWdlID0gJyc7XG4gICAgICAgIHRoaXMuYWxlcnRTdWJNZXNzYWdlID0gJyc7XG4gICAgICAgIHRoaXMuYWxlcnRUeXBlID0gQWxlcnRUeXBlRW51bS5ub25lO1xuICAgICAgICB0aGlzLmFsZXJ0RGlzbWlzc2libGUgPSBmYWxzZTtcblxuICAgICAgICB0aGlzLnJlcXVlc3RBdXRvY29tcGxldGVJdGVtcyA9IGRhdGEuYXV0b2NvbXBsZXRlT2JzZXJ2YWJsZSB8fCBudWxsO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgaXNTdWJtaXREaXNhYmxlZCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZW1haWxzLmxlbmd0aCA9PT0gMCB8fCB0aGlzLmFsZXJ0VHlwZSA9PT0gQWxlcnRUeXBlRW51bS5ydW5uaW5nO1xuICAgIH1cblxuICAgIC8vIE92ZXJyaWRlXG4gICAgcHVibGljIG9uU3VibWl0KCkge1xuICAgICAgICAvLyBib2R5XG4gICAgICAgIC8vIGxldCBtZXNzYWdlQm9keSA9IHRoaXMubWVzc2FnZUJvZHk7XG5cbiAgICAgICAgLy8gQ29udmVydCBpdCBpbnRvIGh0bWxcbiAgICAgICAgLy8gY29uc3QgY29udmVydGVyID0gbmV3IHNob3dkb3duLkNvbnZlcnRlcigpO1xuICAgICAgICAvLyBtZXNzYWdlQm9keSA9IGNvbnZlcnRlci5tYWtlSHRtbChtZXNzYWdlQm9keSk7XG5cbiAgICAgICAgLy8gUHJlcGFyZSBlbWFpbCBsaXN0XG4gICAgICAgIGNvbnN0IGVtYWlscyA9IFtdO1xuXG4gICAgICAgIHRoaXMuZW1haWxzLmZvckVhY2goZWxlbSA9PiB7XG4gICAgICAgICAgICBsZXQgeCA9IGVsZW0gfHwgKGVsZW0udmFsdWUpO1xuICAgICAgICAgICAgY29uc3QgeSA9IHBhcnNlT25seUVtYWlscyh4KTtcbiAgICAgICAgICAgIHkuZm9yRWFjaChtID0+IHtcbiAgICAgICAgICAgICAgICBlbWFpbHMucHVzaChtKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICBjb25zdCBvdXRwdXRzOiBJQ29tcG9zZUVtYWlsRGlhbG9nT3V0cHV0ID0ge1xuICAgICAgICAgICAgY29uZmlybWVkOiB0cnVlLFxuICAgICAgICAgICAgZW1haWxSZWNlaXZlcnM6IGVtYWlscyxcbiAgICAgICAgICAgIGVtYWlsQm9keTogdGhpcy5tZXNzYWdlQm9keSxcbiAgICAgICAgICAgIGVtYWlsVGl0bGU6IHRoaXMuZGF0YS5lbWFpbFRpdGxlIHx8ICcnIC8vIHRvZG86XG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKHRoaXMuZGF0YS5wcm9jZXNzb3IpIHtcbiAgICAgICAgICAgIHRoaXMuYWxlcnRUeXBlID0gQWxlcnRUeXBlRW51bS5ydW5uaW5nO1xuICAgICAgICAgICAgdGhpcy5hbGVydE1lc3NhZ2UgPSAnVGhlIGVtYWlsIGlzIGJlaW5nIHNlbnQgb3V0Lic7XG4gICAgICAgICAgICB0aGlzLmFsZXJ0U3ViTWVzc2FnZSA9ICcnO1xuICAgICAgICAgICAgdGhpcy5hbGVydERpc21pc3NpYmxlID0gZmFsc2U7XG5cbiAgICAgICAgICAgIHRoaXMuZGF0YS5wcm9jZXNzb3Iob3V0cHV0cykudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5hbGVydFR5cGUgPSBBbGVydFR5cGVFbnVtLm5vbmU7XG4gICAgICAgICAgICAgICAgdGhpcy5kaWFsb2dSZWYuY2xvc2Uoe1xuICAgICAgICAgICAgICAgICAgICBzdWNjZWVkOiB0cnVlXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LCAoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmFsZXJ0VHlwZSA9IEFsZXJ0VHlwZUVudW0uZXJyb3I7XG4gICAgICAgICAgICAgICAgdGhpcy5hbGVydE1lc3NhZ2UgPSAnU29tZXRoaW5nIHdlbnQgd3JvbmcuJztcbiAgICAgICAgICAgICAgICB0aGlzLmFsZXJ0RGlzbWlzc2libGUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMuYWxlcnRTdWJNZXNzYWdlID0gKGVycm9yICYmIGVycm9yLmVycm9ySW5mbykgPyBlcnJvci5lcnJvckluZm8gOiAnJztcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5kaWFsb2dSZWYuY2xvc2Uob3V0cHV0cyk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=