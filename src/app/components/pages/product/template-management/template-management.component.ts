import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {MatTableModule} from '@angular/material/table';
import {MatMenuModule} from '@angular/material/menu';
import { Router, RouterModule } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';

export interface TemplateElement {
  thumbnail: string;
  productName: string;
  description: string;
  action: string;
}

const ELEMENT_DATA: TemplateElement[] = [
  {thumbnail: "<image>", productName: 'Mobile Protect​', description: "Gadget insurance that will cover your phone in case it is damaged, stolen or lost​", action: 'Create a New Product using this template'},
  {thumbnail: "<image>", productName: 'Overseas- Gold Plus​', description: "Covers pre-existing conditions, with coverage for hospitalisation and evacuation costs. Ideal for stable and controlled conditions​.", action: 'He'},
  {thumbnail: "<image>", productName: 'Overseas- Silver Plus​', description: "Most comprehensive travel insurance in Singapore with over 50 benefits, including COVID-19 coverage..", action: 'Li'},
  {thumbnail: "<image>", productName: 'Overseas- Titanium Plus​', description: "Offers flexible, affordable travel insurance with many add-on options to suit your every need. Personalise your coverage for that perfect fit.​", action: 'Be'},
  {thumbnail: "<image>", productName: 'Travel Protection​', description: "Provides financial protection for trips within a country, offering coverage for medical emergencies, trip cancellations, lost baggage, and other travel-related risks​.", action: 'B'},
  {thumbnail: "<image>", productName: 'Total Protection​​', description: "Provides coverage for unexpected repair or replacement costs of household appliances like refrigerators, ovens, and washing machines​​", action: 'C'},
  {thumbnail: "<image>", productName: 'Accidental Protection​​', description: "Provides financial protection to the insured individual and their family in the event of accidental death, injury, or disability​.", action: 'C'},
  {thumbnail: "<image>", productName: 'Income Protection​​', description: "Provides financial coverage to the insured in case of accidental death, permanent or partial disability, or temporary total disability, helping to replace lost income and cover expenses​.", action: 'C'},
];

@Component({
  selector: 'app-template-management',
  standalone: true,
  imports: [
    MatInputModule,
    MatSelectModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    CommonModule,
    MatMenuModule,
    RouterModule,
    MatPaginator
  ],
  templateUrl: './template-management.component.html',
  styleUrl: './template-management.component.scss'
})
export class TemplateManagementComponent implements OnInit{
  displayedColumns: string[] = ['thumbnail', 'productName', 'description', 'action'];
  dataSource = ELEMENT_DATA;
  subCategories = [];
  categoryList = [
    'Mobile​',
    'Travel​',
    'Electrical Appliance​',
    'Personal Accident​'
  ]

  subcategoryList = [
    {category : 'Mobile​', subCategory : ['Mobile Phone Insurance​']},
    {category : 'Travel​', subCategory : ['Overseas Travel Insurance​','Inbound Travel Insurance​','Staycation Insurance​']},
    {category : 'Electrical Appliance​', subCategory : ['Electrical Appliance Insurance​']},
    {category : 'Personal Accident​', subCategory : ['Personal Accident​']},
  ];

  constructor(private route: Router) {
  }

  ngOnInit(): void {
    
  }

  onCategoryChange(filter: any,event: any){
    this.subCategories = this.subcategoryList.filter(x =>{
      return x.category == event.value
    })
  }

  createNewProduct(){
    localStorage.setItem('createMode','create-by-template');
    this.route.navigate(['/main/product/create-product']);
  }
}
