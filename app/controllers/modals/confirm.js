class ConfirmCtrl {
  constructor($uibModalInstance, item) {
    this.uibModalInstance = $uibModalInstance
    this.item = item
  }

  ok() {
    this.uibModalInstance.close();
  }

  cancel() {
    this.uibModalInstance.dismiss('cancel');
  }
}
app.controller("ConfirmCtrl", ConfirmCtrl)
