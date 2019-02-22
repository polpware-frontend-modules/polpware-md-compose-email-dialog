/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
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
var ComposeEmailDialogComponent = /** @class */ (function (_super) {
    tslib_1.__extends(ComposeEmailDialogComponent, _super);
    function ComposeEmailDialogComponent(dialogRef, data) {
        var _this = _super.call(this, dialogRef) || this;
        _this.dialogRef = dialogRef;
        _this.data = data;
        data.title && (_this.title = data.title);
        _this.messageBody = data.emailBody || '';
        // alert
        _this.alertMessage = '';
        _this.alertSubMessage = '';
        _this.alertType = AlertTypeEnum.none;
        _this.alertDismissible = false;
        return _this;
    }
    Object.defineProperty(ComposeEmailDialogComponent.prototype, "isSubmitDisabled", {
        get: /**
         * @return {?}
         */
        function () {
            return this.emails.length === 0 || this.alertType === AlertTypeEnum.running;
        },
        enumerable: true,
        configurable: true
    });
    // Override
    // Override
    /**
     * @return {?}
     */
    ComposeEmailDialogComponent.prototype.onSubmit = 
    // Override
    /**
     * @return {?}
     */
    function () {
        // body
        // let messageBody = this.messageBody;
        var _this = this;
        // body
        // let messageBody = this.messageBody;
        // Convert it into html
        // const converter = new showdown.Converter();
        // messageBody = converter.makeHtml(messageBody);
        // Prepare email list
        /** @type {?} */
        var emails = [];
        this.emails.forEach((/**
         * @param {?} elem
         * @return {?}
         */
        function (elem) {
            /** @type {?} */
            var x = elem || (elem.value);
            /** @type {?} */
            var y = parseOnlyEmails(x);
            y.forEach((/**
             * @param {?} m
             * @return {?}
             */
            function (m) {
                emails.push(m);
            }));
        }));
        /** @type {?} */
        var outputs = {
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
            function () {
                _this.alertType = AlertTypeEnum.none;
                _this.dialogRef.close({
                    succeed: true
                });
            }), (/**
             * @param {?} error
             * @return {?}
             */
            function (error) {
                _this.alertType = AlertTypeEnum.error;
                _this.alertMessage = 'Something went wrong.';
                _this.alertDismissible = true;
                _this.alertSubMessage = (error && error.errorInfo) ? error.errorInfo : '';
            }));
        }
        else {
            this.dialogRef.close(outputs);
        }
    };
    ComposeEmailDialogComponent.decorators = [
        { type: Component, args: [{
                    selector: 'polp-md-compose-email-dialog',
                    template: "<h2 mat-dialog-title>\n    {{title}}\n    <button class=\"float-right\"\n            mat-icon-button\n            tabIndex=\"-1\"\n            [mat-dialog-close]=\"true\">\n        <mat-icon>close</mat-icon>\n    </button>\n</h2>\n\n<mat-dialog-content>\n\n    <polp-md-alert-box [message]=\"alertMessage\"\n                       [subMessage]=\"alertSubMessage\"\n                       [kind]=\"alertType\"\n                       [dismissible]=\"alertDismissible\">\n    </polp-md-alert-box>\n\n    <form name=\"emailForm\" autocomplete=\"off\">\n        <div class=\"flex-box flex-column margin-bottom-15\">\n            <tag-input [(ngModel)]=\"emails\" #emailInputBox\n                       name=\"emailInputs\"\n                       [addOnPaste]=\"true\"\n                       [modelAsStrings]=\"true\"\n                       [trimTags]=\"true\"\n                       [editable]=\"true\"\n                       (focusout)=\"onOutOfTagInput($event)\"\n                       [errorMessages]=\"errorMessages\"\n                       [validators]=\"validators\"\n                       [secondaryPlaceholder]=\"'Emails'\"\n                       [separatorKeyCodes]=\"[32,44,58,59]\"\n                       [placeholder]=\"'More Emails'\">\n            </tag-input>\n\n            <div class=\"full-width margin-top-10\">\n                <textarea name=\"messageBodyInput\"\n                          class=\"full-width\"\n                          #emailBody\n                          autosize [minRows]=\"5\" [maxRows]=\"10\"\n                          placeholder=\"Type your personal message here\"\n                          [(ngModel)]=\"messageBody\">\n                </textarea>\n            </div>\n\n        </div>\n    </form>\n\n</mat-dialog-content>\n\n<mat-dialog-actions>\n    <button mat-flat-button\n            color=\"primary\"\n            [disabled]=\"isSubmitDisabled\"\n            (click)=\"onSubmit()\">\n        Send\n    </button>\n</mat-dialog-actions>\n",
                    styles: [""]
                }] }
    ];
    /** @nocollapse */
    ComposeEmailDialogComponent.ctorParameters = function () { return [
        { type: MatDialogRef },
        { type: undefined, decorators: [{ type: Inject, args: [MAT_DIALOG_DATA,] }] }
    ]; };
    return ComposeEmailDialogComponent;
}(EmailFormAbstractComponent));
export { ComposeEmailDialogComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcG9zZS1lbWFpbC1kaWFsb2cuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHBvbHB3YXJlL21kLWNvbXBvc2UtZW1haWwtZGlhbG9nLyIsInNvdXJjZXMiOlsibGliL2NvbXBvc2UtZW1haWwtZGlhbG9nL2NvbXBvc2UtZW1haWwtZGlhbG9nLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUF5QixNQUFNLGVBQWUsQ0FBQztBQUN6RSxPQUFPLEVBQWEsWUFBWSxFQUFFLGVBQWUsRUFBcUIsTUFBTSxtQkFBbUIsQ0FBQztBQUloRyxPQUFPLEVBQUUsMEJBQTBCLEVBQUUsZUFBZSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDdEYsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHlCQUF5QixDQUFDOzs7O0FBRXhELCtDQU1DOzs7SUFMRyw4Q0FBb0I7O0lBQ3BCLG1EQUEwQjs7SUFDMUIsOENBQW1COztJQUNuQiwrQ0FBb0I7O0lBQ3BCLDRDQUFrQjs7Ozs7QUFHdEIsOENBS0M7OztJQUpHLHlDQUFjOztJQUNkLDZDQUFrQjs7SUFDbEIsOENBQW1COztJQUNuQiw2Q0FBNEQ7O0FBR2hFO0lBS2lELHVEQUEwQjtJQU92RSxxQ0FBbUIsU0FBb0QsRUFDbkMsSUFBOEI7UUFEbEUsWUFHSSxrQkFBTSxTQUFTLENBQUMsU0FVbkI7UUFia0IsZUFBUyxHQUFULFNBQVMsQ0FBMkM7UUFDbkMsVUFBSSxHQUFKLElBQUksQ0FBMEI7UUFJOUQsSUFBSSxDQUFDLEtBQUssSUFBSSxDQUFDLEtBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3hDLEtBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFNBQVMsSUFBSSxFQUFFLENBQUM7UUFFeEMsUUFBUTtRQUNSLEtBQUksQ0FBQyxZQUFZLEdBQUcsRUFBRSxDQUFDO1FBQ3ZCLEtBQUksQ0FB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LCBJbmplY3QsIFZpZXdDaGlsZCwgRWxlbWVudFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTWF0RGlhbG9nLCBNYXREaWFsb2dSZWYsIE1BVF9ESUFMT0dfREFUQSwgTWF0Q2hlY2tib3hDaGFuZ2UgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5cbmltcG9ydCAqIGFzIHNob3dkb3duIGZyb20gJ3Nob3dkb3duJztcblxuaW1wb3J0IHsgRW1haWxGb3JtQWJzdHJhY3RDb21wb25lbnQsIHBhcnNlT25seUVtYWlscyB9IGZyb20gJ0Bwb2xwd2FyZS9tZC1jb21wb25lbnRzJztcbmltcG9ydCB7IEFsZXJ0VHlwZUVudW0gfSBmcm9tICdAcG9scHdhcmUvbWQtY29tcG9uZW50cyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUNvbXBvc2VFbWFpbERpYWxvZ091dHB1dCB7XG4gICAgY29uZmlybWVkPzogYm9vbGVhbjtcbiAgICBlbWFpbFJlY2VpdmVycz86IHN0cmluZ1tdO1xuICAgIGVtYWlsQm9keT86IHN0cmluZztcbiAgICBlbWFpbFRpdGxlPzogc3RyaW5nO1xuICAgIHN1Y2NlZWQ/OiBib29sZWFuO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIElDb21wb3NlRW1haWxEaWFsb2dJbnB1dCB7XG4gICAgdGl0bGU6IHN0cmluZztcbiAgICBlbWFpbEJvZHk6IHN0cmluZztcbiAgICBlbWFpbFRpdGxlOiBzdHJpbmc7XG4gICAgcHJvY2Vzc29yPzogKGE6IElDb21wb3NlRW1haWxEaWFsb2dPdXRwdXQpID0+IFByb21pc2U8dm9pZD47XG59XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAncG9scC1tZC1jb21wb3NlLWVtYWlsLWRpYWxvZycsXG4gICAgdGVtcGxhdGVVcmw6ICcuL2NvbXBvc2UtZW1haWwtZGlhbG9nLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi9jb21wb3NlLWVtYWlsLWRpYWxvZy5jb21wb25lbnQuY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgQ29tcG9zZUVtYWlsRGlhbG9nQ29tcG9uZW50IGV4dGVuZHMgRW1haWxGb3JtQWJzdHJhY3RDb21wb25lbnQge1xuXG4gICAgYWxlcnRNZXNzYWdlOiBzdHJpbmc7XG4gICAgYWxlcnRTdWJNZXNzYWdlOiBzdHJpbmc7XG4gICAgYWxlcnRUeXBlOiBBbGVydFR5cGVFbnVtO1xuICAgIGFsZXJ0RGlzbWlzc2libGU6IGJvb2xlYW47XG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZGlhbG9nUmVmOiBNYXREaWFsb2dSZWY8Q29tcG9zZUVtYWlsRGlhbG9nQ29tcG9uZW50PixcbiAgICAgICAgQEluamVjdChNQVRfRElBTE9HX0RBVEEpIHB1YmxpYyBkYXRhOiBJQ29tcG9zZUVtYWlsRGlhbG9nSW5wdXQpIHtcblxuICAgICAgICBzdXBlcihkaWFsb2dSZWYpO1xuXG4gICAgICAgIGRhdGEudGl0bGUgJiYgKHRoaXMudGl0bGUgPSBkYXRhLnRpdGxlKTtcbiAgICAgICAgdGhpcy5tZXNzYWdlQm9keSA9IGRhdGEuZW1haWxCb2R5IHx8ICcnO1xuXG4gICAgICAgIC8vIGFsZXJ0XG4gICAgICAgIHRoaXMuYWxlcnRNZXNzYWdlID0gJyc7XG4gICAgICAgIHRoaXMuYWxlcnRTdWJNZXNzYWdlID0gJyc7XG4gICAgICAgIHRoaXMuYWxlcnRUeXBlID0gQWxlcnRUeXBlRW51bS5ub25lO1xuICAgICAgICB0aGlzLmFsZXJ0RGlzbWlzc2libGUgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IGlzU3VibWl0RGlzYWJsZWQoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmVtYWlscy5sZW5ndGggPT09IDAgfHwgdGhpcy5hbGVydFR5cGUgPT09IEFsZXJ0VHlwZUVudW0ucnVubmluZztcbiAgICB9XG5cbiAgICAvLyBPdmVycmlkZVxuICAgIHB1YmxpYyBvblN1Ym1pdCgpIHtcbiAgICAgICAgLy8gYm9keVxuICAgICAgICAvLyBsZXQgbWVzc2FnZUJvZHkgPSB0aGlzLm1lc3NhZ2VCb2R5O1xuXG4gICAgICAgIC8vIENvbnZlcnQgaXQgaW50byBodG1sXG4gICAgICAgIC8vIGNvbnN0IGNvbnZlcnRlciA9IG5ldyBzaG93ZG93bi5Db252ZXJ0ZXIoKTtcbiAgICAgICAgLy8gbWVzc2FnZUJvZHkgPSBjb252ZXJ0ZXIubWFrZUh0bWwobWVzc2FnZUJvZHkpO1xuXG4gICAgICAgIC8vIFByZXBhcmUgZW1haWwgbGlzdFxuICAgICAgICBjb25zdCBlbWFpbHMgPSBbXTtcblxuICAgICAgICB0aGlzLmVtYWlscy5mb3JFYWNoKGVsZW0gPT4ge1xuICAgICAgICAgICAgbGV0IHggPSBlbGVtIHx8IChlbGVtLnZhbHVlKTtcbiAgICAgICAgICAgIGNvbnN0IHkgPSBwYXJzZU9ubHlFbWFpbHMoeCk7XG4gICAgICAgICAgICB5LmZvckVhY2gobSA9PiB7XG4gICAgICAgICAgICAgICAgZW1haWxzLnB1c2gobSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29uc3Qgb3V0cHV0czogSUNvbXBvc2VFbWFpbERpYWxvZ091dHB1dCA9IHtcbiAgICAgICAgICAgIGNvbmZpcm1lZDogdHJ1ZSxcbiAgICAgICAgICAgIGVtYWlsUmVjZWl2ZXJzOiBlbWFpbHMsXG4gICAgICAgICAgICBlbWFpbEJvZHk6IHRoaXMubWVzc2FnZUJvZHksXG4gICAgICAgICAgICBlbWFpbFRpdGxlOiB0aGlzLmRhdGEuZW1haWxUaXRsZSB8fCAnJyAvLyB0b2RvOlxuICAgICAgICB9O1xuXG4gICAgICAgIGlmICh0aGlzLmRhdGEucHJvY2Vzc29yKSB7XG4gICAgICAgICAgICB0aGlzLmFsZXJ0VHlwZSA9IEFsZXJ0VHlwZUVudW0ucnVubmluZztcbiAgICAgICAgICAgIHRoaXMuYWxlcnRNZXNzYWdlID0gJ1RoZSBlbWFpbCBpcyBiZWluZyBzZW50IG91dC4nO1xuICAgICAgICAgICAgdGhpcy5hbGVydFN1Yk1lc3NhZ2UgPSAnJztcbiAgICAgICAgICAgIHRoaXMuYWxlcnREaXNtaXNzaWJsZSA9IGZhbHNlO1xuXG4gICAgICAgICAgICB0aGlzLmRhdGEucHJvY2Vzc29yKG91dHB1dHMpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuYWxlcnRUeXBlID0gQWxlcnRUeXBlRW51bS5ub25lO1xuICAgICAgICAgICAgICAgIHRoaXMuZGlhbG9nUmVmLmNsb3NlKHtcbiAgICAgICAgICAgICAgICAgICAgc3VjY2VlZDogdHJ1ZVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSwgKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5hbGVydFR5cGUgPSBBbGVydFR5cGVFbnVtLmVycm9yO1xuICAgICAgICAgICAgICAgIHRoaXMuYWxlcnRNZXNzYWdlID0gJ1NvbWV0aGluZyB3ZW50IHdyb25nLic7XG4gICAgICAgICAgICAgICAgdGhpcy5hbGVydERpc21pc3NpYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLmFsZXJ0U3ViTWVzc2FnZSA9IChlcnJvciAmJiBlcnJvci5lcnJvckluZm8pID8gZXJyb3IuZXJyb3JJbmZvIDogJyc7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZGlhbG9nUmVmLmNsb3NlKG91dHB1dHMpO1xuICAgICAgICB9XG4gICAgfVxufVxuIl19