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
                template: "<h2 mat-dialog-title>\n    {{title}}\n    <button class=\"float-right\"\n            mat-icon-button\n            tabIndex=\"-1\"\n            [mat-dialog-close]=\"true\">\n        <mat-icon>close</mat-icon>\n    </button>\n</h2>\n\n<mat-dialog-content>\n\n    <polp-md-alert-box [message]=\"alertMessage\"\n                       [subMessage]=\"alertSubMessage\"\n                       [kind]=\"alertType\"\n                       [dismissible]=\"alertDismissible\">\n    </polp-md-alert-box>\n\n    <form name=\"emailForm\" autocomplete=\"off\">\n        <div class=\"flex-box flex-column margin-bottom-15\">\n            <tag-input [(ngModel)]=\"emails\" #emailInputBox\n                       name=\"emailInputs\"\n                       [addOnPaste]=\"true\"\n                       [modelAsStrings]=\"true\"\n                       [trimTags]=\"true\"\n                       [editable]=\"true\"\n                       (focusout)=\"onOutOfTagInput($event)\"\n                       [errorMessages]=\"errorMessages\"\n                       [validators]=\"validators\"\n                       [secondaryPlaceholder]=\"'Emails'\"\n                       [separatorKeyCodes]=\"[32,44,58,59]\"\n                       [placeholder]=\"'More Emails'\">\n            </tag-input>\n\n            <div class=\"full-width margin-top-10\">\n                <textarea name=\"messageBodyInput\"\n                          class=\"full-width\"\n                          #emailBody\n                          autosize [minRows]=\"5\" [maxRows]=\"10\"\n                          placeholder=\"Type your personal message here\"\n                          [(ngModel)]=\"messageBody\">\n                </textarea>\n            </div>\n\n        </div>\n    </form>\n\n</mat-dialog-content>\n\n<mat-dialog-actions>\n    <button mat-flat-button\n            color=\"primary\"\n            [disabled]=\"isSubmitDisabled\"\n            (click)=\"onSubmit()\">\n        Send\n    </button>\n</mat-dialog-actions>\n",
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
    ComposeEmailDialogComponent.prototype.dialogRef;
    /** @type {?} */
    ComposeEmailDialogComponent.prototype.data;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcG9zZS1lbWFpbC1kaWFsb2cuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHBvbHB3YXJlL21kLWNvbXBvc2UtZW1haWwtZGlhbG9nLyIsInNvdXJjZXMiOlsibGliL2NvbXBvc2UtZW1haWwtZGlhbG9nL2NvbXBvc2UtZW1haWwtZGlhbG9nLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQXlCLE1BQU0sZUFBZSxDQUFDO0FBQ3pFLE9BQU8sRUFBYSxZQUFZLEVBQUUsZUFBZSxFQUFxQixNQUFNLG1CQUFtQixDQUFDO0FBSWhHLE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxlQUFlLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUN0RixPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0seUJBQXlCLENBQUM7Ozs7QUFFeEQsK0NBTUM7OztJQUxHLDhDQUFvQjs7SUFDcEIsbURBQTBCOztJQUMxQiw4Q0FBbUI7O0lBQ25CLCtDQUFvQjs7SUFDcEIsNENBQWtCOzs7OztBQUd0Qiw4Q0FLQzs7O0lBSkcseUNBQWM7O0lBQ2QsNkNBQWtCOztJQUNsQiw4Q0FBbUI7O0lBQ25CLDZDQUE0RDs7QUFRaEUsTUFBTSxPQUFPLDJCQUE0QixTQUFRLDBCQUEwQjs7Ozs7SUFPdkUsWUFBbUIsU0FBb0QsRUFDbkMsSUFBOEI7UUFFOUQsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBSEYsY0FBUyxHQUFULFNBQVMsQ0FBMkM7UUFDbkMsU0FBSSxHQUFKLElBQUksQ0FBMEI7UUFJOUQsSUFBSSxDQUFDLEtBQUssSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3hDLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFNBQVMsSUFBSSxFQUFFLENBQUM7UUFFeEMsUUFBUTtRQUNSLElBQUksQ0FBQyxZQUFZLEdBQUcsRUFBRSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxlQUFlLEdBQUcsRUFBRSxDQUFDO1FBQzFCLElBQUksQ0FBQyxTQUFTLEdBQUcsYUFBYSxDQUFDLElBQUksQ0FBQztRQUNwQyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsS0FBSyxDQUFDO0lBQ2xDLENBQUM7Ozs7SUFFRCxJQUFXLGdCQUFnQjtRQUN2QixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxLQUFLLENBQUMsSUFBSSxJQUFJLENBQUMsU0FBUyxLQUFLLGFBQWEsQ0FBQyxPQUFPLENBQUM7SUFDaEYsQ0FBQzs7Ozs7SUFHTSxRQUFRO1FBQ1gsT0FBTztRQUNQLHNDQUFzQzs7Ozs7Ozs7Y0FPaEMsTUFBTSxHQUFHLEVBQUU7UUFFakIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPOzs7O1FBQUMsSUFBSSxDQUFDLEVBQUU7O2dCQUNuQixDQUFDLEdBQUcsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQzs7a0JBQ3RCLENBQUMsR0FBRyxlQUFlLENBQUMsQ0FBQyxDQUFDO1lBQzVCLENBQUMsQ0FBQyxPQUFPOzs7O1lBQUMsQ0FBQyxDQUFDLEVBQUU7Z0JBQ1YsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNuQixDQUFDLEVBQUMsQ0FBQztRQUNQLENBQUMsRUFBQyxDQUFDOztjQUVHLE9BQU8sR0FBOEI7WUFDdkMsU0FBUyxFQUFFLElBQUk7WUFDZixjQUFjLEVBQUUsTUFBTTtZQUN0QixTQUFTLEVBQUUsSUFBSSxDQUFDLFdBQVc7WUFDM0IsVUFBVSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxJQUFJLEVBQUUsQ0FBQyxRQUFRO1NBQ2xEO1FBRUQsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUNyQixJQUFJLENBQUMsU0FBUyxHQUFHLGFBQWEsQ0FBQyxPQUFPLENBQUM7WUFDdkMsSUFBSSxDQUFDLFlBQVksR0FBRyw4QkFBOEIsQ0FBQztZQUNuRCxJQUFJLENBQUMsZUFBZSxHQUFHLEVBQUUsQ0FBQztZQUMxQixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsS0FBSyxDQUFDO1lBRTlCLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUk7OztZQUFDLEdBQUcsRUFBRTtnQkFDbkMsSUFBSSxDQUFDLFNBQVMsR0FBRyxhQUFhLENBQUMsSUFBSSxDQUFDO2dCQUNwQyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQztvQkFDakIsT0FBTyxFQUFFLElBQUk7aUJBQ2hCLENBQUMsQ0FBQztZQUNQLENBQUM7Ozs7WUFBRSxDQUFDLEtBQUssRUFBRSxFQUFFO2dCQUNULElBQUksQ0FBQyxTQUFTLEdBQUcsYUFBYSxDQUFDLEtBQUssQ0FBQztnQkFDckMsSUFBSSxDQUFDLFlBQVksR0FBRyx1QkFBdUIsQ0FBQztnQkFDNUMsSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQztnQkFDN0IsSUFBSSxDQUFDLGVBQWUsR0FBRyxDQUFDLEtBQUssSUFBSSxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztZQUM3RSxDQUFDLEVBQUMsQ0FBQztTQUNOO2FBQU07WUFDSCxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUNqQztJQUNMLENBQUM7OztZQTlFSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLDhCQUE4QjtnQkFDeEMsNDlEQUFvRDs7YUFFdkQ7Ozs7WUExQm1CLFlBQVk7NENBbUN2QixNQUFNLFNBQUMsZUFBZTs7OztJQU4zQixtREFBcUI7O0lBQ3JCLHNEQUF3Qjs7SUFDeEIsZ0RBQXlCOztJQUN6Qix1REFBMEI7O0lBRWQsZ0RBQTJEOztJQUNuRSwyQ0FBOEQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEluamVjdCwgVmlld0NoaWxkLCBFbGVtZW50UmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNYXREaWFsb2csIE1hdERpYWxvZ1JlZiwgTUFUX0RJQUxPR19EQVRBLCBNYXRDaGVja2JveENoYW5nZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcblxuaW1wb3J0ICogYXMgc2hvd2Rvd24gZnJvbSAnc2hvd2Rvd24nO1xuXG5pbXBvcnQgeyBFbWFpbEZvcm1BYnN0cmFjdENvbXBvbmVudCwgcGFyc2VPbmx5RW1haWxzIH0gZnJvbSAnQHBvbHB3YXJlL21kLWNvbXBvbmVudHMnO1xuaW1wb3J0IHsgQWxlcnRUeXBlRW51bSB9IGZyb20gJ0Bwb2xwd2FyZS9tZC1jb21wb25lbnRzJztcblxuZXhwb3J0IGludGVyZmFjZSBJQ29tcG9zZUVtYWlsRGlhbG9nT3V0cHV0IHtcbiAgICBjb25maXJtZWQ/OiBib29sZWFuO1xuICAgIGVtYWlsUmVjZWl2ZXJzPzogc3RyaW5nW107XG4gICAgZW1haWxCb2R5Pzogc3RyaW5nO1xuICAgIGVtYWlsVGl0bGU/OiBzdHJpbmc7XG4gICAgc3VjY2VlZD86IGJvb2xlYW47XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUNvbXBvc2VFbWFpbERpYWxvZ0lucHV0IHtcbiAgICB0aXRsZTogc3RyaW5nO1xuICAgIGVtYWlsQm9keTogc3RyaW5nO1xuICAgIGVtYWlsVGl0bGU6IHN0cmluZztcbiAgICBwcm9jZXNzb3I/OiAoYTogSUNvbXBvc2VFbWFpbERpYWxvZ091dHB1dCkgPT4gUHJvbWlzZTx2b2lkPjtcbn1cblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdwb2xwLW1kLWNvbXBvc2UtZW1haWwtZGlhbG9nJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vY29tcG9zZS1lbWFpbC1kaWFsb2cuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL2NvbXBvc2UtZW1haWwtZGlhbG9nLmNvbXBvbmVudC5jc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBDb21wb3NlRW1haWxEaWFsb2dDb21wb25lbnQgZXh0ZW5kcyBFbWFpbEZvcm1BYnN0cmFjdENvbXBvbmVudCB7XG5cbiAgICBhbGVydE1lc3NhZ2U6IHN0cmluZztcbiAgICBhbGVydFN1Yk1lc3NhZ2U6IHN0cmluZztcbiAgICBhbGVydFR5cGU6IEFsZXJ0VHlwZUVudW07XG4gICAgYWxlcnREaXNtaXNzaWJsZTogYm9vbGVhbjtcblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBkaWFsb2dSZWY6IE1hdERpYWxvZ1JlZjxDb21wb3NlRW1haWxEaWFsb2dDb21wb25lbnQ+LFxuICAgICAgICBASW5qZWN0KE1BVF9ESUFMT0dfREFUQSkgcHVibGljIGRhdGE6IElDb21wb3NlRW1haWxEaWFsb2dJbnB1dCkge1xuXG4gICAgICAgIHN1cGVyKGRpYWxvZ1JlZik7XG5cbiAgICAgICAgZGF0YS50aXRsZSAmJiAodGhpcy50aXRsZSA9IGRhdGEudGl0bGUpO1xuICAgICAgICB0aGlzLm1lc3NhZ2VCb2R5ID0gZGF0YS5lbWFpbEJvZHkgfHwgJyc7XG5cbiAgICAgICAgLy8gYWxlcnRcbiAgICAgICAgdGhpcy5hbGVydE1lc3NhZ2UgPSAnJztcbiAgICAgICAgdGhpcy5hbGVydFN1Yk1lc3NhZ2UgPSAnJztcbiAgICAgICAgdGhpcy5hbGVydFR5cGUgPSBBbGVydFR5cGVFbnVtLm5vbmU7XG4gICAgICAgIHRoaXMuYWxlcnREaXNtaXNzaWJsZSA9IGZhbHNlO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgaXNTdWJtaXREaXNhYmxlZCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZW1haWxzLmxlbmd0aCA9PT0gMCB8fCB0aGlzLmFsZXJ0VHlwZSA9PT0gQWxlcnRUeXBlRW51bS5ydW5uaW5nO1xuICAgIH1cblxuICAgIC8vIE92ZXJyaWRlXG4gICAgcHVibGljIG9uU3VibWl0KCkge1xuICAgICAgICAvLyBib2R5XG4gICAgICAgIC8vIGxldCBtZXNzYWdlQm9keSA9IHRoaXMubWVzc2FnZUJvZHk7XG5cbiAgICAgICAgLy8gQ29udmVydCBpdCBpbnRvIGh0bWxcbiAgICAgICAgLy8gY29uc3QgY29udmVydGVyID0gbmV3IHNob3dkb3duLkNvbnZlcnRlcigpO1xuICAgICAgICAvLyBtZXNzYWdlQm9keSA9IGNvbnZlcnRlci5tYWtlSHRtbChtZXNzYWdlQm9keSk7XG5cbiAgICAgICAgLy8gUHJlcGFyZSBlbWFpbCBsaXN0XG4gICAgICAgIGNvbnN0IGVtYWlscyA9IFtdO1xuXG4gICAgICAgIHRoaXMuZW1haWxzLmZvckVhY2goZWxlbSA9PiB7XG4gICAgICAgICAgICBsZXQgeCA9IGVsZW0gfHwgKGVsZW0udmFsdWUpO1xuICAgICAgICAgICAgY29uc3QgeSA9IHBhcnNlT25seUVtYWlscyh4KTtcbiAgICAgICAgICAgIHkuZm9yRWFjaChtID0+IHtcbiAgICAgICAgICAgICAgICBlbWFpbHMucHVzaChtKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICBjb25zdCBvdXRwdXRzOiBJQ29tcG9zZUVtYWlsRGlhbG9nT3V0cHV0ID0ge1xuICAgICAgICAgICAgY29uZmlybWVkOiB0cnVlLFxuICAgICAgICAgICAgZW1haWxSZWNlaXZlcnM6IGVtYWlscyxcbiAgICAgICAgICAgIGVtYWlsQm9keTogdGhpcy5tZXNzYWdlQm9keSxcbiAgICAgICAgICAgIGVtYWlsVGl0bGU6IHRoaXMuZGF0YS5lbWFpbFRpdGxlIHx8ICcnIC8vIHRvZG86XG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKHRoaXMuZGF0YS5wcm9jZXNzb3IpIHtcbiAgICAgICAgICAgIHRoaXMuYWxlcnRUeXBlID0gQWxlcnRUeXBlRW51bS5ydW5uaW5nO1xuICAgICAgICAgICAgdGhpcy5hbGVydE1lc3NhZ2UgPSAnVGhlIGVtYWlsIGlzIGJlaW5nIHNlbnQgb3V0Lic7XG4gICAgICAgICAgICB0aGlzLmFsZXJ0U3ViTWVzc2FnZSA9ICcnO1xuICAgICAgICAgICAgdGhpcy5hbGVydERpc21pc3NpYmxlID0gZmFsc2U7XG5cbiAgICAgICAgICAgIHRoaXMuZGF0YS5wcm9jZXNzb3Iob3V0cHV0cykudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5hbGVydFR5cGUgPSBBbGVydFR5cGVFbnVtLm5vbmU7XG4gICAgICAgICAgICAgICAgdGhpcy5kaWFsb2dSZWYuY2xvc2Uoe1xuICAgICAgICAgICAgICAgICAgICBzdWNjZWVkOiB0cnVlXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LCAoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmFsZXJ0VHlwZSA9IEFsZXJ0VHlwZUVudW0uZXJyb3I7XG4gICAgICAgICAgICAgICAgdGhpcy5hbGVydE1lc3NhZ2UgPSAnU29tZXRoaW5nIHdlbnQgd3JvbmcuJztcbiAgICAgICAgICAgICAgICB0aGlzLmFsZXJ0RGlzbWlzc2libGUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMuYWxlcnRTdWJNZXNzYWdlID0gKGVycm9yICYmIGVycm9yLmVycm9ySW5mbykgPyBlcnJvci5lcnJvckluZm8gOiAnJztcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5kaWFsb2dSZWYuY2xvc2Uob3V0cHV0cyk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=