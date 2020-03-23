import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'customer',
        loadChildren: () => import('./customer/customer.module').then(m => m.CrmwebCustomerModule)
      },
      {
        path: 'cust-document',
        loadChildren: () => import('./cust-document/cust-document.module').then(m => m.CrmwebCustDocumentModule)
      },
      {
        path: 'cust-doc-data-store',
        loadChildren: () => import('./cust-doc-data-store/cust-doc-data-store.module').then(m => m.CrmwebCustDocDataStoreModule)
      },
      {
        path: 'cust-comm-optout-master',
        loadChildren: () => import('./cust-comm-optout-master/cust-comm-optout-master.module').then(m => m.CrmwebCustCommOptoutMasterModule)
      },
      {
        path: 'comm-optout-type',
        loadChildren: () => import('./comm-optout-type/comm-optout-type.module').then(m => m.CrmwebCommOptoutTypeModule)
      },
      {
        path: 'comm-media-type',
        loadChildren: () => import('./comm-media-type/comm-media-type.module').then(m => m.CrmwebCommMediaTypeModule)
      },
      {
        path: 'cust-acct-black-list',
        loadChildren: () => import('./cust-acct-black-list/cust-acct-black-list.module').then(m => m.CrmwebCustAcctBlackListModule)
      },
      {
        path: 'black-list-master',
        loadChildren: () => import('./black-list-master/black-list-master.module').then(m => m.CrmwebBlackListMasterModule)
      },
      {
        path: 'cust-contact',
        loadChildren: () => import('./cust-contact/cust-contact.module').then(m => m.CrmwebCustContactModule)
      },
      {
        path: 'cust-address',
        loadChildren: () => import('./cust-address/cust-address.module').then(m => m.CrmwebCustAddressModule)
      },
      {
        path: 'subscription-group',
        loadChildren: () => import('./subscription-group/subscription-group.module').then(m => m.CrmwebSubscriptionGroupModule)
      },
      {
        path: 'group-type',
        loadChildren: () => import('./group-type/group-type.module').then(m => m.CrmwebGroupTypeModule)
      },
      {
        path: 'group-member',
        loadChildren: () => import('./group-member/group-member.module').then(m => m.CrmwebGroupMemberModule)
      },
      {
        path: 'group-end-reason',
        loadChildren: () => import('./group-end-reason/group-end-reason.module').then(m => m.CrmwebGroupEndReasonModule)
      },
      {
        path: 'cust-subscription',
        loadChildren: () => import('./cust-subscription/cust-subscription.module').then(m => m.CrmwebCustSubscriptionModule)
      },
      {
        path: 'subs-purchase-control',
        loadChildren: () => import('./subs-purchase-control/subs-purchase-control.module').then(m => m.CrmwebSubsPurchaseControlModule)
      },
      {
        path: 'subscription-details',
        loadChildren: () => import('./subscription-details/subscription-details.module').then(m => m.CrmwebSubscriptionDetailsModule)
      },
      {
        path: 'subs-order-details',
        loadChildren: () => import('./subs-order-details/subs-order-details.module').then(m => m.CrmwebSubsOrderDetailsModule)
      },
      {
        path: 'subs-item-delivery',
        loadChildren: () => import('./subs-item-delivery/subs-item-delivery.module').then(m => m.CrmwebSubsItemDeliveryModule)
      },
      {
        path: 'ef-locker-location',
        loadChildren: () => import('./ef-locker-location/ef-locker-location.module').then(m => m.CrmwebEfLockerLocationModule)
      },
      {
        path: 'subscription-provision',
        loadChildren: () => import('./subscription-provision/subscription-provision.module').then(m => m.CrmwebSubscriptionProvisionModule)
      },
      {
        path: 'subscription-product',
        loadChildren: () => import('./subscription-product/subscription-product.module').then(m => m.CrmwebSubscriptionProductModule)
      },
      {
        path: 'sales-channel-master',
        loadChildren: () => import('./sales-channel-master/sales-channel-master.module').then(m => m.CrmwebSalesChannelMasterModule)
      },
      {
        path: 'supreme-master',
        loadChildren: () => import('./supreme-master/supreme-master.module').then(m => m.CrmwebSupremeMasterModule)
      },
      {
        path: 'bill-cycle',
        loadChildren: () => import('./bill-cycle/bill-cycle.module').then(m => m.CrmwebBillCycleModule)
      },
      {
        path: 'offer',
        loadChildren: () => import('./offer/offer.module').then(m => m.CrmwebOfferModule)
      },
      {
        path: 'offer-customer-segment',
        loadChildren: () => import('./offer-customer-segment/offer-customer-segment.module').then(m => m.CrmwebOfferCustomerSegmentModule)
      },
      {
        path: 'offer-customer-class',
        loadChildren: () => import('./offer-customer-class/offer-customer-class.module').then(m => m.CrmwebOfferCustomerClassModule)
      },
      {
        path: 'offer-sales-channel',
        loadChildren: () => import('./offer-sales-channel/offer-sales-channel.module').then(m => m.CrmwebOfferSalesChannelModule)
      },
      {
        path: 'offer-product',
        loadChildren: () => import('./offer-product/offer-product.module').then(m => m.CrmwebOfferProductModule)
      },
      {
        path: 'product',
        loadChildren: () => import('./product/product.module').then(m => m.CrmwebProductModule)
      },
      {
        path: 'delivery-option',
        loadChildren: () => import('./delivery-option/delivery-option.module').then(m => m.CrmwebDeliveryOptionModule)
      },
      {
        path: 'product-sim-type',
        loadChildren: () => import('./product-sim-type/product-sim-type.module').then(m => m.CrmwebProductSimTypeModule)
      },
      {
        path: 'product-voice',
        loadChildren: () => import('./product-voice/product-voice.module').then(m => m.CrmwebProductVoiceModule)
      },
      {
        path: 'product-data',
        loadChildren: () => import('./product-data/product-data.module').then(m => m.CrmwebProductDataModule)
      },
      {
        path: 'product-sms',
        loadChildren: () => import('./product-sms/product-sms.module').then(m => m.CrmwebProductSmsModule)
      },
      {
        path: 'product-mms',
        loadChildren: () => import('./product-mms/product-mms.module').then(m => m.CrmwebProductMmsModule)
      },
      {
        path: 'cfs-service',
        loadChildren: () => import('./cfs-service/cfs-service.module').then(m => m.CrmwebCfsServiceModule)
      },
      {
        path: 'voice-service-spec',
        loadChildren: () => import('./voice-service-spec/voice-service-spec.module').then(m => m.CrmwebVoiceServiceSpecModule)
      },
      {
        path: 'data-service-spec',
        loadChildren: () => import('./data-service-spec/data-service-spec.module').then(m => m.CrmwebDataServiceSpecModule)
      },
      {
        path: 'resource-specification',
        loadChildren: () => import('./resource-specification/resource-specification.module').then(m => m.CrmwebResourceSpecificationModule)
      },
      {
        path: 'offer-advance-payment',
        loadChildren: () => import('./offer-advance-payment/offer-advance-payment.module').then(m => m.CrmwebOfferAdvancePaymentModule)
      },
      {
        path: 'offer-promotion',
        loadChildren: () => import('./offer-promotion/offer-promotion.module').then(m => m.CrmwebOfferPromotionModule)
      },
      {
        path: 'offer-discount',
        loadChildren: () => import('./offer-discount/offer-discount.module').then(m => m.CrmwebOfferDiscountModule)
      },
      {
        path: 'sim-inventory',
        loadChildren: () => import('./sim-inventory/sim-inventory.module').then(m => m.CrmwebSimInventoryModule)
      },
      {
        path: 'order-master',
        loadChildren: () => import('./order-master/order-master.module').then(m => m.CrmwebOrderMasterModule)
      },
      {
        path: 'order-process-config',
        loadChildren: () => import('./order-process-config/order-process-config.module').then(m => m.CrmwebOrderProcessConfigModule)
      },
      {
        path: 'order-process-status',
        loadChildren: () => import('./order-process-status/order-process-status.module').then(m => m.CrmwebOrderProcessStatusModule)
      },
      {
        path: 'order-process-status-history',
        loadChildren: () =>
          import('./order-process-status-history/order-process-status-history.module').then(m => m.CrmwebOrderProcessStatusHistoryModule)
      },
      {
        path: 'product-box-type',
        loadChildren: () => import('./product-box-type/product-box-type.module').then(m => m.CrmwebProductBoxTypeModule)
      },
      {
        path: 'model-category',
        loadChildren: () => import('./model-category/model-category.module').then(m => m.CrmwebModelCategoryModule)
      },
      {
        path: 'model-group',
        loadChildren: () => import('./model-group/model-group.module').then(m => m.CrmwebModelGroupModule)
      },
      {
        path: 'model',
        loadChildren: () => import('./model/model.module').then(m => m.CrmwebModelModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class CrmwebEntityModule {}
