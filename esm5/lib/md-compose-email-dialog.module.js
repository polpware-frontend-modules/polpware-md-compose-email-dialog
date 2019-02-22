/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatDialogModule, MatButtonModule, MatIconModule } from '@angular/material';
import { PolpMdComponentsModule } from '@polpware/md-components';
import { TagInputModule } from 'ngx-chips';
import { AutosizeModule } from 'ngx-autosize';
import { ComposeEmailDialogComponent } from './compose-email-dialog/compose-email-dialog.component';
var PolpMdComposeEmailDialogModule = /** @class */ (function () {
    function PolpMdComposeEmailDialogModule() {
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
    return PolpMdComposeEmailDialogModule;
}());
export { PolpMdComposeEmailDialogModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWQtY29tcG9zZS1lbWFpbC1kaWFsb2cubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHBvbHB3YXJlL21kLWNvbXBvc2UtZW1haWwtZGlhbG9nLyIsInNvdXJjZXMiOlsibGliL21kLWNvbXBvc2UtZW1haWwtZGlhbG9nLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUV6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFL0MsT0FBTyxFQUNILG1CQUFtQixFQUNuQixXQUFXLEVBQ2QsTUFBTSxnQkFBZ0IsQ0FBQztBQUV4QixPQUFPLEVBQ0gsZUFBZSxFQUNmLGVBQWUsRUFDZixhQUFhLEVBQ2hCLE1BQU0sbUJBQW1CLENBQUM7QUFHM0IsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFFakUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUUzQyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBRTlDLE9BQU8sRUFDSCwyQkFBMkIsRUFDOUIsTUFBTSx1REFBdUQsQ0FBQztBQUcvRDtJQUFBO0lBMEI4QyxDQUFDOztnQkExQjlDLFFBQVEsU0FBQztvQkFDTixZQUFZLEVBQUU7d0JBQ1YsMkJBQTJCO3FCQUM5QjtvQkFDRCxPQUFPLEVBQUU7d0JBQ0wsWUFBWTt3QkFFWixtQkFBbUI7d0JBQ25CLFdBQVc7d0JBRVgsZUFBZTt3QkFDZixlQUFlO3dCQUNmLGFBQWE7d0JBRWIsY0FBYzt3QkFDZCxjQUFjO3dCQUVkLHNCQUFzQjtxQkFDekI7b0JBQ0QsT0FBTyxFQUFFO3dCQUNMLDJCQUEyQjtxQkFDOUI7b0JBQ0QsZUFBZSxFQUFFO3dCQUNiLDJCQUEyQjtxQkFDOUI7aUJBQ0o7O0lBQzZDLHFDQUFDO0NBQUEsQUExQi9DLElBMEIrQztTQUFsQyw4QkFBOEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuXG5pbXBvcnQge1xuICAgIFJlYWN0aXZlRm9ybXNNb2R1bGUsXG4gICAgRm9ybXNNb2R1bGVcbn0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5pbXBvcnQge1xuICAgIE1hdERpYWxvZ01vZHVsZSxcbiAgICBNYXRCdXR0b25Nb2R1bGUsXG4gICAgTWF0SWNvbk1vZHVsZVxufSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5cblxuaW1wb3J0IHsgUG9scE1kQ29tcG9uZW50c01vZHVsZSB9IGZyb20gJ0Bwb2xwd2FyZS9tZC1jb21wb25lbnRzJztcblxuaW1wb3J0IHsgVGFnSW5wdXRNb2R1bGUgfSBmcm9tICduZ3gtY2hpcHMnO1xuXG5pbXBvcnQgeyBBdXRvc2l6ZU1vZHVsZSB9IGZyb20gJ25neC1hdXRvc2l6ZSc7XG5cbmltcG9ydCB7XG4gICAgQ29tcG9zZUVtYWlsRGlhbG9nQ29tcG9uZW50XG59IGZyb20gJy4vY29tcG9zZS1lbWFpbC1kaWFsb2cvY29tcG9zZS1lbWFpbC1kaWFsb2cuY29tcG9uZW50JztcblxuXG5ATmdNb2R1bGUoe1xuICAgIGRlY2xhcmF0aW9uczogW1xuICAgICAgICBDb21wb3NlRW1haWxEaWFsb2dDb21wb25lbnRcbiAgICBdLFxuICAgIGltcG9ydHM6IFtcbiAgICAgICAgQ29tbW9uTW9kdWxlLFxuXG4gICAgICAgIFJlYWN0aXZlRm9ybXNNb2R1bGUsXG4gICAgICAgIEZvcm1zTW9kdWxlLFxuXG4gICAgICAgIE1hdERpYWxvZ01vZHVsZSxcbiAgICAgICAgTWF0QnV0dG9uTW9kdWxlLFxuICAgICAgICBNYXRJY29uTW9kdWxlLFxuXG4gICAgICAgIFRhZ0lucHV0TW9kdWxlLFxuICAgICAgICBBdXRvc2l6ZU1vZHVsZSxcblxuICAgICAgICBQb2xwTWRDb21wb25lbnRzTW9kdWxlXG4gICAgXSxcbiAgICBleHBvcnRzOiBbXG4gICAgICAgIENvbXBvc2VFbWFpbERpYWxvZ0NvbXBvbmVudFxuICAgIF0sXG4gICAgZW50cnlDb21wb25lbnRzOiBbXG4gICAgICAgIENvbXBvc2VFbWFpbERpYWxvZ0NvbXBvbmVudFxuICAgIF1cbn0pXG5leHBvcnQgY2xhc3MgUG9scE1kQ29tcG9zZUVtYWlsRGlhbG9nTW9kdWxlIHsgfVxuIl19