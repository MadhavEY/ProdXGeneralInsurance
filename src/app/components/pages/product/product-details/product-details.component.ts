import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { RouterModule } from '@angular/router';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { EditLabelComponent } from '../../../../shared/edit-label/edit-label.component';
import { ShareproductdataService } from '../../../../service/shareproductdata.service';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { GetSetService } from '../../../../service/get-set.service';
import { MatDividerModule } from '@angular/material/divider';
import { FormDataService } from '../../../../service/form-data.service';
import { Subscription } from 'rxjs';

interface InputField {
  label: string;
  formControlName: string;
  type: 'select' | 'text' | 'radio' | 'checkbox';
  options?: Options[] | [];
  isVisible?: boolean;
  isMandatory: boolean;
  category: string;
  defaultVal? : any;
}

interface Options {
  name: string;
  value: string;
}

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatCheckboxModule,
    RouterModule,
    MatStepperModule,
    MatExpansionModule,
    MatIconModule,
    MatDialogModule,
    MatDividerModule,
  ],
  providers: [],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
  changeDetection: ChangeDetectionStrategy.Default,
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
  productDetailsForm: FormGroup;
  searchForm: FormGroup;
  isBlankTemplate = ''; // if the template is made from Blank template or not
  isPageBlank = true; //
  readonly panelOpenState = signal(true);
  private formService$ = new Subscription();
  @Input() productData!: any;
  @Input() mode!: string;

  fieldsList: InputField[] = [
    {
      label: 'Product Name',
      formControlName: 'productName',
      type: 'text',
      isVisible: false,
      isMandatory: true,
      category: 'Basic Information',
      defaultVal:  '',
    },
    {
      label: 'Product Description',
      formControlName: 'productDescription',
      type: 'text',
      isVisible: false,
      isMandatory: true,
      category: 'Basic Information',
      defaultVal: ''
    },
    {
      label: 'Product Tageline',
      formControlName: 'productTagline',
      type: 'text',
      isVisible: false,
      isMandatory: false,
      category: 'Basic Information',
    },
    {
      label: 'Product Code',
      formControlName: 'productCode',
      type: 'text',
      isVisible: false,
      isMandatory: true,
      category: 'Basic Information',
      defaultVal:  '',
    },
    {
      label: 'Product Status',
      formControlName: 'productStatus',
      type: 'text',
      isVisible: false,
      isMandatory: true,
      category: 'Basic Information',
      defaultVal:  '',
    },
    {
      label: 'Category',
      formControlName: 'category',
      type: 'text',
      isVisible: false,
      isMandatory: true,
      category: 'Basic Information',
      defaultVal:  '',
    },
    {
      label: 'Coverage',
      formControlName: 'coverage',
      type: 'text',
      isVisible: false,
      isMandatory: true,
      category: 'Basic Information',
      defaultVal:  [
        {
          coverageCode: '',
          coverageName: '',
        },
      ],
    },
    {
      label: 'Riders Applicable',
      formControlName: 'ridersApplicable',
      type: 'text',
      isVisible: false,
      isMandatory: true,
      category: 'Basic Information',
      defaultVal:  '',
    },
    {
      label: 'Rental car damage',
      formControlName: 'rentalCarDamage',
      type: 'text',
      isVisible: false,
      isMandatory: false,
      category: 'Basic Information',
      // defaultVal:  true,
    },
    {
      label: 'Pet travel coverage',
      formControlName: 'petTravelCoverage',
      type: 'text',
      isVisible: false,
      isMandatory: false,
      category: 'Basic Information',
      // defaultVal:  false,
    },
    {
      label: 'Liquid Damage Protection',
      formControlName: 'liquidDamageProtection',
      type: 'text',
      isVisible: false,
      isMandatory: false,
      category: 'Basic Information',
      // defaultVal:  false,
    },
    {
      label: 'Screen Damage Protection',
      formControlName: 'screenDamageProtection',
      type: 'text',
      isVisible: false,
      isMandatory: false,
      category: 'Basic Information',
      // defaultVal:  false,
    },
    {
      label: 'Lost Mobile Protection',
      formControlName: 'lostMobileProtection',
      type: 'text',
      isVisible: false,
      isMandatory: false,
      category: 'Basic Information',
      // defaultVal:  false,
    },
    {
      label: 'Theft Protection',
      formControlName: 'theftProtection',
      type: 'text',
      isVisible: false,
      isMandatory: false,
      category: 'Basic Information',
      // defaultVal:  false,
    },
    {
      label: 'Zero Depreciation/ Nil Depreciation',
      formControlName: 'zeroDepreciation',
      type: 'text',
      isVisible: false,
      isMandatory: false,
      category: 'Basic Information',
      // defaultVal:  false,
    },
    {
      label: 'Engine Protection',
      formControlName: 'engineProtection',
      type: 'text',
      isVisible: false,
      isMandatory: false,
      category: 'Basic Information',
      // defaultVal:  false,
    },
    {
      label: 'Roadside Assistance',
      formControlName: 'roadsideAssistance',
      type: 'text',
      isVisible: false,
      isMandatory: false,
      category: 'Basic Information',
      // defaultVal:  false,
    },
    {
      label: 'Key Loss Protection',
      formControlName: 'keyLossProtection',
      type: 'text',
      isVisible: false,
      isMandatory: false,
      category: 'Basic Information',
      // defaultVal:  ,
    },
    {
      label: 'Underwriting Guideline',
      formControlName: 'underwritingGuidelines',
      type: 'text',
      isVisible: false,
      isMandatory: false,
      category: 'Underwriting Guidelines',
      defaultVal: ''
    },
    {
      label: 'Underwriting Requirements',
      formControlName: 'underwritingRequirements',
      type: 'text',
      isVisible: false,
      isMandatory: false,
      category: 'Underwriting Guidelines',
      defaultVal:  [],
    },
    {
      label: 'Risk Assessment Criteria',
      formControlName: 'riskAssessCriteria',
      type: 'text',
      isVisible: false,
      isMandatory: false,
      category: 'Underwriting Guidelines',
      defaultVal:  '',
    },
    {
      label: 'Refundable Premium',
      formControlName: 'refundablePrem',
      type: 'text',
      isVisible: false,
      isMandatory: false,
      category: 'Refundable Premium',
      defaultVal:  '',
    },
    {
      label: 'Tax Benefits',
      formControlName: 'taxBenefits',
      type: 'text',
      isVisible: false,
      isMandatory: false,
      category: 'Refundable Premium',
      defaultVal:  '',
    },
    {
      label: 'Renewal',
      formControlName: 'renewal',
      type: 'text',
      isVisible: false,
      isMandatory: false,
      category: 'Refundable Premium',
      defaultVal:  '',
    },
  ];

  templateFields = [
    'productName',
    'productDescription',
    'productCode',
    'productStatus',
    'category',
    'coverage',
    'ridersApplicable',
    'rentalCarDamage',
    'petTravelCoverage',
  ];

  searchFilterList: any = [];
  groupCategoryList: { [key: string]: any[] } = {};
  controlComments = [];

  constructor(
    private _fb: FormBuilder,
    private dialog: MatDialog,
    private shareproductData: ShareproductdataService,
    private formDataService: FormDataService
  ) {
    this.productDetailsForm = new FormGroup({});
    this.isBlankTemplate = localStorage.getItem('createMode');
  }

  ngOnInit(): void {
    this.initialiseForm(); //Initialise the product details form
    this.initializeSearchForm(); //Initialise the search form
    this.formService$ = this.formDataService.callSaveFunction$.subscribe(
      (data) => {
        if (data === '0') {
          this.saveData();
        }
      }
    );
    this.generateFormFields();
    this.groupFieldsByCategory();
    this.fetchComments();
  }

  initializeSearchForm() {
    this.searchForm = this._fb.group({
      search: [''],
    });
  }

  initialiseForm() {
    this.productDetailsForm = this._fb.group({});
  }

  generateFormFields() {
    if (this.isBlankTemplate === 'create-by-template') {
      this.fieldsList.forEach((field) => {
        //assigning controls and values from saved draft
        if (this.mode.includes('edit-draft')) {
          this.templateFields = Object.keys(this.productData);
          field.defaultVal  = this.productData[field.formControlName];
        }

        if (this.mode.includes('edit-product')) {
          this.templateFields = Object.keys(this.productData);
          field.defaultVal  = this.productData[field.formControlName];
          this.productDetailsForm.disable()
        }

        const isFieldExits = this.templateFields.some(
          (tempField) => field.formControlName === tempField
        );
        if (isFieldExits) {
          // field.isMandatory = true
          this.addRemoveControls(true, field);
        }
      });
      // checking if the created from template or from scratch
      // Taking only those fields which are mandatory
      this.searchFilterList = this.fieldsList.filter(
        (field) =>
          !this.templateFields.some((item) => item === field.formControlName)
      );
    } else {
      // Taking all fields
      this.searchFilterList = this.fieldsList;
    }
  }

  fetchComments(){
    this.controlComments = this.formDataService.getComments();
  }

  hasComments(formControlName){
    return this.controlComments.some(comment => comment.formControlName === formControlName)? true : false;
  }

  //getters
  get productCode() {
    return this.productDetailsForm.get('productCode');
  }
  get productStatus() {
    return this.productDetailsForm.get('productStatus');
  }
  get category() {
    return this.productDetailsForm.get('category');
  }

  //Riders
  get ridersApplicable() {
    return this.productDetailsForm.get('ridersApplicable');
  }
  get rentalCarDamage() {
    return this.productDetailsForm.get('rentalCarDamage');
  }
  get rentalCarDamageRadio() {
    return this.productDetailsForm.get('rentalCarDamageRadio');
  }
  get petTravelCoverage() {
    return this.productDetailsForm.get('petTravelCoverage');
  }
  get petTravelCoverageRadio() {
    return this.productDetailsForm.get('petTravelCoverageRadio');
  }
  get liquidDamageProtection() {
    return this.productDetailsForm.get('liquidDamageProtection');
  }
  get liquidDamageProtectionRadio() {
    return this.productDetailsForm.get('liquidDamageProtectionRadio');
  }
  get screenDamageProtection() {
    return this.productDetailsForm.get('screenDamageProtection');
  }
  get screenDamageProtectionRadio() {
    return this.productDetailsForm.get('screenDamageProtectionRadio');
  }
  get lostMobileProtection() {
    return this.productDetailsForm.get('lostMobileProtection');
  }
  get lostMobileProtectionRadio() {
    return this.productDetailsForm.get('lostMobileProtectionRadio');
  }
  get theftProtection() {
    return this.productDetailsForm.get('theftProtection');
  }
  get theftProtectionRadio() {
    return this.productDetailsForm.get('theftProtectionRadio');
  }
  get zeroDepreciation() {
    return this.productDetailsForm.get('zeroDepreciation');
  }
  get zeroDepreciationRadio() {
    return this.productDetailsForm.get('zeroDepreciationRadio');
  }
  get engineProtection() {
    return this.productDetailsForm.get('engineProtection');
  }
  get engineProtectionRadio() {
    return this.productDetailsForm.get('engineProtectionRadio');
  }
  get roadsideAssistance() {
    return this.productDetailsForm.get('roadsideAssistance');
  }
  get roadsideAssistanceRadio() {
    return this.productDetailsForm.get('roadsideAssistanceRadio');
  }
  get keyLossProtection() {
    return this.productDetailsForm.get('keyLossProtection');
  }
  get keyLossProtectionRadio() {
    return this.productDetailsForm.get('keyLossProtectionRadio');
  }

  /////

  get productName() {
    return this.productDetailsForm.get('productName');
  }
  get productDescription() {
    return this.productDetailsForm.get('productDescription');
  }
  get productTagline() {
    return this.productDetailsForm.get('productTagline');
  }
  get underwritingGuidelines() {
    return this.productDetailsForm.get('underwritingGuidelines');
  }
  get underwritingRequirements() {
    return this.productDetailsForm.get('underwritingRequirements');
  }
  get riskAssessCriteria() {
    return this.productDetailsForm.get('riskAssessCriteria');
  }
  get refundablePrem() {
    return this.productDetailsForm.get('refundablePrem');
  }
  get taxBenefits() {
    return this.productDetailsForm.get('taxBenefits');
  }
  get renewal() {
    return this.productDetailsForm.get('renewal');
  }
  get coverage() {
    return this.productDetailsForm?.get('coverage') as FormArray;
  }

  groupFieldsByCategory() {
    this.searchFilterList.forEach((item) => {
      if (!this.groupCategoryList[item.category]) {
        this.groupCategoryList[item.category] = [];
      }
      this.groupCategoryList[item.category].push(item);
    });
  }

  createCoverage(values): FormGroup {
    return this._fb.group({
      coverageCode: [values.coverageCode, [Validators.required]],
      coverageName: [values.coverageName, [Validators.required]],
    });
  }

  addCoverage(values = { coverageCode: '', coverageName: '' }) {
    this.coverage?.push(this.createCoverage(values));
  }

  removeCoverage(index: number) {
    this.coverage?.removeAt(index);
  }

  addRemoveControls(
    event: any,
    field: InputField,
    action = 'function',
    index?
  ) {
    field.isVisible = event;
    if (event) {
      //creating new fields
      switch (field.formControlName) {
        case 'coverage':
          this.productDetailsForm.addControl('coverage', this._fb.array([]));
          field.defaultVal. forEach((value) => {
            this.addCoverage(value);
          });
          break;
        case 'rentalCarDamage':
          this.productDetailsForm.addControl(
            field.formControlName,
            new FormControl(
              field.defaultVal  || '',
              field.isMandatory ? Validators.required : []
            )
          );
          this.productDetailsForm.addControl(
            'rentalCarDamageRadio',
            new FormControl({
              value: 'mandatory',
              disabled: !this.rentalCarDamage.value,
            })
          );
          break;
        case 'petTravelCoverage':
          this.productDetailsForm.addControl(
            field.formControlName,
            new FormControl(
              field.defaultVal  || '',
              field.isMandatory ? Validators.required : []
            )
          );
          this.productDetailsForm.addControl(
            'petTravelCoverageRadio',
            new FormControl({ value: '', disabled: !this.petTravelCoverage.value })
          );
          break;
        case 'liquidDamageProtection':
          this.productDetailsForm.addControl(
            field.formControlName,
            new FormControl(
              field.defaultVal  || '',
              field.isMandatory ? Validators.required : []
            )
          );
          this.productDetailsForm.addControl(
            'liquidDamageProtectionRadio',
            new FormControl({ value: '', disabled: !this.liquidDamageProtection.value })
          );
          break;
        case 'screenDamageProtection':
          this.productDetailsForm.addControl(
            field.formControlName,
            new FormControl(
              field.defaultVal  || '',
              field.isMandatory ? Validators.required : []
            )
          );
          this.productDetailsForm.addControl(
            'screenDamageProtectionRadio',
            new FormControl({ value: '', disabled: !this.screenDamageProtection.value })
          );
          break;
        case 'lostMobileProtection':
          this.productDetailsForm.addControl(
            field.formControlName,
            new FormControl(
              field.defaultVal  || '',
              field.isMandatory ? Validators.required : []
            )
          );
          this.productDetailsForm.addControl(
            'lostMobileProtectionRadio',
            new FormControl({ value: '', disabled: !this.lostMobileProtection.value })
          );
          break;
        case 'theftProtection':
          this.productDetailsForm.addControl(
            field.formControlName,
            new FormControl(
              field.defaultVal  || '',
              field.isMandatory ? Validators.required : []
            )
          );
          this.productDetailsForm.addControl(
            'theftProtectionRadio',
            new FormControl({ value: '', disabled: !this.theftProtection.value })
          );
          break;
        case 'zeroDepreciation':
          this.productDetailsForm.addControl(
            field.formControlName,
            new FormControl(
              field.defaultVal  || '',
              field.isMandatory ? Validators.required : []
            )
          );
          this.productDetailsForm.addControl(
            'zeroDepreciationRadio',
            new FormControl({ value: '', disabled: !this.zeroDepreciation.value })
          );
          break;
        case 'engineProtection':
          this.productDetailsForm.addControl(
            field.formControlName,
            new FormControl(
              field.defaultVal  || '',
              field.isMandatory ? Validators.required : []
            )
          );
          this.productDetailsForm.addControl(
            'engineProtectionRadio',
            new FormControl({ value: '', disabled: !this.engineProtection.value })
          );
          break;
        case 'roadsideAssistance':
          this.productDetailsForm.addControl(
            field.formControlName,
            new FormControl(
              field.defaultVal  || '',
              field.isMandatory ? Validators.required : []
            )
          );
          this.productDetailsForm.addControl(
            'roadsideAssistanceRadio',
            new FormControl({ value: '', disabled: !this.roadsideAssistance.value })
          );
          break;
        case 'keyLossProtection':
          this.productDetailsForm.addControl(
            field.formControlName,
            new FormControl(
              field.defaultVal  || '',
              field.isMandatory ? Validators.required : []
            )
          );
          this.productDetailsForm.addControl(
            'keyLossProtectionRadio',
            new FormControl({ value: '', disabled: !this.keyLossProtection.value })
          );
          break;
        default:
          this.productDetailsForm.addControl(
            field.formControlName,
            new FormControl(
              field.defaultVal  || '',
              field.isMandatory ? Validators.required : []
            )
          );
      }
      if (action === 'checkbox') {
        this.groupCategoryList[field.category].splice(index, 1);
        if (this.groupCategoryList[field.category].length === 0) {
          delete this.groupCategoryList[field.category];
        }
      }
    } else {
      switch (field.formControlName) {
        case 'rentalCarDamage':
          this.productDetailsForm.removeControl(field.formControlName);
          this.productDetailsForm.removeControl('rentalCarDamageRadio');
          break;
        case 'petTravelCoverage':
          this.productDetailsForm.removeControl(field.formControlName);
          this.productDetailsForm.removeControl('petTravelCoverageRadio');
          break;
        case 'liquidDamageProtection':
          this.productDetailsForm.removeControl(field.formControlName);
          this.productDetailsForm.removeControl('liquidDamageProtectionRadio');
          break;
        case 'screenDamageProtection':
          this.productDetailsForm.removeControl(field.formControlName);
          this.productDetailsForm.removeControl('screenDamageProtectionRadio');
          break;
        case 'lostMobileProtection':
          this.productDetailsForm.removeControl(field.formControlName);
          this.productDetailsForm.removeControl('lostMobileProtectionRadio');
          break;
        case 'theftProtection':
          this.productDetailsForm.removeControl(field.formControlName);
          this.productDetailsForm.removeControl('theftProtectionRadio');
          break;
        case 'zeroDepreciation':
          this.productDetailsForm.removeControl(field.formControlName);
          this.productDetailsForm.removeControl('zeroDepreciationRadio');
          break;
        case 'engineProtection':
          this.productDetailsForm.removeControl(field.formControlName);
          this.productDetailsForm.removeControl('engineProtectionRadio');
          break;
        case 'roadsideAssistance':
          this.productDetailsForm.removeControl(field.formControlName);
          this.productDetailsForm.removeControl('roadsideAssistanceRadio');
          break;
        case 'keyLossProtection':
          this.productDetailsForm.removeControl(field.formControlName);
          this.productDetailsForm.removeControl('keyLossProtectionRadio');
          break;
        default:
          this.productDetailsForm.removeControl(field.formControlName);
          const index = this.fieldsList.findIndex(
            (x) => x.formControlName == field.formControlName
          );
          if (
            index != -1 &&
            this.fieldsList[index].hasOwnProperty('comments')
          ) {
            delete this.fieldsList[index]['comments'];
          }
      }
    }

    // Check product detail form has any field created
    const numberOfFields = Object.keys(this.productDetailsForm.controls).length;
    if (numberOfFields > 0) {
      this.isPageBlank = false;
    } else {
      this.isPageBlank = true;
    }
  }

  // Add/remove fields on checkout selection
  selectUnselectGroup(event, category) {
    const relFields = this.searchFilterList.filter(
      (item) => item.category === category
    );
    if (event.checked) {
      relFields.forEach((item) => {
        this.addRemoveControls(true, item, 'checkbox');
      });
    } else {
      relFields.forEach((item) => {
        this.addRemoveControls(false, item);
      });
    }
  }

  saveData() {
    this.formDataService.setFormData(
      'productDetails',
      this.productDetailsForm.value
    );
  }

  nextData() {
    this.saveData();
    this.shareproductData.updateData(this.productDetailsForm.value.productCode);
  }

  search(event) {
    const value = event.target.value.toLocaleLowerCase();
    this.searchFilterList = this.fieldsList.filter((field) =>
      field.label.toLocaleLowerCase().includes(value)
    );
  }

  cancelSearch() {
    this.searchForm.reset();
    if (this.isBlankTemplate === 'create-by-template') {
      this.searchFilterList = this.fieldsList.filter(
        (field) =>
          !this.templateFields.some((item) => item === field.formControlName)
      );
    } else {
      this.searchFilterList = this.fieldsList;
    }
  }

  editlabel(controlname) {
    const dialogRef = this.dialog.open(EditLabelComponent);
    dialogRef.afterClosed().subscribe((result) => {
      const element = controlname + '_label';
      document.getElementById(element).innerHTML = result;
    });
  }

  riderCheckBox(event, formControlName) {
    if (formControlName === 'rentalCarDamage') {
      if (event.checked) {
        this.rentalCarDamageRadio.enable();
        this.rentalCarDamageRadio.setValidators([Validators.required]);
      } else {
        this.rentalCarDamageRadio.clearValidators();
        this.rentalCarDamageRadio.disable();
      }
    }

    if (formControlName === 'petTravelCoverage') {
      if (event.checked) {
        this.petTravelCoverageRadio.enable();
        this.petTravelCoverageRadio.setValidators([Validators.required]);
      } else {
        this.petTravelCoverageRadio.clearValidators();
        this.petTravelCoverageRadio.disable();
      }
    }

    if (formControlName === 'liquidDamageProtection') {
      if (event.checked) {
        this.liquidDamageProtectionRadio.enable();
        this.liquidDamageProtectionRadio.setValidators([Validators.required]);
      } else {
        this.liquidDamageProtectionRadio.clearValidators();
        this.liquidDamageProtectionRadio.disable();
      }
    }

    if (formControlName === 'screenDamageProtection') {
      if (event.checked) {
        this.screenDamageProtectionRadio.enable();
        this.screenDamageProtectionRadio.setValidators([Validators.required]);
      } else {
        this.screenDamageProtectionRadio.clearValidators();
        this.screenDamageProtectionRadio.disable();
      }
    }

    if (formControlName === 'lostMobileProtection') {
      if (event.checked) {
        this.lostMobileProtectionRadio.enable();
        this.lostMobileProtectionRadio.setValidators([Validators.required]);
      } else {
        this.lostMobileProtectionRadio.clearValidators();
        this.lostMobileProtectionRadio.disable();
      }
    }

    if (formControlName === 'theftProtection') {
      if (event.checked) {
        this.theftProtectionRadio.enable();
        this.theftProtectionRadio.setValidators([Validators.required]);
      } else {
        this.theftProtectionRadio.clearValidators();
        this.theftProtectionRadio.disable();
      }
    }

    if (formControlName === 'zeroDepreciation') {
      if (event.checked) {
        this.zeroDepreciationRadio.enable();
        this.zeroDepreciationRadio.setValidators([Validators.required]);
      } else {
        this.zeroDepreciationRadio.clearValidators();
        this.zeroDepreciationRadio.disable();
      }
    }

    if (formControlName === 'engineProtection') {
      if (event.checked) {
        this.engineProtectionRadio.enable();
        this.engineProtectionRadio.setValidators([Validators.required]);
      } else {
        this.engineProtectionRadio.clearValidators();
        this.engineProtectionRadio.disable();
      }
    }

    if (formControlName === 'roadsideAssistance') {
      if (event.checked) {
        this.roadsideAssistanceRadio.enable();
        this.roadsideAssistanceRadio.setValidators([Validators.required]);
      } else {
        this.roadsideAssistanceRadio.clearValidators();
        this.roadsideAssistanceRadio.disable();
      }
    }

    if (formControlName === 'keyLossProtection') {
      if (event.checked) {
        this.keyLossProtectionRadio.enable();
        this.keyLossProtectionRadio.setValidators([Validators.required]);
      } else {
        this.keyLossProtectionRadio.clearValidators();
        this.keyLossProtectionRadio.disable();
      }
    }

    this.rentalCarDamageRadio.updateValueAndValidity();
    this.petTravelCoverageRadio.updateValueAndValidity();
    this.liquidDamageProtectionRadio.updateValueAndValidity();
    this.screenDamageProtectionRadio.updateValueAndValidity();
    this.lostMobileProtectionRadio.updateValueAndValidity();
    this.theftProtectionRadio.updateValueAndValidity();
    this.zeroDepreciationRadio.updateValueAndValidity();
    this.engineProtectionRadio.updateValueAndValidity();
    this.roadsideAssistanceRadio.updateValueAndValidity();
    this.keyLossProtectionRadio.updateValueAndValidity();
  }

  ngOnDestroy(): void {
    this.formService$.unsubscribe();
  }

  deleteControl(field) {
    this.addRemoveControls(false, field);
    if (!this.groupCategoryList[field.category]) {
      this.groupCategoryList[field.category] = [];
    }
    this.groupCategoryList[field.category].push(field);
  }

  openCommentDialog(controlName, event?): void {
    if (event) {
      event.stopPropagation();
    }
    let comment = this.formDataService.getComments().find(comment => comment.formControlName === controlName);
    const dialogRef = this.dialog.open(EditLabelComponent, {
      width: '500px',
      disableClose: true,
      data: {
        comment: comment
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result != 'cancel' && result != '') {
        if(!comment){
          comment = {
            formControlName: controlName,
            comments: [result]
          }
        } else {
          comment.comments.push(result);
        }
        this.formDataService.addComment(comment);
      }
    });
  }
}
