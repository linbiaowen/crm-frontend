import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { GroupMemberComponentsPage, GroupMemberDeleteDialog, GroupMemberUpdatePage } from './group-member.page-object';

const expect = chai.expect;

describe('GroupMember e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let groupMemberComponentsPage: GroupMemberComponentsPage;
  let groupMemberUpdatePage: GroupMemberUpdatePage;
  let groupMemberDeleteDialog: GroupMemberDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.loginWithOAuth('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load GroupMembers', async () => {
    await navBarPage.goToEntity('group-member');
    groupMemberComponentsPage = new GroupMemberComponentsPage();
    await browser.wait(ec.visibilityOf(groupMemberComponentsPage.title), 5000);
    expect(await groupMemberComponentsPage.getTitle()).to.eq('crmwebApp.groupMember.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(groupMemberComponentsPage.entities), ec.visibilityOf(groupMemberComponentsPage.noResult)),
      1000
    );
  });

  it('should load create GroupMember page', async () => {
    await groupMemberComponentsPage.clickOnCreateButton();
    groupMemberUpdatePage = new GroupMemberUpdatePage();
    expect(await groupMemberUpdatePage.getPageTitle()).to.eq('crmwebApp.groupMember.home.createOrEditLabel');
    await groupMemberUpdatePage.cancel();
  });

  it('should create and save GroupMembers', async () => {
    const nbButtonsBeforeCreate = await groupMemberComponentsPage.countDeleteButtons();

    await groupMemberComponentsPage.clickOnCreateButton();

    await promise.all([
      groupMemberUpdatePage.setGroupMemberIdInput('5'),
      groupMemberUpdatePage.setGroupIdInput('5'),
      groupMemberUpdatePage.setMsisdnInput('msisdn'),
      groupMemberUpdatePage.groupRoleSelectLastOption(),
      groupMemberUpdatePage.setEndReasonCodeInput('endReasonCode'),
      groupMemberUpdatePage.setRemarksInput('remarks'),
      groupMemberUpdatePage.setStartDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      groupMemberUpdatePage.setEndDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      groupMemberUpdatePage.setLockCountInput('5'),
      groupMemberUpdatePage.setCreatedDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      groupMemberUpdatePage.setCreatedByInput('createdBy'),
      groupMemberUpdatePage.setLastUpdatedDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      groupMemberUpdatePage.setLastUpdatedByInput('lastUpdatedBy'),
      groupMemberUpdatePage.setTenantIdInput('tenantId'),
      groupMemberUpdatePage.subscriptionGroupSelectLastOption()
    ]);

    expect(await groupMemberUpdatePage.getGroupMemberIdInput()).to.eq('5', 'Expected groupMemberId value to be equals to 5');
    expect(await groupMemberUpdatePage.getGroupIdInput()).to.eq('5', 'Expected groupId value to be equals to 5');
    expect(await groupMemberUpdatePage.getMsisdnInput()).to.eq('msisdn', 'Expected Msisdn value to be equals to msisdn');
    expect(await groupMemberUpdatePage.getEndReasonCodeInput()).to.eq(
      'endReasonCode',
      'Expected EndReasonCode value to be equals to endReasonCode'
    );
    expect(await groupMemberUpdatePage.getRemarksInput()).to.eq('remarks', 'Expected Remarks value to be equals to remarks');
    expect(await groupMemberUpdatePage.getStartDateInput()).to.contain(
      '2001-01-01T02:30',
      'Expected startDate value to be equals to 2000-12-31'
    );
    expect(await groupMemberUpdatePage.getEndDateInput()).to.contain(
      '2001-01-01T02:30',
      'Expected endDate value to be equals to 2000-12-31'
    );
    expect(await groupMemberUpdatePage.getLockCountInput()).to.eq('5', 'Expected lockCount value to be equals to 5');
    expect(await groupMemberUpdatePage.getCreatedDateInput()).to.contain(
      '2001-01-01T02:30',
      'Expected createdDate value to be equals to 2000-12-31'
    );
    expect(await groupMemberUpdatePage.getCreatedByInput()).to.eq('createdBy', 'Expected CreatedBy value to be equals to createdBy');
    expect(await groupMemberUpdatePage.getLastUpdatedDateInput()).to.contain(
      '2001-01-01T02:30',
      'Expected lastUpdatedDate value to be equals to 2000-12-31'
    );
    expect(await groupMemberUpdatePage.getLastUpdatedByInput()).to.eq(
      'lastUpdatedBy',
      'Expected LastUpdatedBy value to be equals to lastUpdatedBy'
    );
    expect(await groupMemberUpdatePage.getTenantIdInput()).to.eq('tenantId', 'Expected TenantId value to be equals to tenantId');

    await groupMemberUpdatePage.save();
    expect(await groupMemberUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await groupMemberComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last GroupMember', async () => {
    const nbButtonsBeforeDelete = await groupMemberComponentsPage.countDeleteButtons();
    await groupMemberComponentsPage.clickOnLastDeleteButton();

    groupMemberDeleteDialog = new GroupMemberDeleteDialog();
    expect(await groupMemberDeleteDialog.getDialogTitle()).to.eq('crmwebApp.groupMember.delete.question');
    await groupMemberDeleteDialog.clickOnConfirmButton();

    expect(await groupMemberComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
