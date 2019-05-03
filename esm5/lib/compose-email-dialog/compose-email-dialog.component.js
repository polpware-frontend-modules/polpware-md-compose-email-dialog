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
        _this.onTextChange = data.onTextChange;
        _this.autocompleteItemsAsync = data.autocompleteItemsAsync;
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
     * @param {?} evt
     * @return {?}
     */
    ComposeEmailDialogComponent.prototype.onOutOfTagInput = 
    // Override
    /**
     * @param {?} evt
     * @return {?}
     */
    function (evt) {
        if (this.emailInputBox.dropdown && this.emailInputBox.dropdown.isVisible) {
            return;
        }
        _super.prototype.onOutOfTagInput.call(this, evt);
    };
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
                    template: "<h2 mat-dialog-title>\n    {{title}}\n    <button class=\"float-right\"\n            mat-icon-button\n            tabIndex=\"-1\"\n            [mat-dialog-close]=\"true\">\n        <mat-icon>close</mat-icon>\n    </button>\n</h2>\n\n<mat-dialog-content>\n\n    <polp-md-alert-box [message]=\"alertMessage\"\n                       [subMessage]=\"alertSubMessage\"\n                       [kind]=\"alertType\"\n                       [dismissible]=\"alertDismissible\">\n    </polp-md-alert-box>\n\n    <form name=\"emailForm\" autocomplete=\"off\">\n        <div class=\"flex-box flex-column margin-bottom-15\">\n            <tag-input [(ngModel)]=\"emails\" #emailInputBox\n                       name=\"emailInputs\"\n                       (focusout)=\"onOutOfTagInput($event)\"\n                       (onTextChange)=\"onTextChange($event)\"\n                       [addOnPaste]=\"true\"\n                       [modelAsStrings]=\"true\"\n                       [trimTags]=\"true\"\n                       [editable]=\"true\"\n                       [errorMessages]=\"errorMessages\"\n                       [validators]=\"validators\"\n                       [secondaryPlaceholder]=\"'Emails'\"\n                       [separatorKeyCodes]=\"[32,44,58,59]\"\n                       [displayBy]=\"'display'\"\n                       [identifyBy]=\"'value'\"                       \n                       [placeholder]=\"'Emails'\">\n                <tag-input-dropdown [autocompleteItems]=\"autocompleteItemsAsync | async\">\n                    <ng-template let-item=\"item\" let-index=\"index\">\n                        {{ item.display }}\n                    </ng-template>\n                </tag-input-dropdown>\n            </tag-input>\n\n            <div class=\"full-width margin-top-10\">\n                <textarea name=\"messageBodyInput\"\n                          class=\"full-width\"\n                          #emailBody\n                          autosize [minRows]=\"5\" [maxRows]=\"10\"\n                          placeholder=\"Type your personal message here\"\n                          [(ngModel)]=\"messageBody\">\n                </textarea>\n            </div>\n\n        </div>\n    </form>\n\n</mat-dialog-content>\n\n<mat-dialog-actions>\n    <button mat-flat-button\n            color=\"primary\"\n            [disabled]=\"isSubmitDisabled\"\n            (click)=\"onSubmit()\">\n        Send\n    </button>\n</mat-dialog-actions>\n",
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
    ComposeEmailDialogComponent.prototype.onTextChange;
    /** @type {?} */
    ComposeEmailDialogComponent.prototype.autocompleteItemsAsync;
    /** @type {?} */
    ComposeEmailDialogComponent.prototype.dialogRef;
    /** @type {?} */
    ComposeEmailDialogComponent.prototype.data;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcG9zZS1lbWFpbC1kaWFsb2cuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHBvbHB3YXJlL21kLWNvbXBvc2UtZW1haWwtZGlhbG9nLyIsInNvdXJjZXMiOlsibGliL2NvbXBvc2UtZW1haWwtZGlhbG9nL2NvbXBvc2UtZW1haWwtZGlhbG9nLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUF5QixNQUFNLGVBQWUsQ0FBQztBQUN6RSxPQUFPLEVBQWEsWUFBWSxFQUFFLGVBQWUsRUFBcUIsTUFBTSxtQkFBbUIsQ0FBQztBQU1oRyxPQUFPLEVBQ0gsMEJBQTBCLEVBQzFCLGVBQWUsRUFDbEIsTUFBTSx5QkFBeUIsQ0FBQztBQUVqQyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0seUJBQXlCLENBQUM7Ozs7QUFFeEQsd0NBR0M7OztJQUZHLG1DQUFXOztJQUNYLHFDQUFnQjs7Ozs7QUFHcEIsK0NBTUM7OztJQUxHLDhDQUFvQjs7SUFDcEIsbURBQTBCOztJQUMxQiw4Q0FBbUI7O0lBQ25CLCtDQUFvQjs7SUFDcEIsNENBQWtCOzs7OztBQUd0Qiw4Q0FPQzs7O0lBTkcseUNBQWM7O0lBQ2QsNkNBQWtCOztJQUNsQiw4Q0FBbUI7O0lBQ25CLDZDQUEyRDs7SUFDM0QsZ0RBQTRCOztJQUM1QiwwREFBK0Q7O0FBR25FO0lBS2lELHVEQUEwQjtJQVV2RSxxQ0FBbUIsU0FBb0QsRUFDbkMsSUFBOEI7UUFEbEUsWUFHSSxrQkFBTSxTQUFTLENBQUMsU0FhbkI7UUFoQmtCLGVBQVMsR0FBVCxTQUFTLENBQTJDO1FBQ25DLFVBQUksR0FBSixJQUFJLENBQTBCO1FBSTlELElBQUksQ0FBQyxLQUFLLElBQUksQ0FBQyxLQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN4QyxLQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxTQUFTLElB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QztTQUNOO2FBQU07WUFDSCxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUNqQztJQUVMLENBQUM7O2dCQWhHSixTQUFTLFNBQUM7b0JBQ1AsUUFBUSxFQUFFLDhCQUE4QjtvQkFDeEMsODZFQUFvRDs7aUJBRXZEOzs7O2dCQXZDbUIsWUFBWTtnREFtRHZCLE1BQU0sU0FBQyxlQUFlOztJQWlGL0Isa0NBQUM7Q0FBQSxBQWpHRCxDQUtpRCwwQkFBMEIsR0E0RjFFO1NBNUZZLDJCQUEyQjs7O0lBRXBDLG1EQUFxQjs7SUFDckIsc0RBQXdCOztJQUN4QixnREFBeUI7O0lBQ3pCLHVEQUEwQjs7SUFFMUIsbURBQTJCOztJQUMzQiw2REFBOEQ7O0lBRWxELGdEQUEyRDs7SUFDbkUsMkNBQThEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbmplY3QsIFZpZXdDaGlsZCwgRWxlbWVudFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTWF0RGlhbG9nLCBNYXREaWFsb2dSZWYsIE1BVF9ESUFMT0dfREFUQSwgTWF0Q2hlY2tib3hDaGFuZ2UgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5cbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcblxuaW1wb3J0ICogYXMgc2hvd2Rvd24gZnJvbSAnc2hvd2Rvd24nO1xuXG5pbXBvcnQge1xuICAgIEVtYWlsRm9ybUFic3RyYWN0Q29tcG9uZW50LFxuICAgIHBhcnNlT25seUVtYWlsc1xufSBmcm9tICdAcG9scHdhcmUvbWQtY29tcG9uZW50cyc7XG5cbmltcG9ydCB7IEFsZXJ0VHlwZUVudW0gfSBmcm9tICdAcG9scHdhcmUvbWQtY29tcG9uZW50cyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUF1dG9Db21wbGV0ZU1vZGVsIHtcbiAgICB2YWx1ZTogYW55O1xuICAgIGRpc3BsYXk6IHN0cmluZztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJQ29tcG9zZUVtYWlsRGlhbG9nT3V0cHV0IHtcbiAgICBjb25maXJtZWQ/OiBib29sZWFuO1xuICAgIGVtYWlsUmVjZWl2ZXJzPzogc3RyaW5nW107XG4gICAgZW1haWxCb2R5Pzogc3RyaW5nO1xuICAgIGVtYWlsVGl0bGU/OiBzdHJpbmc7XG4gICAgc3VjY2VlZD86IGJvb2xlYW47XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUNvbXBvc2VFbWFpbERpYWxvZ0lucHV0IHtcbiAgICB0aXRsZTogc3RyaW5nO1xuICAgIGVtYWlsQm9keTogc3RyaW5nO1xuICAgIGVtYWlsVGl0bGU6IHN0cmluZztcbiAgICBwcm9jZXNzb3I/OiAoYTogSUNvbXBvc2VFbWFpbERpYWxvZ091dHB1dCkgPT4gUHJvbWlzZTxhbnk+O1xuICAgIG9uVGV4dENoYW5nZT86IChhbnkpID0+IGFueTtcbiAgICBhdXRvY29tcGxldGVJdGVtc0FzeW5jPzogT2JzZXJ2YWJsZTxBcnJheTxJQXV0b0NvbXBsZXRlTW9kZWw+Pjtcbn1cblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdwb2xwLW1kLWNvbXBvc2UtZW1haWwtZGlhbG9nJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vY29tcG9zZS1lbWFpbC1kaWFsb2cuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL2NvbXBvc2UtZW1haWwtZGlhbG9nLmNvbXBvbmVudC5jc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBDb21wb3NlRW1haWxEaWFsb2dDb21wb25lbnQgZXh0ZW5kcyBFbWFpbEZvcm1BYnN0cmFjdENvbXBvbmVudCB7XG5cbiAgICBhbGVydE1lc3NhZ2U6IHN0cmluZztcbiAgICBhbGVydFN1Yk1lc3NhZ2U6IHN0cmluZztcbiAgICBhbGVydFR5cGU6IEFsZXJ0VHlwZUVudW07XG4gICAgYWxlcnREaXNtaXNzaWJsZTogYm9vbGVhbjtcblxuICAgIG9uVGV4dENoYW5nZTogKGFueSkgPT4gYW55O1xuICAgIGF1dG9jb21wbGV0ZUl0ZW1zQXN5bmM6IE9ic2VydmFibGU8QXJyYXk8SUF1dG9Db21wbGV0ZU1vZGVsPj47XG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZGlhbG9nUmVmOiBNYXREaWFsb2dSZWY8Q29tcG9zZUVtYWlsRGlhbG9nQ29tcG9uZW50PixcbiAgICAgICAgQEluamVjdChNQVRfRElBTE9HX0RBVEEpIHB1YmxpYyBkYXRhOiBJQ29tcG9zZUVtYWlsRGlhbG9nSW5wdXQpIHtcblxuICAgICAgICBzdXBlcihkaWFsb2dSZWYpO1xuXG4gICAgICAgIGRhdGEudGl0bGUgJiYgKHRoaXMudGl0bGUgPSBkYXRhLnRpdGxlKTtcbiAgICAgICAgdGhpcy5tZXNzYWdlQm9keSA9IGRhdGEuZW1haWxCb2R5IHx8ICcnO1xuXG4gICAgICAgIC8vIGFsZXJ0XG4gICAgICAgIHRoaXMuYWxlcnRNZXNzYWdlID0gJyc7XG4gICAgICAgIHRoaXMuYWxlcnRTdWJNZXNzYWdlID0gJyc7XG4gICAgICAgIHRoaXMuYWxlcnRUeXBlID0gQWxlcnRUeXBlRW51bS5ub25lO1xuICAgICAgICB0aGlzLmFsZXJ0RGlzbWlzc2libGUgPSBmYWxzZTtcblxuICAgICAgICB0aGlzLm9uVGV4dENoYW5nZSA9IGRhdGEub25UZXh0Q2hhbmdlO1xuICAgICAgICB0aGlzLmF1dG9jb21wbGV0ZUl0ZW1zQXN5bmMgPSBkYXRhLmF1dG9jb21wbGV0ZUl0ZW1zQXN5bmM7XG4gICAgfVxuXG4gICAgcHVibGljIGdldCBpc1N1Ym1pdERpc2FibGVkKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5lbWFpbHMubGVuZ3RoID09PSAwIHx8IHRoaXMuYWxlcnRUeXBlID09PSBBbGVydFR5cGVFbnVtLnJ1bm5pbmc7XG4gICAgfVxuXG4gICAgLy8gT3ZlcnJpZGVcbiAgICBwdWJsaWMgb25PdXRPZlRhZ0lucHV0KGV2dCkge1xuICAgICAgICBpZiAodGhpcy5lbWFpbElucHV0Qm94LmRyb3Bkb3duICYmIHRoaXMuZW1haWxJbnB1dEJveC5kcm9wZG93bi5pc1Zpc2libGUpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHN1cGVyLm9uT3V0T2ZUYWdJbnB1dChldnQpO1xuICAgIH1cblxuICAgIC8vIE92ZXJyaWRlXG4gICAgcHVibGljIG9uU3VibWl0KCkge1xuICAgICAgICAvLyBib2R5XG4gICAgICAgIC8vIGxldCBtZXNzYWdlQm9keSA9IHRoaXMubWVzc2FnZUJvZHk7XG5cbiAgICAgICAgLy8gQ29udmVydCBpdCBpbnRvIGh0bWxcbiAgICAgICAgLy8gY29uc3QgY29udmVydGVyID0gbmV3IHNob3dkb3duLkNvbnZlcnRlcigpO1xuICAgICAgICAvLyBtZXNzYWdlQm9keSA9IGNvbnZlcnRlci5tYWtlSHRtbChtZXNzYWdlQm9keSk7XG5cbiAgICAgICAgLy8gUHJlcGFyZSBlbWFpbCBsaXN0XG5cbiAgICAgICAgY29uc3QgZW1haWxzID0gW107XG5cbiAgICAgICAgdGhpcy5lbWFpbHMuZm9yRWFjaChlbGVtID0+IHtcblxuICAgICAgICAgICAgbGV0IHggPSBlbGVtIHx8IChlbGVtLnZhbHVlKTtcbiAgICAgICAgICAgIGNvbnN0IHkgPSBwYXJzZU9ubHlFbWFpbHMoeCk7XG4gICAgICAgICAgICB5LmZvckVhY2gobSA9PiB7XG4gICAgICAgICAgICAgICAgZW1haWxzLnB1c2gobSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29uc3Qgb3V0cHV0czogSUNvbXBvc2VFbWFpbERpYWxvZ091dHB1dCA9IHtcbiAgICAgICAgICAgIGNvbmZpcm1lZDogdHJ1ZSxcbiAgICAgICAgICAgIGVtYWlsUmVjZWl2ZXJzOiBlbWFpbHMsXG4gICAgICAgICAgICBlbWFpbEJvZHk6IHRoaXMubWVzc2FnZUJvZHksXG4gICAgICAgICAgICBlbWFpbFRpdGxlOiB0aGlzLmRhdGEuZW1haWxUaXRsZSB8fCAnJyAvLyB0b2RvOlxuICAgICAgICB9O1xuXG4gICAgICAgIGlmICh0aGlzLmRhdGEucHJvY2Vzc29yKSB7XG4gICAgICAgICAgICB0aGlzLmFsZXJ0VHlwZSA9IEFsZXJ0VHlwZUVudW0ucnVubmluZztcbiAgICAgICAgICAgIHRoaXMuYWxlcnRNZXNzYWdlID0gJ1RoZSBlbWFpbCBpcyBiZWluZyBzZW50IG91dC4nO1xuICAgICAgICAgICAgdGhpcy5hbGVydFN1Yk1lc3NhZ2UgPSAnJztcbiAgICAgICAgICAgIHRoaXMuYWxlcnREaXNtaXNzaWJsZSA9IGZhbHNlO1xuXG4gICAgICAgICAgICB0aGlzLmRhdGEucHJvY2Vzc29yKG91dHB1dHMpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuYWxlcnRUeXBlID0gQWxlcnRUeXBlRW51bS5ub25lO1xuICAgICAgICAgICAgICAgIHRoaXMuZGlhbG9nUmVmLmNsb3NlKHtcbiAgICAgICAgICAgICAgICAgICAgc3VjY2VlZDogdHJ1ZVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSwgKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5hbGVydFR5cGUgPSBBbGVydFR5cGVFbnVtLmVycm9yO1xuICAgICAgICAgICAgICAgIHRoaXMuYWxlcnRNZXNzYWdlID0gJ1NvbWV0aGluZyB3ZW50IHdyb25nLic7XG4gICAgICAgICAgICAgICAgdGhpcy5hbGVydERpc21pc3NpYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLmFsZXJ0U3ViTWVzc2FnZSA9IChlcnJvciAmJiBlcnJvci5lcnJvckluZm8pID8gZXJyb3IuZXJyb3JJbmZvIDogJyc7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZGlhbG9nUmVmLmNsb3NlKG91dHB1dHMpO1xuICAgICAgICB9XG5cbiAgICB9XG59XG4iXX0=