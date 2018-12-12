import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AllItemsPage } from './all-items';

@NgModule({
  declarations: [
    AllItemsPage,
  ],
  imports: [
    IonicPageModule.forChild(AllItemsPage),
  ],
})
export class AllItemsPageModule {}
