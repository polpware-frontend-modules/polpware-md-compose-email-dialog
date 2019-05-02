(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('@angular/forms'), require('@angular/material'), require('@polpware/md-components'), require('ngx-chips'), require('ngx-autosize')) :
    typeof define === 'function' && define.amd ? define('@polpware/md-compose-email-dialog', ['exports', '@angular/core', '@angular/common', '@angular/forms', '@angular/material', '@polpware/md-components', 'ngx-chips', 'ngx-autosize'], factory) :
    (factory((global.polpware = global.polpware || {}, global.polpware['md-compose-email-dialog'] = {}),global.ng.core,global.ng.common,global.ng.forms,global.ng.material,global.mdComponents,global.ngxChips,global.ngxAutosize));
}(this, (function (exports,core,common,forms,material,mdComponents,ngxChips,ngxAutosize) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b)
                if (b.hasOwnProperty(p))
                    d[p] = b[p]; };
        return extendStatics(d, b);
    };
    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var ComposeEmailDialogComponent = /** @class */ (function (_super) {
        __extends(ComposeEmailDialogComponent, _super);
        function ComposeEmailDialogComponent(dialogRef, data) {
            var _this = _super.call(this, dialogRef) || this;
            _this.dialogRef = dialogRef;
            _this.data = data;
            data.title && (_this.title = data.title);
            _this.messageBody = data.emailBody || '';
            // alert
            _this.alertMessage = '';
            _this.alertSubMessage = '';
            _this.alertType = mdComponents.AlertTypeEnum.none;
            _this.alertDismissible = false;
            _this.requestAutocompleteItems = data.autocompleteObservable || null;
            return _this;
        }
        Object.defineProperty(ComposeEmailDialogComponent.prototype, "isSubmitDisabled", {
            get: /**
             * @return {?}
             */ function () {
                return this.emails.length === 0 || this.alertType === mdComponents.AlertTypeEnum.running;
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
                this.emails.forEach(( /**
                 * @param {?} elem
                 * @return {?}
                 */function (elem) {
                    /** @type {?} */
                    var x = elem || (elem.value);
                    /** @type {?} */
                    var y = mdComponents.parseOnlyEmails(x);
                    y.forEach(( /**
                     * @param {?} m
                     * @return {?}
                     */function (m) {
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
                    this.alertType = mdComponents.AlertTypeEnum.running;
                    this.alertMessage = 'The email is being sent out.';
                    this.alertSubMessage = '';
                    this.alertDismissible = false;
                    this.data.processor(outputs).then(( /**
                     * @return {?}
                     */function () {
                        _this.alertType = mdComponents.AlertTypeEnum.none;
                        _this.dialogRef.close({
                            succeed: true
                        });
                    }), ( /**
                     * @param {?} error
                     * @return {?}
                     */function (error) {
                        _this.alertType = mdComponents.AlertTypeEnum.error;
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
            { type: core.Component, args: [{
                        selector: 'polp-md-compose-email-dialog',
                        template: "<h2 mat-dialog-title>\n    {{title}}\n    <button class=\"float-right\"\n            mat-icon-button\n            tabIndex=\"-1\"\n            [mat-dialog-close]=\"true\">\n        <mat-icon>close</mat-icon>\n    </button>\n</h2>\n\n<mat-dialog-content>\n\n    <polp-md-alert-box [message]=\"alertMessage\"\n                       [subMessage]=\"alertSubMessage\"\n                       [kind]=\"alertType\"\n                       [dismissible]=\"alertDismissible\">\n    </polp-md-alert-box>\n\n    <form name=\"emailForm\" autocomplete=\"off\">\n        <div class=\"flex-box flex-column margin-bottom-15\">\n            <tag-input [(ngModel)]=\"emails\" #emailInputBox\n                       name=\"emailInputs\"\n                       [addOnPaste]=\"true\"\n                       [modelAsStrings]=\"true\"\n                       [trimTags]=\"true\"\n                       [editable]=\"true\"\n                       (focusout)=\"onOutOfTagInput($event)\"\n                       [errorMessages]=\"errorMessages\"\n                       [validators]=\"validators\"\n                       [secondaryPlaceholder]=\"'Emails'\"\n                       [separatorKeyCodes]=\"[32,44,58,59]\"\n                       [placeholder]=\"'More Emails'\">\n                <tag-input-dropdown *ngIf=\"requestAutocompleteItems\"\n                    [autocompleteObservable]=\"requestAutocompleteItems\"\n                    [minimumTextLength]=\"0\">\n                    <ng-template let-item=\"item\" let-index=\"index\">\n                        {{ item.display }}\n                    </ng-template>\n                </tag-input-dropdown>\n            </tag-input>\n\n            <div class=\"full-width margin-top-10\">\n                <textarea name=\"messageBodyInput\"\n                          class=\"full-width\"\n                          #emailBody\n                          autosize [minRows]=\"5\" [maxRows]=\"10\"\n                          placeholder=\"Type your personal message here\"\n                          [(ngModel)]=\"messageBody\">\n                </textarea>\n            </div>\n\n        </div>\n    </form>\n\n</mat-dialog-content>\n\n<mat-dialog-actions>\n    <button mat-flat-button\n            color=\"primary\"\n            [disabled]=\"isSubmitDisabled\"\n            (click)=\"onSubmit()\">\n        Send\n    </button>\n</mat-dialog-actions>\n",
                        styles: [""]
                    }] }
        ];
        /** @nocollapse */
        ComposeEmailDialogComponent.ctorParameters = function () {
            return [
                { type: material.MatDialogRef },
                { type: undefined, decorators: [{ type: core.Inject, args: [material.MAT_DIALOG_DATA,] }] }
            ];
        };
        return ComposeEmailDialogComponent;
    }(mdComponents.EmailFormAbstractComponent));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var PolpMdComposeEmailDialogModule = /** @class */ (function () {
        function PolpMdComposeEmailDialogModule() {
        }
        PolpMdComposeEmailDialogModule.decorators = [
            { type: core.NgModule, args: [{
                        declarations: [
                            ComposeEmailDialogComponent
                        ],
                        imports: [
                            common.CommonModule,
                            forms.ReactiveFormsModule,
                            forms.FormsModule,
                            material.MatDialogModule,
                            material.MatButtonModule,
                            material.MatIconModule,
                            ngxChips.TagInputModule,
                            ngxAutosize.AutosizeModule,
                            mdComponents.PolpMdComponentsModule
                        ],
                        exports: [
                            ComposeEmailDialogComponent
                        ],
                        entryComponents: [
                            ComposeEmailDialogComponent
                        ]
                    },] }
        ];
        return PolpMdComposeEmailDialogModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    exports.ComposeEmailDialogComponent = ComposeEmailDialogComponent;
    exports.PolpMdComposeEmailDialogModule = PolpMdComposeEmailDialogModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=polpware-md-compose-email-dialog.umd.js.map