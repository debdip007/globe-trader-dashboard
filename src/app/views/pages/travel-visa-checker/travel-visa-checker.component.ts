import { Component } from '@angular/core';
import { NgStyle } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DocsExampleComponent } from '@docs-components/public-api';
import { IconDirective } from '@coreui/icons-angular';
import { ContainerComponent, RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent , CardBodyComponent, FormFloatingDirective, FormControlDirective, FormLabelDirective, FormDirective, InputGroupComponent, InputGroupTextDirective, ButtonDirective } from '@coreui/angular';

@Component({
  selector: 'app-travel-visa-checker',
  templateUrl: './travel-visa-checker.component.html',
  styleUrl: './travel-visa-checker.component.scss',
  imports: [FormsModule, ReactiveFormsModule, ContainerComponent, RowComponent, ColComponent, TextColorDirective, CardComponent, CardBodyComponent, FormFloatingDirective, FormLabelDirective, FormDirective, InputGroupComponent, InputGroupTextDirective, IconDirective, FormControlDirective, ButtonDirective]
})
export class TravelVisaCheckerComponent {

}
