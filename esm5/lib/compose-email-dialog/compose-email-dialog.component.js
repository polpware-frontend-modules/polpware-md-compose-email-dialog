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
    /** @type {?|undefined} */
    IComposeEmailDialogInput.prototype.autocompleteObservable;
}
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
        _this.requestAutocompleteItems = data.autocompleteObservable || null;
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
                    template: "<h2 mat-dialog-title>\n    {{title}}\n    <button class=\"float-right\"\n            mat-icon-button\n            tabIndex=\"-1\"\n            [mat-dialog-close]=\"true\">\n        <mat-icon>close</mat-icon>\n    </button>\n</h2>\n\n<mat-dialog-content>\n\n    <polp-md-alert-box [message]=\"alertMessage\"\n                       [subMessage]=\"alertSubMessage\"\n                       [kind]=\"alertType\"\n                       [dismissible]=\"alertDismissible\">\n    </polp-md-alert-box>\n\n    <form name=\"emailForm\" autocomplete=\"off\">\n        <div class=\"flex-box flex-column margin-bottom-15\">\n            <tag-input [(ngModel)]=\"emails\" #emailInputBox\n                       name=\"emailInputs\"\n                       [addOnPaste]=\"true\"\n                       [modelAsStrings]=\"true\"\n                       [trimTags]=\"true\"\n                       [editable]=\"true\"\n                       (focusout)=\"onOutOfTagInput($event)\"\n                       [errorMessages]=\"errorMessages\"\n                       [validators]=\"validators\"\n                       [secondaryPlaceholder]=\"'Emails'\"\n                       [separatorKeyCodes]=\"[32,44,58,59]\"\n                       [placeholder]=\"'More Emails'\">\n                <tag-input-dropdown *ngIf=\"requestAutocompleteItems\"\n                    [autocompleteObservable]=\"requestAutocompleteItems\"\n                    [minimumTextLength]=\"0\">\n                    <ng-template let-item=\"item\" let-index=\"index\">\n                        {{ item.display }}\n                    </ng-template>\n                </tag-input-dropdown>\n            </tag-input>\n\n            <div class=\"full-width margin-top-10\">\n                <textarea name=\"messageBodyInput\"\n                          class=\"full-width\"\n                          #emailBody\n                          autosize [minRows]=\"5\" [maxRows]=\"10\"\n                          placeholder=\"Type your personal message here\"\n                          [(ngModel)]=\"messageBody\">\n                </textarea>\n            </div>\n\n        </div>\n    </form>\n\n</mat-dialog-content>\n\n<mat-dialog-actions>\n    <button mat-flat-button\n            color=\"primary\"\n            [disabled]=\"isSubmitDisabled\"\n            (click)=\"onSubmit()\">\n        Send\n    </button>\n</mat-dialog-actions>\n",
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
    ComposeEmailDialogComponent.prototype.requestAutocompleteItems;
    /** @type {?} */
    ComposeEmailDialogComponent.prototype.dialogRef;
    /** @type {?} */
    ComposeEmailDialogComponent.prototype.data;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcG9zZS1lbWFpbC1kaWFsb2cuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHBvbHB3YXJlL21kLWNvbXBvc2UtZW1haWwtZGlhbG9nLyIsInNvdXJjZXMiOlsibGliL2NvbXBvc2UtZW1haWwtZGlhbG9nL2NvbXBvc2UtZW1haWwtZGlhbG9nLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUF5QixNQUFNLGVBQWUsQ0FBQztBQUN6RSxPQUFPLEVBQWEsWUFBWSxFQUFFLGVBQWUsRUFBcUIsTUFBTSxtQkFBbUIsQ0FBQztBQU1oRyxPQUFPLEVBQUUsMEJBQTBCLEVBQUUsZUFBZSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDdEYsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHlCQUF5QixDQUFDOzs7O0FBR3hELCtDQU1DOzs7SUFMRyw4Q0FBb0I7O0lBQ3BCLG1EQUEwQjs7SUFDMUIsOENBQW1COztJQUNuQiwrQ0FBb0I7O0lBQ3BCLDRDQUFrQjs7Ozs7QUFHdEIsOENBTUM7OztJQUxHLHlDQUFjOztJQUNkLDZDQUFrQjs7SUFDbEIsOENBQW1COztJQUNuQiw2Q0FBMkQ7O0lBQzNELDBEQUFpRjs7Ozs7QUFHckYsd0NBR0M7OztJQUZHLG1DQUFXOztJQUNYLHFDQUFnQjs7QUFHcEI7SUFLaUQsdURBQTBCO0lBU3ZFLHFDQUFtQixTQUFvRCxFQUNuQyxJQUE4QjtRQURsRSxZQUdJLGtCQUFNLFNBQVMsQ0FBQyxTQVluQjtRQWZrQixlQUFTLEdBQVQsU0FBUyxDQUEyQztRQUNuQyxVQUFJLEdBQUosSUFBSSxDQUEwQjtRQUk5RCxJQUFJLENBQUMsS0FBSyxJQUFJLENBQUMsS0FBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDeEMsS0FBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsU0FBUyxJQUFJLEVBQUUsQ0FBQztRQUV4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QyxtREFBcUI7O0lBQ3JCLHNEQUF3Qjs7SUFDeEIsZ0RBQXlCOztJQUN6Qix1REFBMEI7O0lBRTFCLCtEQUFrRjs7SUFFdEUsZ0RBQTJEOztJQUNuRSwyQ0FBOEQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEluamVjdCwgVmlld0NoaWxkLCBFbGVtZW50UmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNYXREaWFsb2csIE1hdERpYWxvZ1JlZiwgTUFUX0RJQUxPR19EQVRBLCBNYXRDaGVja2JveENoYW5nZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcblxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgKiBhcyBzaG93ZG93biBmcm9tICdzaG93ZG93bic7XG5cbmltcG9ydCB7IEVtYWlsRm9ybUFic3RyYWN0Q29tcG9uZW50LCBwYXJzZU9ubHlFbWFpbHMgfSBmcm9tICdAcG9scHdhcmUvbWQtY29tcG9uZW50cyc7XG5pbXBvcnQgeyBBbGVydFR5cGVFbnVtIH0gZnJvbSAnQHBvbHB3YXJlL21kLWNvbXBvbmVudHMnO1xuXG5cbmV4cG9ydCBpbnRlcmZhY2UgSUNvbXBvc2VFbWFpbERpYWxvZ091dHB1dCB7XG4gICAgY29uZmlybWVkPzogYm9vbGVhbjtcbiAgICBlbWFpbFJlY2VpdmVycz86IHN0cmluZ1tdO1xuICAgIGVtYWlsQm9keT86IHN0cmluZztcbiAgICBlbWFpbFRpdGxlPzogc3RyaW5nO1xuICAgIHN1Y2NlZWQ/OiBib29sZWFuO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIElDb21wb3NlRW1haWxEaWFsb2dJbnB1dCB7XG4gICAgdGl0bGU6IHN0cmluZztcbiAgICBlbWFpbEJvZHk6IHN0cmluZztcbiAgICBlbWFpbFRpdGxlOiBzdHJpbmc7XG4gICAgcHJvY2Vzc29yPzogKGE6IElDb21wb3NlRW1haWxEaWFsb2dPdXRwdXQpID0+IFByb21pc2U8YW55PjtcbiAgICBhdXRvY29tcGxldGVPYnNlcnZhYmxlPzogKHRleHQ6IHN0cmluZykgPT4gT2JzZXJ2YWJsZTxBcnJheTxJQXV0b0NvbXBsZXRlTW9kZWw+Pjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJQXV0b0NvbXBsZXRlTW9kZWwge1xuICAgIHZhbHVlOiBhbnk7XG4gICAgZGlzcGxheTogc3RyaW5nO1xufVxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3BvbHAtbWQtY29tcG9zZS1lbWFpbC1kaWFsb2cnLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9jb21wb3NlLWVtYWlsLWRpYWxvZy5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vY29tcG9zZS1lbWFpbC1kaWFsb2cuY29tcG9uZW50LmNzcyddXG59KVxuZXhwb3J0IGNsYXNzIENvbXBvc2VFbWFpbERpYWxvZ0NvbXBvbmVudCBleHRlbmRzIEVtYWlsRm9ybUFic3RyYWN0Q29tcG9uZW50IHtcblxuICAgIGFsZXJ0TWVzc2FnZTogc3RyaW5nO1xuICAgIGFsZXJ0U3ViTWVzc2FnZTogc3RyaW5nO1xuICAgIGFsZXJ0VHlwZTogQWxlcnRUeXBlRW51bTtcbiAgICBhbGVydERpc21pc3NpYmxlOiBib29sZWFuO1xuXG4gICAgcmVxdWVzdEF1dG9jb21wbGV0ZUl0ZW1zOiAodGV4dDogc3RyaW5nKSA9PiBPYnNlcnZhYmxlPEFycmF5PElBdXRvQ29tcGxldGVNb2RlbD4+O1xuXG4gICAgY29uc3RydWN0b3IocHVibGljIGRpYWxvZ1JlZjogTWF0RGlhbG9nUmVmPENvbXBvc2VFbWFpbERpYWxvZ0NvbXBvbmVudD4sXG4gICAgICAgIEBJbmplY3QoTUFUX0RJQUxPR19EQVRBKSBwdWJsaWMgZGF0YTogSUNvbXBvc2VFbWFpbERpYWxvZ0lucHV0KSB7XG5cbiAgICAgICAgc3VwZXIoZGlhbG9nUmVmKTtcblxuICAgICAgICBkYXRhLnRpdGxlICYmICh0aGlzLnRpdGxlID0gZGF0YS50aXRsZSk7XG4gICAgICAgIHRoaXMubWVzc2FnZUJvZHkgPSBkYXRhLmVtYWlsQm9keSB8fCAnJztcblxuICAgICAgICAvLyBhbGVydFxuICAgICAgICB0aGlzLmFsZXJ0TWVzc2FnZSA9ICcnO1xuICAgICAgICB0aGlzLmFsZXJ0U3ViTWVzc2FnZSA9ICcnO1xuICAgICAgICB0aGlzLmFsZXJ0VHlwZSA9IEFsZXJ0VHlwZUVudW0ubm9uZTtcbiAgICAgICAgdGhpcy5hbGVydERpc21pc3NpYmxlID0gZmFsc2U7XG5cbiAgICAgICAgdGhpcy5yZXF1ZXN0QXV0b2NvbXBsZXRlSXRlbXMgPSBkYXRhLmF1dG9jb21wbGV0ZU9ic2VydmFibGUgfHwgbnVsbDtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IGlzU3VibWl0RGlzYWJsZWQoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmVtYWlscy5sZW5ndGggPT09IDAgfHwgdGhpcy5hbGVydFR5cGUgPT09IEFsZXJ0VHlwZUVudW0ucnVubmluZztcbiAgICB9XG5cbiAgICAvLyBPdmVycmlkZVxuICAgIHB1YmxpYyBvblN1Ym1pdCgpIHtcbiAgICAgICAgLy8gYm9keVxuICAgICAgICAvLyBsZXQgbWVzc2FnZUJvZHkgPSB0aGlzLm1lc3NhZ2VCb2R5O1xuXG4gICAgICAgIC8vIENvbnZlcnQgaXQgaW50byBodG1sXG4gICAgICAgIC8vIGNvbnN0IGNvbnZlcnRlciA9IG5ldyBzaG93ZG93bi5Db252ZXJ0ZXIoKTtcbiAgICAgICAgLy8gbWVzc2FnZUJvZHkgPSBjb252ZXJ0ZXIubWFrZUh0bWwobWVzc2FnZUJvZHkpO1xuXG4gICAgICAgIC8vIFByZXBhcmUgZW1haWwgbGlzdFxuICAgICAgICBjb25zdCBlbWFpbHMgPSBbXTtcblxuICAgICAgICB0aGlzLmVtYWlscy5mb3JFYWNoKGVsZW0gPT4ge1xuICAgICAgICAgICAgbGV0IHggPSBlbGVtIHx8IChlbGVtLnZhbHVlKTtcbiAgICAgICAgICAgIGNvbnN0IHkgPSBwYXJzZU9ubHlFbWFpbHMoeCk7XG4gICAgICAgICAgICB5LmZvckVhY2gobSA9PiB7XG4gICAgICAgICAgICAgICAgZW1haWxzLnB1c2gobSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29uc3Qgb3V0cHV0czogSUNvbXBvc2VFbWFpbERpYWxvZ091dHB1dCA9IHtcbiAgICAgICAgICAgIGNvbmZpcm1lZDogdHJ1ZSxcbiAgICAgICAgICAgIGVtYWlsUmVjZWl2ZXJzOiBlbWFpbHMsXG4gICAgICAgICAgICBlbWFpbEJvZHk6IHRoaXMubWVzc2FnZUJvZHksXG4gICAgICAgICAgICBlbWFpbFRpdGxlOiB0aGlzLmRhdGEuZW1haWxUaXRsZSB8fCAnJyAvLyB0b2RvOlxuICAgICAgICB9O1xuXG4gICAgICAgIGlmICh0aGlzLmRhdGEucHJvY2Vzc29yKSB7XG4gICAgICAgICAgICB0aGlzLmFsZXJ0VHlwZSA9IEFsZXJ0VHlwZUVudW0ucnVubmluZztcbiAgICAgICAgICAgIHRoaXMuYWxlcnRNZXNzYWdlID0gJ1RoZSBlbWFpbCBpcyBiZWluZyBzZW50IG91dC4nO1xuICAgICAgICAgICAgdGhpcy5hbGVydFN1Yk1lc3NhZ2UgPSAnJztcbiAgICAgICAgICAgIHRoaXMuYWxlcnREaXNtaXNzaWJsZSA9IGZhbHNlO1xuXG4gICAgICAgICAgICB0aGlzLmRhdGEucHJvY2Vzc29yKG91dHB1dHMpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuYWxlcnRUeXBlID0gQWxlcnRUeXBlRW51bS5ub25lO1xuICAgICAgICAgICAgICAgIHRoaXMuZGlhbG9nUmVmLmNsb3NlKHtcbiAgICAgICAgICAgICAgICAgICAgc3VjY2VlZDogdHJ1ZVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSwgKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5hbGVydFR5cGUgPSBBbGVydFR5cGVFbnVtLmVycm9yO1xuICAgICAgICAgICAgICAgIHRoaXMuYWxlcnRNZXNzYWdlID0gJ1NvbWV0aGluZyB3ZW50IHdyb25nLic7XG4gICAgICAgICAgICAgICAgdGhpcy5hbGVydERpc21pc3NpYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLmFsZXJ0U3ViTWVzc2FnZSA9IChlcnJvciAmJiBlcnJvci5lcnJvckluZm8pID8gZXJyb3IuZXJyb3JJbmZvIDogJyc7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZGlhbG9nUmVmLmNsb3NlKG91dHB1dHMpO1xuICAgICAgICB9XG4gICAgfVxufVxuIl19